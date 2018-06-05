/* tslint:disable */

import { ConcreteRequest } from 'relay-runtime'
export type TagContentsArtworksQueryVariables = {
  readonly tagID: string
  readonly medium?: string | null
  readonly price_range?: string | null
  readonly sort?: string | null
  readonly for_sale?: boolean | null
  readonly dimension_range?: string | null
}
export type TagContentsArtworksQueryResponse = {
  readonly tag: ({}) | null
}

/*
query TagContentsArtworksQuery(
  $tagID: String!
  $medium: String
  $price_range: String
  $sort: String
  $for_sale: Boolean
  $dimension_range: String
) {
  tag(id: $tagID) {
    ...TagArtworks_tag_2wcu0m
    __id
  }
}

fragment TagArtworks_tag_2wcu0m on Tag {
  id
  filtered_artworks(aggregations: [MEDIUM, TOTAL, PRICE_RANGE, DIMENSION_RANGE], for_sale: $for_sale, medium: $medium, price_range: $price_range, dimension_range: $dimension_range, size: 0) {
    ...TotalCount_filter_artworks
    ...TagArtworksContent_filtered_artworks
    aggregations {
      slice
      counts {
        name
        id
        __id
      }
      ...Dropdown_aggregation
    }
    facet {
      __typename
      ...Headline_facet
      ... on Node {
        __id
      }
    }
    __id
  }
  __id
}

fragment TotalCount_filter_artworks on FilterArtworks {
  counts {
    total
  }
  __id
}

fragment TagArtworksContent_filtered_artworks on FilterArtworks {
  __id
  artworks: artworks_connection(first: 10, after: "", sort: $sort) {
    pageInfo {
      hasNextPage
      endCursor
    }
    ...ArtworkGrid_artworks
    edges {
      node {
        __id
        __typename
      }
      cursor
    }
  }
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

fragment Headline_facet on ArtworkFilterFacet {
  ... on ArtworkFilterTag {
    name
  }
  ... on ArtworkFilterGene {
    name
  }
  ... on Node {
    __id
  }
}

fragment ArtworkGrid_artworks on ArtworkConnection {
  edges {
    node {
      __id
      image {
        aspect_ratio
      }
      ...GridItem_artwork
    }
  }
}

fragment GridItem_artwork on Artwork {
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
        name: 'tagID',
        type: 'String!',
        defaultValue: null,
      },
      {
        kind: 'LocalArgument',
        name: 'medium',
        type: 'String',
        defaultValue: null,
      },
      {
        kind: 'LocalArgument',
        name: 'price_range',
        type: 'String',
        defaultValue: null,
      },
      {
        kind: 'LocalArgument',
        name: 'sort',
        type: 'String',
        defaultValue: null,
      },
      {
        kind: 'LocalArgument',
        name: 'for_sale',
        type: 'Boolean',
        defaultValue: null,
      },
      {
        kind: 'LocalArgument',
        name: 'dimension_range',
        type: 'String',
        defaultValue: null,
      },
    ],
    v1 = [
      {
        kind: 'Variable',
        name: 'id',
        variableName: 'tagID',
        type: 'String!',
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
      name: 'id',
      args: null,
      storageKey: null,
    },
    v4 = {
      kind: 'ScalarField',
      alias: null,
      name: 'href',
      args: null,
      storageKey: null,
    },
    v5 = [
      {
        kind: 'Literal',
        name: 'shallow',
        value: true,
        type: 'Boolean',
      },
    ],
    v6 = {
      kind: 'ScalarField',
      alias: null,
      name: 'name',
      args: null,
      storageKey: null,
    },
    v7 = {
      kind: 'ScalarField',
      alias: null,
      name: 'display',
      args: null,
      storageKey: null,
    },
    v8 = {
      kind: 'ScalarField',
      alias: null,
      name: '__typename',
      args: null,
      storageKey: null,
    },
    v9 = [v6]
  return {
    kind: 'Request',
    operationKind: 'query',
    name: 'TagContentsArtworksQuery',
    id: null,
    text:
      'query TagContentsArtworksQuery(\n  $tagID: String!\n  $medium: String\n  $price_range: String\n  $sort: String\n  $for_sale: Boolean\n  $dimension_range: String\n) {\n  tag(id: $tagID) {\n    ...TagArtworks_tag_2wcu0m\n    __id\n  }\n}\n\nfragment TagArtworks_tag_2wcu0m on Tag {\n  id\n  filtered_artworks(aggregations: [MEDIUM, TOTAL, PRICE_RANGE, DIMENSION_RANGE], for_sale: $for_sale, medium: $medium, price_range: $price_range, dimension_range: $dimension_range, size: 0) {\n    ...TotalCount_filter_artworks\n    ...TagArtworksContent_filtered_artworks\n    aggregations {\n      slice\n      counts {\n        name\n        id\n        __id\n      }\n      ...Dropdown_aggregation\n    }\n    facet {\n      __typename\n      ...Headline_facet\n      ... on Node {\n        __id\n      }\n    }\n    __id\n  }\n  __id\n}\n\nfragment TotalCount_filter_artworks on FilterArtworks {\n  counts {\n    total\n  }\n  __id\n}\n\nfragment TagArtworksContent_filtered_artworks on FilterArtworks {\n  __id\n  artworks: artworks_connection(first: 10, after: "", sort: $sort) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    ...ArtworkGrid_artworks\n    edges {\n      node {\n        __id\n        __typename\n      }\n      cursor\n    }\n  }\n}\n\nfragment Dropdown_aggregation on ArtworksAggregationResults {\n  slice\n  counts {\n    name\n    id\n    count\n    __id\n  }\n}\n\nfragment Headline_facet on ArtworkFilterFacet {\n  ... on ArtworkFilterTag {\n    name\n  }\n  ... on ArtworkFilterGene {\n    name\n  }\n  ... on Node {\n    __id\n  }\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnection {\n  edges {\n    node {\n      __id\n      image {\n        aspect_ratio\n      }\n      ...GridItem_artwork\n    }\n  }\n}\n\nfragment GridItem_artwork on Artwork {\n  image {\n    placeholder\n    url(version: "large")\n    aspect_ratio\n  }\n  href\n  ...Metadata_artwork\n  ...Save_artwork\n  __id\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  __id\n}\n\nfragment Save_artwork on Artwork {\n  __id\n  id\n  is_saved\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message\n  cultural_maker\n  artists(shallow: true) {\n    __id\n    href\n    name\n  }\n  collecting_institution\n  partner(shallow: true) {\n    name\n    href\n    __id\n  }\n  sale {\n    is_auction\n    is_live_open\n    is_open\n    is_closed\n    __id\n  }\n  __id\n}\n\nfragment Contact_artwork on Artwork {\n  _id\n  href\n  is_inquireable\n  sale {\n    is_auction\n    is_live_open\n    is_open\n    is_closed\n    __id\n  }\n  partner(shallow: true) {\n    type\n    __id\n  }\n  sale_artwork {\n    highest_bid {\n      display\n      __id: id\n    }\n    opening_bid {\n      display\n    }\n    counts {\n      bidder_positions\n    }\n    __id\n  }\n  __id\n}\n',
    metadata: {},
    fragment: {
      kind: 'Fragment',
      name: 'TagContentsArtworksQuery',
      type: 'Query',
      metadata: null,
      argumentDefinitions: v0,
      selections: [
        {
          kind: 'LinkedField',
          alias: null,
          name: 'tag',
          storageKey: null,
          args: v1,
          concreteType: 'Tag',
          plural: false,
          selections: [
            {
              kind: 'FragmentSpread',
              name: 'TagArtworks_tag',
              args: [
                {
                  kind: 'Variable',
                  name: 'dimension_range',
                  variableName: 'dimension_range',
                  type: null,
                },
                {
                  kind: 'Variable',
                  name: 'for_sale',
                  variableName: 'for_sale',
                  type: null,
                },
                {
                  kind: 'Variable',
                  name: 'medium',
                  variableName: 'medium',
                  type: null,
                },
                {
                  kind: 'Variable',
                  name: 'price_range',
                  variableName: 'price_range',
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
      name: 'TagContentsArtworksQuery',
      argumentDefinitions: v0,
      selections: [
        {
          kind: 'LinkedField',
          alias: null,
          name: 'tag',
          storageKey: null,
          args: v1,
          concreteType: 'Tag',
          plural: false,
          selections: [
            v3,
            {
              kind: 'LinkedField',
              alias: null,
              name: 'filtered_artworks',
              storageKey: null,
              args: [
                {
                  kind: 'Literal',
                  name: 'aggregations',
                  value: ['MEDIUM', 'TOTAL', 'PRICE_RANGE', 'DIMENSION_RANGE'],
                  type: '[ArtworkAggregation]',
                },
                {
                  kind: 'Variable',
                  name: 'dimension_range',
                  variableName: 'dimension_range',
                  type: 'String',
                },
                {
                  kind: 'Variable',
                  name: 'for_sale',
                  variableName: 'for_sale',
                  type: 'Boolean',
                },
                {
                  kind: 'Variable',
                  name: 'medium',
                  variableName: 'medium',
                  type: 'String',
                },
                {
                  kind: 'Variable',
                  name: 'price_range',
                  variableName: 'price_range',
                  type: 'String',
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
                  alias: 'artworks',
                  name: 'artworks_connection',
                  storageKey: null,
                  args: [
                    {
                      kind: 'Literal',
                      name: 'after',
                      value: '',
                      type: 'String',
                    },
                    {
                      kind: 'Literal',
                      name: 'first',
                      value: 10,
                      type: 'Int',
                    },
                    {
                      kind: 'Variable',
                      name: 'sort',
                      variableName: 'sort',
                      type: 'String',
                    },
                  ],
                  concreteType: 'ArtworkConnection',
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
                            v4,
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
                              args: v5,
                              concreteType: 'Artist',
                              plural: true,
                              selections: [v2, v4, v6],
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
                                  storageKey: 'url(version:"large")',
                                },
                              ],
                            },
                            {
                              kind: 'LinkedField',
                              alias: null,
                              name: 'partner',
                              storageKey: 'partner(shallow:true)',
                              args: v5,
                              concreteType: 'Partner',
                              plural: false,
                              selections: [
                                v6,
                                v4,
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
                                  concreteType: 'SaleArtworkHighestBid',
                                  plural: false,
                                  selections: [
                                    v7,
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
                                  concreteType: 'SaleArtworkOpeningBid',
                                  plural: false,
                                  selections: [v7],
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
                            v3,
                            {
                              kind: 'ScalarField',
                              alias: null,
                              name: 'is_saved',
                              args: null,
                              storageKey: null,
                            },
                            v8,
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
                  alias: 'artworks',
                  name: 'artworks_connection',
                  args: [
                    {
                      kind: 'Literal',
                      name: 'after',
                      value: '',
                      type: 'String',
                    },
                    {
                      kind: 'Literal',
                      name: 'first',
                      value: 10,
                      type: 'Int',
                    },
                    {
                      kind: 'Variable',
                      name: 'sort',
                      variableName: 'sort',
                      type: 'String',
                    },
                  ],
                  handle: 'connection',
                  key: 'TagArtworksContent_filtered_artworks',
                  filters: ['sort'],
                },
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
                        v6,
                        v3,
                        v2,
                        {
                          kind: 'ScalarField',
                          alias: null,
                          name: 'count',
                          args: null,
                          storageKey: null,
                        },
                      ],
                    },
                  ],
                },
                {
                  kind: 'LinkedField',
                  alias: null,
                  name: 'facet',
                  storageKey: null,
                  args: null,
                  concreteType: null,
                  plural: false,
                  selections: [
                    v8,
                    v2,
                    {
                      kind: 'InlineFragment',
                      type: 'ArtworkFilterGene',
                      selections: v9,
                    },
                    {
                      kind: 'InlineFragment',
                      type: 'ArtworkFilterTag',
                      selections: v9,
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
;(node as any).hash = 'e33a81fd24cb0cb5cabdfb7d8c812595'
export default node
