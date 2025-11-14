#!/usr/bin/env python3
"""
Wedding Photo Selection Script
Evaluates pre-wedding/engagement photos using LM Studio's vision model
and selects the best ones for the wedding website.
"""

import os
import base64
import json
import requests
from pathlib import Path
from typing import List, Dict
import shutil

# Configuration
IMAGES_FOLDER = "/Users/ludovicocesaro/Desktop/Personal/wedding-site/assets/images/folder"
SELECTED_FOLDER = "/Users/ludovicocesaro/Desktop/Personal/wedding-site/assets/images/selected_llm"
LM_STUDIO_URL = "http://localhost:1234/v1/chat/completions"
MODEL_NAME = "qwen/qwen2.5-vl-7b"
BATCH_SIZE = 5

# Specialized prompt for evaluating pre-wedding/engagement photos
EVALUATION_PROMPT = """You are a professional wedding photographer evaluating engagement/pre-wedding photos for a couple's wedding website.

Analyze these {count} photos and select the BEST ones based on these criteria:

**Technical Quality (40%):**
- Sharp focus and clarity
- Proper exposure and lighting
- Good composition (rule of thirds, framing)
- Natural colors and skin tones
- Minimal distractions in background

**Emotional Connection (35%):**
- Genuine expressions and emotions
- Natural chemistry between the couple
- Authentic moments vs. overly posed
- Storytelling quality

**Website Suitability (25%):**
- Professional presentation
- Variety in poses and settings
- Appropriate for public wedding website
- Visual appeal and memorability

For each photo, provide:
1. Photo number (1-{count})
2. Overall score (1-10)
3. Brief reason (one sentence)
4. Keep? (YES/NO)

Respond in JSON format:
{{
  "evaluations": [
    {{"photo": 1, "score": 8.5, "reason": "Beautiful natural lighting and genuine smiles", "keep": "YES"}},
    {{"photo": 2, "score": 6.0, "reason": "Slightly out of focus, distracting background", "keep": "NO"}},
    ...
  ],
  "summary": "Brief overall assessment of this batch"
}}

Be selective - only recommend keeping the truly excellent photos that will make their wedding website shine."""


def encode_image_to_base64(image_path: str) -> str:
    """Convert image file to base64 string."""
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')


def get_image_files(folder_path: str) -> List[str]:
    """Get all image files from the folder."""
    image_extensions = {'.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'}
    folder = Path(folder_path)

    images = [
        str(file) for file in folder.iterdir()
        if file.is_file() and file.suffix in image_extensions
    ]

    return sorted(images)


def create_batch(image_paths: List[str]) -> List[str]:
    """Create a batch of images."""
    return image_paths[:BATCH_SIZE]


def evaluate_batch(image_paths: List[str]) -> Dict:
    """Send a batch of images to LM Studio for evaluation."""

    print(f"\nEvaluating batch of {len(image_paths)} photos...")

    # Prepare the message content with images
    content_parts = []

    # Add the evaluation prompt
    content_parts.append({
        "type": "text",
        "text": EVALUATION_PROMPT.format(count=len(image_paths))
    })

    # Add each image
    for idx, img_path in enumerate(image_paths, 1):
        print(f"  Loading image {idx}: {Path(img_path).name}")
        try:
            img_base64 = encode_image_to_base64(img_path)
            content_parts.append({
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/jpeg;base64,{img_base64}"
                }
            })
        except Exception as e:
            print(f"  Error loading image {img_path}: {e}")

    # Prepare API request
    payload = {
        "model": MODEL_NAME,
        "messages": [
            {
                "role": "user",
                "content": content_parts
            }
        ],
        "temperature": 0.3,
        "max_tokens": 2000,
        "stream": False
    }

    try:
        print("  Sending request to LM Studio...")
        response = requests.post(
            LM_STUDIO_URL,
            headers={"Content-Type": "application/json"},
            json=payload,
            timeout=120
        )
        response.raise_for_status()

        result = response.json()
        assistant_message = result['choices'][0]['message']['content']

        print("  Received response from model")

        # Try to parse JSON from response
        try:
            # Find JSON in the response (in case there's extra text)
            json_start = assistant_message.find('{')
            json_end = assistant_message.rfind('}') + 1

            if json_start >= 0 and json_end > json_start:
                json_str = assistant_message[json_start:json_end]
                evaluation = json.loads(json_str)
                return evaluation
            else:
                print("  Warning: No JSON found in response")
                print(f"  Raw response: {assistant_message}")
                return {"evaluations": [], "summary": assistant_message}

        except json.JSONDecodeError as e:
            print(f"  Warning: Could not parse JSON: {e}")
            print(f"  Raw response: {assistant_message}")
            return {"evaluations": [], "summary": assistant_message}

    except requests.exceptions.RequestException as e:
        print(f"  Error calling LM Studio API: {e}")
        return {"evaluations": [], "summary": f"API Error: {e}"}


