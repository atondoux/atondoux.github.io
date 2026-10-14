import type { Item } from '~/types';

import type { Lang, UiKey } from './ui';
import { useTranslations } from './utils';

const serviceCatalog = [
  { key: 'techLeadership', icon: 'tabler:compass' },
  { key: 'fullStack', icon: 'tabler:stack-2' },
  { key: 'projectBootstrap', icon: 'tabler:rocket' },
  { key: 'legacyRecovery', icon: 'tabler:package' },
  { key: 'codeReview', icon: 'tabler:zoom-code' },
  { key: 'devopsCloud', icon: 'tabler:cloud-cog' },
  { key: 'architecture', icon: 'tabler:components' },
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
