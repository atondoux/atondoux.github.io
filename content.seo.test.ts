import { describe, it, expect } from 'vitest'
import {
  createSeoSchema,
  SEO_TITLE_MAX,
  SEO_DESCRIPTION_MIN,
  SEO_DESCRIPTION_MAX
} from './content.seo'

const schema = createSeoSchema()

const title = (length: number) => 'a'.repeat(length)
const description = (length: number) => 'a'.repeat(length)

describe('seo schema', () => {
  it('accepts a title at the maximum length and a description within range', () => {
    const result = schema.safeParse({
      title: title(SEO_TITLE_MAX),
      description: description(SEO_DESCRIPTION_MIN)
    })

    expect(result.success).toBe(true)
  })

  it('accepts a description at the maximum length', () => {
    const result = schema.safeParse({
      title: title(10),
      description: description(SEO_DESCRIPTION_MAX)
    })

    expect(result.success).toBe(true)
  })

  it('rejects an empty title', () => {
    const result = schema.safeParse({
      title: '',
      description: description(SEO_DESCRIPTION_MIN)
    })

    expect(result.success).toBe(false)
  })

  it('rejects a title longer than the maximum', () => {
    const result = schema.safeParse({
      title: title(SEO_TITLE_MAX + 1),
      description: description(SEO_DESCRIPTION_MIN)
    })

    expect(result.success).toBe(false)
  })

  it('rejects a description shorter than the minimum', () => {
    const result = schema.safeParse({
      title: title(10),
      description: description(SEO_DESCRIPTION_MIN - 1)
    })

    expect(result.success).toBe(false)
  })

  it('rejects a description longer than the maximum', () => {
    const result = schema.safeParse({
      title: title(10),
      description: description(SEO_DESCRIPTION_MAX + 1)
    })

    expect(result.success).toBe(false)
  })
})
