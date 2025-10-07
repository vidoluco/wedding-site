# JavaScript Configuration

## Security Setup

The `config.js` file contains sensitive API keys and URLs. To protect these:

### For Local Development:

1. **Copy the example config:**
   ```bash
   cp config.example.js config.js
   ```

2. **Fill in your actual values in `config.js`:**
   - Google Apps Script URL
   - EmailJS credentials
   - WhatsApp group invite link
   - Google Drive folder link

3. **Never commit `config.js`** - it's already in `.gitignore`

### Files:

- **`config.example.js`** - Template with placeholder values (safe to commit)
- **`config.js`** - Your actual config with real credentials (NEVER commit!)

### Important:

- The `config.js` file is already ignored by git
- The `apps-script/` folder is also ignored (contains deployment keys)
- Always use `config.example.js` as reference when sharing the repo
