import { ArtworkActionsFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkActions"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { userIsAdmin, userIsTeam } from "Utils/user"
import type { Breakpoint } from "@artsy/palette/dist/themes/types"
import { screen } from "@testing-library/react"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("System/Contexts/SystemContext", () => ({
  SystemContextProvider: ({ children }) => children,
  useSystemContext: jest.fn().mockReturnValue({ user: {} }),
}))

jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "contextPageOwnerID",
  })),
}))

jest.mock("System/Contexts/AnalyticsContext", () => ({
  track: jest.fn().mockReturnValue(jest.fn),
  useTracking: jest.fn().mockReturnValue({ trackEvent: jest.fn() }),
}))

jest.mock("System/Hooks/useSystemContext", () => ({
  useSystemContext: jest.fn().mockReturnValue({}),
}))

jest.mock("Utils/user", () => ({
  userIsAdmin: jest.fn(),
  userIsTeam: jest.fn(),
}))

jest.mock("Components/NavBar/NavBar", () => ({
  NavBar: () => null,
}))

const getWrapperWithBreakpoint = (breakpoint: Breakpoint) =>
  setupTestWrapperTL({
    Component: props => {
      return (
        <MockBoot breakpoint={breakpoint}>
          {/* @ts-ignore */}
          <ArtworkActionsFragmentContainer {...props} />
        </MockBoot>
      )
    },
    query: graphql`
      query ArtworkActionsTestQuery @relay_test_operation {
        artwork(id: "example") {
          ...ArtworkActions_artwork
        }
      }
    `,
  }).renderWithRelay

describe("ArtworkActions", () => {
  let mockUserIsAdmin: boolean
  let mockUserIsTeam: boolean
  ;(userIsAdmin as jest.Mock).mockImplementation(() => mockUserIsAdmin)
  ;(userIsTeam as jest.Mock).mockImplementation(() => mockUserIsTeam)

  describe("lg breakpoint", () => {
    const renderWithRelay = getWrapperWithBreakpoint("lg")

    it("renders proper components for a team user", () => {
      mockUserIsAdmin = true
      mockUserIsTeam = true
      renderWithRelay()

      expect(screen.getByText("Edit")).toBeInTheDocument()
      expect(screen.getByText("Inspect images")).toBeInTheDocument()
      expect(screen.queryByText("More")).not.toBeInTheDocument()
    })

    it("renders proper components for a non-team user", () => {
      mockUserIsAdmin = false
      mockUserIsTeam = false
      renderWithRelay({
        Artwork: () => ({ isHangable: true, isDownloadable: true }),
      })

      expect(screen.getByText("Save")).toBeInTheDocument()
      expect(screen.getByText("Share")).toBeInTheDocument()
      expect(screen.getByText("View in room")).toBeInTheDocument()
      expect(screen.getByText("Download")).toBeInTheDocument()
      expect(screen.queryByText("Edit")).not.toBeInTheDocument()
      expect(screen.queryByText("Inspect images")).not.toBeInTheDocument()
      expect(screen.queryByText("More")).not.toBeInTheDocument()
    })

    describe("concerning SaveButton states icon states", () => {
      it("renders save button when not sale", () => {
        renderWithRelay({
          Artwork: () => ({ sale: null }),
        })

        expect(screen.getByText("Save")).toBeInTheDocument()
      })

      it("renders save button when sale is closed", () => {
        renderWithRelay({
          Sale: () => ({ isClosed: true }),
        })

        expect(screen.getByText("Save")).toBeInTheDocument()
      })

      it("renders watch lot button when sale is open", () => {
        renderWithRelay({
          Sale: () => ({
            isAuction: true,
            isClosed: false,
          }),
        })

        expect(screen.getByText("Watch lot")).toBeInTheDocument()
      })
    })

    describe("view in a room", () => {
      it("available for artworks that are hangable", () => {
        renderWithRelay({
          Artwork: () => ({ isHangable: true }),
        })

        expect(screen.getByText("View in room")).toBeInTheDocument()
      })

      it("is not available for non hangable artworks", () => {
        renderWithRelay({
          Artwork: () => ({ isHangable: false }),
        })

        expect(screen.queryByText("View in room")).not.toBeInTheDocument()
      })
    })

    describe("concerning other utility actions", () => {
      describe("download link", () => {
        it("renders link if isDownloadable", () => {
          mockUserIsAdmin = false
          mockUserIsTeam = false
          renderWithRelay({
            Artwork: () => ({ isDownloadable: true }),
          })

          expect(screen.getByText("Download")).toBeInTheDocument()
        })

        it("renders link if admin", () => {
          mockUserIsAdmin = true
          mockUserIsTeam = true
          renderWithRelay({
            Artwork: () => ({ isDownloadable: false }),
          })

          expect(screen.getByText("Download")).toBeInTheDocument()
        })

        it("hides link if isDownloadable=false and the user is not an admin", () => {
          mockUserIsAdmin = false
          mockUserIsTeam = false
          renderWithRelay({
            Artwork: () => ({ isDownloadable: false }),
          })

          expect(screen.queryByText("Download")).not.toBeInTheDocument()
        })
      })
    })
  })

  describe("in the xs breakpoint", () => {
    const renderWithRelay = getWrapperWithBreakpoint("xs")

    it("shows the More icon when there are more than 3 actions", () => {
      mockUserIsAdmin = true // Enable admin actions
      mockUserIsTeam = true // Enable team actions
      renderWithRelay({
        Artwork: () => ({
          isHangable: true,
          isDownloadable: true,
          isUnlisted: false, // Ensure artwork is not unlisted
          partner: { slug: "test-partner" }, // Ensure partner exists for edit button
        }),
      })

      // First 3 actions are shown
      expect(screen.getByText("Save")).toBeInTheDocument()
      expect(screen.getByText("View in room")).toBeInTheDocument()
      expect(screen.getByText("Share")).toBeInTheDocument()

      // More button appears when there are > 3 actions
      // The More button doesn't have text, so we need to check for the icon
      const moreButtons = screen.getAllByRole("button")
      const hasMoreButton = moreButtons.some(button => {
        // Check if this button contains the MoreIcon SVG
        return button.querySelector("svg") && !button.textContent
      })
      expect(hasMoreButton).toBe(true)

      // These are hidden in the More menu on xs breakpoint
      expect(screen.queryByText("Download")).not.toBeInTheDocument()
      expect(screen.queryByText("Edit")).not.toBeInTheDocument()
      expect(screen.queryByText("Inspect images")).not.toBeInTheDocument()
    })

    it("shows no More icon if there are <= 3 actions", () => {
      mockUserIsAdmin = false
      mockUserIsTeam = false
      renderWithRelay({
        Artwork: () => ({ isDownloadable: false, isHangable: true }),
      })

      expect(screen.getByText("Save")).toBeInTheDocument()
      expect(screen.getByText("Share")).toBeInTheDocument()
      expect(screen.getByText("View in room")).toBeInTheDocument()
      expect(screen.queryByText("Download")).not.toBeInTheDocument()
      expect(screen.queryByText("Edit")).not.toBeInTheDocument()
      expect(screen.queryByText("Inspect images")).not.toBeInTheDocument()
      // Verify no More button - check that all action buttons have text
      // (excluding Close buttons from popovers)
      const actionButtons = screen.getAllByRole("button").filter(button => {
        return !button.getAttribute("aria-label")?.includes("Close")
      })
      // All action buttons should have visible text
      actionButtons.forEach(button => {
        expect(button.textContent).not.toBe("")
      })
    })
  })
})
