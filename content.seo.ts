import { z } from 'zod'

export const SEO_TITLE_MAX = 60
export const SEO_DESCRIPTION_MIN = 120
export const SEO_DESCRIPTION_MAX = 160

export const createSeoSchema = () => z.object({
  title: z.string().min(1).max(SEO_TITLE_MAX),
  description: z.string().min(SEO_DESCRIPTION_MIN).max(SEO_DESCRIPTION_MAX)
})
