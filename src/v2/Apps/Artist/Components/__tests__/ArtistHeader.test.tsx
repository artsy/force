import { ArtistHeader_Test_QueryRawResponse } from "v2/__generated__/ArtistHeader_Test_Query.graphql"
import { ArtistHeaderFixture } from "v2/Apps/__tests__/Fixtures/Artist/Components/ArtistHeader"
import {
  ArtistHeaderFragmentContainer as ArtistHeader,
  WorksForSaleButton,
} from "v2/Apps/Artist/Components/ArtistHeader"
import { Mediator, SystemContextProvider } from "v2/Artsy"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { FollowArtistButton } from "v2/Components/FollowButton/FollowArtistButton"
import { renderRelayTree } from "v2/DevTools"
import React from "react"
import { Environment, graphql } from "react-relay"
import { ArtistIndicator } from "../ArtistIndicator"

jest.unmock("react-relay")
jest.mock("Artsy/Analytics/useTracking")

describe("ArtistHeader", () => {
  let mediator: Mediator
  let trackEvent
  beforeEach(() => {
    trackEvent = jest.fn()
    mediator = { trigger: jest.fn() }
      ; (useTracking as jest.Mock).mockImplementation(() => {
        return {
          trackEvent,
        }
      })
  })

  const getWrapper = async (
    response: ArtistHeader_Test_QueryRawResponse["artist"] = ArtistHeaderFixture,
    context = { mediator, relayEnvironment: {} as Environment, user: null }
  ) => {
    return await renderRelayTree({
      Component: ({ artist }: any) => {
        return (
          <SystemContextProvider {...context}>
            <ArtistHeader artist={artist} />
          </SystemContextProvider>
        )
      },
      query: graphql`
        query ArtistHeader_Test_Query @raw_response_type {
          artist(id: "cecily-brown") {
            ...ArtistHeader_artist
          }
        }
      `,
      mockData: {
        artist: response,
      } as ArtistHeader_Test_QueryRawResponse,
    })
  }

  it("renders correct information about the artist", async () => {
    const wrapper = await getWrapper()
    const html = wrapper.html()
    expect(html).toContain("British")
    expect(html).toContain("born 1969")
    expect(html).toContain("9,135 followers")
  })

  it("renders the follow button in the correct state", async () => {
    const wrapper = await getWrapper()
    const html = wrapper.html()
    expect(html).toContain(">Following<")
    expect(html).not.toContain(">Follow<")
  })

  it("opens auth modal with expected args when following an artist", async () => {
    const wrapper = await getWrapper()
    wrapper
      .find(FollowArtistButton)
      .at(0)
      .simulate("click")
    expect(mediator.trigger).toBeCalledWith("open:auth", {
      afterSignUpAction: {
        action: "follow",
        kind: "artist",
        objectId: "cecily-brown",
      },
      contextModule: "artistHeader",
      copy: "Sign up to follow Cecily Brown",
      intent: "followArtist",
      mode: "signup",
    })
  })

  it("renders blue chip indicator when data is present", async () => {
    const wrapper = await getWrapper()
    const html = wrapper.html()
    expect(html).toContain("Blue Chip")
  })

  it("career stage links to cv page", async () => {
    const wrapper = await getWrapper()
    expect(
      wrapper
        .find(ArtistIndicator)
        .at(0)
        .props().link
    ).toEqual("/artist/cecily-brown/cv")
  })

  it("renders auction record indicator when data is present", async () => {
    const wrapper = await getWrapper()
    const html = wrapper.html()
    expect(html).toContain("Auction Record")
  })

  it("auction record indicator links to auction results tab", async () => {
    const wrapper = await getWrapper()
    expect(
      wrapper
        .find(ArtistIndicator)
        .at(1)
        .props().link
    ).toEqual("/artist/cecily-brown/auction-results")
  })

  it("hides auction record indicator when data is not present", async () => {
    const artist = {
      ...ArtistHeaderFixture,
      auctionResultsConnection: null,
    }
    const wrapper = await getWrapper(artist)
    const html = wrapper.html()
    expect(html).not.toContain("Auction Record")
  })

  it("hides auction record indicator when data is not present", async () => {
    const artist = {
      ...ArtistHeaderFixture,
      artistHightlights: { partnersConnection: null },
    }
    const wrapper = await getWrapper(artist)
    const html = wrapper.html()
    expect(html).not.toContain("Blue Chip")
  })

  it("renders the correct button on the carousel when there are no for sale artworks", async () => {
    const wrapper = await getWrapper()
    expect(
      wrapper
        .find(WorksForSaleButton)
        .at(0)
        .text()
    ).toEqual("Browse artworks")
  })

  it("renders the correct button on the carousel when there are for sale artworks", async () => {
    const wrapper = await getWrapper({
      ...ArtistHeaderFixture,
      counts: {
        ...ArtistHeaderFixture.counts,
        forSaleArtworks: 21,
      },
    })
    expect(
      wrapper
        .find(WorksForSaleButton)
        .at(0)
        .text()
    ).toEqual("Shop works for sale (21)")
  })
})
