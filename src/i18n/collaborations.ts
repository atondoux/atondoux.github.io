import type { Image } from '~/types';

import type { Lang } from './ui';
import { useTranslations } from './utils';

const collaborationCatalog = [
  { company: 'Veolia Eau', file: 'veolia.svg' },
  { company: 'ONIAM', file: 'oniam.svg' },
  { company: 'SNCF Connect & Tech', file: 'sncf-connect.svg' },
  { company: 'Natixis', file: 'natixis.svg' },
  { company: 'Société Générale', file: 'societe-generale.svg' },
  { company: 'Softway Medical', file: 'softway-medical.svg' },
  { company: 'Orange Business', file: 'orange-business.svg' },
  { company: 'Dyma', file: 'dyma-spring-boot.svg' },
  { company: 'Namirial', file: 'namirial.svg' },
  { company: 'Malt', file: 'malt.svg' },
  { company: 'Institut Sainte-Catherine', file: 'icap.svg' },
] as const;

const logosFolder = '~/assets/images/collaborations';

export function getCollaborationLogos(lang: Lang): Required<Pick<Image, 'src' | 'alt'>>[] {
  const t = useTranslations(lang);
  const altTemplate = t('home.collaborations.logoAlt');
  return collaborationCatalog.map(({ company, file }) => ({
    src: `${logosFolder}/${file}`,
    alt: altTemplate.replace('{company}', company),
  }));
}
