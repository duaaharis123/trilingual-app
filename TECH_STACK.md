# LinguaKids — Tech Stack & Versions

> Recorded June 2026. All versions are the **installed/resolved** values from `node_modules`,
> not the semver ranges in `package.json`. Use these exact versions when starting a new project
> with the same working stack.

---

## Runtime & Tooling

| Tool | Version | Notes |
|------|---------|-------|
| Node.js | **22.22.0** | LTS |
| npm | **11.4.2** | bundled with Node 22 |
| TypeScript | **5.9.3** | strict mode, target ES2020 |
| Babel | **7.29.7** | via `@babel/core` |
| Prettier | **^3.4.0** | |
| ESLint | **^9.0.0** | flat config format |

---

## Framework

| Package | Installed Version | package.json range |
|---------|------------------|--------------------|
| `react` | **19.1.0** | `19.1.0` (exact) |
| `react-native` | **0.81.5** | `0.81.5` (exact) |

---

## CLI Tools (global)

| Tool | Version |
|------|---------|
| React Native CLI (`npx react-native`) | **15.0.1** |

Install:
```powershell
npm install -g @react-native-community/cli@15.0.1
```

---

## Navigation

| Package | Installed Version | package.json range |
|---------|------------------|--------------------|
| `@react-navigation/native` | **7.2.5** | `^7.1.6` |
| `@react-navigation/stack` | **7.9.3** | `^7.3.2` |
| `@react-navigation/bottom-tabs` | **7.16.2** | `^7.3.10` |

---

## Firebase & Auth

| Package | Installed Version | package.json range |
|---------|------------------|--------------------|
| `@react-native-firebase/app` | **24.0.0** | `^24.0.0` |
| `@react-native-firebase/auth` | **24.0.0** | `^24.0.0` |
| `@react-native-firebase/firestore` | **24.0.0** | `^24.0.0` |
| `@react-native-google-signin/google-signin` | **16.1.2** | `^16.1.2` |

---

## UI / Animation / Gestures

| Package | Installed Version | package.json range |
|---------|------------------|--------------------|
| `react-native-reanimated` | **4.1.7** | `~4.1.1` |
| `react-native-gesture-handler` | **2.28.0** | `~2.28.0` |
| `react-native-screens` | **4.16.0** | `~4.16.0` |
| `react-native-safe-area-context` | **5.6.2** | `~5.6.0` |

---

## Native Modules & Performance

| Package | Installed Version | package.json range | Notes |
|---------|------------------|--------------------|-|
| `react-native-nitro-modules` | **0.35.9** | `^0.35.9` | C++ bridge for high-perf native modules |
| `react-native-worklets` | **0.5.1** | `0.5.1` (exact) | JS worklets for background threads |
| `react-native-iap` | **15.3.1** | `^15.3.1` | In-app purchases (Google Play / App Store) |

---

## Storage

| Package | Installed Version | package.json range |
|---------|------------------|--------------------|
| `@react-native-async-storage/async-storage` | **2.2.0** | `2.2.0` (exact) |

---

## Fonts

| Package | Installed Version | package.json range | Notes |
|---------|------------------|--------------------|-|
| `react-native-vector-icons` | **10.2.0** | `^10.2.0` | Icon sets |

Custom Arabic (Amiri/Scheherazade) and Urdu (Noto Nastaliq) fonts are bundled as raw `.ttf` files
under `assets/fonts/` and linked via `react-native.config.js`:

```js
// react-native.config.js
module.exports = {
  assets: ['./assets/fonts'],
};
```

Link after adding new fonts:
```powershell
npx react-native-asset
```

---

## Audio & Speech

| Package | Installed Version | package.json range | Notes |
|---------|------------------|--------------------|-|
| `react-native-tts` | **4.1.0** | `^4.1.0` | Text-to-speech (fallback only) |
| `react-native-sound` | **0.11.2** | `^0.11.2` | Play pre-recorded audio assets |

---

## Splash Screen & Status Bar

| Package | Installed Version | package.json range | Notes |
|---------|------------------|--------------------|-|
| `react-native-bootsplash` | **6.3.5** | `^6.3.5` | Native splash screen |

`StatusBar` is handled via the built-in `react-native` `StatusBar` component — no extra package needed.

---

## Android Build Environment

