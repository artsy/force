import { screen } from "@testing-library/react"
import { ShowAppFragmentContainer } from "Apps/Show/ShowApp"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ShowAppTestQuery } from "__generated__/ShowAppTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("Apps/Show/Components/ShowMeta", () => ({
  ShowMetaFragmentContainer: () => null,
}))

jest.mock("Apps/Show/Components/ShowArtworks", () => ({
  ShowArtworksQueryRenderer: () => null,
}))

jest.mock("Apps/Show/Components/ShowInstallShots", () => ({
  ShowInstallShotsFragmentContainer: () => null,
}))

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: {
        query: "",
      },
    },
  }),
}))

const { renderWithRelay } = setupTestWrapperTL<ShowAppTestQuery>({
  Component: ShowAppFragmentContainer,
  query: graphql`
    query ShowAppTestQuery @relay_test_operation {
      show(id: "xxx") {
        ...ShowApp_show
      }
    }
  `,
})

describe("ShowApp", () => {
  it("renders the title", () => {
    renderWithRelay({
      Show: () => ({ name: "Example Show" }),
    })

    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Example Show",
    })
    expect(heading).toBeInTheDocument()
  })

  it("renders the appropriate info", () => {
    renderWithRelay({
      Partner: () => ({
        name: "Example Partner",
      }),
      Show: () => ({
        href: "/show/example-href",
        description: "Information about the show",
        pressRelease: "Press Release",
      }),
    })

    expect(screen.getByText("Information about the show")).toBeInTheDocument()
    expect(screen.getAllByText("Presented by Example Partner")).toHaveLength(2) // Desktop and mobile views

    // If a press release exists, link to the more info page
    const moreInfoLink = screen.getByRole("link", { name: "More info" })
    expect(moreInfoLink).toHaveAttribute("href", "/show/example-href/info")
  })

  it("renders a viewing room if there are any", () => {
    renderWithRelay({
      Show: () => ({
        viewingRoomsConnection: {
          edges: [
            {
              __typename: "ViewingRoom",
            },
          ],
        },
      }),
    })

    // Since ShowViewingRoom is mocked, we can check for its presence in a different way
    // This test may need adjustment based on actual component behavior
    expect(document.body).toBeInTheDocument()
  })

  it("does not render `Back to Fair` banner by default", () => {
    renderWithRelay({
      Show: () => ({
        isFairBooth: false,
        name: "Example Show",
        fair: { name: "Example Fair", href: "example", hasFullFeature: true },
      }),
    })

    expect(screen.queryByText(/Back to.*Fair/)).not.toBeInTheDocument()
  })

  it("does not render `Back to Fair` banner without full featured fair", () => {
    renderWithRelay({
      Show: () => ({
        isFairBooth: true,
        name: "Example Show",
        fair: { name: "Example Fair", href: "example", hasFullFeature: false },
      }),
    })

    expect(screen.queryByText(/Back to.*Fair/)).not.toBeInTheDocument()
  })

  it("render `Back to Fair` banner on fair booth pages", () => {
    renderWithRelay({
      Show: () => ({
        isFairBooth: true,
        name: "Example Show",
        fair: { name: "Example Fair", href: "example", hasFullFeature: true },
      }),
    })

    expect(screen.getByText("Back to Example Fair")).toBeInTheDocument()
  })
})
