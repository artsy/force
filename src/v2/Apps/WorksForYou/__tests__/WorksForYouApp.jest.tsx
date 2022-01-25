import { screen } from "@testing-library/react"
import { graphql } from "relay-runtime"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { WorksForYouAppFragmentContainer } from "../WorksForYouApp"
import { useRouter } from "v2/System/Router/useRouter"

jest.unmock("react-relay")
jest.mock("v2/Components/MetaTags", () => ({
  MetaTags: () => "MetaTags",
}))
jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: jest.fn(),
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: WorksForYouAppFragmentContainer,
  query: graphql`
    query WorksForYouApp_test_Query(
      $includeSelectedArtist: Boolean!
      $artistSlug: String!
    ) @relay_test_operation {
      viewerArtist: viewer {
        ...WorksForYouApp_viewerArtist
          @include(if: $includeSelectedArtist)
          @arguments(artistSlug: $artistSlug)
      }
      viewerFeed: viewer {
        ...WorksForYouApp_viewerFeed @skip(if: $includeSelectedArtist)
      }
      viewerMe: viewer {
        ...WorksForYouApp_viewerMe
      }
      viewerSidebarAggregations: viewer {
        ...WorksForYouApp_viewerSidebarAggregations
      }
    }
  `,
})

describe("WorksForYouApp", () => {
  const mockUseRouter = useRouter as jest.Mock

  beforeEach(() => {
    mockUseRouter.mockImplementation(() => ({
      router: {
        push: jest.fn(),
      },
    }))
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("renders correctly", () => {
    renderWithRelay()

    expect(screen.getByText("MetaTags")).toBeInTheDocument()
    expect(screen.getByText("Works By Artists You Follow")).toBeInTheDocument()
    expect(screen.getByText("Search")).toBeInTheDocument()
  })

  it("shows no results if no followed artists", () => {
    renderWithRelay({
      Viewer: () => ({
        me: null,
      }),
    })

    expect(screen.getByText("Nothing yet.")).toBeInTheDocument()
  })
})
