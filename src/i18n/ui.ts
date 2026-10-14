export const locales = ['fr', 'en'] as const;

export type Lang = (typeof locales)[number];

export const defaultLang = 'fr' satisfies Lang;

export const languages = {
  fr: 'Français',
  en: 'English',
} satisfies Record<Lang, string>;

export const hreflangs = {
  fr: 'fr',
  en: 'en',
} satisfies Record<Lang, string>;

export const openGraphLocales = {
  fr: 'fr_FR',
  en: 'en_US',
} satisfies Record<Lang, string>;

const fr = {
  'nav.home': 'Accueil',
  'home.title': 'Aurélien Tondoux',
  'home.description': 'Site personnel d’Aurélien Tondoux.',
  'home.hero.tagline': 'Tech Lead Full Stack · 20 ans d’expérience',
  'home.hero.title': 'Aurélien TONDOUX',
  'home.hero.subtitle': 'Je développe des logiciels de qualité qui résolvent des problèmes concrets.',
  'notFound.title': 'Page introuvable',
  'notFound.description': 'Désolé, cette page n’existe pas.',
  'notFound.backHome': 'Retour à l’accueil',
} as const;

const en = {
  'nav.home': 'Home',
  'home.title': 'Aurélien Tondoux',
  'home.description': 'Personal website of Aurélien Tondoux.',
  'home.hero.tagline': 'Full Stack Tech Lead · 20 years of experience',
  'home.hero.title': 'Aurélien TONDOUX',
  'home.hero.subtitle': 'I build quality software that solves real-world problems.',
  'notFound.title': 'Page not found',
  'notFound.description': 'Sorry, this page does not exist.',
  'notFound.backHome': 'Back to home',
} as const satisfies Record<keyof typeof fr, string>;

export const ui = { fr, en } as const;

export type UiKey = keyof typeof fr;
