/**
 * Multi-language Translation Manager
 * Supports English, Italian, and Indonesian
 *
 * Priority for language detection:
 * 1. URL parameter (?lang=it)
 * 2. localStorage (user preference)
 * 3. Browser language
 * 4. Default (English)
 */

class TranslationManager {
    constructor() {
        this.currentLanguage = 'en';
        this.supportedLanguages = ['en', 'it', 'id'];
        this.languageNames = {
            'en': 'English',
            'it': 'Italiano',
            'id': 'Indonesia'
        };

        // Embedded translations - no fetch() needed, works with file:// protocol
        this.translations = {
            "en": {
                "meta": {
                    "title": "Ludovico & Fidelia - Wedding",
                    "description": "Join us for the celebration of Ludovico & Fidelia's wedding. RSVP and get all the details about our special day."
                },
                "nav": {
                    "brand": "Ludovico & Fidelia",
                    "about": "About",
                    "details": "Details",
                    "rsvp": "RSVP"
                },
                "hero": {
                    "title": "Ludovico & Fidelia Are Getting Married!",
                    "subtitle": "Join Us for Our Celebration of Love",
                    "cta": "RSVP Now"
                },
                "saveTheDate": {
                    "title": "Save the Date!",
                    "date": "Friday, May 29th, 2026",
                    "year": "2026",
                    "venueName": "San Servolo Island",
                    "venueAddress": "Isola di San Servolo, Venice, Italy",
                    "eventDetailsBtn": "Event Details"
                },
                "ourStory": {
                    "title": "Our Story",
                    "text": "We came from different worlds, but somehow, in the middle of Romania, everything just clicked. From our first conversation, there was an ease between us—a spark that grew into countless shared moments, late-night talks, and adventures exploring life together. We've laughed through the chaos, supported each other through challenges, and built a love that feels like home. After years of growing together, we're ready to say \"I do.\" We're grateful to have you be part of our journey, and we can't wait to celebrate with the people who mean the most to us.",
                    "cta": "RSVP Now"
                },
                "details": {
                    "title": "Celebration Details",
                    "subtitle": "Everything you need to know for our special day",
                    "transport": {
                        "title": "Getting There",
                        "heading": "Getting to San Servolo Island",
                        "waterTaxi": "• Water taxi from Venice Marco Polo Airport (30 minutes)",
                        "vaporetto": "• Vaporetto Line 2 from Piazzale Roma (20 minutes)",
                        "privateBoat": "• Private boat transfers available (details upon RSVP)",
                        "returnHeading": "Return Transportation",
                        "returnInfo": "Arranged boats departing at event termination"
                    },
                    "attire": {
                        "title": "Attire",
                        "heading": "Attire: Dress to Impress!",
                        "intro": "Please join us in your favorite stylish and neat outfits. We can't wait to celebrate with you!",
                        "note": "(Please avoid white and light blue)"
                    },
                    "accommodations": {
                        "title": "Accommodations",
                        "heading": "Recommended Hotels in Venice:",
                        "addHere": "ADD HERE",
                        "mestre": "Mestre Hotels",
                        "veniceCity": "Venice city Hotels"
                    },
                    "gifts": {
                        "title": "Gifts & Appreciations",
                        "presenceGift": "Your presence is our greatest gift!",
                        "intro": "For those who wish to honor us with a contribution toward our future together:",
                        "monetary": "• A monetary gift would be graciously appreciated to help us establish our new home",
                        "howToContribute": "• Contributions can be made via Revolut or placed in an envelope at the celebration",
                        "bankDetailsHeading": "Romanian Leu Account Details:",
                        "beneficiary": "Beneficiary: Ludovico Cesaro & FIDELIA FIDELIA",
                        "iban": "IBAN: RO10 REVO 0000 2098 6240 2783",
                        "swift": "BIC / SWIFT code: REVOROBB",
                        "excited": "We're more excited to celebrate with you than receive anything else!"
                    },
                    "specialNotes": {
                        "title": "Special Notes",
                        "weatherTitle": "Weather in Venice (Late May)",
                        "weatherInfo": "Typically 20-25°C - Light jacket recommended for evening boat rides",
                        "dietaryTitle": "Dietary Needs",
                        "dietaryInfo": "Please specify any dietary requirements in the RSVP form"
                    },
                    "stayConnected": {
                        "title": "Stay Connected",
                        "whatsappHeading": "WhatsApp Wedding Group",
                        "whatsappInfo": "Join our wedding group chat for real-time updates and to connect with other guests!",
                        "whatsappLink": "📱 Join WhatsApp Group",
                        "driveHeading": "Google Drive Photo Album",
                        "driveInfo": "All wedding photos will be shared here. Feel free to upload your own photos too!",
                        "driveLink": "📸 Access Photo Album"
                    }
                },
                "rsvp": {
                    "title": "RSVP",
                    "subtitle": "Please confirm your attendance by December 31st, 2025",
                    "firstName": "First name",
                    "lastName": "Last name",
                    "email": "Email",
                    "phone": "Phone",
                    "attendance": "Will you be attending?",
                    "attendanceSelect": "Please select",
                    "attendanceYes": "Yes, I'll be there!",
                    "attendanceNo": "Sorry, can't make it",
                    "attendanceMaybe": "Not sure yet",
                    "dietary": "Dietary Restrictions",
                    "dietaryNone": "No restrictions",
                    "dietaryVegetarian": "Vegetarian",
                    "dietaryVegan": "Vegan",
                    "dietaryGlutenFree": "Gluten-free",
                    "dietaryHalal": "Halal",
                    "dietaryKosher": "Kosher",
                    "dietaryOther": "Other (please specify below)",
                    "message": "Additional Information",
                    "messagePlaceholder": "Guest names, special requests, dietary details if 'Other' selected...",
                    "submit": "Submit",
                    "required": "*"
                },
                "footer": {
                    "names": "Ludovico & Fidelia",
                    "location": "San Servolo Island",
                    "city": "Venice, Italy",
                    "copyright": "© 2026 Ludovico & Fidelia Wedding. San Servolo Island Wedding",
                    "credits": "ℹ️ Vibecoded with ❤️ by Ludovico & Claude"
                }
            },
            "it": {
                "meta": {
                    "title": "Ludovico & Fidelia - Matrimonio",
                    "description": "Unitevi a noi per celebrare il matrimonio di Ludovico & Fidelia. Confermate la vostra presenza e scoprite tutti i dettagli del nostro giorno speciale."
                },
                "nav": {
                    "brand": "Ludovico & Fidelia",
                    "about": "Chi Siamo",
                    "details": "Dettagli",
                    "rsvp": "Conferma"
                },
                "hero": {
                    "title": "Ludovico & Fidelia Si Sposano!",
                    "subtitle": "Unitevi a Noi per Celebrare il Nostro Amore",
                    "cta": "Conferma Presenza"
                },
                "saveTheDate": {
                    "title": "Segna la Data!",
                    "date": "Venerdì 29 Maggio 2026",
                    "year": "2026",
                    "venueName": "Isola di San Servolo",
                    "venueAddress": "Isola di San Servolo, Venezia, Italia",
                    "eventDetailsBtn": "Dettagli Evento"
                },
                "ourStory": {
                    "title": "La Nostra Storia",
                    "text": "Venivamo da mondi diversi, ma in qualche modo, nel mezzo della Romania, tutto è semplicemente scattato. Dalla nostra prima conversazione, c'era una facilità tra noi—una scintilla che è cresciuta in innumerevoli momenti condivisi, chiacchierate notturne e avventure esplorando la vita insieme. Abbiamo riso attraverso il caos, ci siamo sostenuti a vicenda nelle sfide, e abbiamo costruito un amore che si sente come casa. Dopo anni di crescita insieme, siamo pronti a dire \"sì, lo voglio.\" Siamo grati che tu faccia parte del nostro viaggio, e non vediamo l'ora di festeggiare con le persone che significano di più per noi.",
                    "cta": "Conferma Presenza"
                },
                "details": {
                    "title": "Dettagli della Celebrazione",
                    "subtitle": "Tutto ciò che vi serve sapere per il nostro giorno speciale",
                    "transport": {
                        "title": "Come Arrivare",
                        "heading": "Raggiungere l'Isola di San Servolo",
                        "waterTaxi": "• Taxi acqueo dall'Aeroporto Marco Polo di Venezia (30 minuti)",
                        "vaporetto": "• Vaporetto Linea 2 da Piazzale Roma (20 minuti)",
                        "privateBoat": "• Trasferimenti in barca privata disponibili (dettagli alla conferma)",
                        "returnHeading": "Trasporto di Ritorno",
                        "returnInfo": "Barche organizzate in partenza al termine dell'evento"
                    },
                    "attire": {
                        "title": "Abbigliamento",
                        "heading": "Abbigliamento: Vestiti per Impressionare!",
                        "intro": "Vi preghiamo di unirvi a noi nei vostri outfit più eleganti e curati. Non vediamo l'ora di festeggiare con voi!",
                        "note": "(Si prega di evitare bianco e azzurro)"
                    },
                    "accommodations": {
                        "title": "Sistemazioni",
                        "heading": "Hotel Consigliati a Venezia:",
                        "addHere": "DA AGGIUNGERE",
                        "mestre": "Hotel a Mestre",
                        "veniceCity": "Hotel nel centro di Venezia"
                    },
                    "gifts": {
                        "title": "Regali e Apprezzamenti",
                        "presenceGift": "La vostra presenza è il regalo più grande!",
                        "intro": "Per coloro che desiderano onorarci con un contributo per il nostro futuro insieme:",
                        "monetary": "• Un regalo in denaro sarebbe gradito per aiutarci a costruire la nostra nuova casa",
                        "howToContribute": "• I contributi possono essere effettuati tramite Revolut o inseriti in una busta durante la celebrazione",
                        "bankDetailsHeading": "Dettagli Conto in Lei Romeni:",
                        "beneficiary": "Beneficiario: Ludovico Cesaro & FIDELIA FIDELIA",
                        "iban": "IBAN: RO10 REVO 0000 2098 6240 2783",
                        "swift": "Codice BIC / SWIFT: REVOROBB",
                        "excited": "Siamo più entusiasti di festeggiare con voi che di ricevere qualsiasi altra cosa!"
                    },
                    "specialNotes": {
                        "title": "Note Speciali",
                        "weatherTitle": "Meteo a Venezia (Fine Maggio)",
                        "weatherInfo": "Tipicamente 20-25°C - Giacca leggera consigliata per le gite in barca serali",
                        "dietaryTitle": "Esigenze Alimentari",
                        "dietaryInfo": "Si prega di specificare eventuali requisiti dietetici nel modulo di conferma"
                    },
                    "stayConnected": {
                        "title": "Rimani Connesso",
                        "whatsappHeading": "Gruppo WhatsApp del Matrimonio",
                        "whatsappInfo": "Unitevi alla nostra chat di gruppo per aggiornamenti in tempo reale e per connettervi con gli altri ospiti!",
                        "whatsappLink": "📱 Unisciti al Gruppo WhatsApp",
                        "driveHeading": "Album Fotografico su Google Drive",
                        "driveInfo": "Tutte le foto del matrimonio saranno condivise qui. Sentitevi liberi di caricare anche le vostre foto!",
                        "driveLink": "📸 Accedi all'Album Fotografico",
                        "linksNote": "I link saranno inviati con l'email di conferma della vostra presenza"
                    }
                },
                "rsvp": {
                    "title": "Conferma Presenza",
                    "subtitle": "Si prega di confermare la vostra presenza entro il 31 Dicembre 2025",
                    "firstName": "Nome",
                    "lastName": "Cognome",
                    "email": "Email",
                    "phone": "Telefono",
                    "attendance": "Parteciperete?",
                    "attendanceSelect": "Seleziona",
                    "attendanceYes": "Sì, ci sarò!",
                    "attendanceNo": "Spiacente, non posso venire",
                    "attendanceMaybe": "Non sono ancora sicuro",
                    "dietary": "Restrizioni Alimentari",
                    "dietaryNone": "Nessuna restrizione",
                    "dietaryVegetarian": "Vegetariano",
                    "dietaryVegan": "Vegano",
                    "dietaryGlutenFree": "Senza glutine",
                    "dietaryHalal": "Halal",
                    "dietaryKosher": "Kosher",
                    "dietaryOther": "Altro (specificare sotto)",
                    "message": "Informazioni Aggiuntive",
                    "messagePlaceholder": "Nomi degli ospiti, richieste speciali, dettagli dietetici se 'Altro' selezionato...",
                    "submit": "Invia",
                    "required": "*"
                },
                "footer": {
                    "names": "Ludovico & Fidelia",
                    "location": "Isola di San Servolo",
                    "city": "Venezia, Italia",
                    "copyright": "© 2026 Matrimonio Ludovico & Fidelia. Matrimonio all'Isola di San Servolo",
                    "credits": "ℹ️ Vibecoded con ❤️ da Ludovico & Claude"
                }
            },
            "id": {
                "meta": {
                    "title": "Ludovico & Fidelia - Pernikahan",
                    "description": "Bergabunglah dengan kami untuk merayakan pernikahan Ludovico & Fidelia. Konfirmasi kehadiran Anda dan dapatkan semua detail tentang hari istimewa kami."
                },
                "nav": {
                    "brand": "Ludovico & Fidelia",
                    "about": "Tentang Kami",
                    "details": "Detail",
                    "rsvp": "Konfirmasi"
                },
                "hero": {
                    "title": "Ludovico & Fidelia Akan Menikah!",
                    "subtitle": "Bergabunglah dengan Kami untuk Merayakan Cinta Kami",
                    "cta": "Konfirmasi Kehadiran"
                },
                "saveTheDate": {
                    "title": "Simpan Tanggalnya!",
                    "date": "Jumat, 29 Mei 2026",
                    "year": "2026",
                    "venueName": "Pulau San Servolo",
                    "venueAddress": "Isola di San Servolo, Venesia, Italia",
                    "eventDetailsBtn": "Detail Acara"
                },
                "ourStory": {
                    "title": "Kisah Kami",
                    "text": "Kami datang dari dunia yang berbeda, tetapi entah bagaimana, di tengah-tengah Romania, semuanya langsung terasa pas. Dari percakapan pertama kami, ada ketenangan di antara kami—percikan yang tumbuh menjadi momen bersama yang tak terhitung, obrolan larut malam, dan petualangan menjelajahi hidup bersama. Kami telah tertawa melalui kekacauan, saling mendukung melalui tantangan, dan membangun cinta yang terasa seperti rumah. Setelah bertahun-tahun tumbuh bersama, kami siap untuk mengatakan \"aku bersedia.\" Kami bersyukur Anda menjadi bagian dari perjalanan kami, dan kami tidak sabar untuk merayakan dengan orang-orang yang paling berarti bagi kami.",
                    "cta": "Konfirmasi Kehadiran"
                },
                "details": {
                    "title": "Detail Perayaan",
                    "subtitle": "Semua yang perlu Anda ketahui untuk hari istimewa kami",
                    "transport": {
                        "title": "Cara Menuju Lokasi",
                        "heading": "Menuju Pulau San Servolo",
                        "waterTaxi": "• Taksi air dari Bandara Venice Marco Polo (30 menit)",
                        "vaporetto": "• Vaporetto Jalur 2 dari Piazzale Roma (20 menit)",
                        "privateBoat": "• Transfer perahu pribadi tersedia (detail setelah konfirmasi)",
                        "returnHeading": "Transportasi Kembali",
                        "returnInfo": "Perahu yang diatur berangkat pada akhir acara"
                    },
                    "attire": {
                        "title": "Pakaian",
                        "heading": "Pakaian: Berpakaian untuk Mengesankan!",
                        "intro": "Bergabunglah dengan kami dalam pakaian bergaya dan rapi favorit Anda. Kami tidak sabar untuk merayakan dengan Anda!",
                        "note": "(Harap hindari putih dan biru muda)"
                    },
                    "accommodations": {
                        "title": "Akomodasi",
                        "heading": "Hotel yang Direkomendasikan di Venesia:",
                        "addHere": "TAMBAHKAN DI SINI",
                        "mestre": "Hotel Mestre",
                        "veniceCity": "Hotel kota Venesia"
                    },
                    "gifts": {
                        "title": "Hadiah & Apresiasi",
                        "presenceGift": "Kehadiran Anda adalah hadiah terbesar kami!",
                        "intro": "Bagi mereka yang ingin menghormati kami dengan kontribusi untuk masa depan kami bersama:",
                        "monetary": "• Hadiah uang akan sangat kami hargai untuk membantu kami membangun rumah baru kami",
                        "howToContribute": "• Kontribusi dapat dilakukan melalui Revolut atau dimasukkan dalam amplop pada perayaan",
                        "bankDetailsHeading": "Detail Rekening Lei Rumania:",
                        "beneficiary": "Penerima: Ludovico Cesaro & FIDELIA FIDELIA",
                        "iban": "IBAN: RO10 REVO 0000 2098 6240 2783",
                        "swift": "Kode BIC / SWIFT: REVOROBB",
                        "excited": "Kami lebih bersemangat untuk merayakan dengan Anda daripada menerima apa pun!"
                    },
                    "specialNotes": {
                        "title": "Catatan Khusus",
                        "weatherTitle": "Cuaca di Venesia (Akhir Mei)",
                        "weatherInfo": "Biasanya 20-25°C - Jaket ringan disarankan untuk perjalanan perahu malam hari",
                        "dietaryTitle": "Kebutuhan Makanan",
                        "dietaryInfo": "Harap sebutkan persyaratan diet apa pun di formulir konfirmasi"
                    },
                    "stayConnected": {
                        "title": "Tetap Terhubung",
                        "whatsappHeading": "Grup WhatsApp Pernikahan",
                        "whatsappInfo": "Bergabunglah dengan grup obrolan pernikahan kami untuk pembaruan real-time dan terhubung dengan tamu lainnya!",
                        "whatsappLink": "📱 Bergabung dengan Grup WhatsApp",
                        "driveHeading": "Album Foto Google Drive",
                        "driveInfo": "Semua foto pernikahan akan dibagikan di sini. Jangan ragu untuk mengunggah foto Anda sendiri juga!",
                        "driveLink": "📸 Akses Album Foto",
                        "linksNote": "Tautan akan dikirimkan dengan email konfirmasi kehadiran Anda"
                    }
                },
                "rsvp": {
                    "title": "Konfirmasi Kehadiran",
                    "subtitle": "Harap konfirmasi kehadiran Anda sebelum 31 Desember 2025",
                    "firstName": "Nama depan",
                    "lastName": "Nama belakang",
                    "email": "Email",
                    "phone": "Telepon",
                    "attendance": "Apakah Anda akan hadir?",
                    "attendanceSelect": "Silakan pilih",
                    "attendanceYes": "Ya, saya akan hadir!",
                    "attendanceNo": "Maaf, tidak bisa hadir",
                    "attendanceMaybe": "Belum yakin",
                    "dietary": "Pembatasan Diet",
                    "dietaryNone": "Tanpa pembatasan",
                    "dietaryVegetarian": "Vegetarian",
                    "dietaryVegan": "Vegan",
                    "dietaryGlutenFree": "Bebas gluten",
                    "dietaryHalal": "Halal",
                    "dietaryKosher": "Kosher",
                    "dietaryOther": "Lainnya (harap sebutkan di bawah)",
                    "message": "Informasi Tambahan",
                    "messagePlaceholder": "Nama tamu, permintaan khusus, detail diet jika 'Lainnya' dipilih...",
                    "submit": "Kirim",
                    "required": "*"
                },
                "footer": {
                    "names": "Ludovico & Fidelia",
                    "location": "Pulau San Servolo",
                    "city": "Venesia, Italia",
                    "copyright": "© 2026 Pernikahan Ludovico & Fidelia. Pernikahan Pulau San Servolo",
                    "credits": "ℹ️ Vibecoded dengan ❤️ oleh Ludovico & Claude"
                }
            }
        };
    }

