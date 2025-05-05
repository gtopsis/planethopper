import {
  createPlanetDestinationExtended,
  getElement,
  getElementAttribute,
  getElementClass,
  getElementContent,
} from '@/utils/test'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import PlanetDestinationListItem, {
  type Props as PlanetDestinationListItemProps,
} from '../PlanetDestinationListItem.vue'

const createPlanetDestinationListItemProps = (
  overrides: Partial<PlanetDestinationListItemProps> = {},
): PlanetDestinationListItemProps => {
  return {
    planetDestination: createPlanetDestinationExtended(overrides.planetDestination),
    isSelected: false,
    ...overrides,
  }
}

describe('PlanetDestinationListItem', () => {
  const selectorPrefix = 'planet-destination-'

  it('renders planet destination details correctly', () => {
    const wrapper = mount(PlanetDestinationListItem, {
      props: createPlanetDestinationListItemProps(),
    })

    const imageElement = getElement(wrapper, `${selectorPrefix}1-image`)
    expect(imageElement.attributes('src')).toBe('/tatooine.jpg')
    expect(imageElement.attributes('alt')).toBe('Image of planet Tatooine')
    expect(getElementContent(wrapper, `${selectorPrefix}1-name`)).toBe('Tatooine')
    expect(getElementContent(wrapper, `${selectorPrefix}1-terrain`)).toBe('Desert')
    expect(getElementContent(wrapper, `${selectorPrefix}1-population`)).toBe('200,000')
  })

  it(`displays a hyphen instead of "unknown" when planet terrain value is equals to 'unknown'`, () => {
    const wrapper = mount(PlanetDestinationListItem, {
      props: createPlanetDestinationListItemProps({
        planetDestination: createPlanetDestinationExtended({ terrain: 'unknown' }),
      }),
    })

    expect(getElementContent(wrapper, `${selectorPrefix}1-terrain`)).toBe('-')
  })

  it(`displays a hyphen instead of "unknown" when planet population value is equals to 'unknown'`, () => {
    const wrapper = mount(PlanetDestinationListItem, {
      props: createPlanetDestinationListItemProps({
        planetDestination: createPlanetDestinationExtended({ population: 'unknown' }),
      }),
    })

    expect(getElementContent(wrapper, `${selectorPrefix}1-population`)).toBe('-')
  })

  it('applies correct classes when not selected', () => {
    const wrapper = mount(PlanetDestinationListItem, {
      props: createPlanetDestinationListItemProps(),
    })

    expect(getElementClass(wrapper, `${selectorPrefix}1`)).toEqual(
      expect.arrayContaining(['border-surface', 'shadow-md', 'hover:cursor-pointer']),
    )
  })

  it('applies correct classes when selected', () => {
    const wrapper = mount(PlanetDestinationListItem, {
      props: createPlanetDestinationListItemProps({ isSelected: true }),
    })

    expect(getElementClass(wrapper, `${selectorPrefix}1`)).toEqual(
      expect.arrayContaining(['border-accent', 'shadow-lg', 'hover:cursor-auto']),
    )
  })

  it('emits select event when clicked and not selected', async () => {
    const wrapper = mount(PlanetDestinationListItem, {
      props: createPlanetDestinationListItemProps(),
    })

    await getElement(wrapper, `${selectorPrefix}1`).trigger('click')

    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')).toHaveLength(1)
  })

  it('does not emit select event when clicked and already selected', async () => {
    const wrapper = mount(PlanetDestinationListItem, {
      props: createPlanetDestinationListItemProps({ isSelected: true }),
    })

    await getElement(wrapper, `${selectorPrefix}1`).trigger('click')

    expect(wrapper.emitted('select')).toBeFalsy()
  })

  it('shows correct tooltip text when not selected', () => {
    const wrapper = mount(PlanetDestinationListItem, {
      props: createPlanetDestinationListItemProps(),
    })

    expect(getElementAttribute(wrapper, `${selectorPrefix}1`, 'title')).toBe(
      'Add destination to travel plan',
    )
  })

  it('shows no tooltip text when selected', () => {
    const wrapper = mount(PlanetDestinationListItem, {
      props: createPlanetDestinationListItemProps({ isSelected: true }),
    })

    expect(getElementAttribute(wrapper, `${selectorPrefix}1`, 'title')).toBe('')
  })

  it('formats population number correctly', () => {
    const wrapper = mount(PlanetDestinationListItem, {
      props: createPlanetDestinationListItemProps({
        planetDestination: createPlanetDestinationExtended({ population: '1000000' }),
      }),
    })

    expect(getElementContent(wrapper, `${selectorPrefix}1-population`)).toBe('1,000,000')
  })
})
