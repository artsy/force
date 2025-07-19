import { screen } from "@testing-library/react"
import DownloadIcon from "@artsy/icons/DownloadIcon"
import EditIcon from "@artsy/icons/EditIcon"
import HeartStrokeIcon from "@artsy/icons/HeartStrokeIcon"
import MagicMagnifyingGlassIcon from "@artsy/icons/MagicMagnifyingGlassIcon"
import MoreIcon from "@artsy/icons/MoreIcon"
import ShareIcon from "@artsy/icons/ShareIcon"
import ShowIcon from "@artsy/icons/ShowIcon"
import type { Breakpoint } from "@artsy/palette/dist/themes/types"
import { ArtworkActionsFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkActions"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { userIsAdmin, userIsTeam } from "Utils/user"
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
      query ArtworkActions_Test_Query @relay_test_operation {
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
      const { container } = renderWithRelay()

      expect(container.querySelectorAll('[data-icon="EditIcon"]')).toHaveLength(
        1,
      )
      expect(
        container.querySelectorAll('[data-icon="MagicMagnifyingGlassIcon"]'),
      ).toHaveLength(1)
      expect(container.querySelectorAll('[data-icon="MoreIcon"]')).toHaveLength(
        0,
      )
    })

    it("renders proper components for a non-team user", () => {
      mockUserIsAdmin = false
      mockUserIsTeam = false
      const { container } = renderWithRelay({
        Artwork: () => ({ isHangable: true, isDownloadable: true }),
      })

      expect(
        container.querySelectorAll('[data-icon="HeartStrokeIcon"]'),
      ).toHaveLength(1)
      expect(
        container.querySelectorAll('[data-icon="ShareIcon"]'),
      ).toHaveLength(1)
      expect(container.querySelectorAll('[data-icon="ShowIcon"]')).toHaveLength(
        1,
      )
      expect(
        container.querySelectorAll('[data-icon="DownloadIcon"]'),
      ).toHaveLength(1)
      expect(container.querySelectorAll('[data-icon="EditIcon"]')).toHaveLength(
        0,
      )
      expect(
        container.querySelectorAll('[data-icon="MagicMagnifyingGlassIcon"]'),
      ).toHaveLength(0)
      expect(container.querySelectorAll('[data-icon="MoreIcon"]')).toHaveLength(
        0,
      )
    })

    describe("concerning SaveButton states icon states", () => {
      it("renders heart icon when not sale", () => {
        const { container } = renderWithRelay({
          Artwork: () => ({ sale: null }),
        })

        expect(
          container.querySelectorAll('[data-icon="HeartStrokeIcon"]'),
        ).toHaveLength(1)
      })

      it("renders heart icon when sale is closed", () => {
        const { container } = renderWithRelay({
          Sale: () => ({ isClosed: true }),
        })

        expect(
          container.querySelectorAll('[data-icon="HeartStrokeIcon"]'),
        ).toHaveLength(1)
      })

      it("renders heart icon when sale is open", () => {
        const { container } = renderWithRelay({
          Sale: () => ({
            isAuction: true,
            isClosed: false,
          }),
        })

        expect(
          container.querySelectorAll('[data-icon="HeartStrokeIcon"]'),
        ).toHaveLength(1)
      })
    })

    describe("view in a room", () => {
      it("available for artworks that are hangable", () => {
        const { container } = renderWithRelay({
          Artwork: () => ({ isHangable: true }),
        })

        expect(
          container.querySelectorAll('[data-icon="ShowIcon"]'),
        ).toHaveLength(1)
      })

      it("is not available for non hangable artworks", () => {
        const { container } = renderWithRelay({
          Artwork: () => ({ isHangable: false }),
        })

        expect(
          container.querySelectorAll('[data-icon="ShowIcon"]'),
        ).toHaveLength(0)
      })
    })

    describe("concerning other utility actions", () => {
      describe("download link", () => {
        it("renders link if isDownloadable", () => {
          mockUserIsAdmin = false
          mockUserIsTeam = false
          const { container } = renderWithRelay({
            Artwork: () => ({ isDownloadable: true }),
          })

          expect(
            container.querySelectorAll('[data-icon="DownloadIcon"]'),
          ).toHaveLength(1)
        })

        it("renders link if admin", () => {
          mockUserIsAdmin = true
          mockUserIsTeam = true
          const { container } = renderWithRelay({
            Artwork: () => ({ isDownloadable: false }),
          })

          expect(
            container.querySelectorAll('[data-icon="DownloadIcon"]'),
          ).toHaveLength(1)
        })

        it("hides link if isDownloadable=false and the user is not an admin", () => {
          mockUserIsAdmin = false
          mockUserIsTeam = false
          const { container } = renderWithRelay({
            Artwork: () => ({ isDownloadable: false }),
          })

          expect(
            container.querySelectorAll('[data-icon="DownloadIcon"]'),
          ).toHaveLength(0)
        })
      })
    })
  })

  describe("in the xs breakpoint", () => {
    const renderWithRelay = getWrapperWithBreakpoint("xs")

    it("shows the More icon", () => {
      const { container } = renderWithRelay({
        Artwork: () => ({ isHangable: true, isDownloadable: true }),
      })

      expect(
        container.querySelectorAll('[data-icon="HeartStrokeIcon"]'),
      ).toHaveLength(1)
      expect(
        container.querySelectorAll('[data-icon="ShareIcon"]'),
      ).toHaveLength(1)
      expect(container.querySelectorAll('[data-icon="ShowIcon"]')).toHaveLength(
        1,
      )
      expect(container.querySelectorAll('[data-icon="MoreIcon"]')).toHaveLength(
        1,
      )
      expect(
        container.querySelectorAll('[data-icon="DownloadIcon"]'),
      ).toHaveLength(0)
      expect(container.querySelectorAll('[data-icon="EditIcon"]')).toHaveLength(
        0,
      )
      expect(
        container.querySelectorAll('[data-icon="MagicMagnifyingGlassIcon"]'),
      ).toHaveLength(0)
    })

    it("shows no More icon if there are <= 3 actions", () => {
      mockUserIsAdmin = false
      mockUserIsTeam = false
      const { container } = renderWithRelay({
        Artwork: () => ({ isDownloadable: false, isHangable: true }),
      })

      expect(
        container.querySelectorAll('[data-icon="HeartStrokeIcon"]'),
      ).toHaveLength(1)
      expect(
        container.querySelectorAll('[data-icon="ShareIcon"]'),
      ).toHaveLength(1)
      expect(container.querySelectorAll('[data-icon="ShowIcon"]')).toHaveLength(
        1,
      )
      expect(
        container.querySelectorAll('[data-icon="DownloadIcon"]'),
      ).toHaveLength(0)
      expect(container.querySelectorAll('[data-icon="EditIcon"]')).toHaveLength(
        0,
      )
      expect(
        container.querySelectorAll('[data-icon="MagicMagnifyingGlassIcon"]'),
      ).toHaveLength(0)
      expect(container.querySelectorAll('[data-icon="MoreIcon"]')).toHaveLength(
        0,
      )
    })
  })
})
