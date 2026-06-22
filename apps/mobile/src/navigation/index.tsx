import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import { useApp } from '../contexts/AppContext';
import { Colors } from '../theme';

// Auth screens
import WelcomeScreen       from '../screens/auth/WelcomeScreen';
import LoginScreen         from '../screens/auth/LoginScreen';
import SignupScreen        from '../screens/auth/SignupScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

// Onboarding screens
import PrivacyConsentScreen    from '../screens/onboarding/PrivacyConsentScreen';
import CreateChildScreen       from '../screens/onboarding/CreateChildScreen';
import ParentWalkthroughScreen from '../screens/onboarding/ParentWalkthroughScreen';
import ChildWalkthroughScreen  from '../screens/onboarding/ChildWalkthroughScreen';

// Main screens
import ProfileSelectScreen     from '../screens/main/ProfileSelectScreen';
import HomeScreen              from '../screens/main/HomeScreen';
import CategoryGridScreen      from '../screens/main/CategoryGridScreen';
import WordListScreen          from '../screens/main/WordListScreen';
import WordDetailScreen        from '../screens/main/WordDetailScreen';
import DeckSelectScreen        from '../screens/main/DeckSelectScreen';
import FlashcardSessionScreen  from '../screens/main/FlashcardSessionScreen';
import ParentDashboardScreen   from '../screens/main/ParentDashboardScreen';

const AuthStack      = createNativeStackNavigator();
const OnboardStack   = createNativeStackNavigator();
const RootStack      = createNativeStackNavigator();
const Tab            = createBottomTabNavigator();
const LearnStack     = createNativeStackNavigator();
const FlashStack     = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Welcome"        component={WelcomeScreen} />
      <AuthStack.Screen name="Login"          component={LoginScreen} />
      <AuthStack.Screen name="Signup"         component={SignupScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </AuthStack.Navigator>
  );
}

function OnboardNavigator() {
  const { needsPrivacyConsent, needsChildProfile, needsParentWalkthrough } = useApp();
  return (
    <OnboardStack.Navigator screenOptions={{ headerShown: false }}>
      {needsPrivacyConsent    && <OnboardStack.Screen name="PrivacyConsent"    component={PrivacyConsentScreen} />}
      {needsChildProfile      && <OnboardStack.Screen name="CreateChild"       component={CreateChildScreen} />}
      {needsParentWalkthrough && <OnboardStack.Screen name="ParentWalkthrough" component={ParentWalkthroughScreen} />}
    </OnboardStack.Navigator>
  );
}

function LearnNavigator() {
  return (
    <LearnStack.Navigator screenOptions={{ headerShown: false }}>
      <LearnStack.Screen name="CategoryGrid" component={CategoryGridScreen} />
      <LearnStack.Screen name="WordList"     component={WordListScreen} />
      <LearnStack.Screen name="WordDetail"   component={WordDetailScreen} />
    </LearnStack.Navigator>
  );
}

function FlashNavigator() {
  return (
    <FlashStack.Navigator screenOptions={{ headerShown: false }}>
      <FlashStack.Screen name="DeckSelect"        component={DeckSelectScreen} />
      <FlashStack.Screen name="FlashcardSession"  component={FlashcardSessionScreen} />
    </FlashStack.Navigator>
  );
}

function tabIcon(route: string, focused: boolean): string {
  if (route === 'Home')       return focused ? '🏠' : '🏡';
  if (route === 'Learn')      return focused ? '📖' : '📗';
  if (route === 'Flashcards') return focused ? '🃏' : '🗂️';
  if (route === 'Parent')     return focused ? '👨‍👩‍👧' : '👪';
  return '•';
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: { borderTopColor: Colors.border },
        tabBarIcon: ({ focused }) => (
          <Text style={{ fontSize: 22 }}>{tabIcon(route.name, focused)}</Text>
        ),
      })}
    >
      <Tab.Screen name="Home"       component={HomeScreen} />
      <Tab.Screen name="Learn"      component={LearnNavigator} />
      <Tab.Screen name="Flashcards" component={FlashNavigator} />
      <Tab.Screen name="Parent"     component={ParentDashboardScreen} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const { loading, parent, children, activeChild, needsPrivacyConsent, needsChildProfile, needsParentWalkthrough, needsChildWalkthrough } = useApp();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.background }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!parent
          ? <RootStack.Screen name="Auth"          component={AuthNavigator} />
          : (needsPrivacyConsent || needsChildProfile || needsParentWalkthrough)
          ? <RootStack.Screen name="Onboarding"    component={OnboardNavigator} />
          : !activeChild
          ? <RootStack.Screen name="ProfileSelect" component={ProfileSelectScreen} />
          : needsChildWalkthrough
          ? <RootStack.Screen name="ChildWalkthrough" component={ChildWalkthroughScreen} />
          : <RootStack.Screen name="Main"          component={MainTabs} />
        }
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
