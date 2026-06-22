# LinguaKids — User Stories

> **Version:** 1.1 — 2026-06-22  
> **Format:** As a [persona], I want to [action], so that [benefit].  
> **Priority:** 🔴 Must Have (P0) · 🟠 Should Have (P1) · 🟡 Nice to Have (P2)  
> **Status:** ✅ Implemented · 🔄 Partial · ⬜ Not Started  
> **Persona key:** Child (C) · Parent (P) · Teacher (T)

---

## Personas

| Persona | Description |
|---|---|
| **Aisha (Child, age 4)** | Pre-reader, learns through pictures and audio, needs zero-text navigation |
| **Zaid (Child, age 7)** | Can read basic English, curious, competitive about streaks and badges |
| **Sara (Parent)** | Bilingual mother (Arabic + English), wants kids to also learn Urdu, monitors screen time |
| **Usman (Parent)** | Urdu-speaking father, not tech-savvy, wants simple setup and progress reports |
| **Ms. Nadia (Teacher)** | Primary school teacher, manages a class of 25 kids aged 6–8 |

---

## Epic 1 — Onboarding & Account Setup

### Parent Account

| ID | Priority | Status | Story |
|---|---|---|---|
| US-001 | 🔴 | ✅ | As **Sara (Parent)**, I want to create an account with my email and a password, so that my children's progress is saved and synced across devices. |
| US-002 | 🔴 | ✅ | As **Usman (Parent)**, I want the signup flow to be available in English, Arabic, and Urdu, so that I can understand every step without needing translation help. |
| US-003 | 🔴 | ✅ | As **Sara (Parent)**, I want to give explicit consent to the app's privacy policy before creating a child profile, so that I know my child's data is protected. |
| US-004 | 🟠 | 🔄 | As **Sara (Parent)**, I want to log in using Google Sign-In, so that I don't have to remember a separate password. *(UI button placeholder ready; needs Firebase native setup)* |
| US-005 | 🟠 | 🔄 | As **Usman (Parent)**, I want to reset my password via email if I forget it, so that I can regain access without contacting support. *(Local flow done; email sending needs Firebase Auth)* |

### Child Profile Creation

| ID | Priority | Status | Story |
|---|---|---|---|
| US-006 | 🔴 | ✅ | As **Sara (Parent)**, I want to create up to 4 child profiles under my account, so that all my children have their own personalised learning space. |
| US-007 | 🔴 | ✅ | As **Sara (Parent)**, I want to enter my child's name and age when creating their profile, so that the app adjusts content difficulty appropriately. |
| US-008 | 🔴 | ✅ | As **Sara (Parent)**, I want to select my child's primary (known) language and the two languages they are learning, so that the app shows the right language layout for each session. |
| US-009 | 🔴 | ✅ | As **Aisha (Child, age 4)**, I want to pick a cute avatar character from a set of illustrated options, so that the app feels personal and mine. |
| US-010 | 🟠 | ✅ | As **Zaid (Child, age 7)**, I want to choose a username for my profile, so that my profile feels different from my sister's. |

### First Launch

| ID | Priority | Status | Story |
|---|---|---|---|
| US-011 | 🔴 | ✅ | As **Aisha (Child, age 4)**, I want a friendly mascot to guide me through the app the first time I open it, so that I know where to tap without needing to read. |
| US-012 | 🔴 | ✅ | As **Sara (Parent)**, I want a short parent-side walkthrough explaining the dashboard and controls, so that I can set up the app confidently before handing it to my child. |
| US-013 | 🟠 | ✅ | As **Usman (Parent)**, I want to skip the walkthrough and explore on my own, so that I'm not forced through screens I don't need. |

---

## Epic 2 — Vocabulary Learning

### Browsing & Discovery

