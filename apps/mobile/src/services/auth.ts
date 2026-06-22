import { Storage } from './storage';
import type { ParentAccount, UILanguage } from '../types';

// Simple hash for dev — replace with Firebase Auth in production
function hashPassword(pw: string): string {
  let h = 0;
  for (let i = 0; i < pw.length; i++) {
    h = (Math.imul(31, h) + pw.charCodeAt(i)) | 0;
  }
  return h.toString(36);
}

function uuid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export const AuthService = {
  async signup(params: {
    email: string;
    password: string;
    displayName: string;
    uiLanguage: UILanguage;
  }): Promise<{ parent: ParentAccount } | { error: string }> {
    const existing = await Storage.get<ParentAccount>(`parent:${params.email.toLowerCase()}`);
    if (existing) return { error: 'errorEmailExists' };

    const parent: ParentAccount = {
      id: uuid(),
      email: params.email.toLowerCase(),
      displayName: params.displayName,
      passwordHash: hashPassword(params.password),
      privacyConsentAt: null,
      parentWalkthroughDone: false,
      uiLanguage: params.uiLanguage,
      createdAt: new Date().toISOString(),
    };

    await Storage.set(`parent:${parent.email}`, parent);
    await Storage.set('session', { email: parent.email });
    return { parent };
  },

  async login(email: string, password: string): Promise<{ parent: ParentAccount } | { error: string }> {
    const parent = await Storage.get<ParentAccount>(`parent:${email.toLowerCase()}`);
    if (!parent) return { error: 'errorWrongCredentials' };
    if (parent.passwordHash !== hashPassword(password)) return { error: 'errorWrongCredentials' };
    await Storage.set('session', { email: parent.email });
    return { parent };
  },

  async restoreSession(): Promise<ParentAccount | null> {
    const session = await Storage.get<{ email: string }>('session');
    if (!session) return null;
    return Storage.get<ParentAccount>(`parent:${session.email}`);
  },

  async updateParent(parent: ParentAccount): Promise<void> {
    await Storage.set(`parent:${parent.email}`, parent);
  },

  async logout(): Promise<void> {
    await Storage.remove('session');
  },

  async requestPasswordReset(email: string): Promise<boolean> {
    const parent = await Storage.get<ParentAccount>(`parent:${email.toLowerCase()}`);
    // In production: call Firebase sendPasswordResetEmail(auth, email)
    return !!parent;
  },
};
