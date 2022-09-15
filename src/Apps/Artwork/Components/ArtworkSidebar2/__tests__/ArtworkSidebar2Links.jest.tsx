import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ArtworkSidebar2LinksFragmentContainer } from "../ArtworkSidebar2Links"
import { screen } from "@testing-library/react"
import { ArtworkSidebar2Links_Test_Query } from "__generated__/ArtworkSidebar2Links_Test_Query.graphql"

jest.unmock("react-relay")

const mockRouterPush = jest.fn()

jest.mock("System/Router/useRouter", () => ({
  useRouter: jest.fn(() => ({
    router: { push: mockRouterPush },
  })),
}))

describe("ArtworkSidebar2Links", () => {
  const { renderWithRelay } = setupTestWrapperTL<
    ArtworkSidebar2Links_Test_Query
  >({
    Component: ({ artwork }) => (
      <ArtworkSidebar2LinksFragmentContainer artwork={artwork!} />
    ),
    query: graphql`
      query ArtworkSidebar2Links_Test_Query @relay_test_operation {
        artwork(id: "josef-albers-homage-to-the-square-85") {
          ...ArtworkSidebar2Links_artwork
        }
      }
    `,
  })

  it("renders sell with Artsy Section", () => {
    renderWithRelay({})

    expect(
      screen.queryByText(/Want to sell a work by this artist?/i)
    ).toBeInTheDocument()
    expect(screen.queryByText(/Sell with Artsy/i)).toBeInTheDocument()
  })

  describe("render auction faq section when artwork", () => {
    it("is in auction and auction is ongoing", () => {
      renderWithRelay({
        Artwork: () => ({
          isInAuction: true,
          sale: {
            isClosed: false,
          },
        }),
      })

      expect(
        screen.queryByText(/By placing your bid you agree to Artsy's/i)
      ).toBeInTheDocument()
      expect(screen.queryByText(/Conditions of Sale/i)).toBeInTheDocument()
    })
  })

  describe("does render auction faq section when artwork", () => {
    it("is not in auction", () => {
      renderWithRelay({
        Artwork: () => ({
          isInAuction: false,
        }),
      })

      expect(
        screen.queryByText(/By placing your bid you agree to Artsy's/i)
      ).not.toBeInTheDocument()
      expect(screen.queryByText(/Conditions of Sale/i)).not.toBeInTheDocument()
    })

    it("is in auction and auction is closed", () => {
      renderWithRelay({
        Artwork: () => ({
          isInAuction: true,
          sale: {
            isClosed: true,
          },
        }),
      })

      expect(
        screen.queryByText(/By placing your bid you agree to Artsy's/i)
      ).not.toBeInTheDocument()
      expect(screen.queryByText(/Conditions of Sale/i)).not.toBeInTheDocument()
    })
  })
})
