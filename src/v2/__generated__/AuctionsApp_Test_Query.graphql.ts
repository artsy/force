/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionsApp_Test_QueryVariables = {};
export type AuctionsApp_Test_QueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"AuctionsApp_viewer">;
    } | null;
};
export type AuctionsApp_Test_Query = {
    readonly response: AuctionsApp_Test_QueryResponse;
    readonly variables: AuctionsApp_Test_QueryVariables;
};



/*
query AuctionsApp_Test_Query {
  viewer {
    ...AuctionsApp_viewer
  }
}

fragment AuctionsApp_viewer on Viewer {
  ...CuritorialRailsTabBar_viewer
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

fragment CuritorialRailsTabBar_viewer on Viewer {
  ...WorksByArtistsYouFollowRail_viewer
  ...TrendingLotsRail_viewer
  ...StandoutLotsRail_viewer
  me {
    ...MyBids_me
    id
  }
}

fragment Details_artwork on Artwork {
  href
  title
  date
  saleMessage
  culturalMaker
  artists(shallow: true) {
    id
    href
    name
  }
  collectingInstitution
  partner(shallow: true) {
    name
    href
    id
  }
  sale {
    isAuction
    isClosed
    id
  }
  saleArtwork {
    lotLabel
    counts {
      bidderPositions
    }
    highestBid {
      display
    }
    openingBid {
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

fragment MyBidsBidHeader_sale on Sale {
  coverImage {
    cropped(width: 330, height: 100) {
      src
      srcSet
    }
  }
  formattedStartDateTime
  name
  partner {
    name
    id
  }
  slug
}

fragment MyBidsBidItem_saleArtwork on SaleArtwork {
  artwork {
    artistNames
    image {
      resized(width: 55, height: 55) {
        src
        srcSet
      }
    }
    id
  }
  estimate
  currentBid {
    display
  }
  internalID
  isHighestBidder
  isWatching
  lotState {
    bidCount
    sellingPrice {
      display
    }
  }
  lotLabel
  slug
}

fragment MyBids_me on Me {
  myBids {
    active {
      sale {
        slug
        ...MyBidsBidHeader_sale
        id
      }
      saleArtworks {
        ...MyBidsBidItem_saleArtwork
        id
      }
    }
  }
}

fragment SaveButton_artwork on Artwork {
  id
  internalID
  slug
  is_saved: isSaved
  title
}

fragment ShelfArtwork_artwork_20bRBg on Artwork {
  image {
    resized(width: 325) {
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

fragment StandoutLotsRail_viewer on Viewer {
  StandoutLotsRailConnection: saleArtworksConnection(first: 50, geneIDs: "highlights-at-auction") {
    edges {
      node {
        internalID
        slug
        ...ShelfArtwork_artwork_20bRBg
        sale {
          isClosed
          id
        }
        id
      }
      id
    }
  }
}

fragment TrendingLotsRail_viewer on Viewer {
  trendingLotsConnection: saleArtworksConnection(biddableSale: true, first: 10, sort: "-bidder_positions_count") {
    edges {
      counts {
        bidderPositions
      }
      node {
        internalID
        slug
        ...ShelfArtwork_artwork_20bRBg
        id
      }
      id
    }
  }
}

fragment WorksByArtistsYouFollowRail_viewer on Viewer {
  saleArtworksConnection(includeArtworksByFollowedArtists: true, isAuction: true, liveSale: true, first: 50) {
    edges {
      node {
        internalID
        slug
        ...ShelfArtwork_artwork_20bRBg
        id
      }
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "Literal",
  "name": "first",
  "value": 50
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v7 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotLabel",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "SaleArtworkCounts",
  "kind": "LinkedField",
  "name": "counts",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "bidderPositions",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v12 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "Artwork",
  "kind": "LinkedField",
  "name": "node",
  "plural": false,
  "selections": [
    (v1/*: any*/),
    (v2/*: any*/),
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
              "value": 325
            }
          ],
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
          "plural": false,
          "selections": [
            (v3/*: any*/),
            (v4/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "width",
              "storageKey": null
            },
            (v5/*: any*/)
          ],
          "storageKey": "resized(width:325)"
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
    (v6/*: any*/),
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "saleMessage",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "culturalMaker",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v7/*: any*/),
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artists",
      "plural": true,
      "selections": [
        (v8/*: any*/),
        (v6/*: any*/),
        (v9/*: any*/)
      ],
      "storageKey": "artists(shallow:true)"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "collectingInstitution",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v7/*: any*/),
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        (v9/*: any*/),
        (v6/*: any*/),
        (v8/*: any*/),
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isAuction",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isClosed",
          "storageKey": null
        },
        (v8/*: any*/),
        {
          "alias": "is_auction",
          "args": null,
          "kind": "ScalarField",
          "name": "isAuction",
          "storageKey": null
        },
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
          "alias": "is_closed",
          "args": null,
          "kind": "ScalarField",
          "name": "isClosed",
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
      "alias": null,
      "args": null,
      "concreteType": "SaleArtwork",
      "kind": "LinkedField",
      "name": "saleArtwork",
      "plural": false,
      "selections": [
        (v10/*: any*/),
        (v11/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "SaleArtworkHighestBid",
          "kind": "LinkedField",
          "name": "highestBid",
          "plural": false,
          "selections": (v12/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "SaleArtworkOpeningBid",
          "kind": "LinkedField",
          "name": "openingBid",
          "plural": false,
          "selections": (v12/*: any*/),
          "storageKey": null
        },
        (v8/*: any*/)
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
      "alias": "sale_artwork",
      "args": null,
      "concreteType": "SaleArtwork",
      "kind": "LinkedField",
      "name": "saleArtwork",
      "plural": false,
      "selections": [
        {
          "alias": "highest_bid",
          "args": null,
          "concreteType": "SaleArtworkHighestBid",
          "kind": "LinkedField",
          "name": "highestBid",
          "plural": false,
          "selections": (v12/*: any*/),
          "storageKey": null
        },
        {
          "alias": "opening_bid",
          "args": null,
          "concreteType": "SaleArtworkOpeningBid",
          "kind": "LinkedField",
          "name": "openingBid",
          "plural": false,
          "selections": (v12/*: any*/),
          "storageKey": null
        },
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
        (v8/*: any*/)
      ],
      "storageKey": null
    },
    (v8/*: any*/),
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
v14 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "SaleArtwork",
    "kind": "LinkedField",
    "name": "edges",
    "plural": true,
    "selections": [
      (v13/*: any*/),
      (v8/*: any*/)
    ],
    "storageKey": null
  }
],
v15 = [
  (v3/*: any*/),
  (v4/*: any*/)
],
v16 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworksConnection"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "SaleArtwork"
},
v18 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "Artist"
},
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v22 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v23 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Float"
},
v24 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v25 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
},
v26 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v27 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v28 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Partner"
},
v29 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Sale"
},
v30 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
},
v31 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkCounts"
},
v32 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v33 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkHighestBid"
},
v34 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkOpeningBid"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AuctionsApp_Test_Query",
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
            "name": "AuctionsApp_viewer"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AuctionsApp_Test_Query",
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
            "args": [
              (v0/*: any*/),
              {
                "kind": "Literal",
                "name": "includeArtworksByFollowedArtists",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "isAuction",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "liveSale",
                "value": true
              }
            ],
            "concreteType": "SaleArtworksConnection",
            "kind": "LinkedField",
            "name": "saleArtworksConnection",
            "plural": false,
            "selections": (v14/*: any*/),
            "storageKey": "saleArtworksConnection(first:50,includeArtworksByFollowedArtists:true,isAuction:true,liveSale:true)"
          },
          {
            "alias": "trendingLotsConnection",
            "args": [
              {
                "kind": "Literal",
                "name": "biddableSale",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "first",
                "value": 10
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "-bidder_positions_count"
              }
            ],
            "concreteType": "SaleArtworksConnection",
            "kind": "LinkedField",
            "name": "saleArtworksConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SaleArtwork",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  (v11/*: any*/),
                  (v13/*: any*/),
                  (v8/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "saleArtworksConnection(biddableSale:true,first:10,sort:\"-bidder_positions_count\")"
          },
          {
            "alias": "StandoutLotsRailConnection",
            "args": [
              (v0/*: any*/),
              {
                "kind": "Literal",
                "name": "geneIDs",
                "value": "highlights-at-auction"
              }
            ],
            "concreteType": "SaleArtworksConnection",
            "kind": "LinkedField",
            "name": "saleArtworksConnection",
            "plural": false,
            "selections": (v14/*: any*/),
            "storageKey": "saleArtworksConnection(first:50,geneIDs:\"highlights-at-auction\")"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Me",
            "kind": "LinkedField",
            "name": "me",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "MyBids",
                "kind": "LinkedField",
                "name": "myBids",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "MyBid",
                    "kind": "LinkedField",
                    "name": "active",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Sale",
                        "kind": "LinkedField",
                        "name": "sale",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Image",
                            "kind": "LinkedField",
                            "name": "coverImage",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "height",
                                    "value": 100
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 330
                                  }
                                ],
                                "concreteType": "CroppedImageUrl",
                                "kind": "LinkedField",
                                "name": "cropped",
                                "plural": false,
                                "selections": (v15/*: any*/),
                                "storageKey": "cropped(height:100,width:330)"
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "formattedStartDateTime",
                            "storageKey": null
                          },
                          (v9/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Partner",
                            "kind": "LinkedField",
                            "name": "partner",
                            "plural": false,
                            "selections": [
                              (v9/*: any*/),
                              (v8/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v8/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "SaleArtwork",
                        "kind": "LinkedField",
                        "name": "saleArtworks",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Artwork",
                            "kind": "LinkedField",
                            "name": "artwork",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "artistNames",
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
                                    "alias": null,
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "height",
                                        "value": 55
                                      },
                                      {
                                        "kind": "Literal",
                                        "name": "width",
                                        "value": 55
                                      }
                                    ],
                                    "concreteType": "ResizedImageUrl",
                                    "kind": "LinkedField",
                                    "name": "resized",
                                    "plural": false,
                                    "selections": (v15/*: any*/),
                                    "storageKey": "resized(height:55,width:55)"
                                  }
                                ],
                                "storageKey": null
                              },
                              (v8/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "estimate",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "SaleArtworkCurrentBid",
                            "kind": "LinkedField",
                            "name": "currentBid",
                            "plural": false,
                            "selections": (v12/*: any*/),
                            "storageKey": null
                          },
                          (v1/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isHighestBidder",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isWatching",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "CausalityLotState",
                            "kind": "LinkedField",
                            "name": "lotState",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "bidCount",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Money",
                                "kind": "LinkedField",
                                "name": "sellingPrice",
                                "plural": false,
                                "selections": (v12/*: any*/),
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v10/*: any*/),
                          (v2/*: any*/),
                          (v8/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v8/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4f751aafb7fd0e4d8887dfd39abde994",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.StandoutLotsRailConnection": (v16/*: any*/),
        "viewer.StandoutLotsRailConnection.edges": (v17/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.id": (v18/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node": (v19/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.artists": (v20/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.artists.href": (v21/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.artists.id": (v18/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.artists.name": (v21/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.collectingInstitution": (v21/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.culturalMaker": (v21/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.date": (v21/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.href": (v21/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.id": (v18/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.image": (v22/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.image.aspectRatio": (v23/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.image.height": (v24/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.image.resized": (v25/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.image.resized.height": (v24/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.image.resized.src": (v26/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.image.resized.srcSet": (v26/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.image.resized.width": (v24/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.imageTitle": (v21/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.internalID": (v18/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.is_biddable": (v27/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.is_inquireable": (v27/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.is_saved": (v27/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.partner": (v28/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.partner.href": (v21/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.partner.id": (v18/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.partner.name": (v21/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.partner.type": (v21/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale": (v29/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale.display_timely_at": (v21/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale.id": (v18/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale.isAuction": (v27/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale.isClosed": (v27/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale.is_auction": (v27/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale.is_closed": (v27/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale.is_live_open": (v27/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale.is_open": (v27/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale.is_preview": (v27/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.saleArtwork": (v30/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.saleArtwork.counts": (v31/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.saleArtwork.counts.bidderPositions": (v32/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.saleArtwork.highestBid": (v33/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.saleArtwork.highestBid.display": (v21/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.saleArtwork.id": (v18/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.saleArtwork.lotLabel": (v21/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.saleArtwork.openingBid": (v34/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.saleArtwork.openingBid.display": (v21/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.saleMessage": (v21/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_artwork": (v30/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_artwork.counts": (v31/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_artwork.counts.bidder_positions": (v32/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_artwork.highest_bid": (v33/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_artwork.highest_bid.display": (v21/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_artwork.id": (v18/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_artwork.opening_bid": (v34/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_artwork.opening_bid.display": (v21/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.slug": (v18/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.title": (v21/*: any*/),
        "viewer.me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "viewer.me.id": (v18/*: any*/),
        "viewer.me.myBids": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MyBids"
        },
        "viewer.me.myBids.active": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "MyBid"
        },
        "viewer.me.myBids.active.sale": (v29/*: any*/),
        "viewer.me.myBids.active.sale.coverImage": (v22/*: any*/),
        "viewer.me.myBids.active.sale.coverImage.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "viewer.me.myBids.active.sale.coverImage.cropped.src": (v26/*: any*/),
        "viewer.me.myBids.active.sale.coverImage.cropped.srcSet": (v26/*: any*/),
        "viewer.me.myBids.active.sale.formattedStartDateTime": (v21/*: any*/),
        "viewer.me.myBids.active.sale.id": (v18/*: any*/),
        "viewer.me.myBids.active.sale.name": (v21/*: any*/),
        "viewer.me.myBids.active.sale.partner": (v28/*: any*/),
        "viewer.me.myBids.active.sale.partner.id": (v18/*: any*/),
        "viewer.me.myBids.active.sale.partner.name": (v21/*: any*/),
        "viewer.me.myBids.active.sale.slug": (v18/*: any*/),
        "viewer.me.myBids.active.saleArtworks": (v17/*: any*/),
        "viewer.me.myBids.active.saleArtworks.artwork": (v19/*: any*/),
        "viewer.me.myBids.active.saleArtworks.artwork.artistNames": (v21/*: any*/),
        "viewer.me.myBids.active.saleArtworks.artwork.id": (v18/*: any*/),
        "viewer.me.myBids.active.saleArtworks.artwork.image": (v22/*: any*/),
        "viewer.me.myBids.active.saleArtworks.artwork.image.resized": (v25/*: any*/),
        "viewer.me.myBids.active.saleArtworks.artwork.image.resized.src": (v26/*: any*/),
        "viewer.me.myBids.active.saleArtworks.artwork.image.resized.srcSet": (v26/*: any*/),
        "viewer.me.myBids.active.saleArtworks.currentBid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCurrentBid"
        },
        "viewer.me.myBids.active.saleArtworks.currentBid.display": (v21/*: any*/),
        "viewer.me.myBids.active.saleArtworks.estimate": (v21/*: any*/),
        "viewer.me.myBids.active.saleArtworks.id": (v18/*: any*/),
        "viewer.me.myBids.active.saleArtworks.internalID": (v18/*: any*/),
        "viewer.me.myBids.active.saleArtworks.isHighestBidder": (v27/*: any*/),
        "viewer.me.myBids.active.saleArtworks.isWatching": (v27/*: any*/),
        "viewer.me.myBids.active.saleArtworks.lotLabel": (v21/*: any*/),
        "viewer.me.myBids.active.saleArtworks.lotState": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CausalityLotState"
        },
        "viewer.me.myBids.active.saleArtworks.lotState.bidCount": (v24/*: any*/),
        "viewer.me.myBids.active.saleArtworks.lotState.sellingPrice": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "viewer.me.myBids.active.saleArtworks.lotState.sellingPrice.display": (v21/*: any*/),
        "viewer.me.myBids.active.saleArtworks.slug": (v18/*: any*/),
        "viewer.saleArtworksConnection": (v16/*: any*/),
        "viewer.saleArtworksConnection.edges": (v17/*: any*/),
        "viewer.saleArtworksConnection.edges.id": (v18/*: any*/),
        "viewer.saleArtworksConnection.edges.node": (v19/*: any*/),
        "viewer.saleArtworksConnection.edges.node.artists": (v20/*: any*/),
        "viewer.saleArtworksConnection.edges.node.artists.href": (v21/*: any*/),
        "viewer.saleArtworksConnection.edges.node.artists.id": (v18/*: any*/),
        "viewer.saleArtworksConnection.edges.node.artists.name": (v21/*: any*/),
        "viewer.saleArtworksConnection.edges.node.collectingInstitution": (v21/*: any*/),
        "viewer.saleArtworksConnection.edges.node.culturalMaker": (v21/*: any*/),
        "viewer.saleArtworksConnection.edges.node.date": (v21/*: any*/),
        "viewer.saleArtworksConnection.edges.node.href": (v21/*: any*/),
        "viewer.saleArtworksConnection.edges.node.id": (v18/*: any*/),
        "viewer.saleArtworksConnection.edges.node.image": (v22/*: any*/),
        "viewer.saleArtworksConnection.edges.node.image.aspectRatio": (v23/*: any*/),
        "viewer.saleArtworksConnection.edges.node.image.height": (v24/*: any*/),
        "viewer.saleArtworksConnection.edges.node.image.resized": (v25/*: any*/),
        "viewer.saleArtworksConnection.edges.node.image.resized.height": (v24/*: any*/),
        "viewer.saleArtworksConnection.edges.node.image.resized.src": (v26/*: any*/),
        "viewer.saleArtworksConnection.edges.node.image.resized.srcSet": (v26/*: any*/),
        "viewer.saleArtworksConnection.edges.node.image.resized.width": (v24/*: any*/),
        "viewer.saleArtworksConnection.edges.node.imageTitle": (v21/*: any*/),
        "viewer.saleArtworksConnection.edges.node.internalID": (v18/*: any*/),
        "viewer.saleArtworksConnection.edges.node.is_biddable": (v27/*: any*/),
        "viewer.saleArtworksConnection.edges.node.is_inquireable": (v27/*: any*/),
        "viewer.saleArtworksConnection.edges.node.is_saved": (v27/*: any*/),
        "viewer.saleArtworksConnection.edges.node.partner": (v28/*: any*/),
        "viewer.saleArtworksConnection.edges.node.partner.href": (v21/*: any*/),
        "viewer.saleArtworksConnection.edges.node.partner.id": (v18/*: any*/),
        "viewer.saleArtworksConnection.edges.node.partner.name": (v21/*: any*/),
        "viewer.saleArtworksConnection.edges.node.partner.type": (v21/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale": (v29/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale.display_timely_at": (v21/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale.id": (v18/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale.isAuction": (v27/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale.isClosed": (v27/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale.is_auction": (v27/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale.is_closed": (v27/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale.is_live_open": (v27/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale.is_open": (v27/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale.is_preview": (v27/*: any*/),
        "viewer.saleArtworksConnection.edges.node.saleArtwork": (v30/*: any*/),
        "viewer.saleArtworksConnection.edges.node.saleArtwork.counts": (v31/*: any*/),
        "viewer.saleArtworksConnection.edges.node.saleArtwork.counts.bidderPositions": (v32/*: any*/),
        "viewer.saleArtworksConnection.edges.node.saleArtwork.highestBid": (v33/*: any*/),
        "viewer.saleArtworksConnection.edges.node.saleArtwork.highestBid.display": (v21/*: any*/),
        "viewer.saleArtworksConnection.edges.node.saleArtwork.id": (v18/*: any*/),
        "viewer.saleArtworksConnection.edges.node.saleArtwork.lotLabel": (v21/*: any*/),
        "viewer.saleArtworksConnection.edges.node.saleArtwork.openingBid": (v34/*: any*/),
        "viewer.saleArtworksConnection.edges.node.saleArtwork.openingBid.display": (v21/*: any*/),
        "viewer.saleArtworksConnection.edges.node.saleMessage": (v21/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_artwork": (v30/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_artwork.counts": (v31/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_artwork.counts.bidder_positions": (v32/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_artwork.highest_bid": (v33/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_artwork.highest_bid.display": (v21/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_artwork.id": (v18/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_artwork.opening_bid": (v34/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_artwork.opening_bid.display": (v21/*: any*/),
        "viewer.saleArtworksConnection.edges.node.slug": (v18/*: any*/),
        "viewer.saleArtworksConnection.edges.node.title": (v21/*: any*/),
        "viewer.trendingLotsConnection": (v16/*: any*/),
        "viewer.trendingLotsConnection.edges": (v17/*: any*/),
        "viewer.trendingLotsConnection.edges.counts": (v31/*: any*/),
        "viewer.trendingLotsConnection.edges.counts.bidderPositions": (v32/*: any*/),
        "viewer.trendingLotsConnection.edges.id": (v18/*: any*/),
        "viewer.trendingLotsConnection.edges.node": (v19/*: any*/),
        "viewer.trendingLotsConnection.edges.node.artists": (v20/*: any*/),
        "viewer.trendingLotsConnection.edges.node.artists.href": (v21/*: any*/),
        "viewer.trendingLotsConnection.edges.node.artists.id": (v18/*: any*/),
        "viewer.trendingLotsConnection.edges.node.artists.name": (v21/*: any*/),
        "viewer.trendingLotsConnection.edges.node.collectingInstitution": (v21/*: any*/),
        "viewer.trendingLotsConnection.edges.node.culturalMaker": (v21/*: any*/),
        "viewer.trendingLotsConnection.edges.node.date": (v21/*: any*/),
        "viewer.trendingLotsConnection.edges.node.href": (v21/*: any*/),
        "viewer.trendingLotsConnection.edges.node.id": (v18/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image": (v22/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.aspectRatio": (v23/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.height": (v24/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.resized": (v25/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.resized.height": (v24/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.resized.src": (v26/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.resized.srcSet": (v26/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.resized.width": (v24/*: any*/),
        "viewer.trendingLotsConnection.edges.node.imageTitle": (v21/*: any*/),
        "viewer.trendingLotsConnection.edges.node.internalID": (v18/*: any*/),
        "viewer.trendingLotsConnection.edges.node.is_biddable": (v27/*: any*/),
        "viewer.trendingLotsConnection.edges.node.is_inquireable": (v27/*: any*/),
        "viewer.trendingLotsConnection.edges.node.is_saved": (v27/*: any*/),
        "viewer.trendingLotsConnection.edges.node.partner": (v28/*: any*/),
        "viewer.trendingLotsConnection.edges.node.partner.href": (v21/*: any*/),
        "viewer.trendingLotsConnection.edges.node.partner.id": (v18/*: any*/),
        "viewer.trendingLotsConnection.edges.node.partner.name": (v21/*: any*/),
        "viewer.trendingLotsConnection.edges.node.partner.type": (v21/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale": (v29/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.display_timely_at": (v21/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.id": (v18/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.isAuction": (v27/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.isClosed": (v27/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.is_auction": (v27/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.is_closed": (v27/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.is_live_open": (v27/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.is_open": (v27/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.is_preview": (v27/*: any*/),
        "viewer.trendingLotsConnection.edges.node.saleArtwork": (v30/*: any*/),
        "viewer.trendingLotsConnection.edges.node.saleArtwork.counts": (v31/*: any*/),
        "viewer.trendingLotsConnection.edges.node.saleArtwork.counts.bidderPositions": (v32/*: any*/),
        "viewer.trendingLotsConnection.edges.node.saleArtwork.highestBid": (v33/*: any*/),
        "viewer.trendingLotsConnection.edges.node.saleArtwork.highestBid.display": (v21/*: any*/),
        "viewer.trendingLotsConnection.edges.node.saleArtwork.id": (v18/*: any*/),
        "viewer.trendingLotsConnection.edges.node.saleArtwork.lotLabel": (v21/*: any*/),
        "viewer.trendingLotsConnection.edges.node.saleArtwork.openingBid": (v34/*: any*/),
        "viewer.trendingLotsConnection.edges.node.saleArtwork.openingBid.display": (v21/*: any*/),
        "viewer.trendingLotsConnection.edges.node.saleMessage": (v21/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork": (v30/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.counts": (v31/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.counts.bidder_positions": (v32/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.highest_bid": (v33/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.highest_bid.display": (v21/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.id": (v18/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.opening_bid": (v34/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.opening_bid.display": (v21/*: any*/),
        "viewer.trendingLotsConnection.edges.node.slug": (v18/*: any*/),
        "viewer.trendingLotsConnection.edges.node.title": (v21/*: any*/)
      }
    },
    "name": "AuctionsApp_Test_Query",
    "operationKind": "query",
    "text": "query AuctionsApp_Test_Query {\n  viewer {\n    ...AuctionsApp_viewer\n  }\n}\n\nfragment AuctionsApp_viewer on Viewer {\n  ...CuritorialRailsTabBar_viewer\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment CuritorialRailsTabBar_viewer on Viewer {\n  ...WorksByArtistsYouFollowRail_viewer\n  ...TrendingLotsRail_viewer\n  ...StandoutLotsRail_viewer\n  me {\n    ...MyBids_me\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  saleMessage\n  culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    isAuction\n    isClosed\n    id\n  }\n  saleArtwork {\n    lotLabel\n    counts {\n      bidderPositions\n    }\n    highestBid {\n      display\n    }\n    openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment MyBidsBidHeader_sale on Sale {\n  coverImage {\n    cropped(width: 330, height: 100) {\n      src\n      srcSet\n    }\n  }\n  formattedStartDateTime\n  name\n  partner {\n    name\n    id\n  }\n  slug\n}\n\nfragment MyBidsBidItem_saleArtwork on SaleArtwork {\n  artwork {\n    artistNames\n    image {\n      resized(width: 55, height: 55) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n  estimate\n  currentBid {\n    display\n  }\n  internalID\n  isHighestBidder\n  isWatching\n  lotState {\n    bidCount\n    sellingPrice {\n      display\n    }\n  }\n  lotLabel\n  slug\n}\n\nfragment MyBids_me on Me {\n  myBids {\n    active {\n      sale {\n        slug\n        ...MyBidsBidHeader_sale\n        id\n      }\n      saleArtworks {\n        ...MyBidsBidItem_saleArtwork\n        id\n      }\n    }\n  }\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment ShelfArtwork_artwork_20bRBg on Artwork {\n  image {\n    resized(width: 325) {\n      src\n      srcSet\n      width\n      height\n    }\n    aspectRatio\n    height\n  }\n  imageTitle\n  title\n  href\n  is_saved: isSaved\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n\nfragment StandoutLotsRail_viewer on Viewer {\n  StandoutLotsRailConnection: saleArtworksConnection(first: 50, geneIDs: \"highlights-at-auction\") {\n    edges {\n      node {\n        internalID\n        slug\n        ...ShelfArtwork_artwork_20bRBg\n        sale {\n          isClosed\n          id\n        }\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment TrendingLotsRail_viewer on Viewer {\n  trendingLotsConnection: saleArtworksConnection(biddableSale: true, first: 10, sort: \"-bidder_positions_count\") {\n    edges {\n      counts {\n        bidderPositions\n      }\n      node {\n        internalID\n        slug\n        ...ShelfArtwork_artwork_20bRBg\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment WorksByArtistsYouFollowRail_viewer on Viewer {\n  saleArtworksConnection(includeArtworksByFollowedArtists: true, isAuction: true, liveSale: true, first: 50) {\n    edges {\n      node {\n        internalID\n        slug\n        ...ShelfArtwork_artwork_20bRBg\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'be23721091aac45a96cf029c1f714313';
export default node;
