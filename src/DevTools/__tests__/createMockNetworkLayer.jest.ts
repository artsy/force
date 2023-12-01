import { createMockNetworkLayerTestAliasPrecendenceQuery } from "__generated__/createMockNetworkLayerTestAliasPrecendenceQuery.graphql"
import { createMockNetworkLayerTestAliasQuery } from "__generated__/createMockNetworkLayerTestAliasQuery.graphql"
import { createMockNetworkLayerTestMutationResultsMutation } from "__generated__/createMockNetworkLayerTestMutationResultsMutation.graphql"
import { createMockNetworkLayerTestQuery } from "__generated__/createMockNetworkLayerTestQuery.graphql"
import { createMockFetchQuery } from "DevTools/createMockNetworkLayer"
import { GraphQLTaggedNode, commitMutation, graphql } from "react-relay"
import {
  Environment,
  Network,
  OperationType,
  RecordSource,
  Store,
  fetchQuery,
} from "relay-runtime"
import { Environment as IEnvironment } from "react-relay"
import { createMockNetworkLayer2 } from "DevTools/createMockNetworkLayer"
jest.unmock("react-relay")

describe("createMockNetworkLayer", () => {
  async function _fetchQueryWithResolvers<T extends OperationType>(
    options: Parameters<typeof createMockNetworkLayer2>[0],
    query: GraphQLTaggedNode
  ) {
    const network = createMockNetworkLayer2(options)

    const source = new RecordSource()
    const store = new Store(source)
    const environment = new Environment({ network, store })

    return await fetchQuery<T>(environment, query, {}).toPromise()
  }

  function fetchArtworkQueryWithResolvers(
    options: Parameters<typeof createMockNetworkLayer2>[0]
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

  function fetchMutationResults<Input extends OperationType>({
    mockMutationResults,
    query,
    variables,
    mockNetworkFailure,
  }: {
    mockMutationResults: object
    query: GraphQLTaggedNode
    variables: Input["variables"]
    mockNetworkFailure?: boolean
  }): Promise<any> {
    const mockFetchQuery = mockNetworkFailure
      ? () => Promise.reject(new Error("failed to fetch"))
      : createMockFetchQuery({ mockMutationResults })

    const source = new RecordSource()
    const store = new Store(source)
    const environment = new Environment({
      network: Network.create(mockFetchQuery),
      store,
    }) as IEnvironment

    return new Promise((resolve, reject) => {
      commitMutation(environment, {
        // tslint:disable-next-line:relay-operation-generics
        mutation: query,
        onCompleted: resolve,
        onError: reject,
        variables,
      })
    })
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

  it("complains with a helpful error when selected field is not present", async () => {
    try {
      await fetchArtworkQueryWithResolvers({
        mockData: {
          artwork: { id: "blah" },
        },
      })
    } catch (e) {
      // eslint-disable-next-line jest/no-conditional-expect, jest/no-try-expect
      expect(e.message).toMatchInlineSnapshot(
        `"RelayMockNetworkLayerError: A mock for field at path 'artwork/title' of type 'String' was expected for operation 'createMockNetworkLayerTestQuery', but none was found."`
      )
    }
  })

  // TODO: upgrade graphql. The version we have does hardly any validaton of leaf values.
  // see https://github.com/graphql/graphql-js/commit/3521e1429eec7eabeee4da65c93306b51308727b
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip("complains with a helpful error when leaf field type is incorrect", async () => {
    try {
      await fetchArtworkQueryWithResolvers({
        mockData: {
          artwork: { id: "blah", title: 32 },
        },
      })
    } catch (e) {
      // eslint-disable-next-line jest/no-conditional-expect, jest/no-try-expect
      expect(e.message).toMatchInlineSnapshot()
    }
  })

  // TODO: related to above, the only check right now is that you can't return an array as a string
  it("complains with a helpful error when leaf field type is incorrect 2", async () => {
    try {
      await fetchArtworkQueryWithResolvers({
        mockData: {
          artwork: { id: "blah", title: [] },
        },
      })
    } catch (e) {
      // eslint-disable-next-line jest/no-conditional-expect, jest/no-try-expect
      expect(e.message).toMatchInlineSnapshot(
        `"RelayMockNetworkLayerError: Expected mock value of type 'String' but got 'object' at path 'artwork/title' for operation 'createMockNetworkLayerTestQuery'"`
      )
    }
  })

  it("complains with a helpful error when non-leaf field type is incorrect", async () => {
    try {
      await fetchArtworkQueryWithResolvers({
        mockData: {
          artwork: 3,
        },
      })
    } catch (e) {
      // eslint-disable-next-line jest/no-conditional-expect, jest/no-try-expect
      expect(e.message).toMatchInlineSnapshot(
        `"RelayMockNetworkLayerError: The value at path 'artwork' for operation 'createMockNetworkLayerTestQuery' should be an object but is a number."`
      )
    }
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
    const data = await _fetchQueryWithResolvers<
      createMockNetworkLayerTestAliasQuery
    >(
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
    const data = await _fetchQueryWithResolvers<
      createMockNetworkLayerTestAliasPrecendenceQuery
    >(
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

  describe("mutations", () => {
    const query =
      // TODO: Inputs to the mutation might have changed case of the keys!
      graphql`
        mutation createMockNetworkLayerTestMutationResultsMutation(
          $input: CommerceBuyerAcceptOfferInput!
        ) {
          commerceBuyerAcceptOffer(input: $input) {
            orderOrError {
              ... on CommerceOrderWithMutationFailure {
                error {
                  type
                  code
                  data
                }
              }
              ... on CommerceOrderWithMutationSuccess {
                order {
                  internalID
                  state
                }
              }
            }
          }
        }
      `

    it("allows mocking successful mutation results", async () => {
      const data = await fetchMutationResults<
        createMockNetworkLayerTestMutationResultsMutation
      >({
        mockMutationResults: {
          commerceBuyerAcceptOffer: {
            orderOrError: {
              __typename: "CommerceOrderWithMutationSuccess",
              order: {
                __typename: "CommerceOfferOrder",
                id: "my-order",
                internalID: "my-order",
                state: "ABANDONED",
              },
            },
          },
        },
        query,
        variables: {
          input: {
            offerId: "offer-id",
          },
        },
      })

      expect(data.commerceBuyerAcceptOffer.orderOrError.order.state).toBe(
        "ABANDONED"
      )
    })

    it("allows not specifying typenames when possible", async () => {
      const data = await fetchMutationResults<
        createMockNetworkLayerTestMutationResultsMutation
      >({
        mockMutationResults: {
          commerceBuyerAcceptOffer: {
            orderOrError: {
              order: {
                __typename: "CommerceBuyOrder",
                id: "my-order",
                internalID: "my-order",
                state: "ABANDONED",
              },
            },
          },
        },
        query,
        variables: {
          input: {
            offerId: "offer-id",
          },
        },
      })

      expect(data.commerceBuyerAcceptOffer.orderOrError.order.state).toBe(
        "ABANDONED"
      )
    })

    it("complains about ambiguous types", async () => {
      try {
        await fetchMutationResults<
          createMockNetworkLayerTestMutationResultsMutation
        >({
          mockMutationResults: {
            commerceBuyerAcceptOffer: {
              orderOrError: {
                order: {
                  id: "my-order",
                  internalID: "my-order",
                  state: "ABANDONED",
                },
              },
            },
          },
          query,
          variables: {
            input: {
              offerId: "offer-id",
            },
          },
        })
      } catch (e) {
        // eslint-disable-next-line jest/no-conditional-expect, jest/no-try-expect
        expect(e.message).toMatchInlineSnapshot(
          `"RelayMockNetworkLayerError: Ambiguous object at path 'commerceBuyerAcceptOffer/orderOrError/order' for operation 'createMockNetworkLayerTestMutationResultsMutation'. Add a __typename from this list: [CommerceBuyOrder, CommerceOfferOrder]"`
        )
      }
    })

    it("does not complain about unambiguous interface types", async () => {
      const data = await fetchMutationResults<
        createMockNetworkLayerTestMutationResultsMutation
      >({
        mockMutationResults: {
          commerceBuyerAcceptOffer: {
            orderOrError: {
              order: {
                id: "my-order",
                internalID: "my-order",
                state: "ABANDONED",
                myLastOffer: {},
              },
            },
          },
        },
        query,
        variables: {
          input: {
            offerId: "offer-id",
          },
        },
      })
      expect(data.commerceBuyerAcceptOffer.orderOrError.order.state).toBe(
        "ABANDONED"
      )
    })

    it("allows mocking network failures", async () => {
      try {
        await fetchMutationResults<
          createMockNetworkLayerTestMutationResultsMutation
        >({
          mockMutationResults: {
            commerceBuyerAcceptOffer: {
              orderOrError: {
                __typename: "CommerceOrderWithMutationSuccess",
                order: {
                  __typename: "CommerceOfferOrder",
                  id: "my-order",
                  internalID: "my-order",
                  state: "ABANDONED",
                },
              },
            },
          },
          query,
          variables: {
            input: {
              offerId: "offer-id",
            },
          },
          mockNetworkFailure: true,
        })
      } catch (e) {
        // eslint-disable-next-line jest/no-conditional-expect, jest/no-try-expect
        expect(e.message).toMatchInlineSnapshot(`"failed to fetch"`)
      }
    })

    it("complains if you return the wrong type in an abstract position", async () => {
      try {
        await fetchMutationResults<
          createMockNetworkLayerTestMutationResultsMutation
        >({
          mockMutationResults: {
            commerceBuyerAcceptOffer: {
              orderOrError: {
                __typename: "CommerceOrderWithMutationSuccess",
                order: "hello I am a string",
              },
            },
          },
          query,
          variables: {
            input: {
              offerId: "offer-id",
            },
          },
        })
      } catch (e) {
        // eslint-disable-next-line jest/no-conditional-expect, jest/no-try-expect
        expect(e.message).toMatchInlineSnapshot(
          `"RelayMockNetworkLayerError: Expected object of type 'CommerceOrder!' but got 'string' at path 'commerceBuyerAcceptOffer/orderOrError/order' for operation 'createMockNetworkLayerTestMutationResultsMutation'"`
        )
      }
    })
  })
})
