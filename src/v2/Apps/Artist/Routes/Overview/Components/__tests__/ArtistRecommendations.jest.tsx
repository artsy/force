// @ts-ignore
import { ArtistRecommendations_artist } from "v2/__generated__/ArtistRecommendations_artist.graphql"
import {
  ArtistRecommendations_Test_Query,
  ArtistRecommendations_Test_QueryRawResponse,
} from "v2/__generated__/ArtistRecommendations_Test_Query.graphql"
import { MockBoot, MockRelayRenderer, renderUntil } from "v2/DevTools"
import React from "react"
import { graphql } from "react-relay"
import { ArtistRecommendationsPaginationContainer as ArtistRecommendations } from "../ArtistRecommendations"
import { RecommendedArtistFragmentContainer as RecommendedArtist } from "../RecommendedArtist"

jest.unmock("react-relay")

describe("ArtistRecommendations", () => {
  async function getWrapper(
    artistData: ArtistRecommendations_Test_QueryRawResponse["artist"]
  ) {
    return await renderUntil(
      wrapper => {
        return wrapper.find(ArtistRecommendations).length > 0
      },
      <MockBoot breakpoint="lg">
        <MockRelayRenderer<ArtistRecommendations_Test_Query>
          Component={ArtistRecommendations}
          query={graphql`
            query ArtistRecommendations_Test_Query @raw_response_type {
              artist(id: "andy-warhol") {
                ...ArtistRecommendations_artist
              }
            }
          `}
          mockData={
            {
              artist: artistData,
            } as ArtistRecommendations_Test_QueryRawResponse
          }
        />
      </MockBoot>
    )
  }

  it("Doesn`t explode when there are no recommended artists", async () => {
    const request = {
      ...defaultArtist,
      related: { artistsConnection: null },
    }

    const wrapper = await getWrapper(request)

    expect(wrapper.html()).toContain("Related Artists")
    expect(wrapper.find(RecommendedArtist).length).toEqual(0)
  })

  it("Renders recommended artists when they exist", async () => {
    const wrapper = await getWrapper(defaultArtist)

    expect(wrapper.html()).toContain("Related Artists")
    expect(wrapper.find(RecommendedArtist).length).toEqual(1)
  })

  it("Doesn`t render `show more` button when less than three artists", async () => {
    const wrapper = await getWrapper(defaultArtist)

    expect(wrapper.find("ShowMoreButton").length).toEqual(0)
  })

  it("Renders `show more` button when more than three artists available", async () => {
    const wrapper = await getWrapper(pagedArtist)

    expect(wrapper.find("ShowMoreButton").length).toEqual(1)
  })
})

const artistFields = {
  name: "",
  formatted_nationality_and_birthday: "",
  href: "",
  image: null,
  artworks_connection: null,
  is_followed: false,
  counts: null,
  slug: "",
  internalID: "",
  __typename: "Artist",
}

const defaultArtist = {
  name: "Juan Gris",
  slug: "juan-gris",
  related: {
    artistsConnection: {
      pageInfo: {
        hasNextPage: false,
        endCursor: "QXJ0aXN0OnBhYmxvLXBpY2Fzc28",
      },
      edges: [
        {
          node: {
            id: "QXJ0aXN0OnBhYmxvLXBpY2Fzc28",
            internalID: "QXJ0aXN0OnBhYmxvLXBpY2Fzc28",
            ...artistFields,
          },
          cursor: "QXJ0aXN0OnBhYmxvLXBpY2Fzc28",
        },
      ],
    },
  },
  id: "QXJ0aXN0Omp1YW4tZ3Jpcw",
  internalID: "QXJ0aXN0Omp1YW4tZ3Jpcw",
} as ArtistRecommendations_Test_QueryRawResponse["artist"]

const pagedArtist = {
  name: "Juan Gris",
  slug: "juan-gris",
  related: {
    artistsConnection: {
      pageInfo: {
        hasNextPage: true,
        endCursor: "QXJ0aXN0OnBhYmxvLXBpY2Fzc30",
      },
      edges: [
        {
          node: {
            id: "QXJ0aXN0OnBhYmxvLXBpY2Fzc28",
            internalID: "QXJ0aXN0OnBhYmxvLXBpY2Fzc28",
            ...artistFields,
          },
          cursor: "QXJ0aXN0OnBhYmxvLXBpY2Fzc28",
        },
        {
          node: {
            id: "QXJ0aXN0OnBhYmxvLXBpY2Fzc29",
            internalID: "QXJ0aXN0OnBhYmxvLXBpY2Fzc29",
            ...artistFields,
          },
          cursor: "QXJ0aXN0OnBhYmxvLXBpY2Fzc29",
        },
        {
          node: {
            id: "QXJ0aXN0OnBhYmxvLXBpY2Fzc30",
            internalID: "QXJ0aXN0OnBhYmxvLXBpY2Fzc30",
            ...artistFields,
          },
          cursor: "QXJ0aXN0OnBhYmxvLXBpY2Fzc30",
        },
      ],
    },
  },
  id: "QXJ0aXN0Omp1YW4tZ3Jpcw",
  internalID: "QXJ0aXN0Omp1YW4tZ3Jpcw",
} as ArtistRecommendations_Test_QueryRawResponse["artist"]
