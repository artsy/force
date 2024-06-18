import { ArtworkActionsFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkActions"
import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { userIsAdmin, userIsTeam } from "Utils/user"
import { MockBoot } from "DevTools/MockBoot"
import { Breakpoint } from "@artsy/palette/dist/themes/types"
import BellStrokeIcon from "@artsy/icons/BellStrokeIcon"
import DownloadIcon from "@artsy/icons/DownloadIcon"
import EditIcon from "@artsy/icons/EditIcon"
import GenomeIcon from "@artsy/icons/GenomeIcon"
import HeartStrokeIcon from "@artsy/icons/HeartStrokeIcon"
import MoreIcon from "@artsy/icons/MoreIcon"
import ShareIcon from "@artsy/icons/ShareIcon"
import ShowIcon from "@artsy/icons/ShowIcon"

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
  setupTestWrapper({
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
  }).getWrapper

describe("ArtworkActions", () => {
  let mockUserIsAdmin: boolean
  let mockUserIsTeam: boolean
  ;(userIsAdmin as jest.Mock).mockImplementation(() => mockUserIsAdmin)
  ;(userIsTeam as jest.Mock).mockImplementation(() => mockUserIsTeam)

  describe("lg breakpoint", () => {
    const getWrapper = getWrapperWithBreakpoint("lg")

    it("renders proper components for a team user", () => {
      mockUserIsAdmin = true
      mockUserIsTeam = true
      const { wrapper } = getWrapper()

      expect(wrapper.find(EditIcon).length).toBe(1)
      expect(wrapper.find(GenomeIcon).length).toBe(1)
      expect(wrapper.find(MoreIcon).length).toBe(0)
    })

    it("renders proper components for a non-team user", () => {
      mockUserIsAdmin = false
      mockUserIsTeam = false
      const { wrapper } = getWrapper({
        Artwork: () => ({ isHangable: true, isDownloadable: true }),
      })

      expect(wrapper.find(HeartStrokeIcon).length).toBe(1)
      expect(wrapper.find(ShareIcon).length).toBe(1)
      expect(wrapper.find(ShowIcon).length).toBe(1)
      expect(wrapper.find(DownloadIcon).length).toBe(1)
      expect(wrapper.find(EditIcon).length).toBe(0)
      expect(wrapper.find(GenomeIcon).length).toBe(0)
      expect(wrapper.find(MoreIcon).length).toBe(0)
    })

    describe("concerning SaveButton states icon states", () => {
      it("renders heart icon when not sale", () => {
        const { wrapper } = getWrapper({ Artwork: () => ({ sale: null }) })

        expect(wrapper.find(HeartStrokeIcon).length).toBe(1)
        expect(wrapper.find(BellStrokeIcon).length).toBe(0)
      })

      it("renders heart icon when sale is closed", () => {
        const { wrapper } = getWrapper({ Sale: () => ({ isClosed: true }) })

        expect(wrapper.find(HeartStrokeIcon).length).toBe(1)
        expect(wrapper.find(BellStrokeIcon).length).toBe(0)
      })

      it("renders bell icon when sale is open", () => {
        const { wrapper } = getWrapper({
          Sale: () => ({
            isAuction: true,
            isClosed: false,
          }),
        })

        expect(wrapper.find(HeartStrokeIcon).length).toBe(0)
        expect(wrapper.find(BellStrokeIcon).length).toBe(1)
      })
    })

    describe("view in a room", () => {
      it("available for artworks that are hangable", () => {
        const { wrapper } = getWrapper({
          Artwork: () => ({ isHangable: true }),
        })

        expect(wrapper.find(ShowIcon).length).toBe(1)
      })

      it("is not available for non hangable artworks", () => {
        const { wrapper } = getWrapper({
          Artwork: () => ({ isHangable: false }),
        })

        expect(wrapper.find(ShowIcon).length).toBe(0)
      })
    })

    describe("concerning other utility actions", () => {
      describe("download link", () => {
        it("renders link if isDownloadable", () => {
          mockUserIsAdmin = false
          mockUserIsTeam = false
          const { wrapper } = getWrapper({
            Artwork: () => ({ isDownloadable: true }),
          })

          expect(wrapper.find(DownloadIcon).length).toBe(1)
        })

        it("renders link if admin", () => {
          mockUserIsAdmin = true
          mockUserIsTeam = true
          const { wrapper } = getWrapper({
            Artwork: () => ({ isDownloadable: false }),
          })

          expect(wrapper.find(DownloadIcon).length).toBe(1)
        })

        it("hides link if isDownloadable=false and the user is not an admin", () => {
          mockUserIsAdmin = false
          mockUserIsTeam = false
          const { wrapper } = getWrapper({
            Artwork: () => ({ isDownloadable: false }),
          })

          expect(wrapper.find(DownloadIcon).length).toBe(0)
        })
      })
    })
  })

  describe("in the xs breakpoint", () => {
    const getWrapper = getWrapperWithBreakpoint("xs")

    it("shows the More icon", () => {
      const { wrapper } = getWrapper({
        Artwork: () => ({ isHangable: true, isDownloadable: true }),
      })

      expect(wrapper.find(HeartStrokeIcon).length).toBe(1)
      expect(wrapper.find(ShareIcon).length).toBe(1)
      expect(wrapper.find(ShowIcon).length).toBe(1)
      expect(wrapper.find(MoreIcon).length).toBe(1)
      expect(wrapper.find(DownloadIcon).length).toBe(0)
      expect(wrapper.find(EditIcon).length).toBe(0)
      expect(wrapper.find(GenomeIcon).length).toBe(0)
    })

    it("shows no More icon if there are <= 3 actions", () => {
      mockUserIsAdmin = false
      mockUserIsTeam = false
      const { wrapper } = getWrapper({
        Artwork: () => ({ isDownloadable: false, isHangable: true }),
      })

      expect(wrapper.find(HeartStrokeIcon).length).toBe(1)
      expect(wrapper.find(ShareIcon).length).toBe(1)
      expect(wrapper.find(ShowIcon).length).toBe(1)
      expect(wrapper.find(DownloadIcon).length).toBe(0)
      expect(wrapper.find(EditIcon).length).toBe(0)
      expect(wrapper.find(GenomeIcon).length).toBe(0)
      expect(wrapper.find(MoreIcon).length).toBe(0)
    })
  })
})
