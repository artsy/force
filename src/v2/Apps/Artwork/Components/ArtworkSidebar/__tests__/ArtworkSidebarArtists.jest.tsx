import { ArtworkSidebarArtists_Test_QueryRawResponse } from "v2/__generated__/ArtworkSidebarArtists_Test_Query.graphql"
import {
  CulturalMakerWork,
  MultipleArtists,
  SingleFollowedArtist,
} from "v2/Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarArtists"
import { ArtworkSidebarArtistsFragmentContainer } from "v2/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarArtists"
import { SystemContextProvider } from "v2/Artsy"
import { FollowArtistButton } from "v2/Components/FollowButton/FollowArtistButton"
import { renderRelayTree } from "v2/DevTools"
import React from "react"
import { graphql } from "react-relay"
import { mockLocation } from "v2/DevTools/mockLocation"
import { mediator } from "lib/mediator"

jest.unmock("react-relay")

describe("ArtworkSidebarArtists", () => {
  beforeAll(() => {
    mediator.on("open:auth", () => {})
  })

  beforeEach(() => {
    jest.spyOn(mediator, "trigger")
    mockLocation()
  })

  const getWrapper = async (
    response: ArtworkSidebarArtists_Test_QueryRawResponse["artwork"] = SingleFollowedArtist
  ) => {
    return await renderRelayTree({
      Component: ({ artwork }: any) => {
        return (
          <SystemContextProvider>
            <ArtworkSidebarArtistsFragmentContainer artwork={artwork} />
          </SystemContextProvider>
        )
      },
      query: graphql`
        query ArtworkSidebarArtists_Test_Query @raw_response_type {
          artwork(id: "josef-albers-homage-to-the-square-85") {
            ...ArtworkSidebarArtists_artwork
          }
        }
      `,
      mockData: {
        artwork: response,
      } as ArtworkSidebarArtists_Test_QueryRawResponse,
    })
  }

  let wrapper

  describe("ArtworkSidebarArtists with one artist", () => {
    beforeEach(async () => {
      wrapper = await getWrapper()
    })

    it("displays artist name for single artist", () => {
      expect(wrapper.html()).toContain("Josef Albers")
      expect(
        wrapper.find({ href: "/artist/josef-albers" }).hostNodes().length
      ).toBe(1)
    })

    it("renders artist follow button for single artist", () => {
      expect(wrapper.find(FollowArtistButton)).toHaveLength(1)
      expect(wrapper.find("button").prop("data-follow")).toBe(false)
    })

    it("Opens auth with expected args when following an artist", () => {
      wrapper.find(FollowArtistButton).find("button").first().simulate("click")

      expect(mediator.trigger).toBeCalledWith("open:auth", {
        afterSignUpAction: {
          action: "follow",
          kind: "artist",
          objectId: "josef-albers",
        },
        contextModule: "artworkSidebar",
        copy: "Sign up to follow Josef Albers",
        intent: "followArtist",
        mode: "signup",
      })
    })
  })

  describe("ArtworkSidebarArtists with multiple artists", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(MultipleArtists)
    })

    it("displays artist names for multiople artists", () => {
      expect(wrapper.html()).toContain("Josef Albers")
      expect(
        wrapper
          .find({
            href: "/artist/josef-albers",
          })
          .hostNodes().length
      ).toBe(1)
      expect(wrapper.html()).toContain("Ed Ruscha")
      expect(
        wrapper
          .find({
            href: "/artist/ed-ruscha",
          })
          .hostNodes().length
      ).toBe(1)
    })

    it("does not display follow buttons", () => {
      expect(wrapper.html()).not.toContain(FollowArtistButton)
    })
  })

  describe("ArtworkSidebarArtists with cultural maker work", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(CulturalMakerWork)
    })

    it("displays cultural maker", () => {
      expect(wrapper.html()).toContain("American 18th Century")
    })
  })
})
