import TripPlanList, { type Props } from '@/components/TripPlanList.vue'
import type { TripPlanItem } from '@/types'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

const createTripPlanListProps = (overrides: Partial<Props> = {}) => {
  return {
    tripPlanItems: [createTripPlanItem()],
    ...overrides,
  }
}

const createTripPlanItem = (overrides: Partial<TripPlanItem> = {}) => {
  return {
    id: '1',
    name: 'Mars',
    ...overrides,
  }
}

describe('TripPlanList', () => {
  it('renders correct a list of trip plan items', () => {
    const wrapper = mount(TripPlanList, { props: createTripPlanListProps() })

    expect(wrapper.find("[data-testid='trip-plan-list']").exists()).toBe(true)
    expect(wrapper.find("[data-testid='trip-plan-list-empty']").exists()).toBe(false)
    expect(wrapper.findAll("[data-testid='trip-plan-list-item']")).toHaveLength(1)
  })

  it('display a proper message instead of a list of trip plan items when none is provided', () => {
    const wrapper = mount(TripPlanList, { props: createTripPlanListProps({ tripPlanItems: [] }) })

    expect(wrapper.find("[data-testid='trip-plan-list']").exists()).toBe(false)
    expect(wrapper.find("[data-testid='trip-plan-list-empty']").exists()).toBe(true)
    expect(wrapper.findAll("[data-testid='trip-plan-list-item']")).toHaveLength(0)
  })

  it('renders correct details for a trip plan item', () => {
    const wrapper = mount(TripPlanList, { props: createTripPlanListProps() })

    expect(wrapper.findAll("[data-testid='trip-plan-list-item']")).toHaveLength(1)
    expect(wrapper.find("[data-testid='trip-plan-list-item-name']").text()).toBe('Mars')
  })
})
