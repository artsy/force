import { graphql } from "react-relay"
import { GalleriesRouteFragmentContainer } from "../Routes/GalleriesRoute"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { GalleriesRouteFragmentContainer_Test_Query } from "v2/__generated__/GalleriesRouteFragmentContainer_Test_Query.graphql"
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

const { renderWithRelay } = setupTestWrapperTL<
  GalleriesRouteFragmentContainer_Test_Query
>({
  Component: ({ viewer }) => {
    return (
      <MockBoot>
        <GalleriesRouteFragmentContainer viewer={viewer!} />
      </MockBoot>
    )
  },
  query: graphql`
    query GalleriesRouteFragmentContainer_Test_Query {
      viewer {
        ...GalleriesRoute_viewer
      }
    }
  `,
})

describe("GalleriesRoute", () => {
  const trackEvent = jest.fn()
  beforeEach(() => {
    renderWithRelay()
    ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
  })

  afterEach(() => {
    trackEvent.mockReset()
  })

  it("renders the page", () => {
    expect(screen.getByText("Browse Galleries")).toBeInTheDocument()
  })
})