| ID | Priority | Status | Story |
|---|---|---|---|
| US-014 | 🔴 | ✅ | As **Aisha (Child, age 4)**, I want to see a grid of colourful category pictures (Animals, Food, Colors, etc.), so that I can tap the one I want to explore without needing to read. |
| US-015 | 🔴 | ✅ | As **Zaid (Child, age 7)**, I want to browse a list of words inside a category, so that I can see all the words I have and haven't learned yet. |
| US-016 | 🔴 | ✅ | As **Aisha (Child, age 4)**, I want to tap a word card and hear it spoken aloud in all three languages, so that I learn the correct pronunciation without adult help. |
| US-017 | 🔴 | ✅ | As **Zaid (Child, age 7)**, I want to see the word written in English, Arabic, and Urdu on the same screen alongside a clear illustration, so that I can associate all three scripts with one image. |
| US-018 | 🟠 | ✅ | As **Sara (Parent)**, I want to see romanized transliteration under the Arabic and Urdu words, so that I can help my child sound out unfamiliar scripts. |
| US-019 | 🟠 | ✅ | As **Zaid (Child, age 7)**, I want to tap each language's word separately to hear only that language's audio, so that I can practice one language at a time. |
| US-020 | 🟡 | ⬜ | As **Zaid (Child, age 7)**, I want to search for a word by typing its name, so that I can quickly find a specific word I'm thinking of. |

### Word Detail & Audio

| ID | Priority | Status | Story |
|---|---|---|---|
| US-021 | 🔴 | ✅ | As **Aisha (Child, age 4)**, I want the audio to play automatically when I open a word card, so that I hear the word without needing to find a play button. |
| US-022 | 🟠 | ✅ | As **Sara (Parent)**, I want audio autoplay to be togglable in settings, so that my child can browse quietly during quiet time. |
| US-023 | 🟠 | ✅ | As **Zaid (Child, age 7)**, I want to tap a speaker icon to replay any language's audio as many times as I want, so that I can repeat the word until I feel confident. |

---

## Epic 3 — Flashcard System

### Viewing & Flipping

| ID | Priority | Status | Story |
|---|---|---|---|
| US-024 | 🔴 | ✅ | As **Aisha (Child, age 4)**, I want to see a big illustration on the front of a flashcard and tap it to flip and reveal the words in all three languages, so that I can play the reveal like a game. |
| US-025 | 🔴 | ✅ | As **Zaid (Child, age 7)**, I want to swipe left or right to move to the next or previous card, so that I can go through a deck at my own pace. |
| US-026 | 🔴 | ✅ | As **Zaid (Child, age 7)**, I want to mark a card as "Easy," "Okay," or "Hard" after reviewing it, so that hard words appear more often in my future sessions. |
| US-027 | 🟠 | ✅ | As **Aisha (Child, age 4)**, I want an auto-play mode where cards flip and advance by themselves, so that I can watch and listen without tapping. |
| US-028 | 🟠 | ⬜ | As **Sara (Parent)**, I want to control the auto-play speed (slow / normal / fast) in settings, so that the pace matches my child's age and ability. |

### Deck Management

| ID | Priority | Status | Story |
|---|---|---|---|
| US-029 | 🔴 | ✅ | As **Zaid (Child, age 7)**, I want to study pre-built decks organised by category (Animals, Colors, Numbers, etc.), so that I can focus on one topic at a time. |
| US-030 | 🟠 | ⬜ | As **Sara (Parent)**, I want to create a custom flashcard deck by selecting specific words, so that I can tailor study sessions to what my child's class is covering. |
| US-031 | 🟠 | ✅ | As **Zaid (Child, age 7)**, I want to star/favourite a word card, so that it gets added to my personal "Favourites" deck for quick review. |
| US-032 | 🟡 | ⬜ | As **Sara (Parent)**, I want to share a custom deck with another parent, so that we can use the same vocabulary set for playdates. |

### Spaced Repetition

| ID | Priority | Status | Story |
|---|---|---|---|
| US-033 | 🔴 | ✅ | As **Zaid (Child, age 7)**, I want the app to automatically show me words I find hard more often than words I know well, so that I improve faster without extra effort. |
| US-034 | 🟠 | 🔄 | As **Sara (Parent)**, I want to see which words my child has marked as "Hard," so that I can help practice those words offline. *(Data stored in SRS; dashboard UI not yet added)* |

---

## Epic 4 — Quizzes & Mini-Games

### Multiple Choice Quiz

