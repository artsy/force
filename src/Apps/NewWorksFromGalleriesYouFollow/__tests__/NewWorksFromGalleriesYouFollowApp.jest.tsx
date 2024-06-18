import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { NewWorksFromGalleriesYouFollowAppPaginationContainer } from "Apps/NewWorksFromGalleriesYouFollow/NewWorksFromGalleriesYouFollowApp"
import { useSystemContext } from "System/Hooks/useSystemContext"

jest.unmock("react-relay")
jest.mock("Components/MetaTags", () => ({
  MetaTags: () => "MetaTags",
}))
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn().mockReturnValue({ route: { path: "/new-for-you" } }),
}))
jest.mock("System/Hooks/useSystemContext", () => ({
  useSystemContext: jest.fn(),
}))

const mockUseSystemContext = useSystemContext as jest.Mock

beforeEach(() => {
  ;(useSystemContext as jest.Mock).mockReturnValue({ isLoggedIn: true })
})

const { renderWithRelay } = setupTestWrapperTL({
  Component: NewWorksFromGalleriesYouFollowAppPaginationContainer,
  query: graphql`
    query NewWorksFromGalleriesYouFollowApp_test_Query($first: Int)
      @relay_test_operation {
      me {
        newWorksFromGalleriesYouFollowConnection(first: $first) {
          ...HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection
        }
      }
    }
  `,
})

describe("NewWorksFromGalleriesYouFollowApp", () => {
  it("renders", () => {
    renderWithRelay()

    expect(screen.getByText("MetaTags")).toBeInTheDocument()

    expect(
      screen.getByText("New Works from Galleries You Follow")
    ).toBeInTheDocument()
  })

  it("displays expected messaging for logged out users", () => {
    mockUseSystemContext.mockReturnValue({ isLoggedIn: false })

    renderWithRelay()

    expect(screen.getByText(/(^Log in)/g)).toBeInTheDocument()
    expect(
      screen.getByText(/(to see your personalized recommendations\.$)/g)
    ).toBeInTheDocument()
  })

  it("does not display messaging for a logged in user", () => {
    renderWithRelay()

    expect(
      screen.queryByText(/(^Already have an account\?)/g)
    ).not.toBeInTheDocument()
    expect(screen.queryByText(/(^Log in)/g)).not.toBeInTheDocument()
    expect(
      screen.queryByText(/(to see your personalized recommendations\.$)/g)
    ).not.toBeInTheDocument()
  })

  it("shows expected no-results messaging", () => {
    renderWithRelay({
      Me: () => ({
        newWorksFromGalleriesYouFollowConnection: null,
      }),
    })

    expect(screen.getByText("Nothing yet.")).toBeInTheDocument()
  })
})
