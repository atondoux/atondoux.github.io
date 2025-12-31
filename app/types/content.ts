import type { Collections } from '@nuxt/content'

// Locale-agnostic collection item types (union of all locale variants)
export type IndexCollectionItem = Collections['index_fr'] | Collections['index_en']
export type ProjectsCollectionItem = Collections['projects_fr'] | Collections['projects_en']
export type PagesCollectionItem = Collections['pages_fr'] | Collections['pages_en']
export type SpeakingCollectionItem = Collections['speaking_fr'] | Collections['speaking_en']
export type AboutCollectionItem = Collections['about_fr'] | Collections['about_en']
