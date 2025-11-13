import { createMockNetworkLayer } from "DevTools/createMockNetworkLayer"
import type { createMockNetworkLayerTestAliasPrecendenceQuery } from "__generated__/createMockNetworkLayerTestAliasPrecendenceQuery.graphql"
import type { createMockNetworkLayerTestAliasQuery } from "__generated__/createMockNetworkLayerTestAliasQuery.graphql"
import type { createMockNetworkLayerTestQuery } from "__generated__/createMockNetworkLayerTestQuery.graphql"
import { type GraphQLTaggedNode, graphql } from "react-relay"
import {
  Environment,
  fetchQuery,
  type OperationType,
  RecordSource,
  Store,
} from "relay-runtime"

jest.unmock("react-relay")

describe("createMockNetworkLayer", () => {
  async function _fetchQueryWithResolvers<T extends OperationType>(
    options: Parameters<typeof createMockNetworkLayer>[0],
    query: GraphQLTaggedNode
  ) {
    const network = createMockNetworkLayer(options)

    const source = new RecordSource()
    const store = new Store(source)
    const environment = new Environment({ network, store })

    return await fetchQuery<T>(environment, query, {}).toPromise()
  }

  function fetchArtworkQueryWithResolvers(
    options: Parameters<typeof createMockNetworkLayer>[0]
  ) {
    return _fetchQueryWithResolvers<createMockNetworkLayerTestQuery>(
      options,
      graphql`
        query createMockNetworkLayerTestQuery {
          artwork(id: "untitled") {
            id
            title
          }
        }
      `
    )
  }

  describe("preserves the upstream behaviour", () => {
    it("returns the data if present", async () => {
      const data = await fetchArtworkQueryWithResolvers({
        mockData: {
          artwork: { title: "Untitled", id: "untitled" },
        },
      })
      expect(data?.artwork?.title).toEqual("Untitled")
    })

    it("returns null for nullable fields which are given as null", async () => {
      const data = await fetchArtworkQueryWithResolvers({
        mockData: {
          artwork: { title: null, id: "null" },
        },
      })
      expect(data?.artwork?.title).toEqual(null)
    })
  })

  it("Does not complain when non-leaf nullable field type is null", async () => {
    const data = await fetchArtworkQueryWithResolvers({
      mockData: {
        artwork: null,
      },
    })

    expect(data?.artwork).toBeNull()
  })

  it("uses data provided with an aliased name", async () => {
    const data =
      await _fetchQueryWithResolvers<createMockNetworkLayerTestAliasQuery>(
        {
          mockData: {
            artist: {
              forSaleArtworks: { edges: [{ node: { id: "for-sale-work" } }] },
              notForSaleArtworks: {
                edges: [{ node: { id: "no-for-sale-work" } }],
              },
              id: "id",
            },
          },
        },
        graphql`
          query createMockNetworkLayerTestAliasQuery {
            artist(id: "banksy") {
              forSaleArtworks: artworksConnection(filter: IS_FOR_SALE) {
                edges {
                  node {
                    id
                  }
                }
              }
              notForSaleArtworks: artworksConnection(filter: IS_NOT_FOR_SALE) {
                edges {
                  node {
                    id
                  }
                }
              }
            }
          }
        `
      )
    expect(data?.artist?.forSaleArtworks?.edges?.[0]?.node).toEqual({
      id: "for-sale-work",
    })
    expect(data?.artist?.notForSaleArtworks?.edges?.[0]?.node).toEqual({
      id: "no-for-sale-work",
    })
  })

  it("uses the alias over the default name if both are present", async () => {
    const data =
      await _fetchQueryWithResolvers<createMockNetworkLayerTestAliasPrecendenceQuery>(
        {
          mockData: {
            artist: {
              forSaleArtworks: { edges: [{ node: { id: "for-sale-work" } }] },
              artworks: { edges: [{ node: { id: "no-for-sale-work" } }] },
              id: "id",
            },
          },
        },
        graphql`
          query createMockNetworkLayerTestAliasPrecendenceQuery {
            artist(id: "banksy") {
              forSaleArtworks: artworksConnection(filter: IS_FOR_SALE) {
                edges {
                  node {
                    id
                  }
                }
              }
            }
          }
        `
      )
    expect(data?.artist?.forSaleArtworks?.edges?.[0]?.node!).toEqual({
      id: "for-sale-work",
    })
  })
})
