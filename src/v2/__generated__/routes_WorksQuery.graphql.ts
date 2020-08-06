/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkAggregation = "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "MAJOR_PERIOD" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "TOTAL" | "%future added value";
export type ArtworkSizes = "LARGE" | "MEDIUM" | "SMALL" | "%future added value";
export type routes_WorksQueryVariables = {
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
    shouldFetchArtistSeriesData: boolean;
};
export type routes_WorksQueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"Works_artist">;
    } | null;
};
export type routes_WorksQueryRawResponse = {
    readonly artist: ({
        readonly internalID: string;
        readonly slug: string;
        readonly id: string;
        readonly filterArtworksConnection: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly id: string;
                    readonly slug: string;
                    readonly image: ({
                        readonly href: string | null;
                        readonly imageAspectRatio: number;
                        readonly resized: ({
                            readonly url: string | null;
                            readonly width: number | null;
                            readonly height: number | null;
                        }) | null;
                        readonly url: string | null;
                        readonly aspect_ratio: number;
                    }) | null;
                    readonly imageTitle: string | null;
                    readonly title: string | null;
                    readonly href: string | null;
                    readonly date: string | null;
                    readonly sale_message: string | null;
                    readonly cultural_maker: string | null;
                    readonly artists: ReadonlyArray<({
                        readonly id: string;
                        readonly href: string | null;
                        readonly name: string | null;
                    }) | null> | null;
                    readonly collecting_institution: string | null;
                    readonly partner: ({
                        readonly name: string | null;
                        readonly href: string | null;
                        readonly id: string | null;
                        readonly type: string | null;
                    }) | null;
                    readonly sale: ({
                        readonly is_auction: boolean | null;
                        readonly is_closed: boolean | null;
                        readonly id: string | null;
                        readonly is_live_open: boolean | null;
                        readonly is_open: boolean | null;
                        readonly is_preview: boolean | null;
                        readonly display_timely_at: string | null;
                    }) | null;
                    readonly sale_artwork: ({
                        readonly counts: ({
                            readonly bidder_positions: number | null;
                        }) | null;
                        readonly highest_bid: ({
                            readonly display: string | null;
                        }) | null;
                        readonly opening_bid: ({
                            readonly display: string | null;
                        }) | null;
                        readonly id: string | null;
                    }) | null;
                    readonly is_inquireable: boolean | null;
                    readonly internalID: string;
                    readonly is_saved: boolean | null;
                    readonly is_biddable: boolean | null;
                }) | null;
            }) | null> | null;
            readonly id: string | null;
        }) | null;
        readonly related: ({
            readonly artistsConnection: ({
                readonly edges: ReadonlyArray<({
                    readonly node: ({
                        readonly id: string;
                    }) | null;
                }) | null> | null;
            }) | null;
        }) | null;
        readonly sidebarAggregations: ({
            readonly aggregations: ReadonlyArray<({
                readonly slice: ArtworkAggregation | null;
                readonly counts: ReadonlyArray<({
                    readonly name: string;
                    readonly value: string;
                }) | null> | null;
            }) | null> | null;
            readonly id: string | null;
        }) | null;
        readonly is_followed: boolean | null;
        readonly counts: ({
            readonly partner_shows: number | null;
            readonly for_sale_artworks: number | null;
            readonly ecommerce_artworks: number | null;
            readonly auction_artworks: number | null;
            readonly artworks: number | null;
            readonly has_make_offer_artworks: boolean | null;
        }) | null;
        readonly filtered_artworks: ({
            readonly id: string;
            readonly aggregations: ReadonlyArray<({
                readonly slice: ArtworkAggregation | null;
                readonly counts: ReadonlyArray<({
                    readonly value: string;
                    readonly name: string;
                    readonly count: number;
                }) | null> | null;
            }) | null> | null;
            readonly pageInfo: {
                readonly hasNextPage: boolean;
                readonly endCursor: string | null;
            };
            readonly pageCursors: {
                readonly around: ReadonlyArray<{
                    readonly cursor: string;
                    readonly page: number;
                    readonly isCurrent: boolean;
                }>;
                readonly first: ({
                    readonly cursor: string;
                    readonly page: number;
                    readonly isCurrent: boolean;
                }) | null;
                readonly last: ({
                    readonly cursor: string;
                    readonly page: number;
                    readonly isCurrent: boolean;
                }) | null;
                readonly previous: ({
                    readonly cursor: string;
                    readonly page: number;
                }) | null;
            };
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly id: string;
                    readonly slug: string;
                    readonly href: string | null;
                    readonly internalID: string;
                    readonly image: ({
                        readonly aspect_ratio: number;
                        readonly placeholder: string | null;
                        readonly url: string | null;
                    }) | null;
                    readonly title: string | null;
                    readonly image_title: string | null;
                    readonly date: string | null;
                    readonly sale_message: string | null;
                    readonly cultural_maker: string | null;
                    readonly artists: ReadonlyArray<({
                        readonly id: string;
                        readonly href: string | null;
                        readonly name: string | null;
                    }) | null> | null;
                    readonly collecting_institution: string | null;
                    readonly partner: ({
                        readonly name: string | null;
                        readonly href: string | null;
                        readonly id: string | null;
                        readonly type: string | null;
                    }) | null;
                    readonly sale: ({
                        readonly is_auction: boolean | null;
                        readonly is_closed: boolean | null;
                        readonly id: string | null;
                        readonly is_live_open: boolean | null;
                        readonly is_open: boolean | null;
                        readonly is_preview: boolean | null;
                        readonly display_timely_at: string | null;
                    }) | null;
                    readonly sale_artwork: ({
                        readonly counts: ({
                            readonly bidder_positions: number | null;
                        }) | null;
                        readonly highest_bid: ({
                            readonly display: string | null;
                        }) | null;
                        readonly opening_bid: ({
                            readonly display: string | null;
                        }) | null;
                        readonly id: string | null;
                    }) | null;
                    readonly is_inquireable: boolean | null;
                    readonly is_saved: boolean | null;
                    readonly is_biddable: boolean | null;
                }) | null;
                readonly id: string | null;
            }) | null> | null;
        }) | null;
        readonly artistSeriesConnection?: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly internalID: string;
                    readonly title: string;
                    readonly slug: string;
                    readonly forSaleArtworksCount: number;
                    readonly image: ({
                        readonly cropped: ({
                            readonly url: string | null;
                        }) | null;
                    }) | null;
                }) | null;
            }) | null> | null;
        }) | null;
    }) | null;
};
export type routes_WorksQuery = {
    readonly response: routes_WorksQueryResponse;
    readonly variables: routes_WorksQueryVariables;
    readonly rawResponse: routes_WorksQueryRawResponse;
};



