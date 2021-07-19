import { MockBoot } from "v2/DevTools"
import React from "react"
import { ArtistArtworkFilterRefetchContainer } from "../Components/ArtistArtworkFilter"
import { graphql } from "react-relay"
import { ArtistArtworkFilter_Query } from "v2/__generated__/ArtistArtworkFilter_Query.graphql"
import { useTracking } from "v2/System/Analytics/useTracking"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import {
  locationCityAggregation,
  materialsTermsAggregation,
  mediumAggregation,
  partnerAggregation,
} from "test/fixtures/aggregations"

jest.unmock("react-relay")
jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: { query: {} },
    },
  }),
}))
jest.mock("v2/System/Analytics/useTracking")
jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  useMatchMedia: () => ({}),
}))

const { getWrapper } = setupTestWrapper<ArtistArtworkFilter_Query>({
  Component: ({ artist }) => (
    <MockBoot user={{ id: "percy-z" }}>
      <ArtistArtworkFilterRefetchContainer
        aggregations={[
          partnerAggregation,
          locationCityAggregation,
          mediumAggregation,
          materialsTermsAggregation,
        ]}
        artist={artist!}
      />
    </MockBoot>
  ),
  query: graphql`
    query ArtistArtworkFilter_Query($artistID: String!) {
      artist(id: $artistID) {
        ...ArtistArtworkFilter_artist
      }
    }
  `,
  variables: { artistID: "amoako-boafo" },
})

describe("ArtistArtworkFilter", () => {
  const trackEvent = jest.fn()

  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("renders correctly", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("ArtworkFilterArtworkGrid").length).toBe(1)
    expect(wrapper.find("ArtworkGridItem").length).toBe(1)
  })

  it("renders filters in correct order", () => {
    const wrapper = getWrapper({
      ArtistCounts: () => ({
        artworks: 1,
      }),
    })
    const filterWrappers = wrapper.find("FilterExpandable")
    const filters = [
      {
        label: "Rarity",
        expanded: true,
      },
      {
        label: "Medium",
        expanded: true,
      },
      {
        label: "Price",
        expanded: true,
      },
      {
        label: "Size",
        expanded: true,
      },
      {
        label: "Ways to Buy",
        expanded: true,
      },
      {
        label: "Material",
      },
      {
        label: "Artwork Location",
      },
      {
        label: "Time Period",
      },
      {
        label: "Color",
      },
      {
        label: "Galleries and Institutions",
      },
    ]

    filters.forEach((filter, filterIndex) => {
      const { label, expanded } = filter

      expect(filterWrappers.at(filterIndex).prop("label")).toEqual(label)
      expect(filterWrappers.at(filterIndex).prop("expanded")).toEqual(expanded)
    })
  })
})
