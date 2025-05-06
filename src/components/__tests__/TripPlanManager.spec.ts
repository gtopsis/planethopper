import TripPlanManager from '@/components/TripPlanManager.vue'
import { createTestingPinia } from '@pinia/testing'
import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('TripPlanManager', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it.only('renders properly', () => {
    const wrapper = shallowMount(TripPlanManager, {
      global: {
        plugins: [createTestingPinia()],
      },
    })

    expect(wrapper.exists()).toBe(true)
  })
})
