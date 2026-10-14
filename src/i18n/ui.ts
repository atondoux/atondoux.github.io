export const locales = ['fr', 'en'] as const;

export type Lang = (typeof locales)[number];

export const defaultLang = 'fr' satisfies Lang;

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
  'theme.toggle': 'Basculer entre thème clair et sombre',
  'languageSwitcher.label': 'English version',
  'home.title': 'Aurélien Tondoux',
  'home.description': 'Site personnel d’Aurélien Tondoux.',
  'home.hero.tagline': 'Tech Lead · 20 ans d’expérience',
  'home.hero.title': 'Aurélien TONDOUX',
  'home.hero.subtitle': 'Ingénierie logicielle orientée produit <strong>x boostée à l’IA</strong>',
  'home.about.title': 'À propos',
  'home.about.subtitle':
    'Je développe des logiciels de qualité qui résolvent des problèmes concrets. J’utilise l’IA pour le faire plus vite, et mieux. Je pars toujours des utilisateurs et de leurs vrais besoins pour bien saisir le pourquoi, avant de mobiliser mes compétences techniques sur le comment. Pour moi, la technologie doit être au service du produit, l’expérience utilisateur prime sur la liste de fonctionnalités, et la qualité n’est pas négociable.',
  'notFound.title': 'Page introuvable',
  'notFound.description': 'Désolé, cette page n’existe pas.',
  'notFound.backHome': 'Retour à l’accueil',
} as const;

const en = {
  'nav.home': 'Home',
  'theme.toggle': 'Toggle between dark and light mode',
  'languageSwitcher.label': 'Version française',
  'home.title': 'Aurélien Tondoux',
  'home.description': 'Personal website of Aurélien Tondoux.',
  'home.hero.tagline': 'Tech Lead · 20 years of experience',
  'home.hero.title': 'Aurélien TONDOUX',
  'home.hero.subtitle': 'Product-minded software engineering <strong>x AI-boosted</strong>',
  'home.about.title': 'About',
  'home.about.subtitle':
    'I build quality software that solves real problems. I use AI to do it faster, and better. I always start from users and their real needs to understand the why, before applying my technical skills to the how. To me, technology must serve the product, user experience matters more than feature lists, and quality is non-negotiable.',
  'notFound.title': 'Page not found',
  'notFound.description': 'Sorry, this page does not exist.',
  'notFound.backHome': 'Back to home',
} as const satisfies Record<keyof typeof fr, string>;

export const ui = { fr, en } as const;

export type UiKey = keyof typeof fr;
