import { ShowArtworksRefetchContainer } from "Apps/Show/Components/ShowArtworks"
import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { ShowArtworks_Test_Query } from "__generated__/ShowArtworks_Test_Query.graphql"
import { MockBoot } from "DevTools/MockBoot"
import { useTracking } from "react-tracking"
import {
  artistAggregation,
  artistNationalityAggregation,
  materialsTermsAggregation,
  mediumAggregation,
} from "Apps/__tests__/Fixtures/aggregations"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: { location: { query: {}, pathname: "" } },
  }),
}))
jest.mock("react-tracking")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))
jest.mock("System/Hooks/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(() => false),
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
  const mockUseFeatureFlag = useFeatureFlag as jest.Mock

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
    mockUseFeatureFlag.mockImplementation(() => true)
  })

  it("renders correctly", () => {
    const { wrapper } = getWrapper({ Show: () => ({ __typename: "Show" }) })

    expect(wrapper.find("ArtworkFilterArtworkGrid").length).toBe(1)
    expect(wrapper.find("ArtworkGridItem").length).toBe(1)
  })

  it("renders filters in correct order", () => {
    const { wrapper } = getWrapper({
      FilterArtworksConnection: () => ({
        counts: {
          followedArtists: 10,
        },
      }),
    })
    const filterWrappers = wrapper.find("FilterExpandable")
    const filters = [
      {
        label: "Keyword Search",
        expanded: true,
      },
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
        label: "Availability",
        expanded: true,
      },
      {
        label: "Ways to Buy",
        expanded: true,
      },
      {
        label: "Material",
        expanded: true,
      },
      {
        label: "Artist Nationality or Ethnicity",
        expanded: true,
      },
      {
        label: "Time Period",
        expanded: true,
      },
      {
        label: "Color",
        expanded: true,
      },
    ]

    filters.forEach((filter, filterIndex) => {
      const { label, expanded } = filter

      expect(filterWrappers.at(filterIndex).prop("label")).toEqual(label)
      expect(filterWrappers.at(filterIndex).prop("expanded")).toEqual(expanded)
    })
  })
})
