import { screen } from "@testing-library/react"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { WorksForYouAppFragmentContainer } from "Apps/WorksForYou/WorksForYouApp"
import { useRouter } from "System/Hooks/useRouter"

jest.unmock("react-relay")
jest.mock("Components/MetaTags", () => ({
  MetaTags: () => "MetaTags",
}))
jest.mock("System/Hooks/useRouter", () => ({
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
    }
  `,
})

describe("WorksForYouApp", () => {
  const mockUseRouter = useRouter as jest.Mock

  beforeAll(() => {
    mockUseRouter.mockImplementation(() => ({
      router: {
        push: jest.fn(),
      },
    }))
  })

  it("renders correctly", () => {
    renderWithRelay()

    expect(screen.getByText("MetaTags")).toBeInTheDocument()
    expect(screen.getByText("Works By Artists You Follow")).toBeInTheDocument()
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