| ID | Priority | Story |
|---|---|---|
| US-035 | 🔴 | As **Aisha (Child, age 4)**, I want to see an image and tap the correct word from four choices, so that I can test what I've learned in a simple, visual way. |
| US-036 | 🔴 | As **Zaid (Child, age 7)**, I want to choose which language the answer choices appear in (English / Arabic / Urdu), so that I can challenge myself in my weaker language. |
| US-037 | 🔴 | As **Aisha (Child, age 4)**, I want a happy animation and sound when I get an answer right, so that I feel encouraged to keep going. |
| US-038 | 🔴 | As **Aisha (Child, age 4)**, I want a gentle, non-scary response when I get an answer wrong (e.g., mascot shakes head kindly), so that I don't feel bad and want to try again. |
| US-039 | 🟠 | As **Zaid (Child, age 7)**, I want to see my score at the end of a quiz (e.g., 8/10), so that I know how well I did. |

### Sound Match Game

| ID | Priority | Story |
|---|---|---|
| US-040 | 🔴 | As **Aisha (Child, age 4)**, I want to hear a word spoken and then tap the matching image from a set of 4, so that I practice listening without needing to read. |
| US-041 | 🟠 | As **Zaid (Child, age 7)**, I want the app to randomly choose which language the audio plays in, so that I'm tested across all three languages. |

### Word Hunt Game

| ID | Priority | Story |
|---|---|---|
| US-042 | 🔴 | As **Aisha (Child, age 4)**, I want to explore a colourful illustrated scene (e.g., a kitchen) and tap the object whose name the mascot calls out, so that learning feels like an adventure. |
| US-043 | 🟠 | As **Zaid (Child, age 7)**, I want the spoken word to switch languages each round in Word Hunt, so that I practice listening in all three languages during the same game. |

### Matching Game

| ID | Priority | Story |
|---|---|---|
| US-044 | 🟠 | As **Zaid (Child, age 7)**, I want to drag word tiles to their matching image cards, so that I practice connecting written words to pictures. |
| US-045 | 🟠 | As **Zaid (Child, age 7)**, I want to choose whether the word tiles show English, Arabic, or Urdu, so that I can specifically practice reading the script I'm weakest in. |

### Missing Letter Game

| ID | Priority | Story |
|---|---|---|
| US-046 | 🟠 | As **Zaid (Child, age 7)**, I want to see a word with one letter missing and tap the correct letter from a small set of options, so that I practice spelling. |
| US-047 | 🟡 | As **Zaid (Child, age 7)**, I want the Missing Letter game to work in Arabic and Urdu as well, so that I practice all three scripts. |

### Story Time

| ID | Priority | Story |
|---|---|---|
| US-048 | 🟠 | As **Aisha (Child, age 4)**, I want to listen to short illustrated stories where each word lights up as it is spoken, so that I can follow along even though I can't fully read yet. |
| US-049 | 🟠 | As **Zaid (Child, age 7)**, I want to tap any word in a story to hear it said aloud in all three languages, so that I can learn new vocabulary in context. |
| US-050 | 🟡 | As **Sara (Parent)**, I want to set the story narration language (English / Arabic / Urdu), so that I can target the language my child needs the most practice in. |

### Sing-Along Songs

| ID | Priority | Story |
|---|---|---|
| US-051 | 🟠 | As **Aisha (Child, age 4)**, I want to watch nursery rhymes play with animated characters and see the words highlighted as they are sung, so that I learn through music and movement. |
| US-052 | 🟡 | As **Zaid (Child, age 7)**, I want to toggle which language's lyrics are shown while the song plays, so that I can follow along in the language I'm learning. |

---

## Epic 5 — Alphabet & Script Learning

