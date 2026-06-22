# Trilingual Kids Learning App — Requirements

> **App Name (working title):** LinguaKids  
> **Target Languages:** English · Arabic (عربي) · Urdu (اردو)  
> **Target Audience:** Children aged 3–10  
> **Platforms:** iOS, Android (React Native or Flutter)  
> **Document Version:** 1.0 — 2026-06-22

---

## 1. Executive Summary

LinguaKids is a trilingual educational app designed for young learners from English, Arabic, and Urdu speaking households. It bridges all three languages simultaneously using image-based vocabulary, interactive flashcards, audio pronunciation, and gamified exercises — with full RTL (right-to-left) support for Arabic and Urdu scripts.

---

## 2. Competitive Landscape

### 2.1 Key Competitors Researched

| App | Languages | Flashcards | RTL Support | Age Focus | Weakness |
|---|---|---|---|---|---|
| **Dinolingo** | 50+ incl. Urdu | Yes | Partial | 2–14 | No true trilingual mode |
| **Mondly Kids** | 27 | No | Partial | 5–12 | No Urdu |
| **Duolingo ABC** | English only | No | No | 3–8 | Single language |
| **Alifbee Kids** | Arabic | Yes | Full | 4–12 | Arabic only |
| **Ling App** | 60+ incl. Urdu & Arabic | Yes | Yes | 10+ | Not designed for young children |
| **Rosetta Stone Kids** | 24+ | No | Partial | 6+ | Expensive, no Urdu |
| **Little Pim** | 10+ | No | No | 0–6 | Video-only, no interaction |

### 2.2 Market Gap Identified

No existing app simultaneously teaches **English + Arabic + Urdu** to children with:
- Child-friendly UX designed for ages 3–10
- Full RTL layout switching per language
- Parent dashboard with progress tracking
- Offline-capable content delivery
- Culturally relevant imagery (e.g., South Asian and MENA contexts)

---

## 3. Goals & Success Metrics

### 3.1 Primary Goals
- Help children aged 3–10 build vocabulary in all three languages simultaneously
- Provide a safe, ad-free, distraction-free environment
- Support both home use and classroom settings

### 3.2 Success Metrics (6 months post-launch)
- 10,000+ active monthly users
- Average session length ≥ 8 minutes
- Flashcard daily completion rate ≥ 60%
- Parent satisfaction rating ≥ 4.5/5 stars
- Child retention rate ≥ 40% week-over-week

---

## 4. Functional Requirements

### 4.1 Core Content Modules

#### 4.1.1 Vocabulary Library
- **Minimum 500 words** across categories at launch, expanding to 1,000+
- Every word displayed in all 3 languages simultaneously
- Each word linked to:
  - A high-quality, culturally inclusive illustration
  - Native speaker audio for all 3 languages
  - Transliteration for Arabic and Urdu (romanized phonetics) for beginner parents
- **Content Categories (Phase 1):**
  - Animals (حیوانات / حيوانات)
  - Colors (رنگ / ألوان)
  - Numbers 1–20 (گنتی / أرقام)
  - Shapes (اشکال / أشكال)
  - Body Parts (جسم کے حصے / أجزاء الجسم)
  - Food & Drinks (کھانا / طعام)
  - Family (خاندان / عائلة)
  - Household Objects (گھر کی چیزیں / أشياء المنزل)
  - Clothing (لباس / ملابس)
  - Nature & Weather (موسم / طبيعة)
  - Vehicles (سواریاں / مركبات)
  - Emotions (احساسات / مشاعر)

#### 4.1.2 Phrases & Sentences Module
- Common phrases grouped by situation:
  - Greetings & Farewells
  - Classroom phrases
  - At home / daily routines
  - Asking for things politely
- Each phrase shown with audio and illustrated scene
- Phrase complexity scaled by child's level (Beginner / Intermediate)

#### 4.1.3 Flashcard System
- **Flip animation:** front shows image + English word, back shows Arabic and Urdu equivalents
- **Study modes:**
  - Classic flip mode (manual)
  - Auto-play slideshow (with configurable speed)
  - Quiz mode: 4-option multiple choice (image → pick correct word)
  - Matching game: drag word tile to matching image
  - Spell-it mode (for ages 6+): tap letters to spell the word