    /**
     * Initialize the translation system
     */
    init() {
        try {
            // Detect and apply the appropriate language
            const detectedLang = this.detectLanguage();
            if (detectedLang !== 'en') {
                this.applyTranslations(detectedLang);
            }

            // Create language switcher UI
            this.createLanguageSwitcher();

            console.log(`Translation system initialized. Current language: ${this.currentLanguage}`);
        } catch (error) {
            console.error('Failed to initialize translation system:', error);
        }
    }

    /**
     * Detect the user's preferred language
     * Priority: URL param → localStorage → browser → default (en)
     */
    detectLanguage() {
        // 1. Check URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && this.supportedLanguages.includes(urlLang)) {
            this.currentLanguage = urlLang;
            // Save to localStorage for future visits
            localStorage.setItem('wedding-language', urlLang);
            return urlLang;
        }

        // 2. Check localStorage (user's previous choice)
        const savedLang = localStorage.getItem('wedding-language');
        if (savedLang && this.supportedLanguages.includes(savedLang)) {
            this.currentLanguage = savedLang;
            return savedLang;
        }

        // 3. Check browser language
        const browserLang = navigator.language.split('-')[0];
        if (this.supportedLanguages.includes(browserLang)) {
            this.currentLanguage = browserLang;
            return browserLang;
        }

