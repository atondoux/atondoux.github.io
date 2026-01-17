import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, computed } from 'vue'
import LanguageSwitcher from './LanguageSwitcher.vue'

// Mock auto-imports
vi.stubGlobal('computed', computed)

// Mock useI18n
const mockSetLocale = vi.fn()
const mockLocales = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' }
]
const mockLocale = { value: 'en' }

vi.stubGlobal('useI18n', () => ({
  locale: mockLocale,
  locales: { value: mockLocales },
  setLocale: mockSetLocale
}))

// Mock components
const UButton = defineComponent({
  name: 'UButton',
  props: ['ariaLabel', 'icon', 'color', 'variant', 'size'],
  emits: ['click'],
  setup(props, { emit, attrs }) {
    return () => h('button', {
      ...attrs,
      'aria-label': props.ariaLabel,
      onClick: (e: MouseEvent) => emit('click', e)
    })
  }
})

const ClientOnly = defineComponent({
  name: 'ClientOnly',
  setup(_, { slots }) {
    return () => slots.default?.()
  }
})

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockLocale.value = 'en'
  })

  const mountComponent = () => {
    return mount(LanguageSwitcher, {
      global: {
        stubs: {
          UButton,
          ClientOnly
        }
      }
    })
  }

  it('should switch from English to French when locale is en', async () => {
    mockLocale.value = 'en'
    const wrapper = mountComponent()
    const button = wrapper.find('[data-testid="language-switcher"]')

    expect(button.attributes('aria-label')).toBe('Switch to Français')

    await button.trigger('click')
    expect(mockSetLocale).toHaveBeenCalledWith('fr')
  })

  it('should switch from French to English when locale is fr', async () => {
    mockLocale.value = 'fr'
    const wrapper = mountComponent()
    const button = wrapper.find('[data-testid="language-switcher"]')

    expect(button.attributes('aria-label')).toBe('Switch to English')

    await button.trigger('click')
    expect(mockSetLocale).toHaveBeenCalledWith('en')
  })

})
