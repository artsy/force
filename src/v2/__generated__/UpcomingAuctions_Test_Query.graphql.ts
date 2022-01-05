/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UpcomingAuctions_Test_QueryVariables = {};
export type UpcomingAuctions_Test_QueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"UpcomingAuctions_viewer">;
    } | null;
};
export type UpcomingAuctions_Test_Query = {
    readonly response: UpcomingAuctions_Test_QueryResponse;
    readonly variables: UpcomingAuctions_Test_QueryVariables;
};



/*
query UpcomingAuctions_Test_Query {
  viewer {
    ...UpcomingAuctions_viewer
  }
}

fragment AuctionArtworksRail_sale on Sale {
  artworksConnection(first: 20) {
    edges {
      node {
        internalID
        slug
        ...ShelfArtwork_artwork_OqwQs
        id
      }
    }
  }
  internalID
  slug
  href
  name
  formattedStartDateTime
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

fragment Metadata_artwork on Artwork {
  ...Details_artwork
  ...Contact_artwork
  href
}

fragment SaveButton_artwork on Artwork {
  id
  internalID
  slug
  is_saved: isSaved
  title
}

fragment ShelfArtwork_artwork_OqwQs on Artwork {
  image {
    resized(width: 200) {
      src
      srcSet
      width
      height
    }
    aspectRatio
    height
  }
  imageTitle
  title
  href
  is_saved: isSaved
  ...Metadata_artwork
  ...SaveButton_artwork
  ...Badge_artwork
}

fragment UpcomingAuctions_viewer on Viewer {
  salesConnection(first: 10, sort: START_AT_ASC, auctionState: UPCOMING) {
    totalCount
    edges {
      node {
        slug
        name
        href
        status
        formattedStartDateTime
        eventStartAt
        isLiveOpen
        ...AuctionArtworksRail_sale
        id
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "auctionState",
    "value": "UPCOMING"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "START_AT_ASC"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v6 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v9 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v10 = {
  "type": "Sale",
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
  "nullable": true
},
v13 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v14 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v15 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UpcomingAuctions_Test_Query",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "UpcomingAuctions_viewer"
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
    "name": "UpcomingAuctions_Test_Query",
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
            "alias": null,
            "args": (v0/*: any*/),
            "concreteType": "SaleConnection",
            "kind": "LinkedField",
            "name": "salesConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalCount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "SaleEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Sale",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v2/*: any*/),
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "status",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "formattedStartDateTime",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "eventStartAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isLiveOpen",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "first",
                            "value": 20
                          }
                        ],
                        "concreteType": "ArtworkConnection",
                        "kind": "LinkedField",
                        "name": "artworksConnection",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ArtworkEdge",
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
                                  (v4/*: any*/),
                                  (v1/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Image",
                                    "kind": "LinkedField",
                                    "name": "image",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": [
                                          {
                                            "kind": "Literal",
                                            "name": "width",
                                            "value": 200
                                          }
                                        ],
                                        "concreteType": "ResizedImageUrl",
                                        "kind": "LinkedField",
                                        "name": "resized",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "src",
                                            "storageKey": null
                                          },
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "srcSet",
                                            "storageKey": null
                                          },
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "width",
                                            "storageKey": null
                                          },
                                          (v5/*: any*/)
                                        ],
                                        "storageKey": "resized(width:200)"
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "aspectRatio",
                                        "storageKey": null
                                      },
                                      (v5/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "imageTitle",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "title",
                                    "storageKey": null
                                  },
                                  (v3/*: any*/),
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
                                      (v7/*: any*/),
                                      (v3/*: any*/),
                                      (v2/*: any*/)
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
                                      (v2/*: any*/),
                                      (v3/*: any*/),
                                      (v7/*: any*/),
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
                                      (v7/*: any*/),
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
                                        "selections": (v8/*: any*/),
                                        "storageKey": null
                                      },
                                      {
                                        "alias": "opening_bid",
                                        "args": null,
                                        "concreteType": "SaleArtworkOpeningBid",
                                        "kind": "LinkedField",
                                        "name": "openingBid",
                                        "plural": false,
                                        "selections": (v8/*: any*/),
                                        "storageKey": null
                                      },
                                      (v7/*: any*/)
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
                                  (v7/*: any*/),
                                  {
                                    "alias": "is_biddable",
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "isBiddable",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "artworksConnection(first:20)"
                      },
                      (v4/*: any*/),
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
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
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "salesConnection(auctionState:\"UPCOMING\",first:10,sort:\"START_AT_ASC\")"
          },
          {
            "alias": null,
            "args": (v0/*: any*/),
            "filters": [
              "sort",
              "auctionState"
            ],
            "handle": "connection",
            "key": "UpcomingAuctions_salesConnection",
            "kind": "LinkedHandle",
            "name": "salesConnection"
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
        "viewer.salesConnection": {
          "type": "SaleConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.salesConnection.totalCount": (v9/*: any*/),
        "viewer.salesConnection.edges": {
          "type": "SaleEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "viewer.salesConnection.pageInfo": {
          "type": "PageInfo",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "viewer.salesConnection.edges.node": (v10/*: any*/),
        "viewer.salesConnection.edges.node.slug": (v11/*: any*/),
        "viewer.salesConnection.edges.node.name": (v12/*: any*/),
        "viewer.salesConnection.edges.node.href": (v12/*: any*/),
        "viewer.salesConnection.edges.node.status": (v12/*: any*/),
        "viewer.salesConnection.edges.node.formattedStartDateTime": (v12/*: any*/),
        "viewer.salesConnection.edges.node.eventStartAt": (v12/*: any*/),
        "viewer.salesConnection.edges.node.isLiveOpen": (v13/*: any*/),
        "viewer.salesConnection.edges.node.id": (v14/*: any*/),
        "viewer.salesConnection.edges.cursor": (v15/*: any*/),
        "viewer.salesConnection.pageInfo.endCursor": (v12/*: any*/),
        "viewer.salesConnection.pageInfo.hasNextPage": {
          "type": "Boolean",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "viewer.salesConnection.edges.node.artworksConnection": {
          "type": "ArtworkConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.salesConnection.edges.node.internalID": (v11/*: any*/),
        "viewer.salesConnection.edges.node.__typename": (v15/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges": {
          "type": "ArtworkEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "viewer.salesConnection.edges.node.artworksConnection.edges.node": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.internalID": (v11/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.slug": (v11/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.id": (v11/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.image": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.imageTitle": (v12/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.title": (v12/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.href": (v12/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.is_saved": (v13/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.image.resized": {
          "type": "ResizedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.image.aspectRatio": {
          "type": "Float",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.image.height": (v9/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.is_biddable": (v13/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.sale": (v10/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.image.resized.src": (v15/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.image.resized.srcSet": (v15/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.image.resized.width": (v9/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.image.resized.height": (v9/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.date": (v12/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.sale_message": (v12/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.cultural_maker": (v12/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.artists": {
          "type": "Artist",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.collecting_institution": (v12/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.partner": {
          "type": "Partner",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.sale_artwork": {
          "type": "SaleArtwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.is_inquireable": (v13/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.sale.is_preview": (v13/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.sale.display_timely_at": (v12/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.sale.id": (v14/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.artists.id": (v11/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.artists.href": (v12/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.artists.name": (v12/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.partner.name": (v12/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.partner.href": (v12/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.partner.id": (v14/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.sale.is_auction": (v13/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.sale.is_closed": (v13/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.sale_artwork.counts": {
          "type": "SaleArtworkCounts",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.sale_artwork.highest_bid": {
          "type": "SaleArtworkHighestBid",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.sale_artwork.opening_bid": {
          "type": "SaleArtworkOpeningBid",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.sale_artwork.id": (v14/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.sale.is_live_open": (v13/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.sale.is_open": (v13/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.partner.type": (v12/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.sale_artwork.counts.bidder_positions": {
          "type": "FormattedNumber",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.sale_artwork.highest_bid.display": (v12/*: any*/),
        "viewer.salesConnection.edges.node.artworksConnection.edges.node.sale_artwork.opening_bid.display": (v12/*: any*/)
      }
    },
    "name": "UpcomingAuctions_Test_Query",
    "operationKind": "query",
    "text": "query UpcomingAuctions_Test_Query {\n  viewer {\n    ...UpcomingAuctions_viewer\n  }\n}\n\nfragment AuctionArtworksRail_sale on Sale {\n  artworksConnection(first: 20) {\n    edges {\n      node {\n        internalID\n        slug\n        ...ShelfArtwork_artwork_OqwQs\n        id\n      }\n    }\n  }\n  internalID\n  slug\n  href\n  name\n  formattedStartDateTime\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment ShelfArtwork_artwork_OqwQs on Artwork {\n  image {\n    resized(width: 200) {\n      src\n      srcSet\n      width\n      height\n    }\n    aspectRatio\n    height\n  }\n  imageTitle\n  title\n  href\n  is_saved: isSaved\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n\nfragment UpcomingAuctions_viewer on Viewer {\n  salesConnection(first: 10, sort: START_AT_ASC, auctionState: UPCOMING) {\n    totalCount\n    edges {\n      node {\n        slug\n        name\n        href\n        status\n        formattedStartDateTime\n        eventStartAt\n        isLiveOpen\n        ...AuctionArtworksRail_sale\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '525a14e5c6bd187ed22a9ab3407b564e';
export default node;
