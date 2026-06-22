# LinguaKids — Project Roadmap

> **Project:** Trilingual Kids Learning App (English · Arabic · Urdu)  
> **Document Version:** 1.0 — 2026-06-22  
> **Timeline:** 18 months from kickoff to full public launch

---

## Roadmap Overview

```
Phase 0  │ Phase 1  │ Phase 2  │ Phase 3  │ Phase 4  │ Phase 5
Setup    │ MVP      │ Beta     │ Launch   │ Growth   │ Scale
Weeks    │ Months   │ Months   │ Month    │ Months   │ Months
1–4      │ 1–5      │ 6–9      │ 10       │ 11–14    │ 15–18
```

---

## Phase 0 — Project Setup & Pre-Production (Weeks 1–4)

**Goal:** Lay all foundations before writing a single line of product code.

### Team Assembly
- [ ] Hire/assign Flutter developer(s) (2 developers minimum)
- [ ] Hire UI/UX designer with RTL experience
- [ ] Contract native speaker voice artists (English × 2, Arabic × 2, Urdu × 2)
- [ ] Contract children's illustrator (culturally inclusive style)
- [ ] Engage Arabic language educator (content review)
- [ ] Engage Urdu language educator (content review)
- [ ] Engage child development consultant

### Legal & Compliance
- [ ] Register company / app entity
- [ ] COPPA compliance legal review
- [ ] UK GDPR-K / PDPA review (if targeting those markets)
- [ ] Draft Privacy Policy and Terms of Service for child users
- [ ] Apple Developer Account + Google Play Console setup
- [ ] Trademark search for app name

### Project Infrastructure
- [ ] Set up Git repository (monorepo: `apps/mobile`, `backend`, `cms`, `assets`)
- [ ] Configure CI/CD pipeline (GitHub Actions or Bitrise)
- [ ] Set up project management tool (Linear / Jira)
- [ ] Establish design system in Figma
- [ ] Configure development, staging, and production environments

### Content Planning
- [ ] Finalize Phase 1 word list (500 words across 12 categories)
- [ ] Define audio recording scripts for all 500 words × 3 languages
- [ ] Define illustration brief and art direction guide
- [ ] Define brand identity: app name, logo, color palette, mascot character

**Phase 0 Deliverable:** Signed contracts, project infrastructure live, content brief finalized, design system started.

---

## Phase 1 — MVP Development (Months 1–5)

**Goal:** Build a working, testable MVP with core flashcard and vocabulary features.

### Month 1 — Architecture & Design Foundation

**Engineering**
- [ ] Scaffold Flutter app (iOS + Android)
- [ ] Implement RTL/LTR layout switching system (core architecture decision)
- [ ] Integrate Nastaliq font (Noto Nastaliq Urdu) and Naskh font (Amiri/Scheherazade)
- [ ] Set up local SQLite database schema (words, decks, progress, user profiles)
- [ ] Set up backend skeleton: Node.js / Django + PostgreSQL
- [ ] Set up S3 + CloudFront CDN for media assets
- [ ] Authentication service: email/PIN parent login + child profile switching

**Design**
- [ ] Complete app wireframes (all screens)
- [ ] Complete high-fidelity Figma mockups: home, vocabulary browser, flashcard flip, quiz
- [ ] Design child avatar system (6–8 illustrated characters)
- [ ] Design mascot character (used throughout app for guidance)
- [ ] Design onboarding flow (parent setup → child profile creation)

**Content**
- [ ] Deliver first 100 illustrations (Animals + Colors + Numbers categories)
- [ ] Record first 100 words × 3 languages (audio assets)
- [ ] Language educator review: first batch approval

### Month 2 — Core Vocabulary Module

- [ ] Implement vocabulary browser: category grid → word list → word detail screen
- [ ] Word detail screen: image + word in all 3 languages + audio playback per language
- [ ] Implement transliteration display toggle
- [ ] Implement category filtering and search
- [ ] Connect to CDN for image and audio delivery
- [ ] Implement local caching for visited content (offline access)
- [ ] Build CMS: internal admin tool for adding/editing words (headless CMS or custom)

