
import { Injectable, signal } from '@angular/core';

type Language = 'bs' | 'en';

const translations: Record<Language, Record<string, string>> = {
  bs: {
    'appTitle': 'Navigator Birokratije',
    'home': 'Početna',
    'procedures': 'Procedure',
    'offlineProcedures': 'Offline Procedure',
    'aiAssistant': 'AI Asistent',
    'settings': 'Postavke',
    'logout': 'Odjava',
    // ... add more translations
  },
  en: {
    'appTitle': 'Bureaucracy Navigator',
    'home': 'Home',
    'procedures': 'Procedures',
    'offlineProcedures': 'Offline Procedures',
    'aiAssistant': 'AI Assistant',
    'settings': 'Settings',
    'logout': 'Logout',
    // ... add more translations
  }
};

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  currentLang = signal<Language>('bs');

  t(key: string): string {
    return translations[this.currentLang()][key] || key;
  }

  setLanguage(lang: Language) {
    this.currentLang.set(lang);
  }
}
