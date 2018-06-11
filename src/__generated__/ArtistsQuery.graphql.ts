/* tslint:disable */

import { ConcreteRequest } from 'relay-runtime'
export type ArtworkAggregation =
  | 'COLOR'
  | 'DIMENSION_RANGE'
  | 'FOLLOWED_ARTISTS'
  | 'GALLERY'
  | 'INSTITUTION'
  | 'MAJOR_PERIOD'
  | 'MEDIUM'
  | 'MERCHANDISABLE_ARTISTS'
  | 'PARTNER_CITY'
  | 'PERIOD'
  | 'PRICE_RANGE'
  | 'TOTAL'
  | '%future added value'
export type ArtistsQueryVariables = {
  readonly geneNodeID: string
  readonly count: number
  readonly cursor?: string | null
  readonly aggregations?: ReadonlyArray<ArtworkAggregation | null> | null
}
export type ArtistsQueryResponse = {
  readonly node: ({}) | null
}

/*
query ArtistsQuery(
  $geneNodeID: ID!
  $count: Int!
  $cursor: String
  $aggregations: [ArtworkAggregation]
) {
  node(__id: $geneNodeID) {
    __typename
    ...Artists_gene_18MJUj
    __id
  }
}

fragment Artists_gene_18MJUj on Gene {
  __id
  artists: artists_connection(first: $count, after: $cursor) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        __id
        ...ArtistRow_artist
        __typename
      }
      cursor
    }
  }
  filter_aggregations: filtered_artworks(aggregations: $aggregations, size: 0, include_medium_filter_in_aggregation: true) {
    ...TotalCount_filter_artworks
    aggregations {
      slice
      ...Dropdown_aggregation
    }
    __id
  }
}

fragment ArtistRow_artist on Artist {
  name
  href
  ...Follow_artist
  artworks: artworks_connection(first: 6) {
    ...Fillwidth_artworks
  }
  __id
}

fragment TotalCount_filter_artworks on FilterArtworks {
  counts {
    total
  }
  __id
}

fragment Dropdown_aggregation on ArtworksAggregationResults {
  slice
  counts {
    name
    id
    count
    __id
  }
}

fragment Follow_artist on Artist {
  __id
  id
  is_followed
}

fragment Fillwidth_artworks on ArtworkConnection {
  edges {
    node {
      __id
      image {
        aspect_ratio
      }
      ...FillwidthItem_artwork
    }
  }
}

fragment FillwidthItem_artwork on Artwork {
  image {
    placeholder
    url(version: "large")
    aspect_ratio
  }
  href
  ...Metadata_artwork
  ...Save_artwork
  __id
}

fragment Metadata_artwork on Artwork {
  ...Details_artwork
  ...Contact_artwork
  __id
}

fragment Save_artwork on Artwork {
  __id
  id
  is_saved
}

fragment Details_artwork on Artwork {
  href
  title
  date
  sale_message
  cultural_maker
  artists(shallow: true) {
    __id
    href
    name
  }
  collecting_institution
  partner(shallow: true) {
    name
    href
    __id
  }
  sale {
    is_auction
    is_live_open
    is_open
    is_closed
    __id
  }
  __id
}

fragment Contact_artwork on Artwork {
  _id
  href
  is_inquireable
  sale {
    is_auction
    is_live_open
    is_open
    is_closed
    __id
  }
  partner(shallow: true) {
    type
    __id
  }
  sale_artwork {
    highest_bid {
      display
      __id: id
    }
    opening_bid {
      display
    }
    counts {
      bidder_positions
    }
    __id
  }
  __id
}
*/

