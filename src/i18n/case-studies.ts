import illustration from '~/assets/images/case-studies/illustration.svg?raw';
import type { Project } from '~/types';

import type { Lang, UiKey } from './ui';
import { useTranslations } from './utils';

interface CaseStudyCatalogEntry {
  key: string;
  tagKeys: readonly UiKey[];
}

const caseStudyCatalog = [
  {
    key: 'icap',
    tagKeys: [
      'home.caseStudies.icap.tags.healthcare',
      'home.caseStudies.icap.tags.craftsmanship',
      'home.caseStudies.icap.tags.kotlin',
      'home.caseStudies.icap.tags.springBoot',
      'home.caseStudies.icap.tags.vue',
    ],
  },
  {
    key: 'malt',
    tagKeys: [
      'home.caseStudies.malt.tags.marketplace',
      'home.caseStudies.malt.tags.craftsmanship',
      'home.caseStudies.malt.tags.kotlin',
      'home.caseStudies.malt.tags.springBoot',
      'home.caseStudies.malt.tags.vue',
    ],
  },
  {
    key: 'namirial',
    tagKeys: [
      'home.caseStudies.namirial.tags.kyc',
      'home.caseStudies.namirial.tags.craftsmanship',
      'home.caseStudies.namirial.tags.kotlin',
      'home.caseStudies.namirial.tags.java',
      'home.caseStudies.namirial.tags.springBoot',
    ],
  },
  {
    key: 'dyma',
    tagKeys: [
      'home.caseStudies.dyma.tags.eLearning',
      'home.caseStudies.dyma.tags.java',
      'home.caseStudies.dyma.tags.springBoot',
      'home.caseStudies.dyma.tags.restApi',
      'home.caseStudies.dyma.tags.cleanCode',
    ],
  },
] as const satisfies readonly CaseStudyCatalogEntry[];

type CaseStudyKey = (typeof caseStudyCatalog)[number]['key'];

type CaseStudy = Required<Pick<Project, 'title' | 'description' | 'tags'>> & { image: string };

const renderIllustration = (key: CaseStudyKey): string =>
  `<div class="case-study-art" data-palette="${key}">${illustration}</div>`;

const caseStudyUiKey = (key: CaseStudyKey, field: 'title' | 'description'): UiKey => `home.caseStudies.${key}.${field}`;

export function getCaseStudies(lang: Lang): CaseStudy[] {
  const t = useTranslations(lang);
  return caseStudyCatalog.map(({ key, tagKeys }) => ({
    title: t(caseStudyUiKey(key, 'title')),
    description: t(caseStudyUiKey(key, 'description')),
    tags: tagKeys.map((tagKey) => t(tagKey)),
    image: renderIllustration(key),
  }));
}
