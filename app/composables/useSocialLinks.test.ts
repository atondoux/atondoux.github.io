import { describe, it, expect, vi, beforeEach } from 'vitest'
import { computed } from 'vue'
import { useSocialLinks } from './useSocialLinks'

// Mock auto-imports
vi.stubGlobal('computed', computed)

const mockLocale = { value: 'fr' }

vi.stubGlobal('useI18n', () => ({
  locale: mockLocale
}))

describe('useSocialLinks', () => {
  beforeEach(() => {
    mockLocale.value = 'fr'
  })

  describe('French locale', () => {
    beforeEach(() => {
      mockLocale.value = 'fr'
    })

    it('should return links in order: LinkedIn, Malt, GitHub', () => {
      const socialLinks = useSocialLinks()

      expect(socialLinks.value).toHaveLength(3)
      expect(socialLinks.value[0]['aria-label']).toBe('LinkedIn')
      expect(socialLinks.value[1]['aria-label']).toBe('Malt')
      expect(socialLinks.value[2]['aria-label']).toBe('GitHub')
    })

    it('should include LinkedIn link with French URL', () => {
      const socialLinks = useSocialLinks()
      const link = socialLinks.value.find(l => l['aria-label'] === 'LinkedIn')

      expect(link).toBeDefined()
      expect(link?.to).toBe('https://www.linkedin.com/in/atondoux/')
      expect(link?.icon).toBe('i-simple-icons-linkedin')
      expect(link?.target).toBe('_blank')
    })

    it('should include Malt link with French URL', () => {
      const socialLinks = useSocialLinks()
      const link = socialLinks.value.find(l => l['aria-label'] === 'Malt')

      expect(link).toBeDefined()
      expect(link?.to).toBe('https://www.malt.fr/profile/aurelientondoux')
      expect(link?.icon).toBe('i-simple-icons-malt')
      expect(link?.target).toBe('_blank')
    })

    it('should include GitHub link', () => {
      const socialLinks = useSocialLinks()
      const link = socialLinks.value.find(l => l['aria-label'] === 'GitHub')

      expect(link).toBeDefined()
      expect(link?.to).toBe('https://github.com/atondoux/')
      expect(link?.icon).toBe('i-simple-icons-github')
      expect(link?.target).toBe('_blank')
    })
  })

  describe('English locale', () => {
    beforeEach(() => {
      mockLocale.value = 'en'
    })

    it('should return links in order: LinkedIn, Malt, GitHub', () => {
      const socialLinks = useSocialLinks()

      expect(socialLinks.value).toHaveLength(3)
      expect(socialLinks.value[0]['aria-label']).toBe('LinkedIn')
      expect(socialLinks.value[1]['aria-label']).toBe('Malt')
      expect(socialLinks.value[2]['aria-label']).toBe('GitHub')
    })

    it('should include LinkedIn link with English locale parameter', () => {
      const socialLinks = useSocialLinks()
      const link = socialLinks.value.find(l => l['aria-label'] === 'LinkedIn')

      expect(link).toBeDefined()
      expect(link?.to).toBe('https://www.linkedin.com/in/atondoux/?locale=en_US')
      expect(link?.icon).toBe('i-simple-icons-linkedin')
      expect(link?.target).toBe('_blank')
    })

    it('should include Malt link with English URL', () => {
      const socialLinks = useSocialLinks()
      const link = socialLinks.value.find(l => l['aria-label'] === 'Malt')

      expect(link).toBeDefined()
      expect(link?.to).toBe('https://www.malt.com/profile/aurelientondoux')
      expect(link?.icon).toBe('i-simple-icons-malt')
      expect(link?.target).toBe('_blank')
    })

    it('should include GitHub link', () => {
      const socialLinks = useSocialLinks()
      const link = socialLinks.value.find(l => l['aria-label'] === 'GitHub')

      expect(link).toBeDefined()
      expect(link?.to).toBe('https://github.com/atondoux/')
      expect(link?.icon).toBe('i-simple-icons-github')
      expect(link?.target).toBe('_blank')
    })
  })
})
