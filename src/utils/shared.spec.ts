import { describe, expect, it } from 'vitest'
import { getRandomIntegersInRange, isValidUrl } from './shared'

describe('getRandomIntegersInRange', () => {
  it('returns a number within the specified range', () => {
    const min = 1
    const max = 10

    const randomInteger = getRandomIntegersInRange(min, max)

    expect(randomInteger).toBeGreaterThanOrEqual(min)
    expect(randomInteger).toBeLessThanOrEqual(max)
    expect(Number.isInteger(randomInteger)).toBe(true)
  })

  it('handles min equal to max', () => {
    const value = 5
    const randomInteger = getRandomIntegersInRange(value, value)
    expect(randomInteger).toBe(value)
  })

  it('handles negative numbers', () => {
    const min = -10
    const max = -5

    const randomInteger = getRandomIntegersInRange(min, max)

    expect(randomInteger).toBeGreaterThanOrEqual(min)
    expect(randomInteger).toBeLessThanOrEqual(max)
    expect(Number.isInteger(randomInteger)).toBe(true)
  })
})

describe('isValidUrl', () => {
  it('returns true for matching URLs', () => {
    const url1 = 'https://example.com/path'
    const url2 = 'https://example.com/path'

    expect(isValidUrl(url1, url2)).toBe(true)
  })

  it('returns true for matching URLs with different query parameters', () => {
    const url1 = 'https://example.com/path?param1=value1'
    const url2 = 'https://example.com/path?param2=value2'

    expect(isValidUrl(url1, url2)).toBe(true)
  })

  it('returns false for URLs with different origins', () => {
    const url1 = 'https://example.com/path'
    const url2 = 'https://different.com/path'

    expect(isValidUrl(url1, url2)).toBe(false)
  })

  it('returns false for URLs with different paths', () => {
    const url1 = 'https://example.com/path1'
    const url2 = 'https://example.com/path2'

    expect(isValidUrl(url1, url2)).toBe(false)
  })

  it('returns false for invalid URL strings', () => {
    const url1 = 'not-a-url'
    const url2 = 'https://example.com'

    expect(isValidUrl(url1, url2)).toBe(false)
  })

  it('returns false when both URLs are invalid', () => {
    const url1 = 'not-a-url'
    const url2 = 'also-not-a-url'

    expect(isValidUrl(url1, url2)).toBe(false)
  })
})
