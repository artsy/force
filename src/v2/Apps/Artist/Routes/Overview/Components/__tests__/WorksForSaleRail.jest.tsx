import { Image } from "@artsy/palette"
import { WorksForSaleRail_Test_QueryRawResponse } from "v2/__generated__/WorksForSaleRail_Test_Query.graphql"
import { WorksForSaleRailFragmentContainer as WorksForSaleRail } from "v2/Apps/Artist/Routes/Overview/Components/WorksForSaleRail"
import { renderRelayTree } from "v2/DevTools"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("Works For Sale Rail", () => {
  const getWrapper = async (
    response: WorksForSaleRail_Test_QueryRawResponse["artist"] = defaultArtist
  ) => {
    return await renderRelayTree({
      Component: WorksForSaleRail,
      mockData: {
        artist: response,
      } as WorksForSaleRail_Test_QueryRawResponse,
      query: graphql`
        query WorksForSaleRail_Test_Query @raw_response_type {
          artist(id: "andy-warhol") {
            ...WorksForSaleRail_artist
          }
        }
      `,
    })
  }

  it("Doesn`t explode when there are no works for sale", async () => {
    const request = {
      ...defaultArtist,
      artworksConnection: null,
    }

    const wrapper = await getWrapper(request)

    expect(wrapper.find(Image).length).toEqual(0)
  })

  it("Doesn`t explode when there are zero works for sale edges", async () => {
    const request = {
      ...defaultArtist,
      artworksConnection: {
        edges: [],
      },
    }

    const wrapper = await getWrapper(request)

    expect(wrapper.find(Image).length).toEqual(0)
  })

  it("Renders works for sale when they exist", async () => {
    const wrapper = await getWrapper()

    expect(wrapper.find(Image).length).toEqual(4) // Due to breakpoints
  })
})

const defaultArtist: WorksForSaleRail_Test_QueryRawResponse["artist"] = {
  artworksConnection: {
    edges: [
      {
        node: {
          href: "/artwork/andy-warhol-cow-ii-dot-12-31",
          id: "QXJ0d29yazo1ODExMDA0ZDhiMGMxNDFkZDQwMDBiNjE=",
          date: "1971",
          image: {
            aspectRatio: 0.69,
            url:
              "https://d32dm0rphc51dk.cloudfront.net/TggVGbEkp8GPrxSRYyUrVw/large.jpg",
          },
          cultural_maker: null,
          imageTitle: "This Image Has a Title, A. Artist, 2020",
          artists: [
            {
              href: "/artist/andy-warhol",
              id: "QXJ0aXN0OjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNA==",
              name: "Andy Warhol",
            },
          ],
          slug: "andy-warhol-cow-ii-dot-12-31",
          collecting_institution: null,
          internalID: "5811004d8b0c141dd4000b61",
          is_inquireable: true,
          title: "Cow, II.12",
          is_biddable: false,
          sale_message: "$32,500",
          is_saved: false,
          partner: {
            href: "/hamilton-selway-fine-art",
            id: "UGFydG5lcjo1MTc1NmRkOTUxMDljZGNmOGMwMDAwNzU=",
            name: "Hamilton-Selway Fine Art",
            type: "Gallery",
          },
          sale: null,
          sale_artwork: null,
        },
      },
      {
        node: {
          href: "/artwork/andy-warhol-cow-ii-dot-12-31",
          id: "QXJ0d29yazo1ODExMDA0ZDhiMGMxNDFkZDQwMDBiNjE=sss",
          date: "1971",
          image: {
            aspectRatio: 0.69,
            url:
              "https://d32dm0rphc51dk.cloudfront.net/TggVGbEkp8GPrxSRYyUrVw/large.jpg",
          },
          cultural_maker: null,
          imageTitle: "This Image Has a Title, A. Artist, 2020",
          artists: [
            {
              href: "/artist/andy-warhol",
              id: "QXJ0aXN0OjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNA==",
              name: "Andy Warhol",
            },
          ],
          slug: "andy-warhol-cow-ii-dot-12-31",
          collecting_institution: null,
          internalID: "5811004d8b0c141dd4000b61",
          is_inquireable: true,
          title: "Cow, II.12",
          is_biddable: false,
          sale_message: "$32,500",
          is_saved: false,
          partner: {
            href: "/hamilton-selway-fine-art",
            id: "UGFydG5lcjo1MTc1NmRkOTUxMDljZGNmOGMwMDAwNzU=",
            name: "Hamilton-Selway Fine Art",
            type: "Gallery",
          },
          sale: null,
          sale_artwork: null,
        },
      },
    ],
  },
  counts: {
    follows: 100,
  },
  id: "QXJ0aXN0Omp1YW4tZ3Jpcw",
  internalID: "artist1234",
  is_followed: false,
  name: "Andy Warhol",
  slug: "andy-warhol",
}
