import { screen } from "@testing-library/react"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { PartnersFeaturedCarouselFragmentContainer } from "Apps/Partners/Components/PartnersFeaturedCarousel"
import { PartnersFeaturedCarousel_Test_Query } from "__generated__/PartnersFeaturedCarousel_Test_Query.graphql"
import { useRouter } from "System/Hooks/useRouter"

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter")
jest.mock("Utils/Hooks/useStableShuffle", () => ({
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

    expect(screen.getByText("Example Partner")).toBeInTheDocument()
    expect(screen.getByText("Example Show")).toBeInTheDocument()
    expect(screen.getByText("Current Show")).toBeInTheDocument()
    expect(screen.queryByText("Online Exclusive")).not.toBeInTheDocument()
    expect(screen.getByText("New York, Oct 19 – Oct 31")).toBeInTheDocument()
  })
})
