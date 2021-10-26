import { graphql } from "react-relay"
import { InstitutionsRouteFragmentContainer } from "../InstitutionsRoute"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { InstitutionsRouteFragmentContainer_Test_Query } from "v2/__generated__/InstitutionsRouteFragmentContainer_Test_Query.graphql"
import { MockBoot } from "v2/DevTools"
import { screen } from "@testing-library/react"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")

jest.mock("v2/Components/FollowButton/FollowProfileButton", () => ({
  FollowProfileButtonFragmentContainer: () => null,
}))

jest.mock("v2/System/Analytics/useTracking", () => ({
  useTracking: () => ({}),
}))

jest.mock("../../Components/PartnersFilters", () => ({
  PartnersFilters: () => null,
}))

const { renderWithRelay } = setupTestWrapperTL<
  InstitutionsRouteFragmentContainer_Test_Query
>({
  Component: ({ viewer }) => {
    return (
      <MockBoot>
        <InstitutionsRouteFragmentContainer viewer={viewer!} />
      </MockBoot>
    )
  },
  query: graphql`
    query InstitutionsRouteFragmentContainer_Test_Query {
      viewer {
        ...InstitutionsRoute_viewer
      }
    }
  `,
})

describe("InstitutionsRoute", () => {
  const trackEvent = jest.fn()
  beforeEach(() => {
    renderWithRelay()
    ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
  })

  afterEach(() => {
    trackEvent.mockReset()
  })

  it("renders the page", () => {
    expect(screen.getByText("Browse Institutions")).toBeInTheDocument()
  })
})
