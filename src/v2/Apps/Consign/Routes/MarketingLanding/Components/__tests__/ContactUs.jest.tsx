import React from "react"
import { mount } from "enzyme"
import { ContactUs } from "../ContactUs"
import { MockBoot } from "v2/DevTools"
import { Breakpoint } from "@artsy/palette"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")

describe("ContactUs", () => {
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

  const getWrapper = (breakpoint = "md") => {
    return mount(
      <MockBoot breakpoint={breakpoint as Breakpoint}>
        <ContactUs />
      </MockBoot>
    )
  }

  it("contains correct email in body", () => {
    const wrapper = getWrapper()
    expect(wrapper.text()).toContain(
      "Email us at consign@artsy.net or call +1-646-797-3423 for more information on how Artsy can sell your artwork."
    ) // pull text minus divs
  })

  it("has correct email link", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("Link").props().href).toBe("mailto:consign@artsy.net")
    const wrapperMobile = getWrapper("xs")
    expect(wrapperMobile.find("Link").props().href).toBe(
      "mailto:consign@artsy.net"
    )
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
