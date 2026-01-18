import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, computed } from 'vue'
import ThemeSwitcher from './ThemeSwitcher.vue'

// Mock auto-imports
vi.stubGlobal('computed', computed)

// Mock useColorMode
const mockColorMode = {
  value: 'dark' as 'dark' | 'light',
  preference: 'dark' as 'dark' | 'light'
}

vi.stubGlobal('useColorMode', () => mockColorMode)

// Mock components
const UButton = defineComponent({
  name: 'UButton',
  props: ['ariaLabel', 'icon', 'color', 'variant', 'size'],
  emits: ['click'],
  setup(props, { emit, attrs }) {
    return () => h('button', {
      ...attrs,
      'aria-label': props.ariaLabel,
      icon: props.icon,
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

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockColorMode.value = 'dark'
    mockColorMode.preference = 'dark'
  })

  const mountComponent = () => {
    return mount(ThemeSwitcher, {
      global: {
        stubs: {
          UButton,
          ClientOnly
        }
      }
    })
  }

  it('should switch to light theme when current theme is dark', async () => {
    mockColorMode.value = 'dark'
    const wrapper = mountComponent()
    const button = wrapper.find('[data-testid="theme-switcher"]')

    expect(button.attributes('aria-label')).toBe('Switch to light mode')
    expect(button.attributes('icon')).toBe('i-lucide-moon')

    await button.trigger('click')
    expect(mockColorMode.preference).toBe('light')
  })

  it('should switch to dark theme when current theme is light', async () => {
    mockColorMode.value = 'light'
    const wrapper = mountComponent()
    const button = wrapper.find('[data-testid="theme-switcher"]')

    expect(button.attributes('aria-label')).toBe('Switch to dark mode')
    expect(button.attributes('icon')).toBe('i-lucide-sun')

    await button.trigger('click')
    expect(mockColorMode.preference).toBe('dark')
  })
})