def process_evaluation(image_paths: List[str], evaluation: Dict) -> List[str]:
    """Process evaluation results and return paths of photos to keep."""
    selected = []

    if not evaluation.get('evaluations'):
        print("  No evaluations in response")
        return selected

    print("\n  Results:")
    for eval_item in evaluation['evaluations']:
        photo_num = eval_item.get('photo', 0)
        score = eval_item.get('score', 0)
        reason = eval_item.get('reason', 'No reason provided')
        keep = eval_item.get('keep', 'NO').upper()

        if 1 <= photo_num <= len(image_paths):
            img_path = image_paths[photo_num - 1]
            img_name = Path(img_path).name

            status = " KEEP" if keep == "YES" else " Skip"
            print(f"  [{status}] {img_name}: {score}/10 - {reason}")

            if keep == "YES":
                selected.append(img_path)

    if evaluation.get('summary'):
        print(f"\n  Summary: {evaluation['summary']}")

    return selected


def copy_selected_photos(selected_photos: List[str], destination_folder: str):
    """Copy selected photos to the destination folder."""
    os.makedirs(destination_folder, exist_ok=True)

    for photo_path in selected_photos:
        filename = Path(photo_path).name
        dest_path = Path(destination_folder) / filename

        if not dest_path.exists():
            shutil.copy2(photo_path, dest_path)
            print(f"Copied: {filename}")
        else:
            print(f"Already exists: {filename}")


def main():
    """Main execution function."""
    print("=" * 70)
    print("Wedding Photo Selection Tool")
    print("Using LM Studio with qwen/qwen2.5-vl-7b model")
    print("=" * 70)

    # Get all images
    print(f"\nScanning folder: {IMAGES_FOLDER}")
    all_images = get_image_files(IMAGES_FOLDER)
    print(f"Found {len(all_images)} images")

    if not all_images:
        print("No images found!")
        return

    # Process in batches
    all_selected = []
    batch_num = 0

    for i in range(0, len(all_images), BATCH_SIZE):
        batch_num += 1
        batch = all_images[i:i + BATCH_SIZE]

        print(f"\n{'=' * 70}")
        print(f"Batch {batch_num}/{(len(all_images) + BATCH_SIZE - 1) // BATCH_SIZE}")
        print(f"{'=' * 70}")

        # Evaluate batch
        evaluation = evaluate_batch(batch)

        # Process results
        selected = process_evaluation(batch, evaluation)
        all_selected.extend(selected)

        print(f"\nSelected {len(selected)} photos from this batch")

    # Summary
    print(f"\n{'=' * 70}")
    print(f"FINAL RESULTS")
    print(f"{'=' * 70}")
    print(f"Total images evaluated: {len(all_images)}")
    print(f"Total images selected: {len(all_selected)}")
    print(f"Selection rate: {len(all_selected)/len(all_images)*100:.1f}%")

    # Copy selected photos
    if all_selected:
        print(f"\nCopying {len(all_selected)} selected photos to: {SELECTED_FOLDER}")
        copy_selected_photos(all_selected, SELECTED_FOLDER)
        print("\nDone!")
    else:
        print("\nNo photos were selected.")


if __name__ == "__main__":
    main()
