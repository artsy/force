import { ShowArtworksRefetchContainer } from "../Components/ShowArtworks"
import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ShowArtworks_Test_Query } from "v2/__generated__/ShowArtworks_Test_Query.graphql"
import { MockBoot } from "v2/DevTools"
import { useTracking } from "v2/System/Analytics/useTracking"
import {
  artistAggregation,
  artistNationalityAggregation,
  materialsTermsAggregation,
  mediumAggregation,
} from "test/fixtures/aggregations"

jest.unmock("react-relay")
jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: () => ({ match: { location: { query: {} } } }),
}))
jest.mock("v2/System/Analytics/useTracking")
jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

const { getWrapper } = setupTestWrapper<ShowArtworks_Test_Query>({
  Component: ({ show }) => (
    <MockBoot>
      <ShowArtworksRefetchContainer
        aggregations={[
          artistAggregation,
          mediumAggregation,
          materialsTermsAggregation,
          artistNationalityAggregation,
        ]}
        counts={{
          followedArtists: 10,
        }}
        show={show!}
      />
    </MockBoot>
  ),
  query: graphql`
    query ShowArtworks_Test_Query @relay_test_operation {
      show(id: "catty-show") {
        ...ShowArtworks_show
      }
    }
  `,
})

describe("ShowArtworks", () => {
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
        label: "Time Period",
      },
      {
        label: "Color",
      },
    ]

    filters.forEach((filter, filterIndex) => {
      const { label, expanded } = filter

      expect(filterWrappers.at(filterIndex).prop("label")).toEqual(label)
      expect(filterWrappers.at(filterIndex).prop("expanded")).toEqual(expanded)
    })
  })
})
