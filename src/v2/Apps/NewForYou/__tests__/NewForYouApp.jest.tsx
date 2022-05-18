import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { graphql } from "relay-runtime"
import { NewForYouAppFragmentContainer } from "../NewForYouApp"

jest.unmock("react-relay")
jest.mock("v2/Components/MetaTags", () => ({
  MetaTags: () => "MetaTags",
}))
jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: jest.fn(),
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: NewForYouAppFragmentContainer,
  query: graphql`
    query NewForYouApp_test_Query @relay_test_operation {
      viewer: viewer {
        ...NewForYouArtworksGrid_viewer
      }
    }
  `,
})

describe("NewForYouApp", () => {
  it("renders", () => {
    renderWithRelay()

    expect(screen.getByText("MetaTags")).toBeInTheDocument()
    expect(screen.getByText("New Works For You")).toBeInTheDocument()
  })

  it("shows expected no-results messaging", () => {
    renderWithRelay({
      Viewer: () => ({
        artworksForUser: null,
      }),
    })

    expect(screen.getByText("Nothing yet.")).toBeInTheDocument()
  })
})
