import { GeneArtworkFilterRefetchContainer } from "Apps/Gene/Components/GeneArtworkFilter"
import {
  artistAggregation,
  artistNationalityAggregation,
  locationCityAggregation,
  materialsTermsAggregation,
  mediumAggregation,
  partnerAggregation,
} from "Apps/__tests__/Fixtures/aggregations"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { GeneArtworkFilterTestQuery } from "__generated__/GeneArtworkFilterTestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter", () => ({
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

const { renderWithRelay } = setupTestWrapperTL<GeneArtworkFilterTestQuery>({
  Component: ({ gene }) => (
    <MockBoot user={{ id: "percy-z" }}>
      <GeneArtworkFilterRefetchContainer gene={gene!} />
    </MockBoot>
  ),
  query: graphql`
    query GeneArtworkFilterTestQuery($slug: String!) @relay_test_operation {
      gene(id: $slug) {
        ...GeneArtworkFilter_gene
      }
    }
  `,
  variables: { slug: "representations-of-architecture" },
})

describe("GeneArtworkFilter", () => {
  const trackEvent = jest.fn()

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("renders correctly", () => {
    renderWithRelay()
    expect(screen.getByTestId("artwork-link")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "All Filters" }),
    ).toBeInTheDocument()
  })

  it("renders filters in correct order", () => {
    renderWithRelay({
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

    expect(
      screen.getByRole("button", { name: "All Filters" }),
    ).toBeInTheDocument()
  })
})
