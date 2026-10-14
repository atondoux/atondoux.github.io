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
    titleKey: 'home.pricing.fullStack.title',
    descriptionKey: 'home.pricing.fullStack.description',
    dailyRate: DAILY_RATE_EUR,
    features: [
      { labelKey: 'home.pricing.fullStack.features.design', icon: 'tabler:users' },
      { labelKey: 'home.pricing.fullStack.features.backend', icon: 'tabler:server' },
      { labelKey: 'home.pricing.fullStack.features.frontend', icon: 'tabler:layout-dashboard' },
      { labelKey: 'home.pricing.fullStack.features.deployment', icon: 'tabler:rocket' },
    ],
  },
  {
    titleKey: 'home.pricing.techLead.title',
    descriptionKey: 'home.pricing.techLead.description',
    ribbonKey: 'home.pricing.techLead.ribbon',
    dailyRate: DAILY_RATE_EUR,
    features: [
      { labelKey: 'home.pricing.techLead.features.craftsmanship', icon: 'tabler:diamond' },
      { labelKey: 'home.pricing.techLead.features.tdd', icon: 'tabler:flask' },
      { labelKey: 'home.pricing.techLead.features.bestPractices', icon: 'tabler:award' },
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
