import { describe, expect, it } from 'vitest';

import { getCaseStudies } from './case-studies';

const expectedCaseStudies = {
  fr: [
    {
      title: 'Institut du Cancer Avignon - Provence',
      description:
        'Accompagner une équipe tech d’une dizaine de personnes à la mise en place et l’adoption des meilleures pratiques d’ingénierie.',
      tags: ['Santé'],
      achievements: ['Mise en place d’une démarche qualité', 'Livraisons fiabilisées avec des pipelines CI/CD'],
    },
    {
      title: 'Malt',
      description:
        'Renforcer la capacité de financement de Malt et optimiser sa gestion du cash flow, tout en réduisant drastiquement les opérations manuelles de l’équipe FinOps.',
      tags: ['Marketplace Freelance'],
      achievements: ['90% des freelances payés en 10 jours', 'Processus de financement automatisé à 95%'],
    },
    {
      title: 'Namirial',
      description:
        'Fiabiliser et sécuriser les parcours de souscription en ligne, de la vérification d’identité à la signature électronique.',
      tags: ['Services de confiance numérique'],
      achievements: ['Contrats signés en ligne avec Yousign', 'Fraude détectée dès la souscription'],
    },
    {
      title: 'Dyma Spring Boot',
      description:
        'Créer et maintenir la formation Spring Boot sur la plateforme Dyma : leçons écrites, vidéos et exemples de code. Voir la formation',
      tags: ['Formation en ligne'],
      achievements: ['19 chapitres, 85 leçons, 170 quiz', '6500+ heures passées par les apprenants'],
    },
    {
      title: 'Orange Business',
      description:
        'Réécrire le module de suivi des entretiens d’une solution de télématique et de gestion de flotte de véhicules d’entreprises.',
      tags: ['Gestion de flotte'],
      achievements: [
        'Suivi précis du taux d’utilisation des véhicules',
        'Amélioration de la planification des entretiens',
      ],
    },
    {
      title: 'Softway Medical',
      description:
        'Améliorer le suivi des patients et la gestion des soins dans les hôpitaux en dotant les professionnels de santé d’applications pensées pour leur métier. Voir le témoignage client',
      tags: ['Santé'],
      achievements: [
        'Conception de nouveaux modules spécialisés dans le suivi des patients',
        'Livraison et déploiement continus sur une architecture micro-services',
      ],
    },
  ],
  en: [
    {
      title: 'Institut du Cancer Avignon - Provence',
      description: 'Coaching a ten-person tech team through setting up and adopting engineering best practices.',
      tags: ['Healthcare'],
      achievements: ['Quality process established', 'Reliable releases through CI/CD pipelines'],
    },
    {
      title: 'Malt',
      description:
        "Strengthening Malt's financing capacity and cash flow management, while drastically cutting the FinOps team's manual work.",
      tags: ['Freelance Marketplace'],
      achievements: ['90% of freelancers paid within 10 days', '95% automated financing process'],
    },
    {
      title: 'Namirial',
      description: 'Making online sign-up journeys reliable and secure, from identity verification to e-signature.',
      tags: ['Trust Services'],
      achievements: ['Contracts signed online with Yousign', 'Fraud caught at sign-up'],
    },
    {
      title: 'Dyma Spring Boot',
      description:
        'Creating and maintaining the Spring Boot course on the Dyma platform: written lessons, videos and code examples. See the course',
      tags: ['E-Learning'],
      achievements: ['19 chapters, 85 lessons, 170 quizzes', '6,500+ hours spent by students'],
    },
    {
      title: 'Orange Business',
      description:
        'Rewrite the maintenance tracking module of a telematics and fleet management solution for company vehicles.',
      tags: ['Fleet Management'],
      achievements: ['Accurate tracking of vehicle usage rates', 'Improved maintenance planning'],
    },
    {
      title: 'Softway Medical',
      description:
        'Improving patient follow-up and care management in hospitals by giving healthcare professionals applications designed around their work. See the client testimonial',
      tags: ['Healthcare'],
      achievements: [
        'New modules designed for patient follow-up',
        'Continuous delivery and deployment on a microservices architecture',
      ],
    },
  ],
} as const;

describe('listing the case studies', () => {
  it.each(['fr', 'en'] as const)(
    'lists the %s case studies from newest to oldest with their copy, tags and achievements',
    (lang) => {
      const caseStudies = getCaseStudies(lang);

      expect(
        caseStudies.map(({ title, description, tags, achievements }) => ({
          title,
          description: description.replace(/<[^>]*>/g, ''),
          tags,
          achievements,
        }))
      ).toEqual(expectedCaseStudies[lang]);
    }
  );

  it.each(['fr', 'en'] as const)('illustrates each %s case study in its brand colours', (lang) => {
    const caseStudies = getCaseStudies(lang);

    expect(caseStudies.map(({ image }) => image.match(/data-palette="(\w+)"/)?.[1])).toEqual([
      'icap',
      'malt',
      'namirial',
      'dyma',
      'orange',
      'softway',
    ]);
  });

  it('links the Dyma course page from its description, opening in a new tab', () => {
    const dyma = getCaseStudies('fr').find(({ title }) => title === 'Dyma Spring Boot');

    expect(dyma?.description).toMatch(
      /<a href="https:\/\/dyma\.fr\/formations\/spring-boot" target="_blank" rel="noopener noreferrer"[^>]*>Voir la formation<svg/
    );
  });

  it('links the Softway Medical client testimonial video from its description, opening in a new tab', () => {
    const softway = getCaseStudies('fr').find(({ title }) => title === 'Softway Medical');

    expect(softway?.description).toMatch(
      /<a href="https:\/\/youtu\.be\/NwEPv_cVKC0" target="_blank" rel="noopener noreferrer"[^>]*>Voir le témoignage client<svg/
    );
  });

  it('draws the same decorative illustration for every case study, only the colours change', () => {
    const drawings = getCaseStudies('fr').map(({ image }) => image.replace(/data-palette="\w+"/, ''));

    expect(new Set(drawings).size).toBe(1);
    expect(drawings[0]).toMatch(/<svg[^>]*aria-hidden="true"/);
    expect(drawings[0]).not.toMatch(/\sid="/);
  });
});
