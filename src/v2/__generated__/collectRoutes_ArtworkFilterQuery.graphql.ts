/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkAggregation = "ARTIST" | "ARTIST_NATIONALITY" | "ATTRIBUTION_CLASS" | "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "MAJOR_PERIOD" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "TOTAL" | "%future added value";
export type ArtworkSizes = "LARGE" | "MEDIUM" | "SMALL" | "%future added value";
export type collectRoutes_ArtworkFilterQueryVariables = {
    acquireable?: boolean | null;
    aggregations?: Array<ArtworkAggregation | null> | null;
    artistID?: string | null;
    atAuction?: boolean | null;
    attributionClass?: Array<string | null> | null;
    color?: string | null;
    forSale?: boolean | null;
    height?: string | null;
    inquireableOnly?: boolean | null;
    majorPeriods?: Array<string | null> | null;
    medium?: string | null;
    offerable?: boolean | null;
    page?: number | null;
    partnerID?: string | null;
    partnerIDs?: Array<string | null> | null;
    priceRange?: string | null;
    sizes?: Array<ArtworkSizes | null> | null;
    sort?: string | null;
    keyword?: string | null;
    width?: string | null;
};
export type collectRoutes_ArtworkFilterQueryResponse = {
    readonly marketingHubCollections: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"Collect_marketingHubCollections">;
    }>;
    readonly filterArtworks: {
        readonly " $fragmentRefs": FragmentRefs<"SeoProductsForArtworks_artworks">;
    } | null;
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkFilter_viewer">;
    } | null;
};
export type collectRoutes_ArtworkFilterQuery = {
    readonly response: collectRoutes_ArtworkFilterQueryResponse;
    readonly variables: collectRoutes_ArtworkFilterQueryVariables;
};



