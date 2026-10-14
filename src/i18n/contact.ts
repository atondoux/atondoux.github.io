import type { CallToAction, Item } from '~/types';

import type { Lang, UiKey } from './ui';
import { useTranslations } from './utils';

const EMAIL_ADDRESS = 'atondoux@gmail.com';
const MAIL_ICON = 'tabler:mail';
const EXTERNAL_TARGET = '_blank';

const MAILTO_HREF = `mailto:${EMAIL_ADDRESS}`;

interface ContactCatalogEntry {
  titleKey: UiKey;
  icon: string;
  display: string;
  href: string | Record<Lang, string>;
  external?: boolean;
}

const contactCatalog = [
  { titleKey: 'home.contact.email.title', icon: MAIL_ICON, display: EMAIL_ADDRESS, href: MAILTO_HREF },
  {
    titleKey: 'home.contact.linkedin.title',
    icon: 'tabler:brand-linkedin',
    display: 'linkedin.com/in/atondoux',
    href: {
      fr: 'https://www.linkedin.com/in/atondoux/',
      en: 'https://www.linkedin.com/in/atondoux/?locale=en_US',
    },
    external: true,
  },
] as const satisfies readonly ContactCatalogEntry[];

type ContactEntry = (typeof contactCatalog)[number];

const resolveHref = (href: ContactEntry['href'], lang: Lang): string => (typeof href === 'string' ? href : href[lang]);

export function getContactItems(lang: Lang): Item[] {
  const t = useTranslations(lang);

  const toItem = (entry: ContactEntry): Item => ({
    title: t(entry.titleKey),
    description: entry.display,
    icon: entry.icon,
    href: resolveHref(entry.href, lang),
    ...('external' in entry ? { target: EXTERNAL_TARGET } : {}),
  });

  return contactCatalog.map(toItem);
}

export function getContactCallToAction(lang: Lang): CallToAction {
  const t = useTranslations(lang);

  return { text: t('home.contact.cta'), href: MAILTO_HREF, icon: MAIL_ICON };
}
