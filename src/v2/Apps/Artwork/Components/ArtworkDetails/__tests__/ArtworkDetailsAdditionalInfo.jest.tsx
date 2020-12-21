import React from "react"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ArtworkDetailsAdditionalInfoFragmentContainer } from "../ArtworkDetailsAdditionalInfo"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { MockBoot } from "v2/DevTools"
import { ArtworkDetailsAdditionalInfo_Test_Query } from "v2/__generated__/ArtworkDetailsAdditionalInfo_Test_Query.graphql"
import { AnalyticsContext } from "v2/Artsy"
import { OwnerType } from "@artsy/cohesion"

jest.unmock("react-relay")

jest.mock("v2/Artsy/Analytics/useTracking")

const { getWrapper } = setupTestWrapper<
  ArtworkDetailsAdditionalInfo_Test_Query
>({
  Component: props => {
    return (
      <MockBoot>
        <AnalyticsContext.Provider
          value={{
            contextPageOwnerId: "example-artwork-id",
            contextPageOwnerSlug: "example-artwork-slug",
            contextPageOwnerType: OwnerType.artwork,
          }}
        >
          <ArtworkDetailsAdditionalInfoFragmentContainer {...props} />
        </AnalyticsContext.Provider>
      </MockBoot>
    )
  },
  query: graphql`
    query ArtworkDetailsAdditionalInfo_Test_Query {
      artwork(id: "xxx") {
        ...ArtworkDetailsAdditionalInfo_artwork
      }
    }
  `,
})

describe("ArtworkDetailsAdditionalInfo", () => {
  const trackEvent = jest.fn()

  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
  })

  afterEach(() => {
    trackEvent.mockClear()
  })

  it("renders correctly", () => {
    const wrapper = getWrapper({
      Artwork: () => ({ category: "Painting" }),
    })

    const html = wrapper.html()

    expect(html).toContain("Medium")
    expect(html).toContain("Painting")
  })

  it("tracks the click on medium type", () => {
    const wrapper = getWrapper()

    wrapper.find("button").first().simulate("click")

    expect(trackEvent).toHaveBeenCalledWith({
      context_module: "aboutTheWork",
      context_page_owner_id: "example-artwork-id",
      context_page_owner_slug: "example-artwork-slug",
      context_page_owner_type: "artwork",
      subject: "Medium type info",
      type: "Link",
    })

    expect(trackEvent).toBeCalledTimes(1)
  })
})
