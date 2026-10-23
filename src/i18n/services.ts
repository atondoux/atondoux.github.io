import type { Item } from '~/types';

import type { Lang, UiKey } from './ui';
import { useTranslations } from './utils';

const serviceCatalog = [
  { key: 'techLeadership', icon: 'flat-color-icons:collaboration' },
  { key: 'fullStack', icon: 'flat-color-icons:multiple-devices' },
  { key: 'projectBootstrap', icon: 'flat-color-icons:start' },
  { key: 'legacyRecovery', icon: 'flat-color-icons:refresh' },
  { key: 'codeReview', icon: 'flat-color-icons:inspection' },
  { key: 'devopsCloud', icon: 'flat-color-icons:deployment' },
  { key: 'architecture', icon: 'flat-color-icons:flow-chart' },
] as const;

type ServiceKey = (typeof serviceCatalog)[number]['key'];

type ServiceItem = Required<Pick<Item, 'title' | 'description' | 'icon'>>;

const serviceUiKey = (key: ServiceKey, field: 'title' | 'description'): UiKey => `home.services.${key}.${field}`;

export function getServiceItems(lang: Lang): ServiceItem[] {
  const t = useTranslations(lang);
  return serviceCatalog.map(({ key, icon }) => ({
    title: t(serviceUiKey(key, 'title')),
    description: t(serviceUiKey(key, 'description')),
    icon,
  }));
}
