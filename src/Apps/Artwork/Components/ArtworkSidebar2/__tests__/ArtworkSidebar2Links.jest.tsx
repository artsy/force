import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ArtworkSidebar2LinksFragmentContainer } from "../ArtworkSidebar2Links"
import { fireEvent, screen } from "@testing-library/react"
import { ArtworkSidebar2Links_Test_Query } from "__generated__/ArtworkSidebar2Links_Test_Query.graphql"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")
jest.unmock("react-relay")

const mockUseTracking = useTracking as jest.Mock
const trackEvent = jest.fn()

describe("ArtworkSidebar2Links", () => {
  beforeEach(() => {
    mockUseTracking.mockImplementation(() => ({
      trackEvent,
    }))
  })

  afterEach(() => {
    trackEvent.mockClear()
  })

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

  it("tracks sell with artsy link click", () => {
    renderWithRelay({})

    fireEvent.click(screen.getByText(/Sell with Artsy/i))

    expect(trackEvent).toHaveBeenCalledTimes(1)
    expect(trackEvent.mock.calls[0]).toMatchInlineSnapshot(`
          Array [
            Object {
              "action_type": "Click",
              "subject": "sell with artsy",
              "type": "Link",
            },
          ]
        `)
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

    it("tracks conditions of sale link click", () => {
      renderWithRelay({
        Artwork: () => ({
          isInAuction: true,
          sale: {
            isClosed: false,
          },
        }),
      })

      fireEvent.click(screen.getByText(/Sell with Artsy/i))

      expect(trackEvent).toHaveBeenCalledTimes(1)
      expect(trackEvent.mock.calls[0]).toMatchInlineSnapshot(`
          Array [
            Object {
              "action_type": "Click",
              "subject": "sell with artsy",
              "type": "Link",
            },
          ]
        `)
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
