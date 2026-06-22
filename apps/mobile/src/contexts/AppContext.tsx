import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AuthService } from '../services/auth';
import { Storage } from '../services/storage';
import type { ChildProfile, ParentAccount, UILanguage } from '../types';
import { applyRTL } from '../i18n';

function uuid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

interface AppContextValue {
  // State
  loading: boolean;
  parent: ParentAccount | null;
  children: ChildProfile[];
  activeChild: ChildProfile | null;

  // Auth (Epic 1)
  signup: (email: string, password: string, name: string, lang: UILanguage) => Promise<string | null>;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  acceptPrivacy: () => Promise<void>;
  completeParentWalkthrough: (skipped?: boolean) => Promise<void>;

  // Child management (Epic 1)
  addChild: (child: Omit<ChildProfile, 'id' | 'parentId' | 'stars' | 'streakDays' | 'lastStudiedDate' | 'walkthroughDone' | 'createdAt'>) => Promise<void>;
  updateChild: (child: ChildProfile) => Promise<void>;
  removeChild: (childId: string) => Promise<void>;
  selectChild: (child: ChildProfile) => void;
  completeChildWalkthrough: () => Promise<void>;

  // UI language
  setUILanguage: (lang: UILanguage) => Promise<void>;

  // Derived routing flags
  needsPrivacyConsent: boolean;
  needsChildProfile: boolean;
  needsParentWalkthrough: boolean;
  needsChildWalkthrough: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children: jsxChildren }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [parent, setParent] = useState<ParentAccount | null>(null);
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [activeChild, setActiveChild] = useState<ChildProfile | null>(null);

  // Restore session on mount
  useEffect(() => {
    (async () => {
      const p = await AuthService.restoreSession();
      if (p) {
        setParent(p);
        applyRTL(p.uiLanguage);
        const saved = await Storage.get<ChildProfile[]>(`children:${p.id}`);
        if (saved) setChildren(saved);
        const lastChildId = await Storage.get<string>('activeChildId');
        if (lastChildId && saved) {
          setActiveChild(saved.find(c => c.id === lastChildId) ?? null);
        }
      }
      setLoading(false);
    })();
  }, []);

  const persistChildren = useCallback(async (parentId: string, updated: ChildProfile[]) => {
    setChildren(updated);
    await Storage.set(`children:${parentId}`, updated);
  }, []);

  const signup = useCallback(async (email: string, password: string, name: string, lang: UILanguage): Promise<string | null> => {
    const result = await AuthService.signup({ email, password, displayName: name, uiLanguage: lang });
    if ('error' in result) return result.error;
    setParent(result.parent);
    applyRTL(lang);
    return null;
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<string | null> => {
    const result = await AuthService.login(email, password);
    if ('error' in result) return result.error;
    setParent(result.parent);
    applyRTL(result.parent.uiLanguage);
    const saved = await Storage.get<ChildProfile[]>(`children:${result.parent.id}`);
    if (saved) setChildren(saved);
    return null;
  }, []);

  const logout = useCallback(async () => {
    await AuthService.logout();
    setParent(null);
    setChildren([]);
    setActiveChild(null);
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    return AuthService.requestPasswordReset(email);
  }, []);

  const acceptPrivacy = useCallback(async () => {
    if (!parent) return;
    const updated = { ...parent, privacyConsentAt: new Date().toISOString() };
    await AuthService.updateParent(updated);
    setParent(updated);
  }, [parent]);

  const completeParentWalkthrough = useCallback(async (skipped = false) => {
    if (!parent) return;
    const updated = { ...parent, parentWalkthroughDone: true };
    await AuthService.updateParent(updated);
    setParent(updated);
  }, [parent]);

  const addChild = useCallback(async (data: Omit<ChildProfile, 'id' | 'parentId' | 'stars' | 'streakDays' | 'lastStudiedDate' | 'walkthroughDone' | 'createdAt'>) => {
    if (!parent) return;
    const child: ChildProfile = {
      ...data,
      id: uuid(),
      parentId: parent.id,
      stars: 0,
      streakDays: 0,
      lastStudiedDate: null,
      walkthroughDone: false,
      createdAt: new Date().toISOString(),
    };
    await persistChildren(parent.id, [...children, child]);
  }, [parent, children, persistChildren]);

  const updateChild = useCallback(async (child: ChildProfile) => {
    if (!parent) return;
    const updated = children.map(c => c.id === child.id ? child : c);
    await persistChildren(parent.id, updated);
    if (activeChild?.id === child.id) setActiveChild(child);
  }, [parent, children, activeChild, persistChildren]);

  const removeChild = useCallback(async (childId: string) => {
    if (!parent) return;
    await persistChildren(parent.id, children.filter(c => c.id !== childId));
    if (activeChild?.id === childId) setActiveChild(null);
  }, [parent, children, activeChild, persistChildren]);

  const selectChild = useCallback((child: ChildProfile) => {
    setActiveChild(child);
    Storage.set('activeChildId', child.id);
  }, []);

  const completeChildWalkthrough = useCallback(async () => {
    if (!activeChild) return;
    await updateChild({ ...activeChild, walkthroughDone: true });
  }, [activeChild, updateChild]);

  const setUILanguage = useCallback(async (lang: UILanguage) => {
    if (!parent) return;
    const updated = { ...parent, uiLanguage: lang };
    await AuthService.updateParent(updated);
    setParent(updated);
    applyRTL(lang);
  }, [parent]);

  const value: AppContextValue = {
    loading,
    parent,
    children,
    activeChild,
    signup,
    login,
    logout,
    resetPassword,
    acceptPrivacy,
    completeParentWalkthrough,
    addChild,
    updateChild,
    removeChild,
    selectChild,
    completeChildWalkthrough,
    setUILanguage,
    needsPrivacyConsent: !!parent && !parent.privacyConsentAt,
    needsChildProfile: !!parent && !!parent.privacyConsentAt && children.length === 0,
    needsParentWalkthrough: !!parent && !!parent.privacyConsentAt && children.length > 0 && !parent.parentWalkthroughDone,
    needsChildWalkthrough: !!activeChild && !activeChild.walkthroughDone,
  };

  return <AppContext.Provider value={value}>{jsxChildren}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
