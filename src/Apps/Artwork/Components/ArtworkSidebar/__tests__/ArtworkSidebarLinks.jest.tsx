import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ArtworkSidebarLinksFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarLinks"
import { fireEvent, screen } from "@testing-library/react"
import { ArtworkSidebarLinks_Test_Query } from "__generated__/ArtworkSidebarLinks_Test_Query.graphql"
import { useTracking } from "react-tracking"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"

jest.mock("react-tracking")
jest.unmock("react-relay")
jest.mock("System/Hooks/useFeatureFlag")

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

  const { renderWithRelay } = setupTestWrapperTL<
    ArtworkSidebarLinks_Test_Query
  >({
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
      [
        {
          "action_type": "Click",
          "subject": "sell with artsy",
          "type": "Link",
        },
      ]
    `)
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
          screen.queryByText("By placing your bid you agree to Artsy's")
        ).toBeInTheDocument()
        expect(
          screen.getByRole("link", {
            name: "Conditions of Sale",
          })
        ).toHaveAttribute("href", "/conditions-of-sale")
      })

      describe("new disclaimer is shown", () => {
        beforeAll(() => {
          ;(useFeatureFlag as jest.Mock).mockImplementation(
            (f: string) => f === "diamond_new-terms-and-conditions"
          )
        })

        afterAll(() => {
          ;(useFeatureFlag as jest.Mock).mockReset()
        })

        it("shows general terms and conditions of sale link", () => {
          expect(
            screen.getByRole("link", {
              name: "General Terms and Conditions of Sale",
            })
          ).toHaveAttribute("href", "/terms")
        })
      })
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
        [
          {
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
