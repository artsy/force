import React from "react"
import { mount } from "enzyme"
import { MockBoot } from "v2/DevTools"
import { Breakpoint } from "@artsy/palette"
import { useTracking } from "react-tracking"
import { SellWithArtsy, tests } from "../SellWithArtsy"

jest.mock("react-tracking")

describe("SellWithArtsy", () => {
  const trackEvent = jest.fn()

  beforeEach(() => {
    const mockTracking = useTracking as jest.Mock
    mockTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const getWrapper = (breakpoint = "lg") => {
    return mount(
      <MockBoot breakpoint={breakpoint as Breakpoint}>
        <SellWithArtsy />
      </MockBoot>
    )
  }

  it("links out to submission flow", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("Link").props().href).toBe(tests.DOWNLOAD_URL)
  })

  // TODO: Wire up tracking
  it("tracks clicks", () => {
    // expect(trackEvent).toHaveBeenCalledWith(
    //   expect.objectContaining({
    //     action: "clickedArticleGroup",
    //     context_module: "relatedArticles",
    //     context_page_owner_type: "consign",
    //     destination_page_owner_id: expect.any(String),
    //     destination_page_owner_slug: expect.any(String),
    //     destination_page_owner_type: "article",
    //     type: "thumbnail",
    //   })
    // )
  })
})