- **Spaced Repetition System (SRS):** cards shown more frequently when marked "hard"
- Decks: pre-built by category + custom decks created by parents
- "Star" / favourite a card to add to personal review deck

#### 4.1.4 Alphabet & Script Modules
- English: A–Z with phonics audio
- Arabic: أ–ي (28 letters) with initial/medial/final forms
- Urdu: 36 Urdu letters (Nastaliq style) with pronunciation
- Letter tracing (finger drawing on screen) for each script

#### 4.1.5 Mini-Games & Activities
- **Word Hunt:** tap the correct object in a scene matching the spoken word
- **Sound Match:** hear word audio, select matching image card
- **Missing Letter:** fill in the blank letter of a word
- **Story Time:** simple 3–5 sentence illustrated micro-stories with highlighted trilingual captions
- **Sing-Along Songs:** nursery rhymes with trilingual lyrics and karaoke-style highlighting

### 4.2 Language & Localisation Requirements

| Requirement | Detail |
|---|---|
| **Script rendering** | Arabic Naskh font, Urdu Nastaliq font, standard Latin for English |
| **Text direction** | LTR for English; RTL for Arabic and Urdu — UI mirrors when these languages are active |
| **Audio** | Native speaker recordings (not TTS) for all content at launch |
| **Font requirements** | Amiri / Scheherazade (Arabic), Noto Nastaliq Urdu (Urdu), Nunito / Poppins (English) |
| **Numerals** | Option to display Arabic-Indic numerals (٣) alongside Western (3) |
| **Diacritics** | Arabic Tashkeel (short vowels / harakat) shown on all Arabic text for learners |

### 4.3 User Profiles & Accounts

#### 4.3.1 Child Profile
- Age, name, avatar (choose from illustrated characters)
- Primary language (the one they already know)
- Learning languages (the two being learned)
- Individual progress tracking per module and category

#### 4.3.2 Parent / Guardian Account
- Up to 4 child profiles per account
- Dashboard: time spent, words learned, streaks, weak areas
- Content controls: unlock/lock specific modules
- Session time limits with soft "time's up" notification to child
- Weekly progress email digest (optional)
- Child-lock: require PIN to exit app or access settings

#### 4.3.3 Teacher / Classroom Mode (Phase 2)
- Class roster management
- Assign specific decks or categories
- Aggregate class progress view

### 4.4 Gamification & Engagement

- **Daily Streak:** consecutive days of learning tracked with visual flame icon
- **Star Rewards:** earn stars per completed activity; spend on avatar accessories
- **Badges / Achievements:**
  - "First 10 Words," "Week Warrior," "Alphabet Master," etc.
- **Progress Maps:** illustrated world map showing unlocked content zones
- **Celebration Animations:** confetti / character dance on milestone completion
- No leaderboards (privacy, competition stress avoidance for young children)

### 4.5 Offline Support
- All purchased / downloaded content packs available offline
- Progress synced to cloud when connection restored
- Offline mode indicator shown clearly in UI

### 4.6 Accessibility Requirements
- Font size adjustable (3 sizes)
- High contrast mode
- All interactive elements have minimum 44×44pt touch targets
- All audio can be enabled/disabled independently
- No time pressure in core learning modes (timed only in optional games)
- Color choices pass WCAG 2.1 AA contrast ratios
- VoiceOver / TalkBack compatibility for parent settings screens

### 4.7 Safety & Privacy
- COPPA (US) and UK GDPR-K compliant
- No third-party ads
- No in-app chat or social features
- All third-party SDKs vetted for child data compliance
- Parental consent required for account creation
- Data deletion available on request
- Analytics: anonymised and aggregated only

---

## 5. Non-Functional Requirements

| Category | Requirement |
|---|---|
| **Performance** | App launch < 3 seconds; flashcard flip animation < 100ms |
| **Availability** | 99.5% uptime for cloud sync and content delivery |
| **Storage** | Base app < 100 MB; content packs ~50 MB each (downloadable) |
| **Scalability** | Support up to 100,000 concurrent users at launch target |
| **Security** | All API calls over HTTPS/TLS 1.3; JWT auth; no PII stored on device |
| **Compatibility** | iOS 14+, Android 9+ (API 28+) |
| **Localization** | All UI strings externalized; ready for additional language addition |