| ID | Priority | Story |
|---|---|---|
| US-053 | 🔴 | As **Aisha (Child, age 4)**, I want to tap any letter in the English alphabet and hear its name and phonics sound, so that I learn letter-sound associations. |
| US-054 | 🔴 | As **Zaid (Child, age 7)**, I want to see the Arabic alphabet displayed with each letter's three forms (initial, medial, final), so that I understand how Arabic letters change shape in words. |
| US-055 | 🔴 | As **Zaid (Child, age 7)**, I want to see all Arabic letters with full Tashkeel (short vowel marks) so that I can read and pronounce them correctly from the start. |
| US-056 | 🔴 | As **Zaid (Child, age 7)**, I want to tap each Urdu letter and hear a native speaker pronounce it in Nastaliq script, so that I hear the correct sound for each letter. |
| US-057 | 🟠 | As **Aisha (Child, age 4)**, I want to trace a letter with my finger on screen and have the app show me if I'm drawing it correctly, so that I learn how to write each letter. |
| US-058 | 🟠 | As **Zaid (Child, age 7)**, I want to play a letter quiz (hear a sound → tap the correct letter), so that I can test my alphabet knowledge for all three scripts. |
| US-059 | 🟡 | As **Zaid (Child, age 7)**, I want to see which letter a vocabulary word starts with highlighted when I view a word card, so that alphabet learning connects to real words. |

---

## Epic 6 — Phrases & Sentences

| ID | Priority | Story |
|---|---|---|
| US-060 | 🔴 | As **Aisha (Child, age 4)**, I want to see illustrated scenes (e.g., greeting a friend) with the matching phrase shown below in all three languages, so that I learn useful phrases in context. |
| US-061 | 🔴 | As **Aisha (Child, age 4)**, I want to tap the scene to hear the phrase spoken in any language I choose, so that I can mimic the pronunciation. |
| US-062 | 🟠 | As **Zaid (Child, age 7)**, I want phrases grouped by situation (Greetings, At School, At Home, etc.), so that I can learn phrases relevant to my daily life. |
| US-063 | 🟡 | As **Sara (Parent)**, I want to mark certain phrases as "priority" in the parent dashboard, so that my child sees those phrases more frequently in their sessions. |

---

## Epic 7 — Gamification & Rewards

| ID | Priority | Story |
|---|---|---|
| US-064 | 🔴 | As **Zaid (Child, age 7)**, I want to earn stars for completing flashcard sessions and quizzes, so that I feel rewarded for my effort. |
| US-065 | 🔴 | As **Zaid (Child, age 7)**, I want to see a daily streak counter (flame icon) showing how many days in a row I've learned something, so that I'm motivated to open the app every day. |
| US-066 | 🔴 | As **Aisha (Child, age 4)**, I want a celebration animation (confetti, dancing mascot) when I finish an activity, so that completing a session feels exciting. |
| US-067 | 🟠 | As **Zaid (Child, age 7)**, I want to unlock achievement badges ("First 10 Words!", "Alphabet Master", "Week Warrior"), so that I have goals to work toward. |
| US-068 | 🟠 | As **Aisha (Child, age 4)**, I want to spend my earned stars to dress up my avatar with hats, glasses, and accessories, so that learning feels like playing a game. |
| US-069 | 🟠 | As **Zaid (Child, age 7)**, I want to see a visual progress map (illustrated world) where completing a category unlocks the next zone, so that I can see how far I've come. |
| US-070 | 🟡 | As **Zaid (Child, age 7)**, I want to see a summary of the words I learned in today's session on a "Well done!" end screen, so that I feel a sense of accomplishment. |

---

## Epic 8 — Parent Dashboard

### Progress Monitoring

| ID | Priority | Story |
|---|---|---|
| US-071 | 🔴 | As **Sara (Parent)**, I want to see a dashboard showing how many words each child has learned, their current streak, and total time spent, so that I can monitor their progress at a glance. |
| US-072 | 🔴 | As **Sara (Parent)**, I want to see a breakdown of progress per language (English / Arabic / Urdu separately), so that I know which language needs more attention. |
| US-073 | 🟠 | As **Usman (Parent)**, I want to see a list of words my child has marked as "Hard," so that I can help them practice those words in real life. |
| US-074 | 🟠 | As **Sara (Parent)**, I want to receive a weekly email summary of my child's progress, so that I stay informed without opening the app every day. |
| US-075 | 🟡 | As **Sara (Parent)**, I want to export my child's progress report as a PDF, so that I can share it with their teacher. |

