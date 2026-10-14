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
  'nav.about': 'À propos',
  'nav.services': 'Services',
  'nav.pricing': 'Tarifs',
  'footer.sitemap': 'Plan du site',
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
  'home.services.title': 'Catalogue de services',
  'home.services.subtitle': 'Des logiciels qui durent, des équipes qui progressent.',
  'home.services.techLeadership.title': 'Leadership Technique',
  'home.services.techLeadership.description':
    'Des pratiques d’ingénierie qui deviennent des réflexes d’équipe : TDD, clean architecture, clean code, revue de code, CI/CD.',
  'home.services.fullStack.title': 'Développement Full-Stack',
  'home.services.fullStack.description':
    'Des applications web sur mesure, pensées pour vos utilisateurs : back-end, front-end, déploiement, monitoring.',
  'home.services.projectBootstrap.title': 'Bootstrap de Projets',
  'home.services.projectBootstrap.description':
    'Bien démarrer pour aller vite longtemps : des fondations solides et un transfert de compétences à vos équipes.',
  'home.services.legacyRecovery.title': 'Reprise de Projets Legacy',
  'home.services.legacyRecovery.description':
    'Reprendre la main sur un projet devenu coûteux, sans tout réécrire : stabilisation, modernisation, réduction progressive de la dette technique.',
  'home.services.codeReview.title': 'Audit & Revue de Code',
  'home.services.codeReview.description':
    'Savoir où en est votre code avant de décider : dette technique, risques, axes d’amélioration concrets.',
  'home.services.devopsCloud.title': 'DevOps & Cloud',
  'home.services.devopsCloud.description':
    'Des déploiements fiables, automatisés et sans stress : pipelines CI/CD, infrastructure as code.',
  'home.services.architecture.title': 'Architecture',
  'home.services.architecture.description':
    'Une architecture qui évolue avec votre métier, pas contre lui : évolutive, robuste, alignée sur vos enjeux.',
  'home.pricing.title': 'Tarifs',
  'home.pricing.subtitle': 'Ces tarifs sont donnés à titre indicatif et peuvent varier en fonction de la mission.',
  'home.pricing.perDay': 'par jour',
  'home.pricing.quote': 'Devis sur demande',
  'home.pricing.techLead.title': 'Tech Lead',
  'home.pricing.techLead.description': 'Amener vos équipes de développement à l’excellence technique.',
  'home.pricing.techLead.ribbon': 'Populaire',
  'home.pricing.techLead.features.craftsmanship': 'Software Craftsmanship',
  'home.pricing.techLead.features.tdd': 'Test-Driven Development',
  'home.pricing.techLead.features.bestPractices': 'Bonnes pratiques',
  'home.pricing.fullStack.title': 'Développeur Full Stack',
  'home.pricing.fullStack.description': 'Augmenter vos équipes techniques avec un développeur senior.',
  'home.pricing.fullStack.features.design': 'Conception',
  'home.pricing.fullStack.features.backend': 'Développement backend',
  'home.pricing.fullStack.features.frontend': 'Développement frontend',
  'home.pricing.fullStack.features.deployment': 'Déploiement',
  'home.pricing.consulting.title': 'Applications & Conseils',
  'home.pricing.consulting.description': 'Un projet ou une mission spécifique adaptés à vos besoins.',
  'home.pricing.consulting.features.launch': "Lancement d'un projet",
  'home.pricing.consulting.features.audit': 'Audit qualité',
  'home.pricing.consulting.features.review': 'Revue de code',
  'nav.contact': 'Contact',
  'home.contact.title': 'Contact',
  'home.contact.subtitle':
    'Un projet ou une idée à faire avancer ? Écrivez-moi, appelez-moi ou contactez-moi sur LinkedIn.',
  'home.contact.email.title': 'Email',
  'home.contact.phone.title': 'Téléphone',
  'home.contact.linkedin.title': 'LinkedIn',
  'home.contact.cta': 'Me contacter',
  'notFound.title': 'Page introuvable',
  'notFound.description': 'Désolé, cette page n’existe pas.',
  'notFound.backHome': 'Retour à l’accueil',
} as const;

