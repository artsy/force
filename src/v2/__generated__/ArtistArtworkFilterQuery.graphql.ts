/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkAggregation = "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "MAJOR_PERIOD" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "TOTAL" | "%future added value";
export type ArtworkSizes = "LARGE" | "MEDIUM" | "SMALL" | "%future added value";
export type ArtistArtworkFilterQueryVariables = {
    acquireable?: boolean | null;
    aggregations?: ReadonlyArray<ArtworkAggregation | null> | null;
    artistID: string;
    atAuction?: boolean | null;
    attributionClass?: ReadonlyArray<string | null> | null;
    color?: string | null;
    forSale?: boolean | null;
    height?: string | null;
    inquireableOnly?: boolean | null;
    keyword?: string | null;
    majorPeriods?: ReadonlyArray<string | null> | null;
    medium?: string | null;
    offerable?: boolean | null;
    page?: number | null;
    partnerID?: string | null;
    priceRange?: string | null;
    sizes?: ReadonlyArray<ArtworkSizes | null> | null;
    sort?: string | null;
    width?: string | null;
};
export type ArtistArtworkFilterQueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistArtworkFilter_artist">;
    } | null;
};
export type ArtistArtworkFilterQuery = {
    readonly response: ArtistArtworkFilterQueryResponse;
    readonly variables: ArtistArtworkFilterQueryVariables;
};



