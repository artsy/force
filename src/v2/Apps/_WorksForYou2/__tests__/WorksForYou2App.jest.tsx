import { screen } from "@testing-library/react"
import { graphql } from "relay-runtime"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { WorksForYou2AppFragmentContainer } from "../WorksForYou2App"
import { useRouter } from "v2/System/Router/useRouter"

jest.unmock("react-relay")
jest.mock("v2/Components/MetaTags", () => ({
  MetaTags: () => "MetaTags",
}))
jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: jest.fn(),
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: WorksForYou2AppFragmentContainer,
  query: graphql`
    query WorksForYou2App_test_Query(
      $includeSelectedArtist: Boolean!
      $artistSlug: String!
    ) @relay_test_operation {
      viewerArtist: viewer {
        ...WorksForYou2App_viewerArtist
          @include(if: $includeSelectedArtist)
          @arguments(artistSlug: $artistSlug)
      }
      viewerFeed: viewer {
        ...WorksForYou2App_viewerFeed @skip(if: $includeSelectedArtist)
      }
      viewerMe: viewer {
        ...WorksForYou2App_viewerMe
      }
      viewerSidebarAggregations: viewer {
        ...WorksForYou2App_viewerSidebarAggregations
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
