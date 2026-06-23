import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Storage } from './storage';
import type { ParentAccount, UILanguage } from '../types';

GoogleSignin.configure({
  webClientId: '204157957177-rhj9u73sqtplbuso6t90q49n2t6n3p4l.apps.googleusercontent.com',
});

function mapFirebaseError(code: string): string {
  switch (code) {
    case 'auth/email-already-in-use':    return 'errorEmailExists';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':      return 'errorWrongCredentials';
    case 'auth/invalid-email':           return 'errorInvalidEmail';
    case 'auth/weak-password':           return 'errorWeakPassword';
    default:                             return 'errorGeneric';
  }
}

async function loadProfile(uid: string): Promise<ParentAccount | null> {
  return Storage.get<ParentAccount>(`parent:${uid}`);
}

async function saveProfile(parent: ParentAccount): Promise<void> {
  await Storage.set(`parent:${parent.id}`, parent);
}

export const AuthService = {
  async signup(params: {
    email: string;
    password: string;
    displayName: string;
    uiLanguage: UILanguage;
  }): Promise<{ parent: ParentAccount } | { error: string }> {
    try {
      const credential = await auth().createUserWithEmailAndPassword(params.email, params.password);
      await credential.user.updateProfile({ displayName: params.displayName });

      const parent: ParentAccount = {
        id: credential.user.uid,
        email: params.email.toLowerCase(),
        displayName: params.displayName,
        privacyConsentAt: null,
        parentWalkthroughDone: false,
        uiLanguage: params.uiLanguage,
        createdAt: new Date().toISOString(),
      };

      await saveProfile(parent);
      return { parent };
    } catch (e: any) {
      return { error: mapFirebaseError(e?.code ?? '') };
    }
  },

  async login(email: string, password: string): Promise<{ parent: ParentAccount } | { error: string }> {
    try {
      const credential = await auth().signInWithEmailAndPassword(email, password);
      const profile = await loadProfile(credential.user.uid);
      if (!profile) return { error: 'errorWrongCredentials' };
      return { parent: profile };
    } catch (e: any) {
      return { error: mapFirebaseError(e?.code ?? '') };
    }
  },

  async signInWithGoogle(uiLanguage: UILanguage): Promise<{ parent: ParentAccount } | { error: string }> {
    try {
      await GoogleSignin.hasPlayServices();
      const signInResult = await GoogleSignin.signIn();
      const idToken = signInResult.data?.idToken;
      if (!idToken) return { error: 'errorGoogleSignIn' };

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const { user } = await auth().signInWithCredential(googleCredential);

      // Return existing profile or create one
      const existing = await loadProfile(user.uid);
      if (existing) return { parent: existing };

      const parent: ParentAccount = {
        id: user.uid,
        email: (user.email ?? '').toLowerCase(),
        displayName: user.displayName ?? (user.email ?? '').split('@')[0],
        privacyConsentAt: null,
        parentWalkthroughDone: false,
        uiLanguage,
        createdAt: new Date().toISOString(),
      };

      await saveProfile(parent);
      return { parent };
    } catch (e: any) {
      if (e?.code === 'SIGN_IN_CANCELLED') return { error: 'errorGoogleCancelled' };
      return { error: 'errorGoogleSignIn' };
    }
  },

  async logout(): Promise<void> {
    const isGoogleUser = await GoogleSignin.isSignedIn();
    if (isGoogleUser) await GoogleSignin.revokeAccess();
    await auth().signOut();
  },

  async requestPasswordReset(email: string): Promise<boolean> {
    try {
      await auth().sendPasswordResetEmail(email);
      return true;
    } catch {
      return false;
    }
  },

  async updateParent(parent: ParentAccount): Promise<void> {
    await saveProfile(parent);
  },

  getCurrentFirebaseUser() {
    return auth().currentUser;
  },

  onAuthStateChanged(callback: (uid: string | null) => void): () => void {
    return auth().onAuthStateChanged(user => callback(user?.uid ?? null));
  },
};