**Milestone:** Browse 100 words across 3 categories in all 3 languages with audio ✓

### Month 3 — Flashcard System

- [ ] Build flashcard flip UI (smooth 3D flip animation)
- [ ] Implement classic manual flip mode
- [ ] Implement auto-play slideshow mode with speed control
- [ ] Build pre-built decks by category
- [ ] Implement SRS algorithm (SM-2 or custom simplified version for kids)
- [ ] "Star/favourite" cards feature → personal review deck
- [ ] Parent flow: create custom flashcard deck
- [ ] Flashcard progress persistence (which cards seen, difficulty rating)

**Milestone:** Flashcard system functional with SRS for 100 words ✓

### Month 4 — Quiz & Mini-Games (Set 1)

- [ ] **Multiple Choice Quiz:** image shown → tap correct word (4 options)
- [ ] **Sound Match:** audio plays → tap matching image
- [ ] **Word Hunt:** tap correct object in illustrated scene (3–5 objects per scene)
- [ ] Result screen: score, encouragement, correct answers review
- [ ] Star reward system: earn stars per quiz completed
- [ ] Badge/achievement engine: first 5 achievement types
- [ ] Daily streak tracking + visual display

**Milestone:** 3 game modes playable end-to-end with rewards ✓

### Month 5 — User System, Parent Dashboard & Polish

- [ ] Parent account creation (email + password)
- [ ] Child profile creation (up to 2 per account for MVP)
- [ ] Parent dashboard: words learned, time spent, streaks per child
- [ ] Session time limit feature (parent sets max daily minutes)
- [ ] Child-lock PIN to exit app
- [ ] Onboarding flow (first-launch walkthroughs for parent and child)
- [ ] Push notifications: daily learning reminder (opt-in)
- [ ] App icon, splash screen, store assets
- [ ] Performance audit: animations at 60fps, cold launch < 3s
- [ ] Accessibility pass: touch targets, contrast ratios, font scaling

**Phase 1 Deliverable:** Internal MVP build — 100 words, 3 categories, flashcards, 3 mini-games, parent dashboard.

---

## Phase 2 — Beta Expansion (Months 6–9)

**Goal:** Expand content to full Phase 1 scope, onboard beta testers, iterate on UX.

### Month 6 — Content Expansion to 500 Words

- [ ] Deliver remaining 9 content categories (illustrations + audio)
- [ ] All 500 words live in app across 12 categories
- [ ] Phrases module: 60 phrases across 5 situational categories
- [ ] Phrase scene illustrations (at least 1 per phrase group)
- [ ] Alphabet module: English A–Z with phonics
- [ ] Language educator final review: all 500 words + 60 phrases approved

### Month 7 — Alphabet & Script Modules

- [ ] Arabic alphabet: 28 letters, initial/medial/final forms, audio, animated stroke order
- [ ] Urdu alphabet: 36 letters, Nastaliq rendering, audio
- [ ] Letter tracing mini-game (finger draw on screen)
- [ ] Letter quiz: hear sound → tap correct letter
- [ ] Integration of alphabet letters into existing vocabulary cards (highlight first letter)

### Month 8 — Additional Games & Sing-Along

- [ ] **Matching game:** drag word tile to matching image card
- [ ] **Missing Letter:** fill in the blank letter with tap keyboard
- [ ] **Story Time:** 5 micro-stories, illustrated, trilingual captions, tap-to-hear each word
- [ ] **Sing-Along Songs:** 4 nursery rhymes, karaoke-style trilingual lyric highlighting
- [ ] Progress Map: illustrated world/kingdom map showing unlocked zones per category
- [ ] Additional 10 achievement badges
- [ ] Avatar accessory shop (spend stars on hats, glasses, etc.)

### Month 9 — Closed Beta

