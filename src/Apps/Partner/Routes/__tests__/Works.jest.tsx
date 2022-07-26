import { MockBoot } from "DevTools"
import { ArtworksRefetchContainer } from "../Works"
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

jest.unmock("react-relay")
jest.mock("System/Router/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: { query: {}, pathname: "" },
    },
  }),
}))
jest.mock("react-tracking")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
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

  beforeAll(() => {
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

  it("should render selected filters as pills", () => {
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

  it("should unselect filter option when the corresponding pill is removed", () => {
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

    expect(artistFilterOption).toHaveTextContent("Massimo Listri")
    expect(artistFilterOption).toBeChecked()

    const container = screen.getByTestId("artworkGridFilterPills")
    const pill = within(container).getByText("Massimo Listri")

    // Remove displayed artist pill
    fireEvent.click(pill)

    expect(pill).not.toBeInTheDocument()
    expect(screen.getAllByRole("checkbox")[1]).not.toBeChecked()
  })
})
