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
    lotLabel
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
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "imageTitle",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v10 = {
  "alias": "is_saved",
  "args": null,
  "kind": "ScalarField",
  "name": "isSaved",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v12 = {
  "alias": "sale_message",
  "args": null,
  "kind": "ScalarField",
  "name": "saleMessage",
  "storageKey": null
},
v13 = {
  "alias": "cultural_maker",
  "args": null,
  "kind": "ScalarField",
  "name": "culturalMaker",
  "storageKey": null
},
v14 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": (v14/*: any*/),
  "concreteType": "Artist",
  "kind": "LinkedField",
  "name": "artists",
  "plural": true,
  "selections": [
    (v15/*: any*/),
    (v9/*: any*/),
    (v16/*: any*/)
  ],
  "storageKey": "artists(shallow:true)"
},
v18 = {
  "alias": "collecting_institution",
  "args": null,
  "kind": "ScalarField",
  "name": "collectingInstitution",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": (v14/*: any*/),
  "concreteType": "Partner",
  "kind": "LinkedField",
  "name": "partner",
  "plural": false,
  "selections": [
    (v16/*: any*/),
    (v9/*: any*/),
    (v15/*: any*/),
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
v20 = {
  "alias": "is_auction",
  "args": null,
  "kind": "ScalarField",
  "name": "isAuction",
  "storageKey": null
},
v21 = {
  "alias": "is_closed",
  "args": null,
  "kind": "ScalarField",
  "name": "isClosed",
  "storageKey": null
},
v22 = {
  "alias": "is_live_open",
  "args": null,
  "kind": "ScalarField",
  "name": "isLiveOpen",
  "storageKey": null
},
v23 = {
  "alias": "is_open",
  "args": null,
  "kind": "ScalarField",
  "name": "isOpen",
  "storageKey": null
},
v24 = {
  "alias": "is_preview",
  "args": null,
  "kind": "ScalarField",
  "name": "isPreview",
  "storageKey": null
},
v25 = {
  "alias": "display_timely_at",
  "args": null,
  "kind": "ScalarField",
  "name": "displayTimelyAt",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotLabel",
  "storageKey": null
},
v27 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v28 = {
  "alias": "sale_artwork",
  "args": null,
  "concreteType": "SaleArtwork",
  "kind": "LinkedField",
  "name": "saleArtwork",
  "plural": false,
  "selections": [
    (v26/*: any*/),
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
      "selections": (v27/*: any*/),
      "storageKey": null
    },
    {
      "alias": "opening_bid",
      "args": null,
      "concreteType": "SaleArtworkOpeningBid",
      "kind": "LinkedField",
      "name": "openingBid",
      "plural": false,
      "selections": (v27/*: any*/),
      "storageKey": null
    },
    (v15/*: any*/)
  ],
  "storageKey": null
},
v29 = {
  "alias": "is_inquireable",
  "args": null,
  "kind": "ScalarField",
  "name": "isInquireable",
  "storageKey": null
},
v30 = {
  "alias": "is_biddable",
  "args": null,
  "kind": "ScalarField",
  "name": "isBiddable",
  "storageKey": null
},
v31 = {
  "alias": null,
  "args": null,
  "concreteType": "Artwork",
  "kind": "LinkedField",
  "name": "node",
  "plural": false,
  "selections": [
    (v1/*: any*/),
    (v2/*: any*/),
    (v6/*: any*/),
    (v7/*: any*/),
    (v8/*: any*/),
    (v9/*: any*/),
    (v10/*: any*/),
    (v11/*: any*/),
    (v12/*: any*/),
    (v13/*: any*/),
    (v17/*: any*/),
    (v18/*: any*/),
    (v19/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Sale",
      "kind": "LinkedField",
      "name": "sale",
      "plural": false,
      "selections": [
        (v20/*: any*/),
        (v21/*: any*/),
        (v15/*: any*/),
        (v22/*: any*/),
        (v23/*: any*/),
        (v24/*: any*/),
        (v25/*: any*/)
      ],
      "storageKey": null
    },
    (v28/*: any*/),
    (v29/*: any*/),
    (v15/*: any*/),
    (v30/*: any*/)
  ],
  "storageKey": null
},
v32 = [
  (v3/*: any*/),
  (v4/*: any*/)
],
v33 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworksConnection"
},
v34 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "SaleArtwork"
},
v35 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v36 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v37 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "Artist"
},
v38 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v39 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v40 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Float"
},
v41 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v42 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
},
v43 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v44 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v45 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Partner"
},
v46 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Sale"
},
v47 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
},
v48 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkCounts"
},
v49 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v50 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkHighestBid"
},
v51 = {
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
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SaleArtwork",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  (v31/*: any*/),
                  (v15/*: any*/)
                ],
                "storageKey": null
              }
            ],
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
                  {
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
                  (v31/*: any*/),
                  (v15/*: any*/)
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
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SaleArtwork",
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
                      (v2/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/),
                      (v17/*: any*/),
                      (v18/*: any*/),
                      (v19/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Sale",
                        "kind": "LinkedField",
                        "name": "sale",
                        "plural": false,
                        "selections": [
                          (v20/*: any*/),
                          (v21/*: any*/),
                          (v15/*: any*/),
                          (v22/*: any*/),
                          (v23/*: any*/),
                          (v24/*: any*/),
                          (v25/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isClosed",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v28/*: any*/),
                      (v29/*: any*/),
                      (v15/*: any*/),
                      (v30/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v15/*: any*/)
                ],
                "storageKey": null
              }
            ],
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
                                "selections": (v32/*: any*/),
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
                          (v16/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Partner",
                            "kind": "LinkedField",
                            "name": "partner",
                            "plural": false,
                            "selections": [
                              (v16/*: any*/),
                              (v15/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v15/*: any*/)
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
                                    "selections": (v32/*: any*/),
                                    "storageKey": "resized(height:55,width:55)"
                                  }
                                ],
                                "storageKey": null
                              },
                              (v15/*: any*/)
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
                            "selections": (v27/*: any*/),
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
                                "selections": (v27/*: any*/),
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v26/*: any*/),
                          (v2/*: any*/),
                          (v15/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v15/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7de658a871ac54a8a8e5319cc655657e",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.StandoutLotsRailConnection": (v33/*: any*/),
        "viewer.StandoutLotsRailConnection.edges": (v34/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.id": (v35/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node": (v36/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.artists": (v37/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.artists.href": (v38/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.artists.id": (v35/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.artists.name": (v38/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.collecting_institution": (v38/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.cultural_maker": (v38/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.date": (v38/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.href": (v38/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.id": (v35/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.image": (v39/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.image.aspectRatio": (v40/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.image.height": (v41/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.image.resized": (v42/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.image.resized.height": (v41/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.image.resized.src": (v43/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.image.resized.srcSet": (v43/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.image.resized.width": (v41/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.imageTitle": (v38/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.internalID": (v35/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.is_biddable": (v44/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.is_inquireable": (v44/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.is_saved": (v44/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.partner": (v45/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.partner.href": (v38/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.partner.id": (v35/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.partner.name": (v38/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.partner.type": (v38/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale": (v46/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale.display_timely_at": (v38/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale.id": (v35/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale.isClosed": (v44/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale.is_auction": (v44/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale.is_closed": (v44/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale.is_live_open": (v44/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale.is_open": (v44/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale.is_preview": (v44/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_artwork": (v47/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_artwork.counts": (v48/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_artwork.counts.bidder_positions": (v49/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_artwork.highest_bid": (v50/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_artwork.highest_bid.display": (v38/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_artwork.id": (v35/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_artwork.lotLabel": (v38/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_artwork.opening_bid": (v51/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_artwork.opening_bid.display": (v38/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_message": (v38/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.slug": (v35/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.title": (v38/*: any*/),
        "viewer.me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "viewer.me.id": (v35/*: any*/),
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
        "viewer.me.myBids.active.sale": (v46/*: any*/),
        "viewer.me.myBids.active.sale.coverImage": (v39/*: any*/),
        "viewer.me.myBids.active.sale.coverImage.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "viewer.me.myBids.active.sale.coverImage.cropped.src": (v43/*: any*/),
        "viewer.me.myBids.active.sale.coverImage.cropped.srcSet": (v43/*: any*/),
        "viewer.me.myBids.active.sale.formattedStartDateTime": (v38/*: any*/),
        "viewer.me.myBids.active.sale.id": (v35/*: any*/),
        "viewer.me.myBids.active.sale.name": (v38/*: any*/),
        "viewer.me.myBids.active.sale.partner": (v45/*: any*/),
        "viewer.me.myBids.active.sale.partner.id": (v35/*: any*/),
        "viewer.me.myBids.active.sale.partner.name": (v38/*: any*/),
        "viewer.me.myBids.active.sale.slug": (v35/*: any*/),
        "viewer.me.myBids.active.saleArtworks": (v34/*: any*/),
        "viewer.me.myBids.active.saleArtworks.artwork": (v36/*: any*/),
        "viewer.me.myBids.active.saleArtworks.artwork.artistNames": (v38/*: any*/),
        "viewer.me.myBids.active.saleArtworks.artwork.id": (v35/*: any*/),
        "viewer.me.myBids.active.saleArtworks.artwork.image": (v39/*: any*/),
        "viewer.me.myBids.active.saleArtworks.artwork.image.resized": (v42/*: any*/),
        "viewer.me.myBids.active.saleArtworks.artwork.image.resized.src": (v43/*: any*/),
        "viewer.me.myBids.active.saleArtworks.artwork.image.resized.srcSet": (v43/*: any*/),
        "viewer.me.myBids.active.saleArtworks.currentBid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCurrentBid"
        },
        "viewer.me.myBids.active.saleArtworks.currentBid.display": (v38/*: any*/),
        "viewer.me.myBids.active.saleArtworks.estimate": (v38/*: any*/),
        "viewer.me.myBids.active.saleArtworks.id": (v35/*: any*/),
        "viewer.me.myBids.active.saleArtworks.internalID": (v35/*: any*/),
        "viewer.me.myBids.active.saleArtworks.isHighestBidder": (v44/*: any*/),
        "viewer.me.myBids.active.saleArtworks.isWatching": (v44/*: any*/),
        "viewer.me.myBids.active.saleArtworks.lotLabel": (v38/*: any*/),
        "viewer.me.myBids.active.saleArtworks.lotState": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CausalityLotState"
        },
        "viewer.me.myBids.active.saleArtworks.lotState.bidCount": (v41/*: any*/),
        "viewer.me.myBids.active.saleArtworks.lotState.sellingPrice": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "viewer.me.myBids.active.saleArtworks.lotState.sellingPrice.display": (v38/*: any*/),
        "viewer.me.myBids.active.saleArtworks.slug": (v35/*: any*/),
        "viewer.saleArtworksConnection": (v33/*: any*/),
        "viewer.saleArtworksConnection.edges": (v34/*: any*/),
        "viewer.saleArtworksConnection.edges.id": (v35/*: any*/),
        "viewer.saleArtworksConnection.edges.node": (v36/*: any*/),
        "viewer.saleArtworksConnection.edges.node.artists": (v37/*: any*/),
        "viewer.saleArtworksConnection.edges.node.artists.href": (v38/*: any*/),
        "viewer.saleArtworksConnection.edges.node.artists.id": (v35/*: any*/),
        "viewer.saleArtworksConnection.edges.node.artists.name": (v38/*: any*/),
        "viewer.saleArtworksConnection.edges.node.collecting_institution": (v38/*: any*/),
        "viewer.saleArtworksConnection.edges.node.cultural_maker": (v38/*: any*/),
        "viewer.saleArtworksConnection.edges.node.date": (v38/*: any*/),
        "viewer.saleArtworksConnection.edges.node.href": (v38/*: any*/),
        "viewer.saleArtworksConnection.edges.node.id": (v35/*: any*/),
        "viewer.saleArtworksConnection.edges.node.image": (v39/*: any*/),
        "viewer.saleArtworksConnection.edges.node.image.aspectRatio": (v40/*: any*/),
        "viewer.saleArtworksConnection.edges.node.image.height": (v41/*: any*/),
        "viewer.saleArtworksConnection.edges.node.image.resized": (v42/*: any*/),
        "viewer.saleArtworksConnection.edges.node.image.resized.height": (v41/*: any*/),
        "viewer.saleArtworksConnection.edges.node.image.resized.src": (v43/*: any*/),
        "viewer.saleArtworksConnection.edges.node.image.resized.srcSet": (v43/*: any*/),
        "viewer.saleArtworksConnection.edges.node.image.resized.width": (v41/*: any*/),
        "viewer.saleArtworksConnection.edges.node.imageTitle": (v38/*: any*/),
        "viewer.saleArtworksConnection.edges.node.internalID": (v35/*: any*/),
        "viewer.saleArtworksConnection.edges.node.is_biddable": (v44/*: any*/),
        "viewer.saleArtworksConnection.edges.node.is_inquireable": (v44/*: any*/),
        "viewer.saleArtworksConnection.edges.node.is_saved": (v44/*: any*/),
        "viewer.saleArtworksConnection.edges.node.partner": (v45/*: any*/),
        "viewer.saleArtworksConnection.edges.node.partner.href": (v38/*: any*/),
        "viewer.saleArtworksConnection.edges.node.partner.id": (v35/*: any*/),
        "viewer.saleArtworksConnection.edges.node.partner.name": (v38/*: any*/),
        "viewer.saleArtworksConnection.edges.node.partner.type": (v38/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale": (v46/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale.display_timely_at": (v38/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale.id": (v35/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale.is_auction": (v44/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale.is_closed": (v44/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale.is_live_open": (v44/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale.is_open": (v44/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale.is_preview": (v44/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_artwork": (v47/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_artwork.counts": (v48/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_artwork.counts.bidder_positions": (v49/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_artwork.highest_bid": (v50/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_artwork.highest_bid.display": (v38/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_artwork.id": (v35/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_artwork.lotLabel": (v38/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_artwork.opening_bid": (v51/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_artwork.opening_bid.display": (v38/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_message": (v38/*: any*/),
        "viewer.saleArtworksConnection.edges.node.slug": (v35/*: any*/),
        "viewer.saleArtworksConnection.edges.node.title": (v38/*: any*/),
        "viewer.trendingLotsConnection": (v33/*: any*/),
        "viewer.trendingLotsConnection.edges": (v34/*: any*/),
        "viewer.trendingLotsConnection.edges.counts": (v48/*: any*/),
        "viewer.trendingLotsConnection.edges.counts.bidderPositions": (v49/*: any*/),
        "viewer.trendingLotsConnection.edges.id": (v35/*: any*/),
        "viewer.trendingLotsConnection.edges.node": (v36/*: any*/),
        "viewer.trendingLotsConnection.edges.node.artists": (v37/*: any*/),
        "viewer.trendingLotsConnection.edges.node.artists.href": (v38/*: any*/),
        "viewer.trendingLotsConnection.edges.node.artists.id": (v35/*: any*/),
        "viewer.trendingLotsConnection.edges.node.artists.name": (v38/*: any*/),
        "viewer.trendingLotsConnection.edges.node.collecting_institution": (v38/*: any*/),
        "viewer.trendingLotsConnection.edges.node.cultural_maker": (v38/*: any*/),
        "viewer.trendingLotsConnection.edges.node.date": (v38/*: any*/),
        "viewer.trendingLotsConnection.edges.node.href": (v38/*: any*/),
        "viewer.trendingLotsConnection.edges.node.id": (v35/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image": (v39/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.aspectRatio": (v40/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.height": (v41/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.resized": (v42/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.resized.height": (v41/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.resized.src": (v43/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.resized.srcSet": (v43/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.resized.width": (v41/*: any*/),
        "viewer.trendingLotsConnection.edges.node.imageTitle": (v38/*: any*/),
        "viewer.trendingLotsConnection.edges.node.internalID": (v35/*: any*/),
        "viewer.trendingLotsConnection.edges.node.is_biddable": (v44/*: any*/),
        "viewer.trendingLotsConnection.edges.node.is_inquireable": (v44/*: any*/),
        "viewer.trendingLotsConnection.edges.node.is_saved": (v44/*: any*/),
        "viewer.trendingLotsConnection.edges.node.partner": (v45/*: any*/),
        "viewer.trendingLotsConnection.edges.node.partner.href": (v38/*: any*/),
        "viewer.trendingLotsConnection.edges.node.partner.id": (v35/*: any*/),
        "viewer.trendingLotsConnection.edges.node.partner.name": (v38/*: any*/),
        "viewer.trendingLotsConnection.edges.node.partner.type": (v38/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale": (v46/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.display_timely_at": (v38/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.id": (v35/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.is_auction": (v44/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.is_closed": (v44/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.is_live_open": (v44/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.is_open": (v44/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.is_preview": (v44/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork": (v47/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.counts": (v48/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.counts.bidder_positions": (v49/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.highest_bid": (v50/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.highest_bid.display": (v38/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.id": (v35/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.lotLabel": (v38/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.opening_bid": (v51/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.opening_bid.display": (v38/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_message": (v38/*: any*/),
        "viewer.trendingLotsConnection.edges.node.slug": (v35/*: any*/),
        "viewer.trendingLotsConnection.edges.node.title": (v38/*: any*/)
      }
    },
    "name": "AuctionsApp_Test_Query",
    "operationKind": "query",
    "text": "query AuctionsApp_Test_Query {\n  viewer {\n    ...AuctionsApp_viewer\n  }\n}\n\nfragment AuctionsApp_viewer on Viewer {\n  ...CuritorialRailsTabBar_viewer\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment CuritorialRailsTabBar_viewer on Viewer {\n  ...WorksByArtistsYouFollowRail_viewer\n  ...TrendingLotsRail_viewer\n  ...StandoutLotsRail_viewer\n  me {\n    ...MyBids_me\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotLabel\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment MyBidsBidHeader_sale on Sale {\n  coverImage {\n    cropped(width: 330, height: 100) {\n      src\n      srcSet\n    }\n  }\n  formattedStartDateTime\n  name\n  partner {\n    name\n    id\n  }\n  slug\n}\n\nfragment MyBidsBidItem_saleArtwork on SaleArtwork {\n  artwork {\n    artistNames\n    image {\n      resized(width: 55, height: 55) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n  estimate\n  currentBid {\n    display\n  }\n  internalID\n  isHighestBidder\n  isWatching\n  lotState {\n    bidCount\n    sellingPrice {\n      display\n    }\n  }\n  lotLabel\n  slug\n}\n\nfragment MyBids_me on Me {\n  myBids {\n    active {\n      sale {\n        slug\n        ...MyBidsBidHeader_sale\n        id\n      }\n      saleArtworks {\n        ...MyBidsBidItem_saleArtwork\n        id\n      }\n    }\n  }\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment ShelfArtwork_artwork_20bRBg on Artwork {\n  image {\n    resized(width: 325) {\n      src\n      srcSet\n      width\n      height\n    }\n    aspectRatio\n    height\n  }\n  imageTitle\n  title\n  href\n  is_saved: isSaved\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n\nfragment StandoutLotsRail_viewer on Viewer {\n  StandoutLotsRailConnection: saleArtworksConnection(first: 50, geneIDs: \"highlights-at-auction\") {\n    edges {\n      node {\n        internalID\n        slug\n        ...ShelfArtwork_artwork_20bRBg\n        sale {\n          isClosed\n          id\n        }\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment TrendingLotsRail_viewer on Viewer {\n  trendingLotsConnection: saleArtworksConnection(biddableSale: true, first: 10, sort: \"-bidder_positions_count\") {\n    edges {\n      counts {\n        bidderPositions\n      }\n      node {\n        internalID\n        slug\n        ...ShelfArtwork_artwork_20bRBg\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment WorksByArtistsYouFollowRail_viewer on Viewer {\n  saleArtworksConnection(includeArtworksByFollowedArtists: true, isAuction: true, liveSale: true, first: 50) {\n    edges {\n      node {\n        internalID\n        slug\n        ...ShelfArtwork_artwork_20bRBg\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'be23721091aac45a96cf029c1f714313';
export default node;