- [ ] Recruit 50–100 beta families (target: English+Arabic, English+Urdu, trilingual households)
- [ ] Recruit 5–10 primary school teachers for classroom feedback
- [ ] Beta build distributed via TestFlight (iOS) + Google Play Internal Testing (Android)
- [ ] In-app feedback button for beta users
- [ ] Structured usability testing sessions (moderated, with children aged 3–10)
- [ ] Analytics integration: session length, drop-off points, feature usage (anonymised)
- [ ] Crash reporting: Sentry or Firebase Crashlytics
- [ ] Iterate on UX based on beta feedback (2 patch releases during beta period)
- [ ] Performance testing: memory usage, battery impact, large content set loading

**Phase 2 Deliverable:** Beta app with 500 words, full alphabet modules, 6 game types, sing-along, parent dashboard — tested with real families.

---

## Phase 3 — Pre-Launch & Launch (Month 10)

**Goal:** Ship to public app stores.

### Week 1–2 — Launch Preparation

- [ ] All beta feedback addressed (P0 and P1 bugs fixed)
- [ ] Legal: Privacy Policy, Terms of Service published at web URL
- [ ] App Store listing: screenshots (all device sizes), preview video, description (EN/AR/UR)
- [ ] Google Play listing: same assets
- [ ] App rating: complete Apple age rating questionnaire (target: 4+)
- [ ] COPPA-compliant parental consent flow final audit
- [ ] Security penetration test (auth endpoints, data storage)
- [ ] Load test backend: simulate 5,000 concurrent users
- [ ] Finalise subscription pricing model (see Monetisation below)

### Week 3 — Soft Launch

- [ ] Release to limited markets: UK, UAE, Pakistan (geo-restricted rollout)
- [ ] Monitor: crash rate < 0.5%, ANR rate < 0.2%
- [ ] Monitor: app store review flags or rejection issues
- [ ] Activate customer support channel (email)

### Week 4 — Full Public Launch

- [ ] Remove geo-restriction — worldwide availability
- [ ] Press release to parenting blogs and EdTech publications
- [ ] Outreach to language learning influencers / parent communities
- [ ] Submit to "App of the Day" / "Editors' Choice" nominations
- [ ] Monitor Day-1 / Day-7 retention metrics

**Phase 3 Deliverable:** App live on Apple App Store and Google Play globally.

---

## Phase 4 — Post-Launch Growth (Months 11–14)

**Goal:** Grow user base, improve retention, and add high-value features.

### Month 11 — Stability & Retention

- [ ] Address top user-reported issues (live crash/bug fixes)
- [ ] A/B test onboarding flow (2 variants)
- [ ] Weekly digest emails to parents (progress summary)
- [ ] Referral programme: share app → unlock bonus content pack
- [ ] App Store review prompts (after positive session milestone)

### Month 12 — Content Pack 2

- [ ] 250 new words across 6 new categories:
  - School Supplies, Sports, Professions, Celebrations, Plants & Flowers, Opposites
- [ ] 30 new phrases (greetings expanded, at school, at the doctor)
- [ ] 2 new sing-along songs
- [ ] 3 new micro-stories

### Month 13 — Teacher / Classroom Mode (Phase 2 Feature)

- [ ] Teacher account type
- [ ] Class roster: add students by code
- [ ] Assign specific decks or categories to the class
- [ ] Aggregate class progress view (anonymised per student)
- [ ] Printable flashcard export (PDF) for offline classroom use

### Month 14 — Speech & Pronunciation Feature

- [ ] Word-level audio recording by child
- [ ] Compare waveform to native speaker (visual feedback — no score pressure)
- [ ] Pronunciation encouragement system (not graded, always positive)
- [ ] Arabic phoneme guide with mouth diagrams
- [ ] Urdu phoneme guide

**Phase 4 Deliverable:** 750+ words, classroom mode, pronunciation feature, 10,000+ MAU target.

---

## Phase 5 — Scale & Platform Maturity (Months 15–18)

### Month 15–16 — Web App & Offline Content Packs

- [ ] Progressive Web App (PWA) version for desktop/Chromebook use in classrooms
- [ ] Downloadable content packs (full category downloads for offline use)
- [ ] Parental progress report export (PDF)
- [ ] Multi-language UI: Arabic and Urdu UI strings for parent dashboard

