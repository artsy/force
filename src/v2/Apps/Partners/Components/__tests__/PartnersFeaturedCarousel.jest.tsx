import { screen } from "@testing-library/react"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { PartnersFeaturedCarouselFragmentContainer } from "../PartnersFeaturedCarousel"
import { PartnersFeaturedCarousel_Test_Query } from "v2/__generated__/PartnersFeaturedCarousel_Test_Query.graphql"
import { useRouter } from "v2/System/Router/useRouter"

jest.unmock("react-relay")
jest.mock("v2/System/Router/useRouter")
jest.mock("v2/Utils/Hooks/useStableShuffle", () => ({
  useStableShuffle: ({ items }) => ({ shuffled: items }),
}))

const { renderWithRelay } = setupTestWrapperTL<
  PartnersFeaturedCarousel_Test_Query
>({
  Component: PartnersFeaturedCarouselFragmentContainer,
  query: graphql`
    query PartnersFeaturedCarousel_Test_Query @relay_test_operation {
      viewer {
        ...PartnersFeaturedCarousel_viewer @arguments(id: "example")
      }
    }
  `,
})

describe("PartnersFeaturedCarousel", () => {
  const mockUseRouter = useRouter as jest.Mock

  beforeAll(() => {
    mockUseRouter.mockImplementation(() => ({
      router: { push: jest.fn() },
      match: { location: { query: { location: "" }, pathname: "" } },
    }))
  })

  afterEach(() => {
    mockUseRouter.mockReset()
  })

  it("renders correctly", () => {
    renderWithRelay({
      Partner: () => ({
        name: "Example Partner",
      }),
      Show: () => ({
        name: "Example Show",
        status: "running",
        isOnlineExclusive: false,
        startAt: "Oct 19",
        endAt: "Oct 31",
        statusUpdate: null,
        location: {
          city: "New York",
        },
      }),
    })

    expect(screen.getAllByText("Example Partner")).toHaveLength(2)
    expect(screen.getAllByText("Example Show")).toHaveLength(2)
    expect(screen.getAllByText("Current Show")).toHaveLength(2)
    expect(screen.queryByText("Online Exclusive")).not.toBeInTheDocument()
    expect(screen.getAllByText("New York, Oct 19 – Oct 31")).toHaveLength(2)
  })
})