/*
query routes_WorksQuery(
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
  $shouldFetchArtistSeriesData: Boolean!
) {
  artist(id: $artistID) {
    ...Works_artist_44JFRd
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
  slug
  internalID
  filtered_artworks: filterArtworksConnection(acquireable: $acquireable, aggregations: $aggregations, artistID: $artistID, atAuction: $atAuction, attributionClass: $attributionClass, color: $color, forSale: $forSale, height: $height, inquireableOnly: $inquireableOnly, keyword: $keyword, majorPeriods: $majorPeriods, medium: $medium, offerable: $offerable, page: $page, partnerID: $partnerID, priceRange: $priceRange, sizes: $sizes, first: 30, after: "", sort: $sort, width: $width) {
    id
    ...ArtworkFilterArtworkGrid2_filtered_artworks
  }
}

fragment ArtistSeriesItem_artistSeries on ArtistSeries {
  title
  slug
  forSaleArtworksCount
  image {
    cropped(width: 160, height: 160) {
      url
    }
  }
}

fragment ArtistSeriesRail_artist on Artist {
  artistSeriesConnection {
    edges {
      node {
        internalID
        ...ArtistSeriesItem_artistSeries
      }
    }
  }
}

fragment ArtistTopWorksRail_artist on Artist {
  slug
  id
  filterArtworksConnection(sort: "-weighted_iconicity", first: 10) {
    edges {
      node {
        id
        slug
        image {
          href
          imageAspectRatio: aspectRatio
          resized(height: 300) {
            url
            width
            height
          }
        }
        ...FillwidthItem_artwork
      }
    }
    id
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

fragment FillwidthItem_artwork on Artwork {
  image {
    url(version: "large")
    aspect_ratio: aspectRatio
  }
  imageTitle
  title
  href
  ...Metadata_artwork
  ...Save_artwork
  ...Badge_artwork
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

fragment Works_artist_44JFRd on Artist {
  internalID
  ...ArtistTopWorksRail_artist
  ...ArtistSeriesRail_artist @include(if: $shouldFetchArtistSeriesData)
  related {
    artistsConnection(first: 1) {
      edges {
        node {
          id
        }
      }
    }
  }
  sidebarAggregations: filterArtworksConnection(sort: $sort, page: $page, aggregations: $aggregations, first: 30, after: "") {
    aggregations {
      slice
      counts {
        name
        value
      }
    }
    id
  }
  ...ArtistArtworkFilter_artist_2TJyna
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
  },
  {
    "kind": "LocalArgument",
    "name": "shouldFetchArtistSeriesData",
    "type": "Boolean!",
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
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v22 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
},
v23 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v24 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v25 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": null,
  "storageKey": null
},
v26 = {
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
},
v27 = {
  "kind": "ScalarField",
  "alias": "aspect_ratio",
  "name": "aspectRatio",
  "args": null,
  "storageKey": null
},
v28 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
},
v29 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "date",
  "args": null,
  "storageKey": null
},
v30 = {
  "kind": "ScalarField",
  "alias": "sale_message",
  "name": "saleMessage",
  "args": null,
  "storageKey": null
},
v31 = {
  "kind": "ScalarField",
  "alias": "cultural_maker",
  "name": "culturalMaker",
  "args": null,
  "storageKey": null
},
v32 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v33 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v34 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "artists",
  "storageKey": "artists(shallow:true)",
  "args": (v32/*: any*/),
  "concreteType": "Artist",
  "plural": true,
  "selections": [
    (v23/*: any*/),
    (v24/*: any*/),
    (v33/*: any*/)
  ]
},
v35 = {
  "kind": "ScalarField",
  "alias": "collecting_institution",
  "name": "collectingInstitution",
  "args": null,
  "storageKey": null
},
v36 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "partner",
  "storageKey": "partner(shallow:true)",
  "args": (v32/*: any*/),
  "concreteType": "Partner",
  "plural": false,
  "selections": [
    (v33/*: any*/),
    (v24/*: any*/),
    (v23/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "type",
      "args": null,
      "storageKey": null
    }
  ]
},
v37 = {
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
    (v23/*: any*/),
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
v38 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "display",
    "args": null,
    "storageKey": null
  }
],
v39 = {
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
      "selections": (v38/*: any*/)
    },
    {
      "kind": "LinkedField",
      "alias": "opening_bid",
      "name": "openingBid",
      "storageKey": null,
      "args": null,
      "concreteType": "SaleArtworkOpeningBid",
      "plural": false,
      "selections": (v38/*: any*/)
    },
    (v23/*: any*/)
  ]
},
v40 = {
  "kind": "ScalarField",
  "alias": "is_inquireable",
  "name": "isInquireable",
  "args": null,
  "storageKey": null
},
v41 = {
  "kind": "ScalarField",
  "alias": "is_saved",
  "name": "isSaved",
  "args": null,
  "storageKey": null
},
v42 = {
  "kind": "ScalarField",
  "alias": "is_biddable",
  "name": "isBiddable",
  "args": null,
  "storageKey": null
},
v43 = {
  "kind": "Literal",
  "name": "after",
  "value": ""
},
v44 = {
  "kind": "Literal",
  "name": "first",
  "value": 30
},
v45 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slice",
  "args": null,
  "storageKey": null
},
v46 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "value",
  "args": null,
  "storageKey": null
},
v47 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v48 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "page",
  "args": null,
  "storageKey": null
},
v49 = [
  (v47/*: any*/),
  (v48/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "isCurrent",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "routes_WorksQuery",
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
            "name": "Works_artist",
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
              {
                "kind": "Variable",
                "name": "shouldFetchArtistSeriesData",
                "variableName": "shouldFetchArtistSeriesData"
              },
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
    "name": "routes_WorksQuery",
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
          (v21/*: any*/),
          (v22/*: any*/),
          (v23/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "filterArtworksConnection",
            "storageKey": "filterArtworksConnection(first:10,sort:\"-weighted_iconicity\")",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 10
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "-weighted_iconicity"
              }
            ],
            "concreteType": "FilterArtworksConnection",
            "plural": false,
            "selections": [
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
                      (v23/*: any*/),
                      (v22/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "image",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Image",
                        "plural": false,
                        "selections": [
                          (v24/*: any*/),
                          {
                            "kind": "ScalarField",
                            "alias": "imageAspectRatio",
                            "name": "aspectRatio",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "resized",
                            "storageKey": "resized(height:300)",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 300
                              }
                            ],
                            "concreteType": "ResizedImageUrl",
                            "plural": false,
                            "selections": [
                              (v25/*: any*/),
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "width",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "height",
                                "args": null,
                                "storageKey": null
                              }
                            ]
                          },
                          (v26/*: any*/),
                          (v27/*: any*/)
                        ]
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "imageTitle",
                        "args": null,
                        "storageKey": null
                      },
                      (v28/*: any*/),
                      (v24/*: any*/),
                      (v29/*: any*/),
                      (v30/*: any*/),
                      (v31/*: any*/),
                      (v34/*: any*/),
                      (v35/*: any*/),
                      (v36/*: any*/),
                      (v37/*: any*/),
                      (v39/*: any*/),
                      (v40/*: any*/),
                      (v21/*: any*/),
                      (v41/*: any*/),
                      (v42/*: any*/)
                    ]
                  }
                ]
              },
              (v23/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "related",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtistRelatedData",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "artistsConnection",
                "storageKey": "artistsConnection(first:1)",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 1
                  }
                ],
                "concreteType": "ArtistConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ArtistEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Artist",
                        "plural": false,
                        "selections": [
                          (v23/*: any*/)
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "sidebarAggregations",
            "name": "filterArtworksConnection",
            "storageKey": null,
            "args": [
              (v43/*: any*/),
              (v3/*: any*/),
              (v44/*: any*/),
              (v15/*: any*/),
              (v19/*: any*/)
            ],
            "concreteType": "FilterArtworksConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "aggregations",
                "storageKey": null,
                "args": null,
                "concreteType": "ArtworksAggregationResults",
                "plural": true,
                "selections": [
                  (v45/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "counts",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "AggregationCount",
                    "plural": true,
                    "selections": [
                      (v33/*: any*/),
                      (v46/*: any*/)
                    ]
                  }
                ]
              },
              (v23/*: any*/)
            ]
          },
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
              (v43/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v44/*: any*/),
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
              (v23/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "aggregations",
                "storageKey": null,
                "args": null,
                "concreteType": "ArtworksAggregationResults",
                "plural": true,
                "selections": [
                  (v45/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "counts",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "AggregationCount",
                    "plural": true,
                    "selections": [
                      (v46/*: any*/),
                      (v33/*: any*/),
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
                    "selections": (v49/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "first",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "plural": false,
                    "selections": (v49/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "last",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "plural": false,
                    "selections": (v49/*: any*/)
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
                      (v47/*: any*/),
                      (v48/*: any*/)
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
                      (v23/*: any*/),
                      (v22/*: any*/),
                      (v24/*: any*/),
                      (v21/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "image",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Image",
                        "plural": false,
                        "selections": [
                          (v27/*: any*/),
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "placeholder",
                            "args": null,
                            "storageKey": null
                          },
                          (v26/*: any*/)
                        ]
                      },
                      (v28/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": "image_title",
                        "name": "imageTitle",
                        "args": null,
                        "storageKey": null
                      },
                      (v29/*: any*/),
                      (v30/*: any*/),
                      (v31/*: any*/),
                      (v34/*: any*/),
                      (v35/*: any*/),
                      (v36/*: any*/),
                      (v37/*: any*/),
                      (v39/*: any*/),
                      (v40/*: any*/),
                      (v41/*: any*/),
                      (v42/*: any*/)
                    ]
                  },
                  (v23/*: any*/)
                ]
              }
            ]
          },
          {
            "kind": "Condition",
            "passingValue": true,
            "condition": "shouldFetchArtistSeriesData",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "artistSeriesConnection",
                "storageKey": null,
                "args": null,
                "concreteType": "ArtistSeriesConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ArtistSeriesEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "ArtistSeries",
                        "plural": false,
                        "selections": [
                          (v21/*: any*/),
                          (v28/*: any*/),
                          (v22/*: any*/),
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "forSaleArtworksCount",
                            "args": null,
                            "storageKey": null
                          },
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
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "cropped",
                                "storageKey": "cropped(height:160,width:160)",
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "height",
                                    "value": 160
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 160
                                  }
                                ],
                                "concreteType": "CroppedImageUrl",
                                "plural": false,
                                "selections": [
                                  (v25/*: any*/)
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "routes_WorksQuery",
    "id": null,
    "text": "query routes_WorksQuery(\n  $acquireable: Boolean\n  $aggregations: [ArtworkAggregation] = [MEDIUM, TOTAL, GALLERY, INSTITUTION, MAJOR_PERIOD]\n  $artistID: String!\n  $atAuction: Boolean\n  $attributionClass: [String]\n  $color: String\n  $forSale: Boolean\n  $height: String\n  $inquireableOnly: Boolean\n  $keyword: String\n  $majorPeriods: [String]\n  $medium: String\n  $offerable: Boolean\n  $page: Int\n  $partnerID: ID\n  $priceRange: String\n  $sizes: [ArtworkSizes]\n  $sort: String\n  $width: String\n  $shouldFetchArtistSeriesData: Boolean!\n) {\n  artist(id: $artistID) {\n    ...Works_artist_44JFRd\n    id\n  }\n}\n\nfragment ArtistArtworkFilter_artist_2TJyna on Artist {\n  is_followed: isFollowed\n  counts {\n    partner_shows: partnerShows\n    for_sale_artworks: forSaleArtworks\n    ecommerce_artworks: ecommerceArtworks\n    auction_artworks: auctionArtworks\n    artworks\n    has_make_offer_artworks: hasMakeOfferArtworks\n  }\n  slug\n  internalID\n  filtered_artworks: filterArtworksConnection(acquireable: $acquireable, aggregations: $aggregations, artistID: $artistID, atAuction: $atAuction, attributionClass: $attributionClass, color: $color, forSale: $forSale, height: $height, inquireableOnly: $inquireableOnly, keyword: $keyword, majorPeriods: $majorPeriods, medium: $medium, offerable: $offerable, page: $page, partnerID: $partnerID, priceRange: $priceRange, sizes: $sizes, first: 30, after: \"\", sort: $sort, width: $width) {\n    id\n    ...ArtworkFilterArtworkGrid2_filtered_artworks\n  }\n}\n\nfragment ArtistSeriesItem_artistSeries on ArtistSeries {\n  title\n  slug\n  forSaleArtworksCount\n  image {\n    cropped(width: 160, height: 160) {\n      url\n    }\n  }\n}\n\nfragment ArtistSeriesRail_artist on Artist {\n  artistSeriesConnection {\n    edges {\n      node {\n        internalID\n        ...ArtistSeriesItem_artistSeries\n      }\n    }\n  }\n}\n\nfragment ArtistTopWorksRail_artist on Artist {\n  slug\n  id\n  filterArtworksConnection(sort: \"-weighted_iconicity\", first: 10) {\n    edges {\n      node {\n        id\n        slug\n        image {\n          href\n          imageAspectRatio: aspectRatio\n          resized(height: 300) {\n            url\n            width\n            height\n          }\n        }\n        ...FillwidthItem_artwork\n      }\n    }\n    id\n  }\n}\n\nfragment ArtworkFilterArtworkGrid2_filtered_artworks on FilterArtworksConnection {\n  id\n  aggregations {\n    slice\n    counts {\n      value\n      name\n      count\n    }\n  }\n  pageInfo {\n    hasNextPage\n    endCursor\n  }\n  pageCursors {\n    ...Pagination_pageCursors\n  }\n  edges {\n    node {\n      id\n    }\n  }\n  ...ArtworkGrid_artworks\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnectionInterface {\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      internalID\n      image {\n        aspect_ratio: aspectRatio\n      }\n      ...GridItem_artwork\n    }\n    ... on Node {\n      id\n    }\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment FillwidthItem_artwork on Artwork {\n  image {\n    url(version: \"large\")\n    aspect_ratio: aspectRatio\n  }\n  imageTitle\n  title\n  href\n  ...Metadata_artwork\n  ...Save_artwork\n  ...Badge_artwork\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  image_title: imageTitle\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio: aspectRatio\n  }\n  href\n  ...Metadata_artwork\n  ...Save_artwork\n  ...Badge_artwork\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment Save_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment Works_artist_44JFRd on Artist {\n  internalID\n  ...ArtistTopWorksRail_artist\n  ...ArtistSeriesRail_artist @include(if: $shouldFetchArtistSeriesData)\n  related {\n    artistsConnection(first: 1) {\n      edges {\n        node {\n          id\n        }\n      }\n    }\n  }\n  sidebarAggregations: filterArtworksConnection(sort: $sort, page: $page, aggregations: $aggregations, first: 30, after: \"\") {\n    aggregations {\n      slice\n      counts {\n        name\n        value\n      }\n    }\n    id\n  }\n  ...ArtistArtworkFilter_artist_2TJyna\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'd5d0f78795d8d6974d050cf8eee3c728';
export default node;