### Month 17 — AI-Assisted Personalisation

- [ ] Adaptive learning path: SRS data + quiz scores → personalised daily lesson suggestion
- [ ] "Today's Focus" feature: 3–5 cards most due for review + 1 new category item
- [ ] Difficulty auto-calibration per child

### Month 18 — Platform Review & Fourth Language Planning

- [ ] Full product audit: metrics review, NPS survey, content quality review
- [ ] Evaluate adding a 4th language (French / Farsi / Turkish — based on user demand data)
- [ ] Evaluate regional content packs (dialect variants for Arabic: Egyptian, Gulf, Levantine)
- [ ] Roadmap planning for Year 2

**Phase 5 Deliverable:** Web app live, 1,000+ words, AI-personalised learning, roadmap for Year 2.

---

## Monetisation Model

| Tier | Price | What's Included |
|---|---|---|
| **Free** | $0 | 50 words (sampler), 1 mini-game, no parent dashboard |
| **Monthly** | $4.99/month | Full app: all content, all games, parent dashboard, 1 child profile |
| **Annual** | $39.99/year (~$3.33/mo) | Same as monthly, 2 child profiles, 2 months free |
| **Family** | $59.99/year | Same as annual, 4 child profiles |
| **Classroom** | $99/year per class | Teacher mode, 30 student profiles, printable exports |

- 7-day free trial for all paid tiers (no credit card required)
- One-time content packs as optional IAP: $1.99 per category pack (Phase 2+)
- No ads — ever.

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Nastaliq font rendering issues on Android | High | High | Early prototype, test across 10+ devices in Phase 1 |
| RTL layout bugs at edge cases | High | Medium | Dedicated RTL QA checklist; hire RTL-experienced developer |
| Audio quality inconsistency across contractors | Medium | High | Standardised recording spec; sample approval before full session |
| App Store rejection (COPPA issues) | Medium | High | Legal review in Phase 0; follow Apple's child-safety guidelines strictly |
| Low Day-7 retention | Medium | High | Onboarding A/B test; streak + notification system from Day 1 |
| Content cultural inaccuracies | Low | High | Mandatory dual-educator review before any content goes live |
| Competitive app launches in same niche | Low | Medium | Differentiate on quality, cultural accuracy, and true trilingual support |
| Budget overrun on illustrations | Medium | Medium | Fix illustration style early; batch production contracts |

---

## Key Milestones Summary

| Milestone | Target Date |
|---|---|
| Project kickoff | Month 0 |
| Design system & wireframes complete | End of Week 4 |
| MVP internal build (100 words, 3 games) | End of Month 5 |
| Closed beta launch (500 words, full game set) | End of Month 9 |
| Public app store launch | End of Month 10 |
| 10,000 Monthly Active Users | Month 13 |
| Classroom mode live | Month 13 |
| Web app live | Month 16 |
| 1,000+ words in library | Month 17 |
| Year 2 roadmap finalized | Month 18 |

---

## Team Structure

```
Product Manager
├── Design Lead
│   └── UI/UX Designer (1–2)
├── Engineering Lead
│   ├── Flutter Developer (2)
│   ├── Backend Developer (1)
│   └── QA Engineer (1, from Month 3)
├── Content Lead
│   ├── Arabic Language Educator (contractor)
│   ├── Urdu Language Educator (contractor)
│   └── Child Development Consultant (part-time)
└── Creative Lead
    ├── Illustrator (contractor)
    └── Voice Artists × 6 (contractor)
```

---

## Definition of Done

A feature is **Done** when:
1. Implementation matches approved Figma design
2. RTL and LTR layouts both verified on iOS and Android
3. Tested on at least 2 iOS devices and 3 Android devices (different screen sizes)
4. No P0/P1 bugs open
5. Reviewed by language educator if it involves displayed text in Arabic or Urdu
6. Analytics event tracked for key interactions
7. Merged to `main` via reviewed PR; CI passing

---

*This roadmap is a living document. Review and update at the start of each phase.*
