import { graphql } from "react-relay"
import { GalleriesRouteFragmentContainer } from "Apps/Partners/Routes/GalleriesRoute"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { GalleriesRouteFragmentContainer_Test_Query } from "__generated__/GalleriesRouteFragmentContainer_Test_Query.graphql"
import { MockBoot } from "DevTools/MockBoot"
import { screen } from "@testing-library/react"
import { useTracking } from "react-tracking"
import { useRouter } from "System/Hooks/useRouter"

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter")
jest.mock("Components/FollowButton/FollowProfileButton", () => ({
  FollowProfileButtonQueryRenderer: () => null,
}))
jest.mock("react-tracking", () => ({
  useTracking: () => ({}),
}))
jest.mock("../../Components/PartnersFilters", () => ({
  PartnersFilters: () => null,
}))
jest.mock("../../Components/PartnersRails", () => ({
  PartnersRailsQueryRenderer: () => "PartnersRailsQueryRenderer",
}))
jest.mock("../../Components/PartnersFilteredCells", () => ({
  PartnersFilteredCellsQueryRenderer: () =>
    "PartnersFilteredCellsQueryRenderer",
}))
jest.mock("Utils/Hooks/useStableShuffle", () => ({
  useStableShuffle: ({ items }) => ({ shuffled: items }),
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
    query GalleriesRouteFragmentContainer_Test_Query @relay_test_operation {
      viewer {
        ...GalleriesRoute_viewer
      }
    }
  `,
})

describe("GalleriesRoute", () => {
  const mockTracking = useTracking as jest.Mock
  const mockUseRouter = useRouter as jest.Mock

  beforeAll(() => {
    mockTracking.mockImplementation(() => ({ trackEvent: jest.fn() }))
    mockUseRouter.mockImplementation(() => ({
      match: { location: { query: {} } },
    }))
  })

  afterEach(() => {
    mockTracking.mockReset()
    mockUseRouter.mockReset()
  })

  it("renders the page", () => {
    renderWithRelay()

    expect(
      screen.getByText("Interested in Listing Your Gallery on Artsy?")
    ).toBeInTheDocument()

    expect(screen.getByText("PartnersRailsQueryRenderer")).toBeInTheDocument()
  })

  describe("when querying", () => {
    beforeAll(() => {
      mockUseRouter.mockImplementation(() => ({
        match: { location: { query: { near: "0,0" } } },
      }))
    })

    it("renders the page with the filtered cells", () => {
      renderWithRelay()

      expect(
        screen.getByText("Interested in Listing Your Gallery on Artsy?")
      ).toBeInTheDocument()

      expect(
        screen.getByText("PartnersFilteredCellsQueryRenderer")
      ).toBeInTheDocument()
    })
  })
})
