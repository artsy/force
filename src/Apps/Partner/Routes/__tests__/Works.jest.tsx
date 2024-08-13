import { MockBoot } from "DevTools/MockBoot"
import { ArtworksRefetchContainer } from "Apps/Partner/Routes/Works"
import { graphql } from "react-relay"
import { Works_Query } from "__generated__/Works_Query.graphql"
import { useTracking } from "react-tracking"
import { setupTestWrapper, setupTestWrapperTL } from "DevTools/setupTestWrapper"
import {
  artistAggregation,
  artistNationalityAggregation,
  materialsTermsAggregation,
  mediumAggregation,
} from "Apps/__tests__/Fixtures/aggregations"
import { fireEvent, screen, within } from "@testing-library/react"
import { useRouter } from "System/Hooks/useRouter"
import { getENV } from "Utils/getENV"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/Hooks/useRouter")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))
jest.mock("Utils/getENV", () => ({
  getENV: jest.fn(),
}))
jest.mock("System/Hooks/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(() => false),
}))

const { getWrapper } = setupTestWrapper<Works_Query>({
  Component: ({ partner }) => (
    <MockBoot user={{ id: "percy-z" }}>
      <ArtworksRefetchContainer partner={partner!} />
    </MockBoot>
  ),
  query: graphql`
    query Works_Query($partnerId: String!) @relay_test_operation {
      partner(id: $partnerId) {
        ...Works_partner
      }
    }
  `,
  variables: { partnerId: "pontone-gallery" },
})

const { renderWithRelay } = setupTestWrapperTL<Works_Query>({
  Component: ({ partner }) => (
    <MockBoot user={{ id: "percy-z" }}>
      <ArtworksRefetchContainer partner={partner!} />
    </MockBoot>
  ),
  query: graphql`
    query WorksTL_Query($partnerId: String!) @relay_test_operation {
      partner(id: $partnerId) {
        ...Works_partner
      }
    }
  `,
  variables: { partnerId: "pontone-gallery" },
})

describe("PartnerArtworks", () => {
  const trackEvent = jest.fn()
  const mockUseRouter = useRouter as jest.Mock
  const mockGetENV = getENV as jest.Mock
  const mockUseFeatureFlag = useFeatureFlag as jest.Mock

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })

    mockUseRouter.mockImplementation(() => ({
      match: {
        location: {
          query: {},
          pathname: "",
        },
      },
    }))
    mockUseFeatureFlag.mockImplementation(() => true)
  })

  it("renders correctly", () => {
    const { wrapper } = getWrapper()
    expect(wrapper.find("ArtworkFilterArtworkGrid").length).toBe(1)
    expect(wrapper.find("ArtworkGridItem").length).toBe(1)
  })

  it("renders filters in correct order", () => {
    const { wrapper } = getWrapper({
      FilterArtworksConnection: () => ({
        counts: {
          followedArtists: 10,
        },
        aggregations: [
          artistAggregation,
          mediumAggregation,
          materialsTermsAggregation,
          artistNationalityAggregation,
        ],
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

  // FIXME: Passes when run by itself, but fails when run with other tests
  it.skip("should render selected filters as pills", () => {
    renderWithRelay({
      FilterArtworksConnection: () => ({
        counts: {
          followedArtists: 10,
        },
        aggregations: [
          artistAggregation,
          mediumAggregation,
          materialsTermsAggregation,
          artistNationalityAggregation,
        ],
      }),
    })

    // Specify filters
    fireEvent.click(screen.getByText("Massimo Listri"))
    fireEvent.click(screen.getByText("Unique"))
    fireEvent.click(screen.getByText("Painting"))

    const container = screen.getByTestId("artworkGridFilterPills")

    expect(within(container).getByText("Massimo Listri")).toBeInTheDocument()
    expect(within(container).getByText("Unique")).toBeInTheDocument()
    expect(within(container).getByText("Painting")).toBeInTheDocument()
  })

  // FIXME: Passes when run by itself, but fails when run with other tests
  it.skip("should unselect filter option when the corresponding pill is removed", () => {
    renderWithRelay({
      FilterArtworksConnection: () => ({
        counts: {
          followedArtists: 10,
        },
        aggregations: [
          artistAggregation,
          mediumAggregation,
          materialsTermsAggregation,
          artistNationalityAggregation,
        ],
      }),
    })

    // Select artist
    const artistFilterOption = screen.getAllByRole("checkbox")[1]
    fireEvent.click(artistFilterOption)

    // expect(artistFilterOption).toHaveTextContent("Massimo Listri")
    expect(artistFilterOption).toBeChecked()

    const container = screen.getByTestId("artworkGridFilterPills")
    const pill = within(container).getByText("Massimo Listri")

    // Remove displayed artist pill
    fireEvent.click(pill)

    expect(pill).not.toBeInTheDocument()
    expect(screen.getAllByRole("checkbox")[1]).not.toBeChecked()
  })

  it("`Recommended` sort option should be selected by default for all partners", () => {
    renderWithRelay()
    expect(screen.getByText("Sort: Recommended")).toBeInTheDocument()
  })

  it("`Recently Added` sort option should be selected by default for `artsy-2` partner", () => {
    mockGetENV.mockImplementation(key => {
      switch (key) {
        case "ARTSY_MERCHANDISING_PARTNER_SLUGS":
          return "artsy-2"
      }
    })

    mockUseRouter.mockImplementation(() => ({
      match: {
        location: {
          query: {},
        },
        params: {
          partnerId: "artsy-2",
        },
      },
    }))

    renderWithRelay()

    expect(screen.getByText("Sort: Recently Added")).toBeInTheDocument()
  })
})