const en = {
  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.services': 'Services',
  'nav.pricing': 'Pricing',
  'footer.sitemap': 'Sitemap',
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
  'home.services.title': 'Services',
  'home.services.subtitle': 'Software that lasts, teams that grow.',
  'home.services.techLeadership.title': 'Tech Leadership',
  'home.services.techLeadership.description':
    'Engineering practices that become team habits: TDD, clean architecture, clean code, code review, CI/CD.',
  'home.services.fullStack.title': 'Full-Stack Development',
  'home.services.fullStack.description':
    'Tailor-made web applications built around your users: back-end, front-end, deployment, monitoring.',
  'home.services.projectBootstrap.title': 'Project Bootstrapping',
  'home.services.projectBootstrap.description':
    'Start right to move fast for the long run: solid foundations and knowledge transfer to your teams.',
  'home.services.legacyRecovery.title': 'Legacy Project Recovery',
  'home.services.legacyRecovery.description':
    'Regain control of a project that has grown costly, without a full rewrite: stabilization, modernization, progressive reduction of technical debt.',
  'home.services.codeReview.title': 'Audit & Code Review',
  'home.services.codeReview.description':
    'Know where your code stands before you decide: technical debt, risks, concrete improvements.',
  'home.services.devopsCloud.title': 'DevOps & Cloud',
  'home.services.devopsCloud.description':
    'Reliable, automated, stress-free deployments: CI/CD pipelines, infrastructure as code.',
  'home.services.architecture.title': 'Architecture',
  'home.services.architecture.description':
    'An architecture that evolves with your business, not against it: scalable, robust, aligned with your priorities.',
  'home.pricing.title': 'Pricing',
  'home.pricing.subtitle': 'These rates are provided as a guideline and may be adjusted according to the project.',
  'home.pricing.perDay': 'per day',
  'home.pricing.quote': 'Quote on request',
  'home.pricing.techLead.title': 'Tech Lead',
  'home.pricing.techLead.description': 'Bring your development teams to technical excellence.',
  'home.pricing.techLead.ribbon': 'Popular',
  'home.pricing.techLead.features.craftsmanship': 'Software Craftsmanship',
  'home.pricing.techLead.features.tdd': 'Test-Driven Development',
  'home.pricing.techLead.features.bestPractices': 'Best practices',
  'home.pricing.fullStack.title': 'Full-Stack Developer',
  'home.pricing.fullStack.description': 'Augment your technical teams with a senior developer.',
  'home.pricing.fullStack.features.design': 'Design',
  'home.pricing.fullStack.features.backend': 'Backend development',
  'home.pricing.fullStack.features.frontend': 'Frontend development',
  'home.pricing.fullStack.features.deployment': 'Deployment',
  'home.pricing.consulting.title': 'Applications & Consulting',
  'home.pricing.consulting.description': 'A specific project or assignment tailored to your needs.',
  'home.pricing.consulting.features.launch': 'Project launch',
  'home.pricing.consulting.features.audit': 'Quality audit',
  'home.pricing.consulting.features.review': 'Code review',
  'nav.contact': 'Contact',
  'home.contact.title': 'Contact',
  'home.contact.subtitle':
    "Have a project or an idea you'd like to move forward? Email me, call me or reach out on LinkedIn.",
  'home.contact.email.title': 'Email',
  'home.contact.phone.title': 'Phone',
  'home.contact.linkedin.title': 'LinkedIn',
  'home.contact.cta': 'Contact me',
  'notFound.title': 'Page not found',
  'notFound.description': 'Sorry, this page does not exist.',
  'notFound.backHome': 'Back to home',
} as const satisfies Record<keyof typeof fr, string>;

export const ui = { fr, en } as const;

export type UiKey = keyof typeof fr;
