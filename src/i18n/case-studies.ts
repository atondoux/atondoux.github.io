import illustration from '~/assets/images/case-studies/illustration.svg?raw';
import type { Project } from '~/types';

import type { Lang, UiKey } from './ui';
import { useTranslations } from './utils';

interface CaseStudyCatalogEntry {
  key: string;
  tagKeys: readonly UiKey[];
  achievementKeys: readonly UiKey[];
  link?: { href: string; textKey: UiKey };
}

const caseStudyCatalog = [
  {
    key: 'icap',
    tagKeys: ['home.caseStudies.icap.tags.healthcare', 'home.caseStudies.icap.tags.clinicalResearch'],
    achievementKeys: [
      'home.caseStudies.icap.achievements.cicdPipelines',
      'home.caseStudies.icap.achievements.modernizationRoadmap',
    ],
  },
  {
    key: 'malt',
    tagKeys: ['home.caseStudies.malt.tags.marketplace', 'home.caseStudies.malt.tags.hrTech'],
    achievementKeys: [
      'home.caseStudies.malt.achievements.paidIn10Days',
      'home.caseStudies.malt.achievements.automatedFinancing',
    ],
  },
  {
    key: 'namirial',
    tagKeys: ['home.caseStudies.namirial.tags.trustServices', 'home.caseStudies.namirial.tags.digitalIdentity'],
    achievementKeys: [
      'home.caseStudies.namirial.achievements.onlineSigning',
      'home.caseStudies.namirial.achievements.fraudAtSignUp',
    ],
  },
  {
    key: 'dyma',
    tagKeys: ['home.caseStudies.dyma.tags.eLearning'],
    achievementKeys: ['home.caseStudies.dyma.achievements.content', 'home.caseStudies.dyma.achievements.hours'],
    link: { href: 'https://dyma.fr/formations/spring-boot', textKey: 'home.caseStudies.dyma.linkText' },
  },
] as const satisfies readonly CaseStudyCatalogEntry[];

type CaseStudyEntry = (typeof caseStudyCatalog)[number];

type CaseStudyKey = CaseStudyEntry['key'];

type CaseStudy = Required<Pick<Project, 'title' | 'description' | 'tags' | 'achievements'>> & { image: string };

const renderIllustration = (key: CaseStudyKey): string =>
  `<div class="case-study-art" data-palette="${key}">${illustration}</div>`;

const caseStudyUiKey = (key: CaseStudyKey, field: 'title' | 'description'): UiKey => `home.caseStudies.${key}.${field}`;

const externalLinkIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" class="h-4 w-4 shrink-0" aria-hidden="true" data-icon="tabler:external-link"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6m-7 1l9-9m-5 0h5v5"/></svg>';

const htmlEntities: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

const escapeHtml = (value: string): string => value.replace(/[&<>"']/g, (character) => htmlEntities[character]);

const renderLink = (href: string, text: string): string =>
  ` <a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 font-semibold text-primary underline underline-offset-2 hover:no-underline dark:text-blue-400">${escapeHtml(text)}${externalLinkIcon}</a>`;

export function getCaseStudies(lang: Lang): CaseStudy[] {
  const t = useTranslations(lang);
  const describe = (entry: CaseStudyEntry): string => {
    const description = t(caseStudyUiKey(entry.key, 'description'));
    if (!('link' in entry)) return description;
    return description + renderLink(entry.link.href, t(entry.link.textKey));
  };
  return caseStudyCatalog.map((entry) => ({
    title: t(caseStudyUiKey(entry.key, 'title')),
    description: describe(entry),
    tags: entry.tagKeys.map((tagKey) => t(tagKey)),
    achievements: entry.achievementKeys.map((achievementKey) => t(achievementKey)),
    image: renderIllustration(entry.key),
  }));
}