| Component | Version | Location |
|-----------|---------|----------|
| JDK | **17.0.19** (HotSpot LTS) | `C:\Program Files\Java\jdk-17.0.19` |
| Android SDK | **API 36** | `C:\Users\...\AppData\Local\Android\Sdk` |
| Android Build Tools | **37.0.0** | inside SDK |
| NDK | **27.1.12297006** | inside SDK |
| CMake | **3.22.1** | inside SDK (`cmake\3.22.1`) |
| Gradle | **8.14.3** | via Gradle Wrapper |
| Google Services plugin | **4.4.1** | `com.google.gms:google-services` |
| Android Gradle Plugin | managed by RN | `com.android.tools.build:gradle` |
| Kotlin Gradle Plugin | managed by RN | `org.jetbrains.kotlin:kotlin-gradle-plugin` |

### Key Gradle flags (`android/gradle.properties`)

| Flag | Value | Effect |
|------|-------|--------|
| `newArchEnabled` | `true` | New Architecture (TurboModules + Fabric) ON |
| `hermesEnabled` | `true` | Hermes JS engine (smaller, faster startup) |
| `edgeToEdgeEnabled` | `true` | Edge-to-edge display |
| `android.enablePngCrunchInReleaseBuilds` | `false` | Disabled — game asset PNGs fail AAPT2 crunch |

---

## Windows-Specific Build Workarounds

These are required for local release builds on Windows and are already applied to this repo.
Any new project copied from this stack on Windows needs the same fixes.

### 1. `C:\cxx\` staging directories (must exist)

```powershell
mkdir C:\cxx\iap   # for react-native-iap CMake output
mkdir C:\cxx\app   # for app-module autolinked CMake output
```

**Why:** Windows MAX_PATH (260-char) limit. CMake mirrors full source paths into its build-staging
directory, pushing object-file paths past 260 chars. Redirecting to `C:\cxx\` brings them to ~180 chars.

**What's patched:**
- `node_modules/react-native-iap/android/build.gradle` → `buildStagingDirectory "C:\\cxx\\iap"`
- `android/app/build.gradle` → `externalNativeBuild { cmake { buildStagingDirectory "C:\\cxx\\app" } }`

> The `react-native-iap` patch lives in `node_modules` and is lost after `npm install`. Re-apply with:
> ```powershell
> (Get-Content node_modules\react-native-iap\android\build.gradle) `
>   -replace '(cmake \{)', "`$1`n      buildStagingDirectory `"C:\\\\cxx\\\\iap`"" `
>   | Set-Content node_modules\react-native-iap\android\build.gradle
> Remove-Item -Recurse -Force node_modules\react-native-iap\android\.cxx -ErrorAction SilentlyContinue
> Remove-Item -Recurse -Force android\app\.cxx -ErrorAction SilentlyContinue
> ```

### 2. JAVA_HOME must point to JDK 17

```powershell
[System.Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Java\jdk-17.0.19", "User")
```

---

## New Project Quickstart (same stack)

```powershell
# 1. Create bare React Native project
npx @react-native-community/cli@15.0.1 init MyApp --template react-native-template-typescript
cd MyApp

# 2. Pin core versions
npm install react@19.1.0 react-native@0.81.5

# 3. Navigation
npm install @react-navigation/native@7.2.5 @react-navigation/stack@7.9.3 @react-navigation/bottom-tabs@7.16.2

# 4. Firebase
npm install @react-native-firebase/app@24.0.0 @react-native-firebase/auth@24.0.0 @react-native-firebase/firestore@24.0.0

# 5. Google Sign-In
npm install @react-native-google-signin/google-signin@16.1.2

# 6. UI / animation
npm install react-native-reanimated@4.1.7 react-native-gesture-handler@2.28.0 react-native-screens@4.16.0 react-native-safe-area-context@5.6.2

# 7. Storage
npm install @react-native-async-storage/async-storage@2.2.0

# 8. Audio & TTS
npm install react-native-sound@0.11.2 react-native-tts@4.1.0

# 9. Splash screen
npm install react-native-bootsplash@6.3.5

# 10. Fonts — place .ttf files in assets/fonts/, then:
npx react-native-asset

# 11. (Windows only) Create short CMake staging dirs
mkdir C:\cxx\app
```