---

## 6. Content Requirements

### 6.1 Imagery Standards
- Illustrations in a consistent, warm, cartoon style (not photorealistic)
- Characters represent diverse ethnicities (South Asian, Arab, mixed)
- No culturally insensitive symbols or depictions
- Licensed or custom-illustrated (no stock photo dependencies)
- All image assets in vector (SVG) or high-res (300+ DPI) PNG

### 6.2 Audio Standards
- Recorded by native speakers (not AI/TTS) — 1 female + 1 male voice per language
- Child-paced delivery (slightly slower than natural speed)
- Recorded at 44.1 kHz, 16-bit minimum, stored as AAC/MP3 128 kbps
- Background music: calm, loopable, culturally neutral instrumental

### 6.3 Content Moderation
- All content reviewed by:
  - A certified Arabic language educator
  - A certified Urdu language educator
  - A child development specialist
- Re-review cycle: every 12 months

---

## 7. Technical Architecture (High-Level)

```
┌─────────────────────────────────────────────────────┐
│                    Mobile App                        │
│   React Native (or Flutter)                         │
│   ┌────────────┐ ┌──────────┐ ┌────────────────┐   │
│   │ UI Layer   │ │ Audio    │ │ Flashcard      │   │
│   │ RTL/LTR    │ │ Engine   │ │ SRS Engine     │   │
│   │ switching  │ │          │ │                │   │
│   └────────────┘ └──────────┘ └────────────────┘   │
│   ┌────────────────────────────────────────────┐   │
│   │          Local SQLite / Cache              │   │
│   └────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
              │ HTTPS / REST + WebSocket
┌─────────────────────────────────────────────────────┐
│                   Backend (API)                      │
│   Node.js + Express  OR  Django REST Framework      │
│   ┌──────────┐ ┌──────────┐ ┌────────────────────┐ │
│   │ Auth     │ │ Progress │ │ Content Management │ │
│   │ Service  │ │ Service  │ │ Service (CMS)      │ │
│   └──────────┘ └──────────┘ └────────────────────┘ │
└─────────────────────────────────────────────────────┘
              │
┌─────────────────────────────────────────────────────┐
│               Infrastructure                         │
│   PostgreSQL (user data) │ S3 / CDN (media assets)  │
│   Redis (session cache)  │ Firebase (push notifs)   │
└─────────────────────────────────────────────────────┘
```

### 7.1 Tech Stack Options

**Option A — React Native**
- Pros: single JS codebase, large ecosystem, fast prototyping
- Cons: RTL handling requires explicit care; Nastaliq font rendering can be tricky

**Option B — Flutter**
- Pros: excellent RTL support built-in, Nastaliq font via `google_fonts`, consistent cross-platform rendering
- Cons: Dart learning curve, smaller community than RN

**Recommendation:** Flutter — superior RTL and complex script support is critical for this app.

---

## 8. Out of Scope (v1.0)

- Speech recognition / pronunciation scoring
- AI-generated content
- Social features (friend lists, sharing)
- Web app version
- Writing/tracing exercises for Arabic and Urdu (deferred to Phase 2)
- Teacher classroom management portal
- More than 3 languages

---

## 9. Assumptions & Dependencies

- Native speaker audio recording contractors available for all 3 languages
- Illustration artists available with cultural competency in MENA/South Asian contexts
- Content reviewed and approved by qualified language educators before launch
- App store developer accounts (Apple Developer + Google Play) are active
- COPPA/privacy legal review completed before beta launch

---

## 10. Glossary

| Term | Definition |
|---|---|
| RTL | Right-to-Left — text direction used in Arabic and Urdu |
| LTR | Left-to-Right — text direction used in English |
| SRS | Spaced Repetition System — algorithm that schedules card reviews based on recall difficulty |
| Nastaliq | Calligraphic style used for Urdu script rendering |
| Naskh | Standard Arabic calligraphic style used in print/digital Arabic |
| Tashkeel | Arabic diacritical marks indicating short vowels, used to aid pronunciation |
| COPPA | Children's Online Privacy Protection Act (US federal law) |
| CMS | Content Management System — internal tool for managing app vocabulary and phrases |
