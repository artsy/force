import { MockBoot } from "v2/DevTools"
import React from "react"
import { GeneArtworkFilterRefetchContainer } from "../GeneArtworkFilter"
import { graphql } from "react-relay"
import { GeneArtworkFilter_Query } from "v2/__generated__/GeneArtworkFilter_Query.graphql"
import { useTracking } from "v2/System/Analytics/useTracking"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import {
  artistAggregation,
  artistNationalityAggregation,
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

const { getWrapper } = setupTestWrapper<GeneArtworkFilter_Query>({
  Component: ({ gene }) => (
    <MockBoot user={{ id: "percy-z" }}>
      <GeneArtworkFilterRefetchContainer gene={gene!} />
    </MockBoot>
  ),
  query: graphql`
    query GeneArtworkFilter_Query($slug: String!) {
      gene(id: $slug) {
        ...GeneArtworkFilter_gene @arguments(shouldFetchCounts: true)
      }
    }
  `,
  variables: { slug: "representations-of-architecture" },
})

describe("GeneArtworkFilter", () => {
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
      FilterArtworksConnection: () => ({
        counts: {
          followedArtists: 10,
        },
        aggregations: [
          artistAggregation,
          partnerAggregation,
          locationCityAggregation,
          mediumAggregation,
          materialsTermsAggregation,
          artistNationalityAggregation,
        ],
      }),
    })
    const filterWrappers = wrapper.find("FilterExpandable")
    const filters = [
      {
        label: "Artists",
        expanded: true,
      },
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
        label: "Artist Nationality or Ethnicity",
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
