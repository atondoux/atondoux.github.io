import { describe, it, expect } from 'vitest'
import { normalizePathForCanonical } from './useSeo'

describe('normalizePathForCanonical', () => {
  it('removes trailing slash from basic paths', () => {
    expect(normalizePathForCanonical('/about/')).toBe('/about')
  })

  it('preserves root path exactly', () => {
    expect(normalizePathForCanonical('/')).toBe('/')
  })

  it('normalizes locale root from /en/ to /en', () => {
    expect(normalizePathForCanonical('/en/')).toBe('/en')
  })

  it('normalizes locale paths', () => {
    expect(normalizePathForCanonical('/en/about/')).toBe('/en/about')
  })

  it('is idempotent - normalizing already normalized path returns same result', () => {
    expect(normalizePathForCanonical('/about')).toBe('/about')
  })

  it('handles dynamic routes', () => {
    expect(normalizePathForCanonical('/projects/malt/')).toBe('/projects/malt')
  })

  it('handles deeply nested paths', () => {
    expect(normalizePathForCanonical('/en/products/my-product/')).toBe('/en/products/my-product')
  })
})
