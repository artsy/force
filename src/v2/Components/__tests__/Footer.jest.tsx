import { MockBoot } from "v2/DevTools/MockBoot"
import { mount } from "enzyme"
import React from "react"
import { Footer, LargeFooter, SmallFooter } from "../Footer"
import { DownloadAppBadge } from "v2/Components/DownloadAppBadge"
import { CCPARequest } from "../CCPARequest"

describe("Footer", () => {
  beforeAll(() => {
    window.matchMedia = undefined // Immediately set matching media query in Boot
  })

  const getSmallFooterWrapper = () =>
    mount(
      <MockBoot breakpoint="xs">
        <Footer />
      </MockBoot>
    )

  const getLargeFooterWrapper = () =>
    mount(
      <MockBoot breakpoint="lg">
        <Footer />
      </MockBoot>
    )

  it("is responsive", () => {
    const small = getSmallFooterWrapper()
    expect(small.find(SmallFooter).length).toEqual(1)

    const large = getLargeFooterWrapper()
    expect(large.find(LargeFooter).length).toEqual(1)
  })

  it("renders prompts to download the app", () => {
    const small = getSmallFooterWrapper()
    const large = getLargeFooterWrapper()

    expect(small.find("DownloadAppBanner").length).toEqual(0)
    expect(large.find("DownloadAppBanner").length).toEqual(1)
    expect(small.find(DownloadAppBadge).length).toEqual(1)
    expect(large.find(DownloadAppBadge).length).toEqual(1)
  })

  it("renders CCPA Wrapper component", () => {
    const small = getSmallFooterWrapper()
    const large = getLargeFooterWrapper()

    expect(small.find(CCPARequest).length).toEqual(1)
    expect(large.find(CCPARequest).length).toEqual(1)
  })
})
