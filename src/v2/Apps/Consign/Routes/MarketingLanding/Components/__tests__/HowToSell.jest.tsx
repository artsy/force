import React from "react"
import { mount } from "enzyme"
import { MockBoot } from "v2/DevTools"
import { Header } from "../Header"
import { Breakpoint } from "@artsy/palette"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")

describe("HowToSell", () => {
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
        <Header />
      </MockBoot>
    )
  }

  it("links out to submission flow", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("RouterLink").props().to).toBe("/consign/submission")
  })

  // TODO: need analytics event
  it("tracks click", () => {
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
