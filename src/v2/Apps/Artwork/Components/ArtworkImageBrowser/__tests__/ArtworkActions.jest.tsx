import { Breakpoint } from "@artsy/palette"
import { ArtworkActions_Test_QueryRawResponse } from "v2/__generated__/ArtworkActions_Test_Query.graphql"
import { ArtworkActionsFixture } from "v2/Apps/__tests__/Fixtures/Artwork/ArtworkActions.fixture"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import { cloneDeep } from "lodash"
import React from "react"
import { ArtworkActionsFragmentContainer as ArtworkActions } from "../ArtworkActions"

import {
  BellFillIcon,
  DownloadIcon,
  EditIcon,
  GenomeIcon,
  HeartFillIcon,
  MoreIcon,
  OpenEyeIcon,
  ShareIcon,
} from "@artsy/palette"
import { SystemContextProvider } from "v2/Artsy"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("ArtworkActions", () => {
  const getWrapper = async (
    breakpoint: Breakpoint = "lg",
    data: ArtworkActions_Test_QueryRawResponse & {
      user: User
    } = ArtworkActionsFixture
  ) => {
    const { artwork, user } = data
    return await renderRelayTree({
      Component: ArtworkActions,
      query: graphql`
        query ArtworkActions_Test_Query($artworkID: String!)
          @raw_response_type {
          artwork(id: $artworkID) {
            ...ArtworkActions_artwork
          }
        }
      `,
      mockData: { artwork } as ArtworkActions_Test_QueryRawResponse,
      variables: {
        artworkID: "matt-z-and-percy-still-life",
      },
      wrapper: children => (
        <MockBoot breakpoint={breakpoint}>
          <SystemContextProvider user={user}>{children}</SystemContextProvider>
        </MockBoot>
      ),
    })
  }

  it("renders proper components for a team user", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.find(EditIcon).length).toBe(1)
    expect(wrapper.find(GenomeIcon).length).toBe(1)
    expect(wrapper.find(MoreIcon).length).toBe(0)
  })

  it("renders proper components for a non-team user", async () => {
    const data = cloneDeep(ArtworkActionsFixture)
    data.user.type = "User"
    data.user.roles = ["user"]
    const wrapper = await getWrapper("lg", data)
    expect(wrapper.find(HeartFillIcon).length).toBe(1)
    expect(wrapper.find(ShareIcon).length).toBe(1)
    expect(wrapper.find(OpenEyeIcon).length).toBe(1)
    expect(wrapper.find(DownloadIcon).length).toBe(1)
    expect(wrapper.find(EditIcon).length).toBe(0)
    expect(wrapper.find(GenomeIcon).length).toBe(0)
    expect(wrapper.find(MoreIcon).length).toBe(0)
  })

  describe("concerning SaveButton states icon states", () => {
    it("renders heart icon when not sale", async () => {
      const data = {
        ...ArtworkActionsFixture,
        artwork: {
          ...ArtworkActionsFixture.artwork,
          sale: null,
        },
      }
      const wrapper = await getWrapper("lg", data)
      expect(wrapper.find(HeartFillIcon).length).toBe(1)
      expect(wrapper.find(BellFillIcon).length).toBe(0)
    })

    it("renders heart icon when sale is closed", async () => {
      const data = {
        ...ArtworkActionsFixture,
        artwork: {
          ...ArtworkActionsFixture.artwork,
          sale: {
            ...ArtworkActionsFixture.artwork.sale,
            is_closed: true,
          },
        },
      }
      const wrapper = await getWrapper("lg", data)
      expect(wrapper.find(HeartFillIcon).length).toBe(1)
      expect(wrapper.find(BellFillIcon).length).toBe(0)
    })

    it("renders bell icon when sale is open", async () => {
      const data = {
        ...ArtworkActionsFixture,
        artwork: {
          ...ArtworkActionsFixture.artwork,
          sale: {
            ...ArtworkActionsFixture.artwork.sale,
            is_auction: true,
            is_closed: false,
          },
        },
      }
      const wrapper = await getWrapper("lg", data)
      expect(wrapper.find(HeartFillIcon).length).toBe(0)
      expect(wrapper.find(BellFillIcon).length).toBe(1)
    })
  })

  describe("view in a room", () => {
    it("available for artworks that are hangable", async () => {
      const data = {
        ...ArtworkActionsFixture,
        artwork: {
          ...ArtworkActionsFixture.artwork,
          is_hangable: true,
        },
        user: {
          ...ArtworkActionsFixture.user,
          type: "Admin",
        },
      }
      const wrapper = await getWrapper("lg", data)
      expect(wrapper.find(OpenEyeIcon).length).toBe(1)
    })

    it("is not available for non hangable artworks", async () => {
      const data = {
        ...ArtworkActionsFixture,
        artwork: {
          ...ArtworkActionsFixture.artwork,
          is_hangable: false,
        },
        user: {
          ...ArtworkActionsFixture.user,
          type: "Admin",
        },
      }
      const wrapper = await getWrapper("lg", data)
      expect(wrapper.find(OpenEyeIcon).length).toBe(0)
    })
  })

  describe("concerning other utility actions", () => {
    describe("download link", () => {
      it("renders link if is_downloadable", async () => {
        const data = {
          ...ArtworkActionsFixture,
          artwork: {
            ...ArtworkActionsFixture.artwork,
            is_downloadable: true,
          },
          user: {
            ...ArtworkActionsFixture.user,
            type: "User",
          },
        }
        const wrapper = await getWrapper("lg", data)
        expect(wrapper.find(DownloadIcon).length).toBe(1)
      })

      it("renders link if admin", async () => {
        const data = {
          ...ArtworkActionsFixture,
          artwork: {
            ...ArtworkActionsFixture.artwork,
            is_downloadable: false,
          },
          user: {
            ...ArtworkActionsFixture.user,
            type: "Admin",
          },
        }
        const wrapper = await getWrapper("lg", data)
        expect(wrapper.find(DownloadIcon).length).toBe(1)
      })

      it("hides link if is_downloadable=false and the user is not an admin", async () => {
        const data = {
          ...ArtworkActionsFixture,
          artwork: {
            ...ArtworkActionsFixture.artwork,
            is_downloadable: false,
          },
          user: {
            ...ArtworkActionsFixture.user,
            type: "User",
            roles: [],
          },
        }
        const wrapper = await getWrapper("lg", data)
        expect(wrapper.find(DownloadIcon).length).toBe(0)
      })
    })
  })

  describe("in the xs breakpoint", () => {
    it("shows the More icon", async () => {
      const wrapper = await getWrapper("xs")
      expect(wrapper.find(HeartFillIcon).length).toBe(1)
      expect(wrapper.find(ShareIcon).length).toBe(1)
      expect(wrapper.find(OpenEyeIcon).length).toBe(1)
      expect(wrapper.find(MoreIcon).length).toBe(1)
      expect(wrapper.find(DownloadIcon).length).toBe(0)
      expect(wrapper.find(EditIcon).length).toBe(0)
      expect(wrapper.find(GenomeIcon).length).toBe(0)
    })

    it("clicking the More icon shows the download link if non-admin", async () => {
      const wrapper = await getWrapper("xs")
      wrapper.find(MoreIcon).simulate("click")
      expect(wrapper.find(DownloadIcon).length).toBe(1)
      expect(wrapper.find(EditIcon).length).toBe(1)
      expect(wrapper.find(GenomeIcon).length).toBe(1)
    })

    it("shows no More icon if there are <= 3 actions", async () => {
      const data = {
        ...ArtworkActionsFixture,
        artwork: {
          ...ArtworkActionsFixture.artwork,
          is_downloadable: false,
        },
        user: {
          ...ArtworkActionsFixture.user,
          type: "User",
          roles: [],
        },
      }
      const wrapper = await getWrapper("xs", data)
      expect(wrapper.find(HeartFillIcon).length).toBe(1)
      expect(wrapper.find(ShareIcon).length).toBe(1)
      expect(wrapper.find(OpenEyeIcon).length).toBe(1)
      expect(wrapper.find(DownloadIcon).length).toBe(0)
      expect(wrapper.find(EditIcon).length).toBe(0)
      expect(wrapper.find(GenomeIcon).length).toBe(0)
      expect(wrapper.find(MoreIcon).length).toBe(0)
    })
  })
})
