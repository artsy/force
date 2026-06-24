import {
  DESKTOP_SECOND_TIER,
  DESKTOP_TOP_TIER,
  MOBILE_NAV_LAYOUT,
  NAV_ITEMS,
  SEPARATOR,
} from "Components/NavBar/navItems"

describe("nav items parity", () => {
  const desktopIds = [...DESKTOP_TOP_TIER, ...DESKTOP_SECOND_TIER]
  const mobileIds = MOBILE_NAV_LAYOUT.filter(entry => entry !== SEPARATOR)
  const registryIds = Object.keys(NAV_ITEMS)

  it("renders the same set of items on desktop and mobile", () => {
    // If this fails, a link was added to one platform's layout but not the
    // other. Add it to both DESKTOP_* and MOBILE_NAV_LAYOUT in navItems.ts.
    expect(new Set(desktopIds)).toEqual(new Set(mobileIds))
  })

  it("places every registry item in both layouts (no orphaned definitions)", () => {
    expect(new Set(desktopIds)).toEqual(new Set(registryIds))
    expect(new Set(mobileIds)).toEqual(new Set(registryIds))
  })

  it("does not place an item more than once within a platform", () => {
    expect(desktopIds.length).toBe(new Set(desktopIds).size)
    expect(mobileIds.length).toBe(new Set(mobileIds).size)
  })
})
