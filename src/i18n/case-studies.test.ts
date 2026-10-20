import { describe, expect, it } from 'vitest';

import { getCaseStudies } from './case-studies';

const expectedCaseStudies = {
  fr: [
    {
      title: 'Institut du Cancer Avignon - Provence',
      description:
        'Participer à la refonte complète du dossier patient informatisé et mettre en place les meilleures pratiques d’ingénierie au sein d’une équipe tech d’une dizaine de personnes.',
      tags: ['Santé'],
      achievements: [
        'Stratégie de modernisation du SI clairement définie',
        'Livraisons fiabilisées avec des pipelines CI/CD',
      ],
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
      achievements: ['19 chapitres, 85 leçons, 170 quiz', '6500+ heures passées par les étudiants'],
    },
  ],
  en: [
    {
      title: 'Institut du Cancer Avignon - Provence',
      description:
        'Helping fully rebuild the healthcare information system and setting up engineering best practices within a ten-person tech team.',
      tags: ['Healthcare'],
      achievements: ['Clearly defined IT modernization strategy', 'Reliable releases through CI/CD pipelines'],
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
    ]);
  });

  it('links the Dyma course page from its description, opening in a new tab', () => {
    const dyma = getCaseStudies('fr').find(({ title }) => title === 'Dyma Spring Boot');

    expect(dyma?.description).toMatch(
      /<a href="https:\/\/dyma\.fr\/formations\/spring-boot" target="_blank" rel="noopener noreferrer"[^>]*>Voir la formation<svg/
    );
  });

  it('draws the same decorative illustration for every case study, only the colours change', () => {
    const drawings = getCaseStudies('fr').map(({ image }) => image.replace(/data-palette="\w+"/, ''));

    expect(new Set(drawings).size).toBe(1);
    expect(drawings[0]).toMatch(/<svg[^>]*aria-hidden="true"/);
    expect(drawings[0]).not.toMatch(/\sid="/);
  });
});