/*
query ArtistArtworkFilterQuery(
  $acquireable: Boolean
  $aggregations: [ArtworkAggregation] = [MEDIUM, TOTAL, GALLERY, INSTITUTION, MAJOR_PERIOD]
  $artistID: String!
  $atAuction: Boolean
  $attributionClass: [String]
  $color: String
  $forSale: Boolean
  $height: String
  $inquireableOnly: Boolean
  $keyword: String
  $majorPeriods: [String]
  $medium: String
  $offerable: Boolean
  $page: Int
  $partnerID: ID
  $priceRange: String
  $sizes: [ArtworkSizes]
  $sort: String
  $width: String
) {
  artist(id: $artistID) {
    ...ArtistArtworkFilter_artist_2TJyna
    id
  }
}

fragment ArtistArtworkFilter_artist_2TJyna on Artist {
  is_followed: isFollowed
  counts {
    partner_shows: partnerShows
    for_sale_artworks: forSaleArtworks
    ecommerce_artworks: ecommerceArtworks
    auction_artworks: auctionArtworks
    artworks
    has_make_offer_artworks: hasMakeOfferArtworks
  }
  filtered_artworks: filterArtworksConnection(acquireable: $acquireable, aggregations: $aggregations, artistID: $artistID, atAuction: $atAuction, attributionClass: $attributionClass, color: $color, forSale: $forSale, height: $height, inquireableOnly: $inquireableOnly, keyword: $keyword, majorPeriods: $majorPeriods, medium: $medium, offerable: $offerable, page: $page, partnerID: $partnerID, priceRange: $priceRange, sizes: $sizes, first: 30, after: "", sort: $sort, width: $width) {
    id
    ...ArtworkFilterArtworkGrid2_filtered_artworks
  }
}

fragment ArtworkFilterArtworkGrid2_filtered_artworks on FilterArtworksConnection {
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

fragment ArtworkGrid_artworks on ArtworkConnectionInterface {
  edges {
    __typename
    node {
      id
      slug
      href
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
  is_acquireable: isAcquireable
  is_offerable: isOfferable
  href
  sale {
    is_preview: isPreview
    display_timely_at: displayTimelyAt
    id
  }
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
  ...Save_artwork
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

fragment Save_artwork on Artwork {
  id
  internalID
  slug
  is_saved: isSaved
  title
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "acquireable",
    "type": "Boolean",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "aggregations",
    "type": "[ArtworkAggregation]",
    "defaultValue": [
      "MEDIUM",
      "TOTAL",
      "GALLERY",
      "INSTITUTION",
      "MAJOR_PERIOD"
    ]
  },
  {
    "kind": "LocalArgument",
    "name": "artistID",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "atAuction",
    "type": "Boolean",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "attributionClass",
    "type": "[String]",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "color",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "forSale",
    "type": "Boolean",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "height",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "inquireableOnly",
    "type": "Boolean",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "keyword",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "majorPeriods",
    "type": "[String]",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "medium",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "offerable",
    "type": "Boolean",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "page",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "partnerID",
    "type": "ID",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "priceRange",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "sizes",
    "type": "[ArtworkSizes]",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "sort",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "width",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID"
  }
],
v2 = {
  "kind": "Variable",
  "name": "acquireable",
  "variableName": "acquireable"
},
v3 = {
  "kind": "Variable",
  "name": "aggregations",
  "variableName": "aggregations"
},
v4 = {
  "kind": "Variable",
  "name": "artistID",
  "variableName": "artistID"
},
v5 = {
  "kind": "Variable",
  "name": "atAuction",
  "variableName": "atAuction"
},
v6 = {
  "kind": "Variable",
  "name": "attributionClass",
  "variableName": "attributionClass"
},
v7 = {
  "kind": "Variable",
  "name": "color",
  "variableName": "color"
},
v8 = {
  "kind": "Variable",
  "name": "forSale",
  "variableName": "forSale"
},
v9 = {
  "kind": "Variable",
  "name": "height",
  "variableName": "height"
},
v10 = {
  "kind": "Variable",
  "name": "inquireableOnly",
  "variableName": "inquireableOnly"
},
v11 = {
  "kind": "Variable",
  "name": "keyword",
  "variableName": "keyword"
},
v12 = {
  "kind": "Variable",
  "name": "majorPeriods",
  "variableName": "majorPeriods"
},
v13 = {
  "kind": "Variable",
  "name": "medium",
  "variableName": "medium"
},
v14 = {
  "kind": "Variable",
  "name": "offerable",
  "variableName": "offerable"
},
v15 = {
  "kind": "Variable",
  "name": "page",
  "variableName": "page"
},
v16 = {
  "kind": "Variable",
  "name": "partnerID",
  "variableName": "partnerID"
},
v17 = {
  "kind": "Variable",
  "name": "priceRange",
  "variableName": "priceRange"
},
v18 = {
  "kind": "Variable",
  "name": "sizes",
  "variableName": "sizes"
},
v19 = {
  "kind": "Variable",
  "name": "sort",
  "variableName": "sort"
},
v20 = {
  "kind": "Variable",
  "name": "width",
  "variableName": "width"
},
v21 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v22 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v23 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v24 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "page",
  "args": null,
  "storageKey": null
},
v25 = [
  (v23/*: any*/),
  (v24/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "isCurrent",
    "args": null,
    "storageKey": null
  }
],
v26 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v27 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v28 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "display",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ArtistArtworkFilterQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtistArtworkFilter_artist",
            "args": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
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
              (v20/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtistArtworkFilterQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": "is_followed",
            "name": "isFollowed",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "counts",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtistCounts",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": "partner_shows",
                "name": "partnerShows",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": "for_sale_artworks",
                "name": "forSaleArtworks",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": "ecommerce_artworks",
                "name": "ecommerceArtworks",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": "auction_artworks",
                "name": "auctionArtworks",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "artworks",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": "has_make_offer_artworks",
                "name": "hasMakeOfferArtworks",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "filtered_artworks",
            "name": "filterArtworksConnection",
            "storageKey": null,
            "args": [
              (v2/*: any*/),
              {
                "kind": "Literal",
                "name": "after",
                "value": ""
              },
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              {
                "kind": "Literal",
                "name": "first",
                "value": 30
              },
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
              (v20/*: any*/)
            ],
            "concreteType": "FilterArtworksConnection",
            "plural": false,
            "selections": [
              (v21/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "aggregations",
                "storageKey": null,
                "args": null,
                "concreteType": "ArtworksAggregationResults",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "slice",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "counts",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "AggregationCount",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "value",
                        "args": null,
                        "storageKey": null
                      },
                      (v22/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "count",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "pageInfo",
                "storageKey": null,
                "args": null,
                "concreteType": "PageInfo",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "hasNextPage",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "endCursor",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "pageCursors",
                "storageKey": null,
                "args": null,
                "concreteType": "PageCursors",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "around",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "plural": true,
                    "selections": (v25/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "first",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "plural": false,
                    "selections": (v25/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "last",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "plural": false,
                    "selections": (v25/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "previous",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "plural": false,
                    "selections": [
                      (v23/*: any*/),
                      (v24/*: any*/)
                    ]
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "FilterArtworksEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "plural": false,
                    "selections": [
                      (v21/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "slug",
                        "args": null,
                        "storageKey": null
                      },
                      (v26/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "image",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Image",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": "aspect_ratio",
                            "name": "aspectRatio",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "placeholder",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "url",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "version",
                                "value": "large"
                              }
                            ],
                            "storageKey": "url(version:\"large\")"
                          }
                        ]
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "internalID",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "title",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": "image_title",
                        "name": "imageTitle",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "date",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": "sale_message",
                        "name": "saleMessage",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": "cultural_maker",
                        "name": "culturalMaker",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "artists",
                        "storageKey": "artists(shallow:true)",
                        "args": (v27/*: any*/),
                        "concreteType": "Artist",
                        "plural": true,
                        "selections": [
                          (v21/*: any*/),
                          (v26/*: any*/),
                          (v22/*: any*/)
                        ]
                      },
                      {
                        "kind": "ScalarField",
                        "alias": "collecting_institution",
                        "name": "collectingInstitution",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "partner",
                        "storageKey": "partner(shallow:true)",
                        "args": (v27/*: any*/),
                        "concreteType": "Partner",
                        "plural": false,
                        "selections": [
                          (v22/*: any*/),
                          (v26/*: any*/),
                          (v21/*: any*/),
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "type",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "sale",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Sale",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": "is_auction",
                            "name": "isAuction",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": "is_closed",
                            "name": "isClosed",
                            "args": null,
                            "storageKey": null
                          },
                          (v21/*: any*/),
                          {
                            "kind": "ScalarField",
                            "alias": "is_live_open",
                            "name": "isLiveOpen",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": "is_open",
                            "name": "isOpen",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": "is_preview",
                            "name": "isPreview",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": "display_timely_at",
                            "name": "displayTimelyAt",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      },
                      {
                        "kind": "LinkedField",
                        "alias": "sale_artwork",
                        "name": "saleArtwork",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "SaleArtwork",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "counts",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "SaleArtworkCounts",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": "bidder_positions",
                                "name": "bidderPositions",
                                "args": null,
                                "storageKey": null
                              }
                            ]
                          },
                          {
                            "kind": "LinkedField",
                            "alias": "highest_bid",
                            "name": "highestBid",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "SaleArtworkHighestBid",
                            "plural": false,
                            "selections": (v28/*: any*/)
                          },
                          {
                            "kind": "LinkedField",
                            "alias": "opening_bid",
                            "name": "openingBid",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "SaleArtworkOpeningBid",
                            "plural": false,
                            "selections": (v28/*: any*/)
                          },
                          (v21/*: any*/)
                        ]
                      },
                      {
                        "kind": "ScalarField",
                        "alias": "is_inquireable",
                        "name": "isInquireable",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": "is_saved",
                        "name": "isSaved",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": "is_biddable",
                        "name": "isBiddable",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": "is_acquireable",
                        "name": "isAcquireable",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": "is_offerable",
                        "name": "isOfferable",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  },
                  (v21/*: any*/)
                ]
              }
            ]
          },
          (v21/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ArtistArtworkFilterQuery",
    "id": null,
    "text": "query ArtistArtworkFilterQuery(\n  $acquireable: Boolean\n  $aggregations: [ArtworkAggregation] = [MEDIUM, TOTAL, GALLERY, INSTITUTION, MAJOR_PERIOD]\n  $artistID: String!\n  $atAuction: Boolean\n  $attributionClass: [String]\n  $color: String\n  $forSale: Boolean\n  $height: String\n  $inquireableOnly: Boolean\n  $keyword: String\n  $majorPeriods: [String]\n  $medium: String\n  $offerable: Boolean\n  $page: Int\n  $partnerID: ID\n  $priceRange: String\n  $sizes: [ArtworkSizes]\n  $sort: String\n  $width: String\n) {\n  artist(id: $artistID) {\n    ...ArtistArtworkFilter_artist_2TJyna\n    id\n  }\n}\n\nfragment ArtistArtworkFilter_artist_2TJyna on Artist {\n  is_followed: isFollowed\n  counts {\n    partner_shows: partnerShows\n    for_sale_artworks: forSaleArtworks\n    ecommerce_artworks: ecommerceArtworks\n    auction_artworks: auctionArtworks\n    artworks\n    has_make_offer_artworks: hasMakeOfferArtworks\n  }\n  filtered_artworks: filterArtworksConnection(acquireable: $acquireable, aggregations: $aggregations, artistID: $artistID, atAuction: $atAuction, attributionClass: $attributionClass, color: $color, forSale: $forSale, height: $height, inquireableOnly: $inquireableOnly, keyword: $keyword, majorPeriods: $majorPeriods, medium: $medium, offerable: $offerable, page: $page, partnerID: $partnerID, priceRange: $priceRange, sizes: $sizes, first: 30, after: \"\", sort: $sort, width: $width) {\n    id\n    ...ArtworkFilterArtworkGrid2_filtered_artworks\n  }\n}\n\nfragment ArtworkFilterArtworkGrid2_filtered_artworks on FilterArtworksConnection {\n  id\n  aggregations {\n    slice\n    counts {\n      value\n      name\n      count\n    }\n  }\n  pageInfo {\n    hasNextPage\n    endCursor\n  }\n  pageCursors {\n    ...Pagination_pageCursors\n  }\n  edges {\n    node {\n      id\n    }\n  }\n  ...ArtworkGrid_artworks\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnectionInterface {\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      image {\n        aspect_ratio: aspectRatio\n      }\n      ...GridItem_artwork\n    }\n    ... on Node {\n      id\n    }\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  is_acquireable: isAcquireable\n  is_offerable: isOfferable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  image_title: imageTitle\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio: aspectRatio\n  }\n  href\n  ...Metadata_artwork\n  ...Save_artwork\n  ...Badge_artwork\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment Save_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'f7697732e8728543553945043ba55099';
export default node;