const node: ConcreteRequest = (function() {
  var v0 = [
      {
        kind: 'LocalArgument',
        name: 'geneNodeID',
        type: 'ID!',
        defaultValue: null,
      },
      {
        kind: 'LocalArgument',
        name: 'count',
        type: 'Int!',
        defaultValue: null,
      },
      {
        kind: 'LocalArgument',
        name: 'cursor',
        type: 'String',
        defaultValue: null,
      },
      {
        kind: 'LocalArgument',
        name: 'aggregations',
        type: '[ArtworkAggregation]',
        defaultValue: null,
      },
    ],
    v1 = [
      {
        kind: 'Variable',
        name: '__id',
        variableName: 'geneNodeID',
        type: 'ID!',
      },
    ],
    v2 = {
      kind: 'ScalarField',
      alias: null,
      name: '__id',
      args: null,
      storageKey: null,
    },
    v3 = {
      kind: 'ScalarField',
      alias: null,
      name: '__typename',
      args: null,
      storageKey: null,
    },
    v4 = {
      kind: 'ScalarField',
      alias: null,
      name: 'name',
      args: null,
      storageKey: null,
    },
    v5 = {
      kind: 'ScalarField',
      alias: null,
      name: 'href',
      args: null,
      storageKey: null,
    },
    v6 = {
      kind: 'ScalarField',
      alias: null,
      name: 'id',
      args: null,
      storageKey: null,
    },
    v7 = [
      {
        kind: 'Literal',
        name: 'shallow',
        value: true,
        type: 'Boolean',
      },
    ],
    v8 = {
      kind: 'ScalarField',
      alias: null,
      name: 'display',
      args: null,
      storageKey: null,
    }
  return {
    kind: 'Request',
    operationKind: 'query',
    name: 'ArtistsQuery',
    id: null,
    text:
      'query ArtistsQuery(\n  $geneNodeID: ID!\n  $count: Int!\n  $cursor: String\n  $aggregations: [ArtworkAggregation]\n) {\n  node(__id: $geneNodeID) {\n    __typename\n    ...Artists_gene_18MJUj\n    __id\n  }\n}\n\nfragment Artists_gene_18MJUj on Gene {\n  __id\n  artists: artists_connection(first: $count, after: $cursor) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        __id\n        ...ArtistRow_artist\n        __typename\n      }\n      cursor\n    }\n  }\n  filter_aggregations: filtered_artworks(aggregations: $aggregations, size: 0, include_medium_filter_in_aggregation: true) {\n    ...TotalCount_filter_artworks\n    aggregations {\n      slice\n      ...Dropdown_aggregation\n    }\n    __id\n  }\n}\n\nfragment ArtistRow_artist on Artist {\n  name\n  href\n  ...Follow_artist\n  artworks: artworks_connection(first: 6) {\n    ...Fillwidth_artworks\n  }\n  __id\n}\n\nfragment TotalCount_filter_artworks on FilterArtworks {\n  counts {\n    total\n  }\n  __id\n}\n\nfragment Dropdown_aggregation on ArtworksAggregationResults {\n  slice\n  counts {\n    name\n    id\n    count\n    __id\n  }\n}\n\nfragment Follow_artist on Artist {\n  __id\n  id\n  is_followed\n}\n\nfragment Fillwidth_artworks on ArtworkConnection {\n  edges {\n    node {\n      __id\n      image {\n        aspect_ratio\n      }\n      ...FillwidthItem_artwork\n    }\n  }\n}\n\nfragment FillwidthItem_artwork on Artwork {\n  image {\n    placeholder\n    url(version: "large")\n    aspect_ratio\n  }\n  href\n  ...Metadata_artwork\n  ...Save_artwork\n  __id\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  __id\n}\n\nfragment Save_artwork on Artwork {\n  __id\n  id\n  is_saved\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message\n  cultural_maker\n  artists(shallow: true) {\n    __id\n    href\n    name\n  }\n  collecting_institution\n  partner(shallow: true) {\n    name\n    href\n    __id\n  }\n  sale {\n    is_auction\n    is_live_open\n    is_open\n    is_closed\n    __id\n  }\n  __id\n}\n\nfragment Contact_artwork on Artwork {\n  _id\n  href\n  is_inquireable\n  sale {\n    is_auction\n    is_live_open\n    is_open\n    is_closed\n    __id\n  }\n  partner(shallow: true) {\n    type\n    __id\n  }\n  sale_artwork {\n    highest_bid {\n      display\n      __id: id\n    }\n    opening_bid {\n      display\n    }\n    counts {\n      bidder_positions\n    }\n    __id\n  }\n  __id\n}\n',
    metadata: {},
    fragment: {
      kind: 'Fragment',
      name: 'ArtistsQuery',
      type: 'Query',
      metadata: null,
      argumentDefinitions: v0,
      selections: [
        {
          kind: 'LinkedField',
          alias: null,
          name: 'node',
          storageKey: null,
          args: v1,
          concreteType: null,
          plural: false,
          selections: [
            {
              kind: 'FragmentSpread',
              name: 'Artists_gene',
              args: [
                {
                  kind: 'Variable',
                  name: 'aggregations',
                  variableName: 'aggregations',
                  type: null,
                },
                {
                  kind: 'Variable',
                  name: 'count',
                  variableName: 'count',
                  type: null,
                },
                {
                  kind: 'Variable',
                  name: 'cursor',
                  variableName: 'cursor',
                  type: null,
                },
              ],
            },
            v2,
          ],
        },
      ],
    },
    operation: {
      kind: 'Operation',
      name: 'ArtistsQuery',
      argumentDefinitions: v0,
      selections: [
        {
          kind: 'LinkedField',
          alias: null,
          name: 'node',
          storageKey: null,
          args: v1,
          concreteType: null,
          plural: false,
          selections: [
            v3,
            v2,
            {
              kind: 'InlineFragment',
              type: 'Gene',
              selections: [
                {
                  kind: 'LinkedField',
                  alias: 'artists',
                  name: 'artists_connection',
                  storageKey: null,
                  args: [
                    {
                      kind: 'Variable',
                      name: 'after',
                      variableName: 'cursor',
                      type: 'String',
                    },
                    {
                      kind: 'Variable',
                      name: 'first',
                      variableName: 'count',
                      type: 'Int',
                    },
                  ],
                  concreteType: 'ArtistConnection',
                  plural: false,
                  selections: [
                    {
                      kind: 'LinkedField',
                      alias: null,
                      name: 'pageInfo',
                      storageKey: null,
                      args: null,
                      concreteType: 'PageInfo',
                      plural: false,
                      selections: [
                        {
                          kind: 'ScalarField',
                          alias: null,
                          name: 'hasNextPage',
                          args: null,
                          storageKey: null,
                        },
                        {
                          kind: 'ScalarField',
                          alias: null,
                          name: 'endCursor',
                          args: null,
                          storageKey: null,
                        },
                      ],
                    },
                    {
                      kind: 'LinkedField',
                      alias: null,
                      name: 'edges',
                      storageKey: null,
                      args: null,
                      concreteType: 'ArtistEdge',
                      plural: true,
                      selections: [
                        {
                          kind: 'LinkedField',
                          alias: null,
                          name: 'node',
                          storageKey: null,
                          args: null,
                          concreteType: 'Artist',
                          plural: false,
                          selections: [
                            v2,
                            v4,
                            v5,
                            v6,
                            {
                              kind: 'ScalarField',
                              alias: null,
                              name: 'is_followed',
                              args: null,
                              storageKey: null,
                            },
                            {
                              kind: 'LinkedField',
                              alias: 'artworks',
                              name: 'artworks_connection',
                              storageKey: 'artworks_connection(first:6)',
                              args: [
                                {
                                  kind: 'Literal',
                                  name: 'first',
                                  value: 6,
                                  type: 'Int',
                                },
                              ],
                              concreteType: 'ArtworkConnection',
                              plural: false,
                              selections: [
                                {
                                  kind: 'LinkedField',
                                  alias: null,
                                  name: 'edges',
                                  storageKey: null,
                                  args: null,
                                  concreteType: 'ArtworkEdge',
                                  plural: true,
                                  selections: [
                                    {
                                      kind: 'LinkedField',
                                      alias: null,
                                      name: 'node',
                                      storageKey: null,
                                      args: null,
                                      concreteType: 'Artwork',
                                      plural: false,
                                      selections: [
                                        {
                                          kind: 'ScalarField',
                                          alias: null,
                                          name: 'collecting_institution',
                                          args: null,
                                          storageKey: null,
                                        },
                                        v2,
                                        v5,
                                        {
                                          kind: 'ScalarField',
                                          alias: null,
                                          name: 'title',
                                          args: null,
                                          storageKey: null,
                                        },
                                        {
                                          kind: 'ScalarField',
                                          alias: null,
                                          name: 'date',
                                          args: null,
                                          storageKey: null,
                                        },
                                        {
                                          kind: 'ScalarField',
                                          alias: null,
                                          name: 'sale_message',
                                          args: null,
                                          storageKey: null,
                                        },
                                        {
                                          kind: 'ScalarField',
                                          alias: null,
                                          name: 'cultural_maker',
                                          args: null,
                                          storageKey: null,
                                        },
                                        {
                                          kind: 'LinkedField',
                                          alias: null,
                                          name: 'artists',
                                          storageKey: 'artists(shallow:true)',
                                          args: v7,
                                          concreteType: 'Artist',
                                          plural: true,
                                          selections: [v2, v5, v4],
                                        },
                                        {
                                          kind: 'LinkedField',
                                          alias: null,
                                          name: 'image',
                                          storageKey: null,
                                          args: null,
                                          concreteType: 'Image',
                                          plural: false,
                                          selections: [
                                            {
                                              kind: 'ScalarField',
                                              alias: null,
                                              name: 'aspect_ratio',
                                              args: null,
                                              storageKey: null,
                                            },
                                            {
                                              kind: 'ScalarField',
                                              alias: null,
                                              name: 'placeholder',
                                              args: null,
                                              storageKey: null,
                                            },
                                            {
                                              kind: 'ScalarField',
                                              alias: null,
                                              name: 'url',
                                              args: [
                                                {
                                                  kind: 'Literal',
                                                  name: 'version',
                                                  value: 'large',
                                                  type: '[String]',
                                                },
                                              ],
                                              storageKey:
                                                'url(version:"large")',
                                            },
                                          ],
                                        },
                                        {
                                          kind: 'LinkedField',
                                          alias: null,
                                          name: 'partner',
                                          storageKey: 'partner(shallow:true)',
                                          args: v7,
                                          concreteType: 'Partner',
                                          plural: false,
                                          selections: [
                                            v4,
                                            v5,
                                            v2,
                                            {
                                              kind: 'ScalarField',
                                              alias: null,
                                              name: 'type',
                                              args: null,
                                              storageKey: null,
                                            },
                                          ],
                                        },
                                        {
                                          kind: 'LinkedField',
                                          alias: null,
                                          name: 'sale',
                                          storageKey: null,
                                          args: null,
                                          concreteType: 'Sale',
                                          plural: false,
                                          selections: [
                                            {
                                              kind: 'ScalarField',
                                              alias: null,
                                              name: 'is_auction',
                                              args: null,
                                              storageKey: null,
                                            },
                                            {
                                              kind: 'ScalarField',
                                              alias: null,
                                              name: 'is_live_open',
                                              args: null,
                                              storageKey: null,
                                            },
                                            {
                                              kind: 'ScalarField',
                                              alias: null,
                                              name: 'is_open',
                                              args: null,
                                              storageKey: null,
                                            },
                                            {
                                              kind: 'ScalarField',
                                              alias: null,
                                              name: 'is_closed',
                                              args: null,
                                              storageKey: null,
                                            },
                                            v2,
                                          ],
                                        },
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
                                          name: 'is_inquireable',
                                          args: null,
                                          storageKey: null,
                                        },
                                        {
                                          kind: 'LinkedField',
                                          alias: null,
                                          name: 'sale_artwork',
                                          storageKey: null,
                                          args: null,
                                          concreteType: 'SaleArtwork',
                                          plural: false,
                                          selections: [
                                            {
                                              kind: 'LinkedField',
                                              alias: null,
                                              name: 'highest_bid',
                                              storageKey: null,
                                              args: null,
                                              concreteType:
                                                'SaleArtworkHighestBid',
                                              plural: false,
                                              selections: [
                                                v8,
                                                {
                                                  kind: 'ScalarField',
                                                  alias: '__id',
                                                  name: 'id',
                                                  args: null,
                                                  storageKey: null,
                                                },
                                              ],
                                            },
                                            {
                                              kind: 'LinkedField',
                                              alias: null,
                                              name: 'opening_bid',
                                              storageKey: null,
                                              args: null,
                                              concreteType:
                                                'SaleArtworkOpeningBid',
                                              plural: false,
                                              selections: [v8],
                                            },
                                            {
                                              kind: 'LinkedField',
                                              alias: null,
                                              name: 'counts',
                                              storageKey: null,
                                              args: null,
                                              concreteType: 'SaleArtworkCounts',
                                              plural: false,
                                              selections: [
                                                {
                                                  kind: 'ScalarField',
                                                  alias: null,
                                                  name: 'bidder_positions',
                                                  args: null,
                                                  storageKey: null,
                                                },
                                              ],
                                            },
                                            v2,
                                          ],
                                        },
                                        v6,
                                        {
                                          kind: 'ScalarField',
                                          alias: null,
                                          name: 'is_saved',
                                          args: null,
                                          storageKey: null,
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            v3,
                          ],
                        },
                        {
                          kind: 'ScalarField',
                          alias: null,
                          name: 'cursor',
                          args: null,
                          storageKey: null,
                        },
                      ],
                    },
                  ],
                },
                {
                  kind: 'LinkedHandle',
                  alias: 'artists',
                  name: 'artists_connection',
                  args: [
                    {
                      kind: 'Variable',
                      name: 'after',
                      variableName: 'cursor',
                      type: 'String',
                    },
                    {
                      kind: 'Variable',
                      name: 'first',
                      variableName: 'count',
                      type: 'Int',
                    },
                  ],
                  handle: 'connection',
                  key: 'Artists_artists',
                  filters: null,
                },
                {
                  kind: 'LinkedField',
                  alias: 'filter_aggregations',
                  name: 'filtered_artworks',
                  storageKey: null,
                  args: [
                    {
                      kind: 'Variable',
                      name: 'aggregations',
                      variableName: 'aggregations',
                      type: '[ArtworkAggregation]',
                    },
                    {
                      kind: 'Literal',
                      name: 'include_medium_filter_in_aggregation',
                      value: true,
                      type: 'Boolean',
                    },
                    {
                      kind: 'Literal',
                      name: 'size',
                      value: 0,
                      type: 'Int',
                    },
                  ],
                  concreteType: 'FilterArtworks',
                  plural: false,
                  selections: [
                    {
                      kind: 'LinkedField',
                      alias: null,
                      name: 'counts',
                      storageKey: null,
                      args: null,
                      concreteType: 'FilterArtworksCounts',
                      plural: false,
                      selections: [
                        {
                          kind: 'ScalarField',
                          alias: null,
                          name: 'total',
                          args: null,
                          storageKey: null,
                        },
                      ],
                    },
                    v2,
                    {
                      kind: 'LinkedField',
                      alias: null,
                      name: 'aggregations',
                      storageKey: null,
                      args: null,
                      concreteType: 'ArtworksAggregationResults',
                      plural: true,
                      selections: [
                        {
                          kind: 'ScalarField',
                          alias: null,
                          name: 'slice',
                          args: null,
                          storageKey: null,
                        },
                        {
                          kind: 'LinkedField',
                          alias: null,
                          name: 'counts',
                          storageKey: null,
                          args: null,
                          concreteType: 'AggregationCount',
                          plural: true,
                          selections: [
                            v4,
                            v6,
                            {
                              kind: 'ScalarField',
                              alias: null,
                              name: 'count',
                              args: null,
                              storageKey: null,
                            },
                            v2,
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  }
})()
;(node as any).hash = 'd9a3bfe133d142f393f301f23f2665cf'
export default node
