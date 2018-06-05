/* tslint:disable */

import { ConcreteRequest } from 'relay-runtime'
export type MarketDataSummaryContentsQueryVariables = {
  readonly artistID: string
}
export type MarketDataSummaryContentsQueryResponse = {
  readonly artist: ({}) | null
}

/*
query MarketDataSummaryContentsQuery(
  $artistID: String!
) {
  artist(id: $artistID) {
    ...MarketDataSummary_artist
    __id
  }
}

fragment MarketDataSummary_artist on Artist {
  _id
  collections
  highlights {
    partners(first: 10, display_on_partner_profile: true, represented_by: true, partner_category: ["blue-chip", "top-established", "top-emerging"]) {
      edges {
        node {
          categories {
            id
          }
          __id
        }
        __id
      }
    }
  }
  auctionResults(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {
    edges {
      node {
        price_realized {
          display(format: "0a")
        }
        __id
      }
    }
  }
  __id
}
*/

const node: ConcreteRequest = (function() {
  var v0 = [
      {
        kind: 'LocalArgument',
        name: 'artistID',
        type: 'String!',
        defaultValue: null,
      },
    ],
    v1 = [
      {
        kind: 'Variable',
        name: 'id',
        variableName: 'artistID',
        type: 'String!',
      },
    ],
    v2 = {
      kind: 'ScalarField',
      alias: null,
      name: '__id',
      args: null,
      storageKey: null,
    }
  return {
    kind: 'Request',
    operationKind: 'query',
    name: 'MarketDataSummaryContentsQuery',
    id: null,
    text:
      'query MarketDataSummaryContentsQuery(\n  $artistID: String!\n) {\n  artist(id: $artistID) {\n    ...MarketDataSummary_artist\n    __id\n  }\n}\n\nfragment MarketDataSummary_artist on Artist {\n  _id\n  collections\n  highlights {\n    partners(first: 10, display_on_partner_profile: true, represented_by: true, partner_category: ["blue-chip", "top-established", "top-emerging"]) {\n      edges {\n        node {\n          categories {\n            id\n          }\n          __id\n        }\n        __id\n      }\n    }\n  }\n  auctionResults(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {\n    edges {\n      node {\n        price_realized {\n          display(format: "0a")\n        }\n        __id\n      }\n    }\n  }\n  __id\n}\n',
    metadata: {},
    fragment: {
      kind: 'Fragment',
      name: 'MarketDataSummaryContentsQuery',
      type: 'Query',
      metadata: null,
      argumentDefinitions: v0,
      selections: [
        {
          kind: 'LinkedField',
          alias: null,
          name: 'artist',
          storageKey: null,
          args: v1,
          concreteType: 'Artist',
          plural: false,
          selections: [
            {
              kind: 'FragmentSpread',
              name: 'MarketDataSummary_artist',
              args: null,
            },
            v2,
          ],
        },
      ],
    },
    operation: {
      kind: 'Operation',
      name: 'MarketDataSummaryContentsQuery',
      argumentDefinitions: v0,
      selections: [
        {
          kind: 'LinkedField',
          alias: null,
          name: 'artist',
          storageKey: null,
          args: v1,
          concreteType: 'Artist',
          plural: false,
          selections: [
            {
              kind: 'ScalarField',
              alias: null,
              name: '_id',
              args: null,
              storageKey: null,
            },
            {
              kind: 'ScalarField',
              alias: null,
              name: 'collections',
              args: null,
              storageKey: null,
            },
            {
              kind: 'LinkedField',
              alias: null,
              name: 'highlights',
              storageKey: null,
              args: null,
              concreteType: 'ArtistHighlights',
              plural: false,
              selections: [
                {
                  kind: 'LinkedField',
                  alias: null,
                  name: 'partners',
                  storageKey:
                    'partners(display_on_partner_profile:true,first:10,partner_category:["blue-chip","top-established","top-emerging"],represented_by:true)',
                  args: [
                    {
                      kind: 'Literal',
                      name: 'display_on_partner_profile',
                      value: true,
                      type: 'Boolean',
                    },
                    {
                      kind: 'Literal',
                      name: 'first',
                      value: 10,
                      type: 'Int',
                    },
                    {
                      kind: 'Literal',
                      name: 'partner_category',
                      value: ['blue-chip', 'top-established', 'top-emerging'],
                      type: '[String]',
                    },
                    {
                      kind: 'Literal',
                      name: 'represented_by',
                      value: true,
                      type: 'Boolean',
                    },
                  ],
                  concreteType: 'PartnerArtistConnection',
                  plural: false,
                  selections: [
                    {
                      kind: 'LinkedField',
                      alias: null,
                      name: 'edges',
                      storageKey: null,
                      args: null,
                      concreteType: 'PartnerArtistEdge',
                      plural: true,
                      selections: [
                        {
                          kind: 'LinkedField',
                          alias: null,
                          name: 'node',
                          storageKey: null,
                          args: null,
                          concreteType: 'Partner',
                          plural: false,
                          selections: [
                            {
                              kind: 'LinkedField',
                              alias: null,
                              name: 'categories',
                              storageKey: null,
                              args: null,
                              concreteType: 'Category',
                              plural: true,
                              selections: [
                                {
                                  kind: 'ScalarField',
                                  alias: null,
                                  name: 'id',
                                  args: null,
                                  storageKey: null,
                                },
                              ],
                            },
                            v2,
                          ],
                        },
                        v2,
                      ],
                    },
                  ],
                },
              ],
            },
            {
              kind: 'LinkedField',
              alias: null,
              name: 'auctionResults',
              storageKey:
                'auctionResults(first:1,recordsTrusted:true,sort:"PRICE_AND_DATE_DESC")',
              args: [
                {
                  kind: 'Literal',
                  name: 'first',
                  value: 1,
                  type: 'Int',
                },
                {
                  kind: 'Literal',
                  name: 'recordsTrusted',
                  value: true,
                  type: 'Boolean',
                },
                {
                  kind: 'Literal',
                  name: 'sort',
                  value: 'PRICE_AND_DATE_DESC',
                  type: 'AuctionResultSorts',
                },
              ],
              concreteType: 'AuctionResultConnection',
              plural: false,
              selections: [
                {
                  kind: 'LinkedField',
                  alias: null,
                  name: 'edges',
                  storageKey: null,
                  args: null,
                  concreteType: 'AuctionResultEdge',
                  plural: true,
                  selections: [
                    {
                      kind: 'LinkedField',
                      alias: null,
                      name: 'node',
                      storageKey: null,
                      args: null,
                      concreteType: 'AuctionResult',
                      plural: false,
                      selections: [
                        {
                          kind: 'LinkedField',
                          alias: null,
                          name: 'price_realized',
                          storageKey: null,
                          args: null,
                          concreteType: 'AuctionResultPriceRealized',
                          plural: false,
                          selections: [
                            {
                              kind: 'ScalarField',
                              alias: null,
                              name: 'display',
                              args: [
                                {
                                  kind: 'Literal',
                                  name: 'format',
                                  value: '0a',
                                  type: 'String',
                                },
                              ],
                              storageKey: 'display(format:"0a")',
                            },
                          ],
                        },
                        v2,
                      ],
                    },
                  ],
                },
              ],
            },
            v2,
          ],
        },
      ],
    },
  }
})()
;(node as any).hash = '306807c7b756400dd52cce1f2c4e9ae2'
export default node
