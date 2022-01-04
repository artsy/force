/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SearchResultsArtworks_QueryVariables = {};
export type SearchResultsArtworks_QueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"SearchResultsArtworks_viewer">;
    } | null;
};
export type SearchResultsArtworks_Query = {
    readonly response: SearchResultsArtworks_QueryResponse;
    readonly variables: SearchResultsArtworks_QueryVariables;
};



/*
query SearchResultsArtworks_Query {
  viewer {
    ...SearchResultsArtworks_viewer_3Rrp9Z
  }
}

fragment ArtworkFilterArtworkGrid_filtered_artworks on FilterArtworksConnection {
  id
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

fragment ArtworkFilter_viewer_4g78v5 on Viewer {
  filtered_artworks: artworksConnection {
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
  artistNames
  href
  is_saved: isSaved
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

fragment SearchResultsArtworks_viewer_3Rrp9Z on Viewer {
  sidebar: artworksConnection(first: 1) {
    counts {
      followedArtists
    }
    aggregations {
      slice
      counts {
        name
        value
        count
      }
    }
    id
  }
  ...ArtworkFilter_viewer_4g78v5
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v4 = [
  (v2/*: any*/),
  (v3/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v6 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v7 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v8 = {
  "type": "FilterArtworksConnection",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v9 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v10 = {
  "type": "FormattedNumber",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v11 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v12 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v13 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v14 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v15 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v16 = {
  "type": "PageCursor",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v17 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": true
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SearchResultsArtworks_Query",
    "selections": [
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
              {
                "kind": "Literal",
                "name": "shouldFetchCounts",
                "value": true
              }
            ],
            "kind": "FragmentSpread",
            "name": "SearchResultsArtworks_viewer"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SearchResultsArtworks_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": "sidebar",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 1
              }
            ],
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "artworksConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FilterArtworksCounts",
                "kind": "LinkedField",
                "name": "counts",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "followedArtists",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
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
                      (v0/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "value",
                        "storageKey": null
                      },
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
              (v1/*: any*/)
            ],
            "storageKey": "artworksConnection(first:1)"
          },
          {
            "alias": "filtered_artworks",
            "args": null,
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "artworksConnection",
            "plural": false,
            "selections": [
              (v1/*: any*/),
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
                    "selections": (v4/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "first",
                    "plural": false,
                    "selections": (v4/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "last",
                    "plural": false,
                    "selections": (v4/*: any*/),
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
                      (v2/*: any*/),
                      (v3/*: any*/)
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
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "slug",
                        "storageKey": null
                      },
                      (v5/*: any*/),
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
                        "storageKey": null
                      },
                      {
                        "alias": "image_title",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "imageTitle",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "artistNames",
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
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "date",
                        "storageKey": null
                      },
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
                        "args": (v6/*: any*/),
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artists",
                        "plural": true,
                        "selections": [
                          (v1/*: any*/),
                          (v5/*: any*/),
                          (v0/*: any*/)
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
                        "args": (v6/*: any*/),
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v0/*: any*/),
                          (v5/*: any*/),
                          (v1/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "type",
                            "storageKey": null
                          }
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
                          (v1/*: any*/),
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
                            "selections": (v7/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": "opening_bid",
                            "args": null,
                            "concreteType": "SaleArtworkOpeningBid",
                            "kind": "LinkedField",
                            "name": "openingBid",
                            "plural": false,
                            "selections": (v7/*: any*/),
                            "storageKey": null
                          },
                          (v1/*: any*/)
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
                        "alias": "is_biddable",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isBiddable",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v1/*: any*/)
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
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "type": "Viewer",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.sidebar": (v8/*: any*/),
        "viewer.sidebar.counts": {
          "type": "FilterArtworksCounts",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.sidebar.aggregations": {
          "type": "ArtworksAggregationResults",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "viewer.sidebar.id": (v9/*: any*/),
        "viewer.filtered_artworks": (v8/*: any*/),
        "viewer.sidebar.counts.followedArtists": (v10/*: any*/),
        "viewer.sidebar.aggregations.slice": {
          "type": "ArtworkAggregation",
          "enumValues": [
            "ARTIST",
            "ARTIST_NATIONALITY",
            "ATTRIBUTION_CLASS",
            "COLOR",
            "DIMENSION_RANGE",
            "FOLLOWED_ARTISTS",
            "GALLERY",
            "INSTITUTION",
            "LOCATION_CITY",
            "MAJOR_PERIOD",
            "MATERIALS_TERMS",
            "MEDIUM",
            "MERCHANDISABLE_ARTISTS",
            "PARTNER",
            "PARTNER_CITY",
            "PERIOD",
            "PRICE_RANGE",
            "TOTAL"
          ],
          "plural": false,
          "nullable": true
        },
        "viewer.sidebar.aggregations.counts": {
          "type": "AggregationCount",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "viewer.filtered_artworks.id": (v11/*: any*/),
        "viewer.sidebar.aggregations.counts.name": (v12/*: any*/),
        "viewer.sidebar.aggregations.counts.value": (v12/*: any*/),
        "viewer.sidebar.aggregations.counts.count": (v13/*: any*/),
        "viewer.filtered_artworks.pageInfo": {
          "type": "PageInfo",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "viewer.filtered_artworks.pageCursors": {
          "type": "PageCursors",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "viewer.filtered_artworks.edges": {
          "type": "ArtworkEdgeInterface",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "viewer.filtered_artworks.pageInfo.hasNextPage": (v14/*: any*/),
        "viewer.filtered_artworks.pageInfo.endCursor": (v15/*: any*/),
        "viewer.filtered_artworks.edges.node": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.filtered_artworks.pageCursors.around": {
          "type": "PageCursor",
          "enumValues": null,
          "plural": true,
          "nullable": false
        },
        "viewer.filtered_artworks.pageCursors.first": (v16/*: any*/),
        "viewer.filtered_artworks.pageCursors.last": (v16/*: any*/),
        "viewer.filtered_artworks.pageCursors.previous": (v16/*: any*/),
        "viewer.filtered_artworks.edges.node.id": (v11/*: any*/),
        "viewer.filtered_artworks.pageCursors.around.cursor": (v12/*: any*/),
        "viewer.filtered_artworks.pageCursors.around.page": (v13/*: any*/),
        "viewer.filtered_artworks.pageCursors.around.isCurrent": (v14/*: any*/),
        "viewer.filtered_artworks.pageCursors.first.cursor": (v12/*: any*/),
        "viewer.filtered_artworks.pageCursors.first.page": (v13/*: any*/),
        "viewer.filtered_artworks.pageCursors.first.isCurrent": (v14/*: any*/),
        "viewer.filtered_artworks.pageCursors.last.cursor": (v12/*: any*/),
        "viewer.filtered_artworks.pageCursors.last.page": (v13/*: any*/),
        "viewer.filtered_artworks.pageCursors.last.isCurrent": (v14/*: any*/),
        "viewer.filtered_artworks.pageCursors.previous.cursor": (v12/*: any*/),
        "viewer.filtered_artworks.pageCursors.previous.page": (v13/*: any*/),
        "viewer.filtered_artworks.edges.node.slug": (v11/*: any*/),
        "viewer.filtered_artworks.edges.node.href": (v15/*: any*/),
        "viewer.filtered_artworks.edges.node.internalID": (v11/*: any*/),
        "viewer.filtered_artworks.edges.node.image": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.filtered_artworks.edges.id": (v9/*: any*/),
        "viewer.filtered_artworks.edges.node.image.aspect_ratio": {
          "type": "Float",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "viewer.filtered_artworks.edges.node.title": (v15/*: any*/),
        "viewer.filtered_artworks.edges.node.image_title": (v15/*: any*/),
        "viewer.filtered_artworks.edges.node.artistNames": (v15/*: any*/),
        "viewer.filtered_artworks.edges.node.is_saved": (v17/*: any*/),
        "viewer.filtered_artworks.edges.node.image.placeholder": (v15/*: any*/),
        "viewer.filtered_artworks.edges.node.image.url": (v15/*: any*/),
        "viewer.filtered_artworks.edges.node.is_biddable": (v17/*: any*/),
        "viewer.filtered_artworks.edges.node.sale": {
          "type": "Sale",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.filtered_artworks.edges.node.date": (v15/*: any*/),
        "viewer.filtered_artworks.edges.node.sale_message": (v15/*: any*/),
        "viewer.filtered_artworks.edges.node.cultural_maker": (v15/*: any*/),
        "viewer.filtered_artworks.edges.node.artists": {
          "type": "Artist",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "viewer.filtered_artworks.edges.node.collecting_institution": (v15/*: any*/),
        "viewer.filtered_artworks.edges.node.partner": {
          "type": "Partner",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.filtered_artworks.edges.node.sale_artwork": {
          "type": "SaleArtwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.filtered_artworks.edges.node.is_inquireable": (v17/*: any*/),
        "viewer.filtered_artworks.edges.node.sale.is_preview": (v17/*: any*/),
        "viewer.filtered_artworks.edges.node.sale.display_timely_at": (v15/*: any*/),
        "viewer.filtered_artworks.edges.node.sale.id": (v9/*: any*/),
        "viewer.filtered_artworks.edges.node.artists.id": (v11/*: any*/),
        "viewer.filtered_artworks.edges.node.artists.href": (v15/*: any*/),
        "viewer.filtered_artworks.edges.node.artists.name": (v15/*: any*/),
        "viewer.filtered_artworks.edges.node.partner.name": (v15/*: any*/),
        "viewer.filtered_artworks.edges.node.partner.href": (v15/*: any*/),
        "viewer.filtered_artworks.edges.node.partner.id": (v9/*: any*/),
        "viewer.filtered_artworks.edges.node.sale.is_auction": (v17/*: any*/),
        "viewer.filtered_artworks.edges.node.sale.is_closed": (v17/*: any*/),
        "viewer.filtered_artworks.edges.node.sale_artwork.counts": {
          "type": "SaleArtworkCounts",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.filtered_artworks.edges.node.sale_artwork.highest_bid": {
          "type": "SaleArtworkHighestBid",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.filtered_artworks.edges.node.sale_artwork.opening_bid": {
          "type": "SaleArtworkOpeningBid",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.filtered_artworks.edges.node.sale_artwork.id": (v9/*: any*/),
        "viewer.filtered_artworks.edges.node.sale.is_live_open": (v17/*: any*/),
        "viewer.filtered_artworks.edges.node.sale.is_open": (v17/*: any*/),
        "viewer.filtered_artworks.edges.node.partner.type": (v15/*: any*/),
        "viewer.filtered_artworks.edges.node.sale_artwork.counts.bidder_positions": (v10/*: any*/),
        "viewer.filtered_artworks.edges.node.sale_artwork.highest_bid.display": (v15/*: any*/),
        "viewer.filtered_artworks.edges.node.sale_artwork.opening_bid.display": (v15/*: any*/)
      }
    },
    "name": "SearchResultsArtworks_Query",
    "operationKind": "query",
    "text": "query SearchResultsArtworks_Query {\n  viewer {\n    ...SearchResultsArtworks_viewer_3Rrp9Z\n  }\n}\n\nfragment ArtworkFilterArtworkGrid_filtered_artworks on FilterArtworksConnection {\n  id\n  pageInfo {\n    hasNextPage\n    endCursor\n  }\n  pageCursors {\n    ...Pagination_pageCursors\n  }\n  edges {\n    node {\n      id\n    }\n  }\n  ...ArtworkGrid_artworks\n}\n\nfragment ArtworkFilter_viewer_4g78v5 on Viewer {\n  filtered_artworks: artworksConnection {\n    id\n    ...ArtworkFilterArtworkGrid_filtered_artworks\n  }\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnectionInterface {\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      internalID\n      image {\n        aspect_ratio: aspectRatio\n      }\n      ...GridItem_artwork\n    }\n    ... on Node {\n      id\n    }\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  image_title: imageTitle\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio: aspectRatio\n  }\n  artistNames\n  href\n  is_saved: isSaved\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment SearchResultsArtworks_viewer_3Rrp9Z on Viewer {\n  sidebar: artworksConnection(first: 1) {\n    counts {\n      followedArtists\n    }\n    aggregations {\n      slice\n      counts {\n        name\n        value\n        count\n      }\n    }\n    id\n  }\n  ...ArtworkFilter_viewer_4g78v5\n}\n"
  }
};
})();
(node as any).hash = 'e4387db8254276344f37ec131ced6a52';
export default node;
