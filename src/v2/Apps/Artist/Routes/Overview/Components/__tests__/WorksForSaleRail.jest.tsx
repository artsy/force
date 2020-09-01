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
      query: graphql`
        query WorksForSaleRail_Test_Query @raw_response_type {
          artist(id: "andy-warhol") {
            ...WorksForSaleRail_artist
          }
        }
      `,
      mockData: {
        artist: response,
      } as WorksForSaleRail_Test_QueryRawResponse,
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
  internalID: "artist1234",
  name: "Andy Warhol",
  slug: "andy-warhol",
  is_followed: false,
  counts: {
    follows: 100,
  },
  artworksConnection: {
    edges: [
      {
        node: {
          imageTitle: "This Image Has a Title, A. Artist, 2020",
          id: "QXJ0d29yazo1ODExMDA0ZDhiMGMxNDFkZDQwMDBiNjE=",
          slug: "andy-warhol-cow-ii-dot-12-31",
          href: "/artwork/andy-warhol-cow-ii-dot-12-31",
          image: {
            aspectRatio: 0.69,
            url:
              "https://d32dm0rphc51dk.cloudfront.net/TggVGbEkp8GPrxSRYyUrVw/large.jpg",
          },
          internalID: "5811004d8b0c141dd4000b61",
          title: "Cow, II.12",
          date: "1971",
          sale_message: "$32,500",
          cultural_maker: null,
          artists: [
            {
              id: "QXJ0aXN0OjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNA==",
              href: "/artist/andy-warhol",
              name: "Andy Warhol",
            },
          ],
          collecting_institution: null,
          partner: {
            name: "Hamilton-Selway Fine Art",
            href: "/hamilton-selway-fine-art",
            id: "UGFydG5lcjo1MTc1NmRkOTUxMDljZGNmOGMwMDAwNzU=",
            type: "Gallery",
          },
          sale: null,
          sale_artwork: null,
          is_inquireable: true,
          is_saved: false,
          is_biddable: false,
        },
      },
      {
        node: {
          imageTitle: "This Image Has a Title, A. Artist, 2020",
          id: "QXJ0d29yazo1ODExMDA0ZDhiMGMxNDFkZDQwMDBiNjE=sss",
          slug: "andy-warhol-cow-ii-dot-12-31",
          href: "/artwork/andy-warhol-cow-ii-dot-12-31",
          image: {
            aspectRatio: 0.69,
            url:
              "https://d32dm0rphc51dk.cloudfront.net/TggVGbEkp8GPrxSRYyUrVw/large.jpg",
          },
          internalID: "5811004d8b0c141dd4000b61",
          title: "Cow, II.12",
          date: "1971",
          sale_message: "$32,500",
          cultural_maker: null,
          artists: [
            {
              id: "QXJ0aXN0OjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNA==",
              href: "/artist/andy-warhol",
              name: "Andy Warhol",
            },
          ],
          collecting_institution: null,
          partner: {
            name: "Hamilton-Selway Fine Art",
            href: "/hamilton-selway-fine-art",
            id: "UGFydG5lcjo1MTc1NmRkOTUxMDljZGNmOGMwMDAwNzU=",
            type: "Gallery",
          },
          sale: null,
          sale_artwork: null,
          is_inquireable: true,
          is_saved: false,
          is_biddable: false,
        },
      },
    ],
  },
  id: "QXJ0aXN0Omp1YW4tZ3Jpcw",
}
