import { graphql } from "react-relay"
import { ArtworkSidebarClassificationFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarClassification"
import { screen, fireEvent } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useTracking } from "react-tracking"

jest.mock("Apps/Artwork/Components/ArtworkSidebarClassificationsModal", () => ({
  ArtworkSidebarClassificationsModalQueryRenderer: ({ show }) => {
    return show ? "ArtworkSidebarClassificationsModalQueryRenderer" : null
  },
}))

jest.unmock("react-relay")
jest.mock("react-tracking")

const trackEvent = jest.fn()

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => (
    <ArtworkSidebarClassificationFragmentContainer artwork={props.artwork} />
  ),
  query: graphql`
    query ArtworkSidebarClassification_Test_Query @relay_test_operation {
      artwork(id: "josef-albers-homage-to-the-square-85") {
        ...ArtworkSidebarClassification_artwork
      }
    }
  `,
})

describe("ArtworkSidebarClassification", () => {
  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
  })

  describe("for artwork with classification", () => {
    it("displays classification", () => {
      renderWithRelay({
        Artwork: () => ({
          attributionClass: {
            shortArrayDescription: ["", "Unique work"],
          },
        }),
      })

      expect(screen.getByText("Unique work")).toBeInTheDocument()
    })

    describe("modal pop up", () => {
      it("shows a modal on Classification details click", async () => {
        renderWithRelay({
          Artwork: () => ({
            attributionClass: {
              shortArrayDescription: ["", "Unique work"],
            },
          }),
        })

        expect(
          screen.queryByText("ArtworkSidebarClassificationsModalQueryRenderer")
        ).not.toBeInTheDocument()

        fireEvent.click(screen.getByText("Unique work"))

        expect(trackEvent).toBeCalledWith({
          action_type: "Click",
          context_module: "Sidebar",
          subject: "Classification info",
          type: "Link",
        })

        expect(
          screen.getByText("ArtworkSidebarClassificationsModalQueryRenderer")
        ).toBeInTheDocument()
      })
    })

    describe("for artwork without classification", () => {
      it("does not render anything", () => {
        renderWithRelay({
          Artwork: () => ({ attributionClass: null }),
        })

        expect(screen.queryByText("Unique work")).not.toBeInTheDocument()
      })
    })
  })
})
