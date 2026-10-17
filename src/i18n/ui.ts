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
  'home.hero.subtitle': 'Ingénierie logicielle orientée produit <strong>— boostée à l’IA</strong>',
  'home.about.title': 'À propos',
  'home.about.subtitle':
    'Je développe des logiciels de qualité qui résolvent des problèmes concrets. J’utilise l’IA pour le faire plus vite, et mieux. Je pars toujours des utilisateurs pour comprendre leurs besoins, leurs usages, ce qui les freine au quotidien. Un logiciel n’a de valeur que s’il est utilisé, alors je soigne l’expérience utilisateur autant que le code. Pour moi, la technologie doit être au service du produit, et la qualité n’est pas négociable.',
  'home.collaborations.title': 'Ils me font confiance',
  'home.collaborations.subtitle': 'Startups, PME et grands comptes avec qui j’ai collaboré.',
  'home.collaborations.logoAlt': 'Logo de {company}',
  'home.services.title': 'Services',
  'home.services.subtitle': 'Des logiciels qui durent, des équipes qui progressent, des résultats mesurables.',
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
  'home.pricing.quote': 'Sur devis',
  'home.pricing.techLead.title': 'Tech Lead',
  'home.pricing.techLead.description': 'Amener vos équipes à l’excellence technique, au quotidien.',
  'home.pricing.techLead.ribbon': 'Populaire',
  'home.pricing.techLead.features.craftsmanship': 'Software Craftsmanship',
  'home.pricing.techLead.features.tdd': 'Test-Driven Development',
  'home.pricing.techLead.features.bestPractices': 'Bonnes pratiques',
  'home.pricing.fullStack.title': 'Développeur Full Stack',
  'home.pricing.fullStack.description': 'Livrer plus vite, de la conception jusqu’à la production.',
  'home.pricing.fullStack.features.design': 'Conception',
  'home.pricing.fullStack.features.backend': 'Développement backend',
  'home.pricing.fullStack.features.frontend': 'Développement frontend',
  'home.pricing.fullStack.features.deployment': 'Déploiement',
  'home.pricing.consulting.title': 'Consultant',
  'home.pricing.consulting.description': 'Cadrer un projet ou une mission taillés pour vos besoins.',
  'home.pricing.consulting.features.launch': "Lancement d'un projet",
  'home.pricing.consulting.features.audit': 'Audit qualité',
  'home.pricing.consulting.features.review': 'Revue de code',
  'home.caseStudies.title': 'Cas clients',
  'home.caseStudies.subtitle': 'Quelques missions récentes, du produit jusqu’au code.',
  'home.caseStudies.malt.title': 'Malt',
  'home.caseStudies.malt.description':
    'Aider les freelances à recevoir leurs paiements le plus rapidement possible et avoir une meilleure expérience sur la plateforme Malt.',
  'home.caseStudies.malt.tags.marketplace': 'Marketplace',
  'home.caseStudies.malt.tags.craftsmanship': 'Software Craftsmanship',
  'home.caseStudies.malt.tags.kotlin': 'Kotlin',
  'home.caseStudies.malt.tags.springBoot': 'Spring Boot',
  'home.caseStudies.malt.tags.vue': 'Vue.js',
  'home.caseStudies.namirial.title': 'Namirial',
  'home.caseStudies.namirial.description':
    'Faciliter la vie quotidienne en rendant plus fluide les parcours de souscription gérés par une plateforme de services de confiance qualifiés.',
  'home.caseStudies.namirial.tags.kyc': 'KYC',
  'home.caseStudies.namirial.tags.craftsmanship': 'Software Craftsmanship',
  'home.caseStudies.namirial.tags.kotlin': 'Kotlin',
  'home.caseStudies.namirial.tags.java': 'Java',
  'home.caseStudies.namirial.tags.springBoot': 'Spring Boot',
  'home.caseStudies.dyma.title': 'Formation Spring Boot',
  'home.caseStudies.dyma.description':
    'Découvrez Spring Boot, le framework open source incontournable pour créer des applications web et des microservices de niveau entreprise.',
  'home.caseStudies.dyma.tags.eLearning': 'Formation en ligne',
  'home.caseStudies.dyma.tags.java': 'Java',
  'home.caseStudies.dyma.tags.springBoot': 'Spring Boot',
  'home.caseStudies.dyma.tags.restApi': 'API REST',
  'home.caseStudies.dyma.tags.cleanCode': 'Clean Code',
  'nav.contact': 'Contact',
  'home.contact.title': 'Contact',
  'home.contact.subtitle':
    'Parlons de votre projet. Un premier échange rapide suffit pour cerner votre besoin et voir comment je peux vous aider.',
  'home.contact.email.title': 'Email',
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
  'home.hero.subtitle': 'Product-minded software engineering <strong>— AI-boosted</strong>',
  'home.about.title': 'About',
  'home.about.subtitle':
    'I build quality software that solves real problems. I use AI to do it faster, and better. I always start from users to understand their needs, how they work, what slows them down every day. Software only has value if people use it, so I care about the user experience as much as the code. To me, technology must serve the product, and quality is non-negotiable.',
  'home.collaborations.title': 'They trust me',
  'home.collaborations.subtitle': 'Startups, SMEs and large companies I’ve worked with.',
  'home.collaborations.logoAlt': '{company} logo',
  'home.services.title': 'Services',
  'home.services.subtitle': 'Software that lasts, teams that grow, measurable results.',
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
  'home.pricing.quote': 'On quote',
  'home.pricing.techLead.title': 'Tech Lead',
  'home.pricing.techLead.description': 'Lead your teams to technical excellence, day after day.',
  'home.pricing.techLead.ribbon': 'Popular',
  'home.pricing.techLead.features.craftsmanship': 'Software Craftsmanship',
  'home.pricing.techLead.features.tdd': 'Test-Driven Development',
  'home.pricing.techLead.features.bestPractices': 'Best practices',
  'home.pricing.fullStack.title': 'Full-Stack Developer',
  'home.pricing.fullStack.description': 'Ship faster, from design all the way to production.',
  'home.pricing.fullStack.features.design': 'Design',
  'home.pricing.fullStack.features.backend': 'Backend development',
  'home.pricing.fullStack.features.frontend': 'Frontend development',
  'home.pricing.fullStack.features.deployment': 'Deployment',
  'home.pricing.consulting.title': 'Consultant',
  'home.pricing.consulting.description': 'Scope a project or assignment shaped around your needs.',
  'home.pricing.consulting.features.launch': 'Project launch',
  'home.pricing.consulting.features.audit': 'Quality audit',
  'home.pricing.consulting.features.review': 'Code review',
  'home.caseStudies.title': 'Case studies',
  'home.caseStudies.subtitle': 'A few recent assignments, from product all the way to code.',
  'home.caseStudies.malt.title': 'Malt',
  'home.caseStudies.malt.description':
    'Help freelancers receive their payments as quickly as possible and have a better experience on the Malt platform.',
  'home.caseStudies.malt.tags.marketplace': 'Marketplace',
  'home.caseStudies.malt.tags.craftsmanship': 'Software Craftsmanship',
  'home.caseStudies.malt.tags.kotlin': 'Kotlin',
  'home.caseStudies.malt.tags.springBoot': 'Spring Boot',
  'home.caseStudies.malt.tags.vue': 'Vue.js',
  'home.caseStudies.namirial.title': 'Namirial',
  'home.caseStudies.namirial.description':
    'Making daily life easier by streamlining subscription workflows managed by a qualified trust services platform.',
  'home.caseStudies.namirial.tags.kyc': 'KYC',
  'home.caseStudies.namirial.tags.craftsmanship': 'Software Craftsmanship',
  'home.caseStudies.namirial.tags.kotlin': 'Kotlin',
  'home.caseStudies.namirial.tags.java': 'Java',
  'home.caseStudies.namirial.tags.springBoot': 'Spring Boot',
  'home.caseStudies.dyma.title': 'Spring Boot Online Course',
  'home.caseStudies.dyma.description':
    'Unlock the power of Spring Boot to build robust, enterprise-grade web applications and microservices.',
  'home.caseStudies.dyma.tags.eLearning': 'E-Learning',
  'home.caseStudies.dyma.tags.java': 'Java',
  'home.caseStudies.dyma.tags.springBoot': 'Spring Boot',
  'home.caseStudies.dyma.tags.restApi': 'REST API',
  'home.caseStudies.dyma.tags.cleanCode': 'Clean Code',
  'nav.contact': 'Contact',
  'home.contact.title': 'Contact',
  'home.contact.subtitle':
    "Let's talk about your project. A quick first conversation is all it takes to pin down what you need and see how I can help.",
  'home.contact.email.title': 'Email',
  'home.contact.linkedin.title': 'LinkedIn',
  'home.contact.cta': 'Contact me',
  'notFound.title': 'Page not found',
  'notFound.description': 'Sorry, this page does not exist.',
  'notFound.backHome': 'Back to home',
} as const satisfies Record<keyof typeof fr, string>;

export const ui = { fr, en } as const;

export type UiKey = keyof typeof fr;
