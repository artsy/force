import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { mount } from "enzyme"
import React from "react"
import { MobileLink } from "../MobileLink"

jest.mock("v2/Artsy/Analytics/useTracking")

describe("", () => {
  const trackEvent = jest.fn()
  const getWrapper = () => {
    return mount(
      <MobileLink href="/auctions" contextModule="Header">
        Auctions
      </MobileLink>
    )
  }

  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return { trackEvent }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("tracks MobileLink clicks", () => {
    const mobileLink = getWrapper().find("Link")

    mobileLink.first().simulate("click")

    expect(trackEvent).toHaveBeenCalledWith({
      action_type: "Click",
      context_module: "Header",
      flow: "Header",
      subject: "Auctions",
      destination_path: "/auctions",
    })
  })
})