        // 4. Default to English
        this.currentLanguage = 'en';
        return 'en';
    }

    /**
     * Apply translations to the entire page
     */
    applyTranslations(lang) {
        if (!this.translations[lang]) {
            console.warn(`Translations for ${lang} not available, using English`);
            lang = 'en';
        }

        this.currentLanguage = lang;
        const t = this.translations[lang];

        // Update meta tags
        this.updateMeta(t);

        // Update navigation
        this.updateNavigation(t);

        // Update hero section
        this.updateHero(t);

        // Update Save the Date section
        this.updateSaveTheDate(t);

        // Update Our Story section
        this.updateOurStory(t);

        // Update Celebration Details section
        this.updateDetails(t);

        // Update RSVP form
        this.updateRSVPForm(t);

        // Update footer
        this.updateFooter(t);

        // Update active language button
        this.updateLanguageButtons();
    }

    /**
     * Update meta tags
     */
    updateMeta(t) {
        document.title = t.meta.title;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', t.meta.description);
        }
        document.documentElement.lang = this.currentLanguage;
    }

    /**
     * Update navigation
     */
    updateNavigation(t) {
        const navBrand = document.querySelector('.nav-brand a');
        if (navBrand) navBrand.textContent = t.nav.brand;

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks[0].textContent = t.nav.about;
        navLinks[1].textContent = t.nav.details;
        navLinks[2].textContent = t.nav.rsvp;
    }

    /**
     * Update hero section
     */
    updateHero(t) {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.innerHTML = t.hero.title.replace('&', '<span class="ampersand">&</span>').replace('Are', 'Are<br>');
        }

        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) heroSubtitle.textContent = t.hero.subtitle;

        const heroCTA = document.querySelector('.hero .cta-button');
        if (heroCTA) heroCTA.textContent = t.hero.cta;
    }

    /**
     * Update Save the Date section
     */
    updateSaveTheDate(t) {
        const dateCard = document.querySelector('.date-card');
        if (!dateCard) return;

        const dateCardH2 = dateCard.querySelector('h2');
        if (dateCardH2) dateCardH2.textContent = t.saveTheDate.title;

        const dateLine = dateCard.querySelector('.date-line');
        if (dateLine) dateLine.textContent = t.saveTheDate.date;

        const year = dateCard.querySelector('.year');
        if (year) year.textContent = t.saveTheDate.year;

        const venueName = dateCard.querySelector('.venue-name');
        if (venueName) venueName.textContent = t.saveTheDate.venueName;

        const venueAddress = dateCard.querySelector('.venue-address');
        if (venueAddress) venueAddress.textContent = t.saveTheDate.venueAddress;

        const eventDetailsBtn = dateCard.querySelector('.cta-button');
        if (eventDetailsBtn) eventDetailsBtn.textContent = t.saveTheDate.eventDetailsBtn;
    }

    /**
     * Update Our Story section
     */
    updateOurStory(t) {
        const storyTitle = document.querySelector('.our-story h2');
        if (storyTitle) storyTitle.textContent = t.ourStory.title;

        const storyText = document.querySelector('.story-text');
        if (storyText) storyText.textContent = t.ourStory.text;

        const storyCTA = document.querySelector('.our-story .cta-button');
        if (storyCTA) storyCTA.textContent = t.ourStory.cta;
    }

    /**
     * Update Celebration Details section
     */
    updateDetails(t) {
        const detailsTitle = document.querySelector('.details-title');
        if (detailsTitle) detailsTitle.textContent = t.details.title;

        const detailsSubtitle = document.querySelector('.details-subtitle');
        if (detailsSubtitle) detailsSubtitle.textContent = t.details.subtitle;

        // Update each detail card
        this.updateTransportCard(t);
        this.updateAttireCard(t);
        this.updateAccommodationsCard(t);
        this.updateGiftsCard(t);
        this.updateSpecialNotesCard(t);
        this.updateStayConnectedCard(t);
    }

    /**
     * Update Transport detail card
     */
    updateTransportCard(t) {
        const card = document.querySelector('#transport');
        if (!card) return;

        const header = card.previousElementSibling.querySelector('h3');
        if (header) header.textContent = t.details.transport.title;

        const h4s = card.querySelectorAll('h4');
        if (h4s[0]) h4s[0].textContent = t.details.transport.heading;
        if (h4s[1]) h4s[1].textContent = t.details.transport.returnHeading;

        const paragraphs = card.querySelectorAll('p');
        if (paragraphs[0]) paragraphs[0].textContent = t.details.transport.waterTaxi;
        if (paragraphs[1]) paragraphs[1].textContent = t.details.transport.vaporetto;
        if (paragraphs[2]) paragraphs[2].textContent = t.details.transport.privateBoat;
        if (paragraphs[3]) paragraphs[3].textContent = t.details.transport.returnInfo;
    }

    /**
     * Update Attire card
     */
    updateAttireCard(t) {
        const card = document.querySelector('#attire');
        if (!card) return;

        const header = card.previousElementSibling.querySelector('h3');
        if (header) header.textContent = t.details.attire.title;

        const h4 = card.querySelector('h4');
        if (h4) h4.textContent = t.details.attire.dressCode;

        const paragraphs = card.querySelectorAll('p');
        const strongs = card.querySelectorAll('strong');

        if (strongs[0]) strongs[0].textContent = t.details.attire.ladies;
        if (paragraphs[0]) {
            paragraphs[0].innerHTML = `<strong>${t.details.attire.ladies}</strong> ${t.details.attire.ladiesDetails}`;
        }

        if (strongs[1]) strongs[1].textContent = t.details.attire.gentlemen;
        if (paragraphs[1]) {
            paragraphs[1].innerHTML = `<strong>${t.details.attire.gentlemen}</strong> ${t.details.attire.gentlemanDetails}`;
        }

        if (paragraphs[2]) {
            paragraphs[2].innerHTML = `<em>${t.details.attire.note}</em>`;
        }
    }

    /**
     * Update Accommodations card
     */
    updateAccommodationsCard(t) {
        const card = document.querySelector('#hotels');
        if (!card) return;

        const header = card.previousElementSibling.querySelector('h3');
        if (header) header.textContent = t.details.accommodations.title;

        const h4 = card.querySelector('h4');
        if (h4) h4.textContent = t.details.accommodations.heading;

        const paragraphs = card.querySelectorAll('p');
        if (paragraphs[0]) paragraphs[0].textContent = t.details.accommodations.addHere;
        if (paragraphs[1]) paragraphs[1].textContent = t.details.accommodations.mestre;
        if (paragraphs[2]) paragraphs[2].textContent = t.details.accommodations.veniceCity;
    }

    /**
     * Update Gifts card
     */
    updateGiftsCard(t) {
        const card = document.querySelector('#gifts');
        if (!card) return;

        const header = card.previousElementSibling.querySelector('h3');
        if (header) header.textContent = t.details.gifts.title;

        const paragraphs = card.querySelectorAll('p');
        const strongs = card.querySelectorAll('strong');

        if (strongs[0]) strongs[0].textContent = t.details.gifts.presenceGift;
        if (paragraphs[0]) {
            paragraphs[0].innerHTML = `<strong>${t.details.gifts.presenceGift}</strong>`;
        }

        if (paragraphs[1]) paragraphs[1].textContent = t.details.gifts.intro;
        if (paragraphs[2]) paragraphs[2].textContent = t.details.gifts.monetary;
        if (paragraphs[3]) paragraphs[3].textContent = t.details.gifts.howToContribute;
        if (paragraphs[4]) paragraphs[4].textContent = t.details.gifts.bomboniere;
        if (paragraphs[5]) {
            paragraphs[5].innerHTML = `<em>${t.details.gifts.excited}</em>`;
        }
    }

    /**
     * Update Special Notes card
     */
    updateSpecialNotesCard(t) {
        const card = document.querySelector('#notes');
        if (!card) return;

        const header = card.previousElementSibling.querySelector('h3');
        if (header) header.textContent = t.details.specialNotes.title;

        const h4s = card.querySelectorAll('h4');
        if (h4s[0]) h4s[0].textContent = t.details.specialNotes.weatherTitle;
        if (h4s[1]) h4s[1].textContent = t.details.specialNotes.dietaryTitle;

        const paragraphs = card.querySelectorAll('p');
        if (paragraphs[0]) paragraphs[0].textContent = t.details.specialNotes.weatherInfo;
        if (paragraphs[1]) paragraphs[1].textContent = t.details.specialNotes.dietaryInfo;
    }

    /**
     * Update Stay Connected card
     */
    updateStayConnectedCard(t) {
        const card = document.querySelector('#connected');
        if (!card) return;

        const header = card.previousElementSibling.querySelector('h3');
        if (header) header.textContent = t.details.stayConnected.title;

        const h4s = card.querySelectorAll('h4');
        if (h4s[0]) h4s[0].textContent = t.details.stayConnected.whatsappHeading;
        if (h4s[1]) h4s[1].textContent = t.details.stayConnected.driveHeading;

        const paragraphs = card.querySelectorAll('p');
        if (paragraphs[0]) paragraphs[0].textContent = t.details.stayConnected.whatsappInfo;
        if (paragraphs[2]) paragraphs[2].textContent = t.details.stayConnected.driveInfo;
        if (paragraphs[4]) {
            paragraphs[4].innerHTML = `<em>${t.details.stayConnected.linksNote}</em>`;
        }

        const links = card.querySelectorAll('a');
        if (links[0]) {
            links[0].innerHTML = t.details.stayConnected.whatsappLink;
        }
        if (links[1]) {
            links[1].innerHTML = t.details.stayConnected.driveLink;
        }
    }

    /**
     * Update RSVP form
     */
    updateRSVPForm(t) {
        const rsvpTitle = document.querySelector('.contact h2');
        if (rsvpTitle) rsvpTitle.textContent = t.rsvp.title;

        const rsvpSubtitle = document.querySelector('.contact p');
        if (rsvpSubtitle) rsvpSubtitle.textContent = t.rsvp.subtitle;

        // Update form labels
        const labels = document.querySelectorAll('.contact-form label');
        if (labels[0]) labels[0].innerHTML = `${t.rsvp.firstName} ${t.rsvp.required}`;
        if (labels[1]) labels[1].innerHTML = `${t.rsvp.lastName} ${t.rsvp.required}`;
        if (labels[2]) labels[2].innerHTML = `${t.rsvp.email} ${t.rsvp.required}`;
        if (labels[3]) labels[3].textContent = t.rsvp.phone;
        if (labels[4]) labels[4].innerHTML = `${t.rsvp.attendance} ${t.rsvp.required}`;
        if (labels[5]) labels[5].textContent = t.rsvp.dietary;
        if (labels[6]) labels[6].textContent = t.rsvp.message;

        // Update attendance select options
        const attendanceSelect = document.querySelector('#attendance');
        if (attendanceSelect) {
            const options = attendanceSelect.querySelectorAll('option');
            if (options[0]) options[0].textContent = t.rsvp.attendanceSelect;
            if (options[1]) options[1].textContent = t.rsvp.attendanceYes;
            if (options[2]) options[2].textContent = t.rsvp.attendanceNo;
            if (options[3]) options[3].textContent = t.rsvp.attendanceMaybe;
        }

        // Update dietary select options
        const dietarySelect = document.querySelector('#dietary');
        if (dietarySelect) {
            const options = dietarySelect.querySelectorAll('option');
            if (options[0]) options[0].textContent = t.rsvp.dietaryNone;
            if (options[1]) options[1].textContent = t.rsvp.dietaryVegetarian;
            if (options[2]) options[2].textContent = t.rsvp.dietaryVegan;
            if (options[3]) options[3].textContent = t.rsvp.dietaryGlutenFree;
            if (options[4]) options[4].textContent = t.rsvp.dietaryHalal;
            if (options[5]) options[5].textContent = t.rsvp.dietaryKosher;
            if (options[6]) options[6].textContent = t.rsvp.dietaryOther;
        }

        // Update message placeholder
        const messageField = document.querySelector('#message');
        if (messageField) {
            messageField.setAttribute('placeholder', t.rsvp.messagePlaceholder);
        }

        // Update submit button
        const submitButton = document.querySelector('.submit-button');
        if (submitButton) submitButton.textContent = t.rsvp.submit;
    }

    /**
     * Update footer
     */
    updateFooter(t) {
        const footerH3 = document.querySelector('.footer-left h3');
        if (footerH3) footerH3.textContent = t.footer.names;

        const footerContact = document.querySelector('.footer-contact');
        if (footerContact) {
            const paragraphs = footerContact.querySelectorAll('p');
            if (paragraphs[0]) {
                paragraphs[0].innerHTML = `${t.footer.location}<br>${t.footer.city}`;
            }
        }

        const footerBottom = document.querySelector('.footer-bottom');
        if (footerBottom) {
            const paragraphs = footerBottom.querySelectorAll('p');
            if (paragraphs[0]) paragraphs[0].textContent = t.footer.copyright;
            if (paragraphs[1]) paragraphs[1].textContent = t.footer.credits;
        }
    }

    /**
     * Create language switcher UI
     */
    createLanguageSwitcher() {
        // Create switcher container
        const switcher = document.createElement('div');
        switcher.className = 'language-switcher';
        switcher.innerHTML = `
            <button class="lang-btn ${this.currentLanguage === 'en' ? 'active' : ''}" data-lang="en">EN</button>
            <span class="lang-divider">|</span>
            <button class="lang-btn ${this.currentLanguage === 'it' ? 'active' : ''}" data-lang="it">IT</button>
            <span class="lang-divider">|</span>
            <button class="lang-btn ${this.currentLanguage === 'id' ? 'active' : ''}" data-lang="id">ID</button>
        `;

        // Add to navigation
        const navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            navContainer.appendChild(switcher);
        }

        // Add click event listeners
        const langButtons = switcher.querySelectorAll('.lang-btn');
        langButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const lang = e.target.getAttribute('data-lang');
                this.switchLanguage(lang);
            });
        });

        // Add styles
        this.addLanguageSwitcherStyles();
    }

    /**
     * Switch to a different language
     */
    switchLanguage(lang) {
        if (!this.supportedLanguages.includes(lang)) {
            console.warn(`Language ${lang} not supported`);
            return;
        }

        // Save preference
        localStorage.setItem('wedding-language', lang);

        // Apply translations
        this.applyTranslations(lang);
    }

    /**
     * Update active language button state
     */
    updateLanguageButtons() {
        const buttons = document.querySelectorAll('.lang-btn');
        buttons.forEach(btn => {
            const lang = btn.getAttribute('data-lang');
            if (lang === this.currentLanguage) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    /**
     * Add CSS styles for language switcher
     */
    addLanguageSwitcherStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .language-switcher {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-left: 40px;
                padding: 0 20px;
            }

            .lang-btn {
                background: none;
                border: none;
                color: #333;
                font-family: 'Montserrat', sans-serif;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                padding: 5px 10px;
                transition: all 0.3s ease;
                border-radius: 4px;
            }

            .lang-btn:hover {
                background-color: rgba(139, 69, 19, 0.1);
                color: #8B4513;
            }

            .lang-btn.active {
                color: #8B4513;
                font-weight: 600;
                background-color: rgba(139, 69, 19, 0.15);
            }

            .lang-divider {
                color: #ccc;
                font-size: 14px;
            }

            @media (max-width: 768px) {
                .language-switcher {
                    position: fixed;
                    top: 15px;
                    right: 60px;
                    left: auto;
                    transform: none;
                    z-index: 1001;
                    background: rgba(255, 255, 255, 0.95);
                    padding: 4px 8px;
                    border-radius: 15px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                    margin-left: 0;
                }

                .lang-btn {
                    font-size: 10px;
                    padding: 2px 4px;
                }

                .lang-divider {
                    font-size: 10px;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize translation system when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const translationManager = new TranslationManager();
        translationManager.init();
    });
} else {
    const translationManager = new TranslationManager();
    translationManager.init();
}
