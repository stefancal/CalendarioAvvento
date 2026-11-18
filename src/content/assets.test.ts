import { describe, expect, it } from 'vitest'
import { dayBackground, type AssetManifest } from './assets'
const manifest: AssetManifest = {logo:null,favicon:null,calendar:null,diary:null,chapters:{1:'/chapter.webp',2:'/chapter2.webp'},days:{2:'/day.webp'},documents:{},items:{}}
describe('background selection', () => {
  it('uses the day override, then the chapter, then the CSS fallback', () => {
    expect(dayBackground(2,manifest)).toBe('/day.webp')
    expect(dayBackground(1,manifest)).toBe('/chapter.webp')
    expect(dayBackground(5,manifest)).toBe('/chapter2.webp')
    expect(dayBackground(24,manifest)).toBeNull()
    expect(dayBackground(25,manifest)).toBeNull()
  })
})
