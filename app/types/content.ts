import type { Collections } from '@nuxt/content'

// Locale-agnostic collection item types (union of all locale variants)
export type IndexCollectionItem = Collections['index_fr'] | Collections['index_en']
export type PortfolioCollectionItem = Collections['portfolio_fr'] | Collections['portfolio_en']
export type PagesCollectionItem = Collections['pages_fr'] | Collections['pages_en']
export type AboutCollectionItem = Collections['about_fr'] | Collections['about_en']