### Controls & Safety

| ID | Priority | Story |
|---|---|---|
| US-076 | 🔴 | As **Sara (Parent)**, I want to set a daily session time limit for each child profile, so that my child doesn't spend too much time on the app. |
| US-077 | 🔴 | As **Sara (Parent)**, I want a child-lock PIN that must be entered to exit the app or access settings, so that my child can't change settings or exit during learning time. |
| US-078 | 🔴 | As **Usman (Parent)**, I want to lock specific content modules (e.g., hide Story Time until my child finishes Flashcards), so that I can guide my child's learning order. |
| US-079 | 🟠 | As **Sara (Parent)**, I want to toggle audio autoplay on or off for each child profile, so that I can control noise level depending on the situation. |
| US-080 | 🟠 | As **Sara (Parent)**, I want daily learning reminder notifications to be opt-in and configurable (time, days of week), so that reminders help rather than annoy. |
| US-081 | 🟠 | As **Sara (Parent)**, I want to manage up to 4 child profiles from a single parent account, so that all my children are covered under one subscription. |

### Custom Content

| ID | Priority | Story |
|---|---|---|
| US-082 | 🟠 | As **Sara (Parent)**, I want to create a custom flashcard deck by selecting words from the vocabulary library, so that I can align the app with what my child is learning at school. |
| US-083 | 🟡 | As **Sara (Parent)**, I want to add my own word (with a custom image and audio note I record) to a custom deck, so that I can include family-specific words like relatives' names. |

---

## Epic 9 — Offline Support

| ID | Priority | Story |
|---|---|---|
| US-084 | 🔴 | As **Sara (Parent)**, I want to download a content category for offline use, so that my child can learn during flights or when there is no internet connection. |
| US-085 | 🔴 | As **Zaid (Child, age 7)**, I want my progress (stars earned, cards reviewed, streak) to be saved locally and synced to the cloud when I reconnect, so that nothing is lost when I go offline. |
| US-086 | 🟠 | As **Aisha (Child, age 4)**, I want the app to clearly tell me (with a simple icon, not text) when I am in offline mode, so that I know why some new content might not load. |

---

## Epic 10 — Accessibility

| ID | Priority | Story |
|---|---|---|
| US-087 | 🔴 | As **Sara (Parent)**, I want to increase the font size across the app in settings, so that my child with mild visual difficulty can read comfortably. |
| US-088 | 🔴 | As **Sara (Parent)**, I want to enable a high-contrast display mode, so that the app is usable for children with visual impairments. |
| US-089 | 🔴 | As **Aisha (Child, age 4)**, I want all interactive buttons to be large enough to tap easily with small fingers, so that I'm not frustrated by missing small targets. |
| US-090 | 🟠 | As **Sara (Parent)**, I want the parent settings screens to be fully compatible with my phone's screen reader (VoiceOver / TalkBack), so that I can navigate settings without visual difficulty. |
| US-091 | 🟠 | As **Sara (Parent)**, I want to turn off all background music independently of voice audio, so that my child can focus on pronunciation without distraction. |

---

## Epic 11 — RTL & Multilingual UI

| ID | Priority | Story |
|---|---|---|
| US-092 | 🔴 | As **Usman (Parent)**, I want the entire parent dashboard UI to display in Urdu (RTL layout) when I select Urdu as my preferred language, so that I can understand all settings and reports in my native language. |
| US-093 | 🔴 | As **Sara (Parent)**, I want the app's UI to display in Arabic (RTL layout) when I select Arabic, so that navigation feels natural to me as an Arabic speaker. |
| US-094 | 🔴 | As **Zaid (Child, age 7)**, I want Arabic text to always display in Naskh font with full Tashkeel, so that I can correctly read and pronounce every word. |
| US-095 | 🔴 | As **Zaid (Child, age 7)**, I want Urdu text to always display in the Nastaliq style, so that the script looks authentic and matches what I see in Urdu books. |
| US-096 | 🟠 | As **Zaid (Child, age 7)**, I want to toggle romanized transliteration (phonetic pronunciation in Latin letters) on or off for Arabic and Urdu words, so that I can challenge myself to read without help as I improve. |