/*
query collectRoutes_ArtworkFilterQuery(
  $acquireable: Boolean
  $aggregations: [ArtworkAggregation] = [TOTAL]
  $artistID: String
  $atAuction: Boolean
  $attributionClass: [String]
  $color: String
  $forSale: Boolean
  $height: String
  $inquireableOnly: Boolean
  $majorPeriods: [String]
  $medium: String
  $offerable: Boolean
  $page: Int
  $partnerID: ID
  $partnerIDs: [String]
  $priceRange: String
  $sizes: [ArtworkSizes]
  $sort: String
  $keyword: String
  $width: String
) {
  marketingHubCollections {
    ...Collect_marketingHubCollections
    id
  }
  filterArtworks: artworksConnection(aggregations: $aggregations, sort: $sort, first: 30) {
    ...SeoProductsForArtworks_artworks
    id
  }
  viewer {
    ...ArtworkFilter_viewer_1zW58l
  }
}

fragment ArtworkFilterArtworkGrid_filtered_artworks on FilterArtworksConnection {
  id
  aggregations {
    slice
    counts {
      value
      name
      count
    }
  }
  pageInfo {
    hasNextPage
    endCursor
  }
  pageCursors {
    ...Pagination_pageCursors
  }
  edges {
    node {
      id
    }
  }
  ...ArtworkGrid_artworks
}

fragment ArtworkFilter_viewer_1zW58l on Viewer {
  filtered_artworks: artworksConnection(acquireable: $acquireable, aggregations: $aggregations, artistID: $artistID, atAuction: $atAuction, attributionClass: $attributionClass, color: $color, forSale: $forSale, height: $height, inquireableOnly: $inquireableOnly, keyword: $keyword, majorPeriods: $majorPeriods, medium: $medium, offerable: $offerable, page: $page, partnerID: $partnerID, partnerIDs: $partnerIDs, priceRange: $priceRange, sizes: $sizes, sort: $sort, width: $width, first: 30) {
    id
    ...ArtworkFilterArtworkGrid_filtered_artworks
  }
}

fragment ArtworkGrid_artworks on ArtworkConnectionInterface {
  edges {
    __typename
    node {
      id
      slug
      href
      internalID
      image {
        aspect_ratio: aspectRatio
      }
      ...GridItem_artwork
    }
    ... on Node {
      id
    }
  }
}

fragment Badge_artwork on Artwork {
  is_biddable: isBiddable
  href
  sale {
    is_preview: isPreview
    display_timely_at: displayTimelyAt
    id
  }
}

fragment Collect_marketingHubCollections on MarketingCollection {
  ...CollectionsHubsNav_marketingHubCollections
}

fragment CollectionsHubsNav_marketingHubCollections on MarketingCollection {
  slug
  title
  thumbnail
}

fragment Contact_artwork on Artwork {
  href
  is_inquireable: isInquireable
  sale {
    is_auction: isAuction
    is_live_open: isLiveOpen
    is_open: isOpen
    is_closed: isClosed
    id
  }
  partner(shallow: true) {
    type
    id
  }
  sale_artwork: saleArtwork {
    highest_bid: highestBid {
      display
    }
    opening_bid: openingBid {
      display
    }
    counts {
      bidder_positions: bidderPositions
    }
    id
  }
}

fragment Details_artwork on Artwork {
  href
  title
  date
  sale_message: saleMessage
  cultural_maker: culturalMaker
  artists(shallow: true) {
    id
    href
    name
  }
  collecting_institution: collectingInstitution
  partner(shallow: true) {
    name
    href
    id
  }
  sale {
    is_auction: isAuction
    is_closed: isClosed
    id
  }
  sale_artwork: saleArtwork {
    counts {
      bidder_positions: bidderPositions
    }
    highest_bid: highestBid {
      display
    }
    opening_bid: openingBid {
      display
    }
    id
  }
}

fragment GridItem_artwork on Artwork {
  internalID
  title
  image_title: imageTitle
  image {
    placeholder
    url(version: "large")
    aspect_ratio: aspectRatio
  }
  href
  ...Metadata_artwork
  ...SaveButton_artwork
  ...Badge_artwork
}

fragment Metadata_artwork on Artwork {
  ...Details_artwork
  ...Contact_artwork
  href
}

fragment Pagination_pageCursors on PageCursors {
  around {
    cursor
    page
    isCurrent
  }
  first {
    cursor
    page
    isCurrent
  }
  last {
    cursor
    page
    isCurrent
  }
  previous {
    cursor
    page
  }
}

fragment SaveButton_artwork on Artwork {
  id
  internalID
  slug
  is_saved: isSaved
  title
}

fragment SeoProductsForArtworks_artworks on FilterArtworksConnection {
  edges {
    node {
      id
      availability
      category
      date
      href
      is_acquireable: isAcquireable
      is_price_range: isPriceRange
      listPrice {
        __typename
        ... on PriceRange {
          display
        }
        ... on Money {
          display
        }
      }
      price_currency: priceCurrency
      title
      artists(shallow: true) {
        name
        id
      }
      image {
        url(version: "larger")
      }
      meta {
        description
      }
      partner(shallow: true) {
        name
        type
        profile {
          icon {
            url(version: "larger")
          }
          id
        }
        locations(size: 1) {
          address
          address_2: address2
          city
          state
          country
          postal_code: postalCode
          phone
          id
        }
        id
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "acquireable",
    "type": "Boolean"
  },
  {
    "defaultValue": [
      "TOTAL"
    ],
    "kind": "LocalArgument",
    "name": "aggregations",
    "type": "[ArtworkAggregation]"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistID",
    "type": "String"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "atAuction",
    "type": "Boolean"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "attributionClass",
    "type": "[String]"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "color",
    "type": "String"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "forSale",
    "type": "Boolean"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "height",
    "type": "String"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "inquireableOnly",
    "type": "Boolean"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "majorPeriods",
    "type": "[String]"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "medium",
    "type": "String"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "offerable",
    "type": "Boolean"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "page",
    "type": "Int"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "partnerID",
    "type": "ID"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "partnerIDs",
    "type": "[String]"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "priceRange",
    "type": "String"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "sizes",
    "type": "[ArtworkSizes]"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "sort",
    "type": "String"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "keyword",
    "type": "String"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "width",
    "type": "String"
  }
],
v1 = {
  "kind": "Variable",
  "name": "aggregations",
  "variableName": "aggregations"
},
v2 = {
  "kind": "Literal",
  "name": "first",
  "value": 30
},
v3 = {
  "kind": "Variable",
  "name": "sort",
  "variableName": "sort"
},
v4 = [
  (v1/*: any*/),
  (v2/*: any*/),
  (v3/*: any*/)
],
v5 = {
  "kind": "Variable",
  "name": "acquireable",
  "variableName": "acquireable"
},
v6 = {
  "kind": "Variable",
  "name": "artistID",
  "variableName": "artistID"
},
v7 = {
  "kind": "Variable",
  "name": "atAuction",
  "variableName": "atAuction"
},
v8 = {
  "kind": "Variable",
  "name": "attributionClass",
  "variableName": "attributionClass"
},
v9 = {
  "kind": "Variable",
  "name": "color",
  "variableName": "color"
},
v10 = {
  "kind": "Variable",
  "name": "forSale",
  "variableName": "forSale"
},
v11 = {
  "kind": "Variable",
  "name": "height",
  "variableName": "height"
},
v12 = {
  "kind": "Variable",
  "name": "inquireableOnly",
  "variableName": "inquireableOnly"
},
v13 = {
  "kind": "Variable",
  "name": "keyword",
  "variableName": "keyword"
},
v14 = {
  "kind": "Variable",
  "name": "majorPeriods",
  "variableName": "majorPeriods"
},
v15 = {
  "kind": "Variable",
  "name": "medium",
  "variableName": "medium"
},
v16 = {
  "kind": "Variable",
  "name": "offerable",
  "variableName": "offerable"
},
v17 = {
  "kind": "Variable",
  "name": "page",
  "variableName": "page"
},
v18 = {
  "kind": "Variable",
  "name": "partnerID",
  "variableName": "partnerID"
},
v19 = {
  "kind": "Variable",
  "name": "partnerIDs",
  "variableName": "partnerIDs"
},
v20 = {
  "kind": "Variable",
  "name": "priceRange",
  "variableName": "priceRange"
},
v21 = {
  "kind": "Variable",
  "name": "sizes",
  "variableName": "sizes"
},
v22 = {
  "kind": "Variable",
  "name": "width",
  "variableName": "width"
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v28 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v29 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v31 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "version",
        "value": "larger"
      }
    ],
    "kind": "ScalarField",
    "name": "url",
    "storageKey": "url(version:\"larger\")"
  }
],
v32 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v33 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v34 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v35 = [
  (v33/*: any*/),
  (v34/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "collectRoutes_ArtworkFilterQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MarketingCollection",
        "kind": "LinkedField",
        "name": "marketingHubCollections",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Collect_marketingHubCollections"
          }
        ],
        "storageKey": null
      },
      {
        "alias": "filterArtworks",
        "args": (v4/*: any*/),
        "concreteType": "FilterArtworksConnection",
        "kind": "LinkedField",
        "name": "artworksConnection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SeoProductsForArtworks_artworks"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": [
              (v5/*: any*/),
              (v1/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              (v19/*: any*/),
              (v20/*: any*/),
              (v21/*: any*/),
              (v3/*: any*/),
              (v22/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "ArtworkFilter_viewer"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "collectRoutes_ArtworkFilterQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MarketingCollection",
        "kind": "LinkedField",
        "name": "marketingHubCollections",
        "plural": true,
        "selections": [
          (v23/*: any*/),
          (v24/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "thumbnail",
            "storageKey": null
          },
          (v25/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": "filterArtworks",
        "args": (v4/*: any*/),
        "concreteType": "FilterArtworksConnection",
        "kind": "LinkedField",
        "name": "artworksConnection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "FilterArtworksEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Artwork",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v25/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "availability",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "category",
                    "storageKey": null
                  },
                  (v26/*: any*/),
                  (v27/*: any*/),
                  {
                    "alias": "is_acquireable",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isAcquireable",
                    "storageKey": null
                  },
                  {
                    "alias": "is_price_range",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isPriceRange",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "listPrice",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v28/*: any*/),
                        "type": "PriceRange"
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v28/*: any*/),
                        "type": "Money"
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": "price_currency",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "priceCurrency",
                    "storageKey": null
                  },
                  (v24/*: any*/),
                  {
                    "alias": null,
                    "args": (v29/*: any*/),
                    "concreteType": "Artist",
                    "kind": "LinkedField",
                    "name": "artists",
                    "plural": true,
                    "selections": [
                      (v30/*: any*/),
                      (v25/*: any*/)
                    ],
                    "storageKey": "artists(shallow:true)"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Image",
                    "kind": "LinkedField",
                    "name": "image",
                    "plural": false,
                    "selections": (v31/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ArtworkMeta",
                    "kind": "LinkedField",
                    "name": "meta",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "description",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": (v29/*: any*/),
                    "concreteType": "Partner",
                    "kind": "LinkedField",
                    "name": "partner",
                    "plural": false,
                    "selections": [
                      (v30/*: any*/),
                      (v32/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Profile",
                        "kind": "LinkedField",
                        "name": "profile",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Image",
                            "kind": "LinkedField",
                            "name": "icon",
                            "plural": false,
                            "selections": (v31/*: any*/),
                            "storageKey": null
                          },
                          (v25/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "size",
                            "value": 1
                          }
                        ],
                        "concreteType": "Location",
                        "kind": "LinkedField",
                        "name": "locations",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "address",
                            "storageKey": null
                          },
                          {
                            "alias": "address_2",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "address2",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "city",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "state",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "country",
                            "storageKey": null
                          },
                          {
                            "alias": "postal_code",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "postalCode",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "phone",
                            "storageKey": null
                          },
                          (v25/*: any*/)
                        ],
                        "storageKey": "locations(size:1)"
                      },
                      (v25/*: any*/)
                    ],
                    "storageKey": "partner(shallow:true)"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v25/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": "filtered_artworks",
            "args": [
              (v5/*: any*/),
              (v1/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v2/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              (v19/*: any*/),
              (v20/*: any*/),
              (v21/*: any*/),
              (v3/*: any*/),
              (v22/*: any*/)
            ],
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "artworksConnection",
            "plural": false,
            "selections": [
              (v25/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtworksAggregationResults",
                "kind": "LinkedField",
                "name": "aggregations",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "slice",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AggregationCount",
                    "kind": "LinkedField",
                    "name": "counts",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "value",
                        "storageKey": null
                      },
                      (v30/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "count",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageCursors",
                "kind": "LinkedField",
                "name": "pageCursors",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "around",
                    "plural": true,
                    "selections": (v35/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "first",
                    "plural": false,
                    "selections": (v35/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "last",
                    "plural": false,
                    "selections": (v35/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "previous",
                    "plural": false,
                    "selections": [
                      (v33/*: any*/),
                      (v34/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "FilterArtworksEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v25/*: any*/),
                      (v23/*: any*/),
                      (v27/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "internalID",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "image",
                        "plural": false,
                        "selections": [
                          {
                            "alias": "aspect_ratio",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "aspectRatio",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "placeholder",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "version",
                                "value": "large"
                              }
                            ],
                            "kind": "ScalarField",
                            "name": "url",
                            "storageKey": "url(version:\"large\")"
                          }
                        ],
                        "storageKey": null
                      },
                      (v24/*: any*/),
                      {
                        "alias": "image_title",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "imageTitle",
                        "storageKey": null
                      },
                      (v26/*: any*/),
                      {
                        "alias": "sale_message",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "saleMessage",
                        "storageKey": null
                      },
                      {
                        "alias": "cultural_maker",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "culturalMaker",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v29/*: any*/),
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artists",
                        "plural": true,
                        "selections": [
                          (v25/*: any*/),
                          (v27/*: any*/),
                          (v30/*: any*/)
                        ],
                        "storageKey": "artists(shallow:true)"
                      },
                      {
                        "alias": "collecting_institution",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "collectingInstitution",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v29/*: any*/),
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v30/*: any*/),
                          (v27/*: any*/),
                          (v25/*: any*/),
                          (v32/*: any*/)
                        ],
                        "storageKey": "partner(shallow:true)"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Sale",
                        "kind": "LinkedField",
                        "name": "sale",
                        "plural": false,
                        "selections": [
                          {
                            "alias": "is_auction",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isAuction",
                            "storageKey": null
                          },
                          {
                            "alias": "is_closed",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isClosed",
                            "storageKey": null
                          },
                          (v25/*: any*/),
                          {
                            "alias": "is_live_open",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isLiveOpen",
                            "storageKey": null
                          },
                          {
                            "alias": "is_open",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isOpen",
                            "storageKey": null
                          },
                          {
                            "alias": "is_preview",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isPreview",
                            "storageKey": null
                          },
                          {
                            "alias": "display_timely_at",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "displayTimelyAt",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": "sale_artwork",
                        "args": null,
                        "concreteType": "SaleArtwork",
                        "kind": "LinkedField",
                        "name": "saleArtwork",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "SaleArtworkCounts",
                            "kind": "LinkedField",
                            "name": "counts",
                            "plural": false,
                            "selections": [
                              {
                                "alias": "bidder_positions",
                                "args": null,
                                "kind": "ScalarField",
                                "name": "bidderPositions",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": "highest_bid",
                            "args": null,
                            "concreteType": "SaleArtworkHighestBid",
                            "kind": "LinkedField",
                            "name": "highestBid",
                            "plural": false,
                            "selections": (v28/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": "opening_bid",
                            "args": null,
                            "concreteType": "SaleArtworkOpeningBid",
                            "kind": "LinkedField",
                            "name": "openingBid",
                            "plural": false,
                            "selections": (v28/*: any*/),
                            "storageKey": null
                          },
                          (v25/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": "is_inquireable",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isInquireable",
                        "storageKey": null
                      },
                      {
                        "alias": "is_saved",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isSaved",
                        "storageKey": null
                      },
                      {
                        "alias": "is_biddable",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isBiddable",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v25/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "collectRoutes_ArtworkFilterQuery",
    "operationKind": "query",
    "text": "query collectRoutes_ArtworkFilterQuery(\n  $acquireable: Boolean\n  $aggregations: [ArtworkAggregation] = [TOTAL]\n  $artistID: String\n  $atAuction: Boolean\n  $attributionClass: [String]\n  $color: String\n  $forSale: Boolean\n  $height: String\n  $inquireableOnly: Boolean\n  $majorPeriods: [String]\n  $medium: String\n  $offerable: Boolean\n  $page: Int\n  $partnerID: ID\n  $partnerIDs: [String]\n  $priceRange: String\n  $sizes: [ArtworkSizes]\n  $sort: String\n  $keyword: String\n  $width: String\n) {\n  marketingHubCollections {\n    ...Collect_marketingHubCollections\n    id\n  }\n  filterArtworks: artworksConnection(aggregations: $aggregations, sort: $sort, first: 30) {\n    ...SeoProductsForArtworks_artworks\n    id\n  }\n  viewer {\n    ...ArtworkFilter_viewer_1zW58l\n  }\n}\n\nfragment ArtworkFilterArtworkGrid_filtered_artworks on FilterArtworksConnection {\n  id\n  aggregations {\n    slice\n    counts {\n      value\n      name\n      count\n    }\n  }\n  pageInfo {\n    hasNextPage\n    endCursor\n  }\n  pageCursors {\n    ...Pagination_pageCursors\n  }\n  edges {\n    node {\n      id\n    }\n  }\n  ...ArtworkGrid_artworks\n}\n\nfragment ArtworkFilter_viewer_1zW58l on Viewer {\n  filtered_artworks: artworksConnection(acquireable: $acquireable, aggregations: $aggregations, artistID: $artistID, atAuction: $atAuction, attributionClass: $attributionClass, color: $color, forSale: $forSale, height: $height, inquireableOnly: $inquireableOnly, keyword: $keyword, majorPeriods: $majorPeriods, medium: $medium, offerable: $offerable, page: $page, partnerID: $partnerID, partnerIDs: $partnerIDs, priceRange: $priceRange, sizes: $sizes, sort: $sort, width: $width, first: 30) {\n    id\n    ...ArtworkFilterArtworkGrid_filtered_artworks\n  }\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnectionInterface {\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      internalID\n      image {\n        aspect_ratio: aspectRatio\n      }\n      ...GridItem_artwork\n    }\n    ... on Node {\n      id\n    }\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Collect_marketingHubCollections on MarketingCollection {\n  ...CollectionsHubsNav_marketingHubCollections\n}\n\nfragment CollectionsHubsNav_marketingHubCollections on MarketingCollection {\n  slug\n  title\n  thumbnail\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  image_title: imageTitle\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio: aspectRatio\n  }\n  href\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment SeoProductsForArtworks_artworks on FilterArtworksConnection {\n  edges {\n    node {\n      id\n      availability\n      category\n      date\n      href\n      is_acquireable: isAcquireable\n      is_price_range: isPriceRange\n      listPrice {\n        __typename\n        ... on PriceRange {\n          display\n        }\n        ... on Money {\n          display\n        }\n      }\n      price_currency: priceCurrency\n      title\n      artists(shallow: true) {\n        name\n        id\n      }\n      image {\n        url(version: \"larger\")\n      }\n      meta {\n        description\n      }\n      partner(shallow: true) {\n        name\n        type\n        profile {\n          icon {\n            url(version: \"larger\")\n          }\n          id\n        }\n        locations(size: 1) {\n          address\n          address_2: address2\n          city\n          state\n          country\n          postal_code: postalCode\n          phone\n          id\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '309ac54bc9c56cdc214e04e20192fec5';
export default node;
