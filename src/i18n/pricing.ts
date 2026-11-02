import type { Item, Price } from '~/types';

import type { Lang, UiKey } from './ui';
import { useTranslations } from './utils';

const DAILY_RATE_EUR = 600;

interface PricingCatalogEntry {
  titleKey: UiKey;
  descriptionKey: UiKey;
  ribbonKey?: UiKey;
  dailyRate?: number;
  features: readonly { labelKey: UiKey; icon: string }[];
}

const pricingCatalog = [
  {
    titleKey: 'home.pricing.applications.title',
    descriptionKey: 'home.pricing.applications.description',
    features: [
      { labelKey: 'home.pricing.applications.features.planning', icon: 'tabler:clipboard-list' },
      { labelKey: 'home.pricing.applications.features.design', icon: 'tabler:sitemap' },
      { labelKey: 'home.pricing.applications.features.development', icon: 'tabler:code' },
      { labelKey: 'home.pricing.applications.features.deployment', icon: 'tabler:cloud-upload' },
      { labelKey: 'home.pricing.applications.features.maintenance', icon: 'tabler:tool' },
    ],
  },
  {
    titleKey: 'home.pricing.techLead.title',
    descriptionKey: 'home.pricing.techLead.description',
    ribbonKey: 'home.pricing.techLead.ribbon',
    dailyRate: DAILY_RATE_EUR,
    features: [
      { labelKey: 'home.pricing.techLead.features.leadership', icon: 'tabler:users' },
      { labelKey: 'home.pricing.techLead.features.craftsmanship', icon: 'tabler:diamond' },
      { labelKey: 'home.pricing.techLead.features.tdd', icon: 'tabler:flask' },
    ],
  },
  {
    titleKey: 'home.pricing.consulting.title',
    descriptionKey: 'home.pricing.consulting.description',
    features: [
      { labelKey: 'home.pricing.consulting.features.launch', icon: 'tabler:rocket' },
      { labelKey: 'home.pricing.consulting.features.audit', icon: 'tabler:zoom-check' },
      { labelKey: 'home.pricing.consulting.features.review', icon: 'tabler:code' },
    ],
  },
] as const satisfies readonly PricingCatalogEntry[];

type PricingEntry = (typeof pricingCatalog)[number];

export function getPricingPlans(lang: Lang): Price[] {
  const t = useTranslations(lang);
  const rateFormatter = new Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

  const toPlan = (plan: PricingEntry): Price => {
    const items: Item[] = plan.features.map(({ labelKey, icon }) => ({ description: t(labelKey), icon }));
    const featuredProps: Pick<Price, 'hasRibbon' | 'highlight' | 'ribbonTitle'> =
      'ribbonKey' in plan ? { hasRibbon: true, highlight: true, ribbonTitle: t(plan.ribbonKey) } : {};
    const rateProps: Pick<Price, 'price' | 'period'> =
      'dailyRate' in plan
        ? { price: rateFormatter.format(plan.dailyRate), period: t('home.pricing.perDay') }
        : { price: t('home.pricing.quote') };
    return { title: t(plan.titleKey), subtitle: t(plan.descriptionKey), items, ...rateProps, ...featuredProps };
  };

  return pricingCatalog.map(toPlan);
}