---

## Epic 12 — Teacher / Classroom Mode *(Phase 2)*

| ID | Priority | Story |
|---|---|---|
| US-097 | 🟡 | As **Ms. Nadia (Teacher)**, I want to create a teacher account and set up a class roster, so that I can manage my students' learning from one place. |
| US-098 | 🟡 | As **Ms. Nadia (Teacher)**, I want to assign a specific vocabulary deck or category to my whole class, so that every student practises the same content this week. |
| US-099 | 🟡 | As **Ms. Nadia (Teacher)**, I want to view an anonymised progress overview for my class (% of words learned, average streak), so that I can identify which students need extra support. |
| US-100 | 🟡 | As **Ms. Nadia (Teacher)**, I want to export a printable PDF flashcard set from any deck, so that I can use physical cards for classroom activities without needing devices. |
| US-101 | 🟡 | As **Ms. Nadia (Teacher)**, I want to invite students to my class via a simple 6-character code, so that setup is quick and doesn't require students to share any personal details. |

---

## Epic 13 — Subscription & Payments

| ID | Priority | Story |
|---|---|---|
| US-102 | 🔴 | As **Sara (Parent)**, I want to try the app for 7 days for free without entering a payment method, so that I can decide if it is right for my children before committing. |
| US-103 | 🔴 | As **Sara (Parent)**, I want to subscribe monthly or annually and manage my subscription entirely within the app, so that I don't need to visit a website. |
| US-104 | 🔴 | As **Usman (Parent)**, I want to cancel my subscription at any time from within the app, so that I feel in control of what I'm paying for. |
| US-105 | 🟠 | As **Sara (Parent)**, I want to receive a receipt by email after each payment, so that I can track the expense. |
| US-106 | 🟠 | As **Sara (Parent)**, I want to see clearly which features are free and which require a subscription before I sign up, so that there are no surprises. |
| US-107 | 🟡 | As **Ms. Nadia (Teacher)**, I want to purchase a classroom subscription that covers all 30 of my students under one payment, so that individual families don't need their own accounts. |

---

## Epic 14 — Notifications & Engagement

| ID | Priority | Story |
|---|---|---|
| US-108 | 🟠 | As **Sara (Parent)**, I want to receive a gentle push notification when my child's daily streak is at risk of breaking, so that I can remind them to do a quick session. |
| US-109 | 🟠 | As **Sara (Parent)**, I want to choose what time of day the learning reminder notification is sent, so that it fits my child's schedule. |
| US-110 | 🟡 | As **Zaid (Child, age 7)**, I want the app to show me a "Word of the Day" on the home screen each time I open it, so that I learn something new even before starting a full session. |

---

## Story Count Summary

| Epic | Stories | P0 | P1 | P2 |
|---|---|---|---|---|
| 1 — Onboarding & Account Setup | 13 | 7 | 4 | 2 |
| 2 — Vocabulary Learning | 7 | 4 | 2 | 1 |
| 3 — Flashcard System | 9 | 3 | 4 | 2 |
| 4 — Quizzes & Mini-Games | 18 | 6 | 8 | 4 |
| 5 — Alphabet & Script Learning | 7 | 4 | 2 | 1 |
| 6 — Phrases & Sentences | 4 | 2 | 1 | 1 |
| 7 — Gamification & Rewards | 7 | 3 | 3 | 1 |
| 8 — Parent Dashboard | 13 | 5 | 6 | 2 |
| 9 — Offline Support | 3 | 2 | 1 | 0 |
| 10 — Accessibility | 5 | 3 | 2 | 0 |
| 11 — RTL & Multilingual UI | 5 | 4 | 1 | 0 |
| 12 — Teacher / Classroom Mode | 5 | 0 | 0 | 5 |
| 13 — Subscription & Payments | 6 | 3 | 2 | 1 |
| 14 — Notifications & Engagement | 3 | 0 | 2 | 1 |
| **Total** | **110** | **46** | **38** | **21** |
| **Percentage** | | **42%** | **35%** | **19%** |
