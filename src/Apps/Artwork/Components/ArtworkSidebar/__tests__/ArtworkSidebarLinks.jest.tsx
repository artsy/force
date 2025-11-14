import { ArtworkSidebarLinksFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarLinks"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { ArtworkSidebarLinks_Test_Query } from "__generated__/ArtworkSidebarLinks_Test_Query.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")
jest.unmock("react-relay")

const mockUseTracking = useTracking as jest.Mock
const trackEvent = jest.fn()

describe("ArtworkSidebarLinks", () => {
  beforeEach(() => {
    mockUseTracking.mockImplementation(() => ({
      trackEvent,
    }))
  })

  afterEach(() => {
    trackEvent.mockClear()
  })

  const { renderWithRelay } =
    setupTestWrapperTL<ArtworkSidebarLinks_Test_Query>({
      Component: ({ artwork }) => (
        <ArtworkSidebarLinksFragmentContainer artwork={artwork!} />
      ),
      query: graphql`
        query ArtworkSidebarLinks_Test_Query @relay_test_operation {
          artwork(id: "josef-albers-homage-to-the-square-85") {
            ...ArtworkSidebarLinks_artwork
          }
        }
      `,
    })

  describe("render auction faq section when artwork", () => {
    describe("is in auction and auction is ongoing", () => {
      beforeEach(() => {
        renderWithRelay({
          Artwork: () => ({
            isInAuction: true,
            sale: {
              isClosed: false,
            },
          }),
        })
      })

      it("shows conditions of sale link", () => {
        expect(
          screen.queryByText("By placing your bid you agree to Artsy's"),
        ).toBeInTheDocument()
        expect(
          screen.getByRole("link", {
            name: "General Terms and Conditions of Sale",
          }),
        ).toHaveAttribute("href", "/terms")
      })

      describe("new disclaimer is shown", () => {
        it("shows general terms and conditions of sale link", () => {
          expect(
            screen.getByRole("link", {
              name: "General Terms and Conditions of Sale",
            }),
          ).toHaveAttribute("href", "/terms")
        })
      })
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
        screen.queryByText(/By placing your bid you agree to Artsy's/i),
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
        screen.queryByText(/By placing your bid you agree to Artsy's/i),
      ).not.toBeInTheDocument()
      expect(screen.queryByText(/Conditions of Sale/i)).not.toBeInTheDocument()
    })
  })
})
