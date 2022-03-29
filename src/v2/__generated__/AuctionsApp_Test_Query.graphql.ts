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
  isSaved
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
    endAt
    cascadingEndTimeInterval
    startAt
    is_auction: isAuction
    is_closed: isClosed
    id
  }
  sale_artwork: saleArtwork {
    lotLabel
    endAt
    formattedEndDateTime
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
  ...NewSaveButton_artwork
  ...HoverDetails_artwork
}

fragment HoverDetails_artwork on Artwork {
  internalID
  attributionClass {
    name
    id
  }
  mediumType {
    name
  }
}

fragment Metadata_artwork on Artwork {
  ...Details_artwork
  ...Contact_artwork
  href
}

fragment MyBidsBidHeader_sale on Sale {
  coverImage {
    cropped(width: 330, height: 100, version: ["source", "wide", "large_rectangle"]) {
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
      cropped(width: 55, height: 55) {
        src
        srcSet
        width
        height
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

fragment NewSaveButton_artwork on Artwork {
  id
  internalID
  slug
  is_saved: isSaved
  title
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
  trendingLotsConnection: saleArtworksConnection(biddableSale: true, first: 10, sort: "-bidder_positions_count", estimateRange: "5_000_00-*") {
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
v6 = [
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
v7 = {
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
      "selections": (v6/*: any*/),
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
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "imageTitle",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v11 = {
  "alias": "is_saved",
  "args": null,
  "kind": "ScalarField",
  "name": "isSaved",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isSaved",
  "storageKey": null
},
v14 = {
  "alias": "sale_message",
  "args": null,
  "kind": "ScalarField",
  "name": "saleMessage",
  "storageKey": null
},
v15 = {
  "alias": "cultural_maker",
  "args": null,
  "kind": "ScalarField",
  "name": "culturalMaker",
  "storageKey": null
},
v16 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": (v16/*: any*/),
  "concreteType": "Artist",
  "kind": "LinkedField",
  "name": "artists",
  "plural": true,
  "selections": [
    (v17/*: any*/),
    (v10/*: any*/),
    (v18/*: any*/)
  ],
  "storageKey": "artists(shallow:true)"
},
v20 = {
  "alias": "collecting_institution",
  "args": null,
  "kind": "ScalarField",
  "name": "collectingInstitution",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": (v16/*: any*/),
  "concreteType": "Partner",
  "kind": "LinkedField",
  "name": "partner",
  "plural": false,
  "selections": [
    (v18/*: any*/),
    (v10/*: any*/),
    (v17/*: any*/),
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
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cascadingEndTimeInterval",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startAt",
  "storageKey": null
},
v25 = {
  "alias": "is_auction",
  "args": null,
  "kind": "ScalarField",
  "name": "isAuction",
  "storageKey": null
},
v26 = {
  "alias": "is_closed",
  "args": null,
  "kind": "ScalarField",
  "name": "isClosed",
  "storageKey": null
},
v27 = {
  "alias": "is_live_open",
  "args": null,
  "kind": "ScalarField",
  "name": "isLiveOpen",
  "storageKey": null
},
v28 = {
  "alias": "is_open",
  "args": null,
  "kind": "ScalarField",
  "name": "isOpen",
  "storageKey": null
},
v29 = {
  "alias": "is_preview",
  "args": null,
  "kind": "ScalarField",
  "name": "isPreview",
  "storageKey": null
},
v30 = {
  "alias": "display_timely_at",
  "args": null,
  "kind": "ScalarField",
  "name": "displayTimelyAt",
  "storageKey": null
},
v31 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotLabel",
  "storageKey": null
},
v32 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v33 = {
  "alias": "sale_artwork",
  "args": null,
  "concreteType": "SaleArtwork",
  "kind": "LinkedField",
  "name": "saleArtwork",
  "plural": false,
  "selections": [
    (v31/*: any*/),
    (v22/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "formattedEndDateTime",
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
    {
      "alias": "highest_bid",
      "args": null,
      "concreteType": "SaleArtworkHighestBid",
      "kind": "LinkedField",
      "name": "highestBid",
      "plural": false,
      "selections": (v32/*: any*/),
      "storageKey": null
    },
    {
      "alias": "opening_bid",
      "args": null,
      "concreteType": "SaleArtworkOpeningBid",
      "kind": "LinkedField",
      "name": "openingBid",
      "plural": false,
      "selections": (v32/*: any*/),
      "storageKey": null
    },
    (v17/*: any*/)
  ],
  "storageKey": null
},
v34 = [
  (v18/*: any*/),
  (v17/*: any*/)
],
v35 = {
  "alias": null,
  "args": null,
  "concreteType": "AttributionClass",
  "kind": "LinkedField",
  "name": "attributionClass",
  "plural": false,
  "selections": (v34/*: any*/),
  "storageKey": null
},
v36 = {
  "alias": null,
  "args": null,
  "concreteType": "ArtworkMedium",
  "kind": "LinkedField",
  "name": "mediumType",
  "plural": false,
  "selections": [
    (v18/*: any*/)
  ],
  "storageKey": null
},
v37 = {
  "alias": "is_inquireable",
  "args": null,
  "kind": "ScalarField",
  "name": "isInquireable",
  "storageKey": null
},
v38 = {
  "alias": "is_biddable",
  "args": null,
  "kind": "ScalarField",
  "name": "isBiddable",
  "storageKey": null
},
v39 = {
  "alias": null,
  "args": null,
  "concreteType": "Artwork",
  "kind": "LinkedField",
  "name": "node",
  "plural": false,
  "selections": [
    (v1/*: any*/),
    (v2/*: any*/),
    (v7/*: any*/),
    (v8/*: any*/),
    (v9/*: any*/),
    (v10/*: any*/),
    (v11/*: any*/),
    (v12/*: any*/),
    (v13/*: any*/),
    (v14/*: any*/),
    (v15/*: any*/),
    (v19/*: any*/),
    (v20/*: any*/),
    (v21/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Sale",
      "kind": "LinkedField",
      "name": "sale",
      "plural": false,
      "selections": [
        (v22/*: any*/),
        (v23/*: any*/),
        (v24/*: any*/),
        (v25/*: any*/),
        (v26/*: any*/),
        (v17/*: any*/),
        (v27/*: any*/),
        (v28/*: any*/),
        (v29/*: any*/),
        (v30/*: any*/)
      ],
      "storageKey": null
    },
    (v33/*: any*/),
    (v17/*: any*/),
    (v35/*: any*/),
    (v36/*: any*/),
    (v37/*: any*/),
    (v38/*: any*/)
  ],
  "storageKey": null
},
v40 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworksConnection"
},
v41 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "SaleArtwork"
},
v42 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v43 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v44 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "Artist"
},
v45 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v46 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AttributionClass"
},
v47 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v48 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Float"
},
v49 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v50 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
},
v51 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v52 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v53 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkMedium"
},
v54 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Partner"
},
v55 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Sale"
},
v56 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
},
v57 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkCounts"
},
v58 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v59 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkHighestBid"
},
v60 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkOpeningBid"
},
v61 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v62 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
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
                  (v39/*: any*/),
                  (v17/*: any*/)
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
                "name": "estimateRange",
                "value": "5_000_00-*"
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
                  (v39/*: any*/),
                  (v17/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "saleArtworksConnection(biddableSale:true,estimateRange:\"5_000_00-*\",first:10,sort:\"-bidder_positions_count\")"
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
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v19/*: any*/),
                      (v20/*: any*/),
                      (v21/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Sale",
                        "kind": "LinkedField",
                        "name": "sale",
                        "plural": false,
                        "selections": [
                          (v22/*: any*/),
                          (v23/*: any*/),
                          (v24/*: any*/),
                          (v25/*: any*/),
                          (v26/*: any*/),
                          (v17/*: any*/),
                          (v27/*: any*/),
                          (v28/*: any*/),
                          (v29/*: any*/),
                          (v30/*: any*/),
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
                      (v33/*: any*/),
                      (v17/*: any*/),
                      (v35/*: any*/),
                      (v36/*: any*/),
                      (v37/*: any*/),
                      (v38/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v17/*: any*/)
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
                                    "name": "version",
                                    "value": [
                                      "source",
                                      "wide",
                                      "large_rectangle"
                                    ]
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
                                "selections": [
                                  (v3/*: any*/),
                                  (v4/*: any*/)
                                ],
                                "storageKey": "cropped(height:100,version:[\"source\",\"wide\",\"large_rectangle\"],width:330)"
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
                          (v18/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Partner",
                            "kind": "LinkedField",
                            "name": "partner",
                            "plural": false,
                            "selections": (v34/*: any*/),
                            "storageKey": null
                          },
                          (v17/*: any*/)
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
                                    "concreteType": "CroppedImageUrl",
                                    "kind": "LinkedField",
                                    "name": "cropped",
                                    "plural": false,
                                    "selections": (v6/*: any*/),
                                    "storageKey": "cropped(height:55,width:55)"
                                  }
                                ],
                                "storageKey": null
                              },
                              (v17/*: any*/)
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
                            "selections": (v32/*: any*/),
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
                                "selections": (v32/*: any*/),
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v31/*: any*/),
                          (v2/*: any*/),
                          (v17/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v17/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "854fe693e6d5b25f006e48e5e968ce20",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.StandoutLotsRailConnection": (v40/*: any*/),
        "viewer.StandoutLotsRailConnection.edges": (v41/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.id": (v42/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node": (v43/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.artists": (v44/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.artists.href": (v45/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.artists.id": (v42/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.artists.name": (v45/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.attributionClass": (v46/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.attributionClass.id": (v42/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.attributionClass.name": (v45/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.collecting_institution": (v45/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.cultural_maker": (v45/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.date": (v45/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.href": (v45/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.id": (v42/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.image": (v47/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.image.aspectRatio": (v48/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.image.height": (v49/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.image.resized": (v50/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.image.resized.height": (v49/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.image.resized.src": (v51/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.image.resized.srcSet": (v51/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.image.resized.width": (v49/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.imageTitle": (v45/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.internalID": (v42/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.isSaved": (v52/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.is_biddable": (v52/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.is_inquireable": (v52/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.is_saved": (v52/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.mediumType": (v53/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.mediumType.name": (v45/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.partner": (v54/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.partner.href": (v45/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.partner.id": (v42/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.partner.name": (v45/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.partner.type": (v45/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale": (v55/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale.cascadingEndTimeInterval": (v49/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale.display_timely_at": (v45/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale.endAt": (v45/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale.id": (v42/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale.isClosed": (v52/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale.is_auction": (v52/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale.is_closed": (v52/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale.is_live_open": (v52/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale.is_open": (v52/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale.is_preview": (v52/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale.startAt": (v45/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_artwork": (v56/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_artwork.counts": (v57/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_artwork.counts.bidder_positions": (v58/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_artwork.endAt": (v45/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_artwork.formattedEndDateTime": (v45/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_artwork.highest_bid": (v59/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_artwork.highest_bid.display": (v45/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_artwork.id": (v42/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_artwork.lotLabel": (v45/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_artwork.opening_bid": (v60/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_artwork.opening_bid.display": (v45/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.sale_message": (v45/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.slug": (v42/*: any*/),
        "viewer.StandoutLotsRailConnection.edges.node.title": (v45/*: any*/),
        "viewer.me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "viewer.me.id": (v42/*: any*/),
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
        "viewer.me.myBids.active.sale": (v55/*: any*/),
        "viewer.me.myBids.active.sale.coverImage": (v47/*: any*/),
        "viewer.me.myBids.active.sale.coverImage.cropped": (v61/*: any*/),
        "viewer.me.myBids.active.sale.coverImage.cropped.src": (v51/*: any*/),
        "viewer.me.myBids.active.sale.coverImage.cropped.srcSet": (v51/*: any*/),
        "viewer.me.myBids.active.sale.formattedStartDateTime": (v45/*: any*/),
        "viewer.me.myBids.active.sale.id": (v42/*: any*/),
        "viewer.me.myBids.active.sale.name": (v45/*: any*/),
        "viewer.me.myBids.active.sale.partner": (v54/*: any*/),
        "viewer.me.myBids.active.sale.partner.id": (v42/*: any*/),
        "viewer.me.myBids.active.sale.partner.name": (v45/*: any*/),
        "viewer.me.myBids.active.sale.slug": (v42/*: any*/),
        "viewer.me.myBids.active.saleArtworks": (v41/*: any*/),
        "viewer.me.myBids.active.saleArtworks.artwork": (v43/*: any*/),
        "viewer.me.myBids.active.saleArtworks.artwork.artistNames": (v45/*: any*/),
        "viewer.me.myBids.active.saleArtworks.artwork.id": (v42/*: any*/),
        "viewer.me.myBids.active.saleArtworks.artwork.image": (v47/*: any*/),
        "viewer.me.myBids.active.saleArtworks.artwork.image.cropped": (v61/*: any*/),
        "viewer.me.myBids.active.saleArtworks.artwork.image.cropped.height": (v62/*: any*/),
        "viewer.me.myBids.active.saleArtworks.artwork.image.cropped.src": (v51/*: any*/),
        "viewer.me.myBids.active.saleArtworks.artwork.image.cropped.srcSet": (v51/*: any*/),
        "viewer.me.myBids.active.saleArtworks.artwork.image.cropped.width": (v62/*: any*/),
        "viewer.me.myBids.active.saleArtworks.currentBid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCurrentBid"
        },
        "viewer.me.myBids.active.saleArtworks.currentBid.display": (v45/*: any*/),
        "viewer.me.myBids.active.saleArtworks.estimate": (v45/*: any*/),
        "viewer.me.myBids.active.saleArtworks.id": (v42/*: any*/),
        "viewer.me.myBids.active.saleArtworks.internalID": (v42/*: any*/),
        "viewer.me.myBids.active.saleArtworks.isHighestBidder": (v52/*: any*/),
        "viewer.me.myBids.active.saleArtworks.isWatching": (v52/*: any*/),
        "viewer.me.myBids.active.saleArtworks.lotLabel": (v45/*: any*/),
        "viewer.me.myBids.active.saleArtworks.lotState": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CausalityLotState"
        },
        "viewer.me.myBids.active.saleArtworks.lotState.bidCount": (v49/*: any*/),
        "viewer.me.myBids.active.saleArtworks.lotState.sellingPrice": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "viewer.me.myBids.active.saleArtworks.lotState.sellingPrice.display": (v45/*: any*/),
        "viewer.me.myBids.active.saleArtworks.slug": (v42/*: any*/),
        "viewer.saleArtworksConnection": (v40/*: any*/),
        "viewer.saleArtworksConnection.edges": (v41/*: any*/),
        "viewer.saleArtworksConnection.edges.id": (v42/*: any*/),
        "viewer.saleArtworksConnection.edges.node": (v43/*: any*/),
        "viewer.saleArtworksConnection.edges.node.artists": (v44/*: any*/),
        "viewer.saleArtworksConnection.edges.node.artists.href": (v45/*: any*/),
        "viewer.saleArtworksConnection.edges.node.artists.id": (v42/*: any*/),
        "viewer.saleArtworksConnection.edges.node.artists.name": (v45/*: any*/),
        "viewer.saleArtworksConnection.edges.node.attributionClass": (v46/*: any*/),
        "viewer.saleArtworksConnection.edges.node.attributionClass.id": (v42/*: any*/),
        "viewer.saleArtworksConnection.edges.node.attributionClass.name": (v45/*: any*/),
        "viewer.saleArtworksConnection.edges.node.collecting_institution": (v45/*: any*/),
        "viewer.saleArtworksConnection.edges.node.cultural_maker": (v45/*: any*/),
        "viewer.saleArtworksConnection.edges.node.date": (v45/*: any*/),
        "viewer.saleArtworksConnection.edges.node.href": (v45/*: any*/),
        "viewer.saleArtworksConnection.edges.node.id": (v42/*: any*/),
        "viewer.saleArtworksConnection.edges.node.image": (v47/*: any*/),
        "viewer.saleArtworksConnection.edges.node.image.aspectRatio": (v48/*: any*/),
        "viewer.saleArtworksConnection.edges.node.image.height": (v49/*: any*/),
        "viewer.saleArtworksConnection.edges.node.image.resized": (v50/*: any*/),
        "viewer.saleArtworksConnection.edges.node.image.resized.height": (v49/*: any*/),
        "viewer.saleArtworksConnection.edges.node.image.resized.src": (v51/*: any*/),
        "viewer.saleArtworksConnection.edges.node.image.resized.srcSet": (v51/*: any*/),
        "viewer.saleArtworksConnection.edges.node.image.resized.width": (v49/*: any*/),
        "viewer.saleArtworksConnection.edges.node.imageTitle": (v45/*: any*/),
        "viewer.saleArtworksConnection.edges.node.internalID": (v42/*: any*/),
        "viewer.saleArtworksConnection.edges.node.isSaved": (v52/*: any*/),
        "viewer.saleArtworksConnection.edges.node.is_biddable": (v52/*: any*/),
        "viewer.saleArtworksConnection.edges.node.is_inquireable": (v52/*: any*/),
        "viewer.saleArtworksConnection.edges.node.is_saved": (v52/*: any*/),
        "viewer.saleArtworksConnection.edges.node.mediumType": (v53/*: any*/),
        "viewer.saleArtworksConnection.edges.node.mediumType.name": (v45/*: any*/),
        "viewer.saleArtworksConnection.edges.node.partner": (v54/*: any*/),
        "viewer.saleArtworksConnection.edges.node.partner.href": (v45/*: any*/),
        "viewer.saleArtworksConnection.edges.node.partner.id": (v42/*: any*/),
        "viewer.saleArtworksConnection.edges.node.partner.name": (v45/*: any*/),
        "viewer.saleArtworksConnection.edges.node.partner.type": (v45/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale": (v55/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale.cascadingEndTimeInterval": (v49/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale.display_timely_at": (v45/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale.endAt": (v45/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale.id": (v42/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale.is_auction": (v52/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale.is_closed": (v52/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale.is_live_open": (v52/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale.is_open": (v52/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale.is_preview": (v52/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale.startAt": (v45/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_artwork": (v56/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_artwork.counts": (v57/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_artwork.counts.bidder_positions": (v58/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_artwork.endAt": (v45/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_artwork.formattedEndDateTime": (v45/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_artwork.highest_bid": (v59/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_artwork.highest_bid.display": (v45/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_artwork.id": (v42/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_artwork.lotLabel": (v45/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_artwork.opening_bid": (v60/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_artwork.opening_bid.display": (v45/*: any*/),
        "viewer.saleArtworksConnection.edges.node.sale_message": (v45/*: any*/),
        "viewer.saleArtworksConnection.edges.node.slug": (v42/*: any*/),
        "viewer.saleArtworksConnection.edges.node.title": (v45/*: any*/),
        "viewer.trendingLotsConnection": (v40/*: any*/),
        "viewer.trendingLotsConnection.edges": (v41/*: any*/),
        "viewer.trendingLotsConnection.edges.counts": (v57/*: any*/),
        "viewer.trendingLotsConnection.edges.counts.bidderPositions": (v58/*: any*/),
        "viewer.trendingLotsConnection.edges.id": (v42/*: any*/),
        "viewer.trendingLotsConnection.edges.node": (v43/*: any*/),
        "viewer.trendingLotsConnection.edges.node.artists": (v44/*: any*/),
        "viewer.trendingLotsConnection.edges.node.artists.href": (v45/*: any*/),
        "viewer.trendingLotsConnection.edges.node.artists.id": (v42/*: any*/),
        "viewer.trendingLotsConnection.edges.node.artists.name": (v45/*: any*/),
        "viewer.trendingLotsConnection.edges.node.attributionClass": (v46/*: any*/),
        "viewer.trendingLotsConnection.edges.node.attributionClass.id": (v42/*: any*/),
        "viewer.trendingLotsConnection.edges.node.attributionClass.name": (v45/*: any*/),
        "viewer.trendingLotsConnection.edges.node.collecting_institution": (v45/*: any*/),
        "viewer.trendingLotsConnection.edges.node.cultural_maker": (v45/*: any*/),
        "viewer.trendingLotsConnection.edges.node.date": (v45/*: any*/),
        "viewer.trendingLotsConnection.edges.node.href": (v45/*: any*/),
        "viewer.trendingLotsConnection.edges.node.id": (v42/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image": (v47/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.aspectRatio": (v48/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.height": (v49/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.resized": (v50/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.resized.height": (v49/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.resized.src": (v51/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.resized.srcSet": (v51/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.resized.width": (v49/*: any*/),
        "viewer.trendingLotsConnection.edges.node.imageTitle": (v45/*: any*/),
        "viewer.trendingLotsConnection.edges.node.internalID": (v42/*: any*/),
        "viewer.trendingLotsConnection.edges.node.isSaved": (v52/*: any*/),
        "viewer.trendingLotsConnection.edges.node.is_biddable": (v52/*: any*/),
        "viewer.trendingLotsConnection.edges.node.is_inquireable": (v52/*: any*/),
        "viewer.trendingLotsConnection.edges.node.is_saved": (v52/*: any*/),
        "viewer.trendingLotsConnection.edges.node.mediumType": (v53/*: any*/),
        "viewer.trendingLotsConnection.edges.node.mediumType.name": (v45/*: any*/),
        "viewer.trendingLotsConnection.edges.node.partner": (v54/*: any*/),
        "viewer.trendingLotsConnection.edges.node.partner.href": (v45/*: any*/),
        "viewer.trendingLotsConnection.edges.node.partner.id": (v42/*: any*/),
        "viewer.trendingLotsConnection.edges.node.partner.name": (v45/*: any*/),
        "viewer.trendingLotsConnection.edges.node.partner.type": (v45/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale": (v55/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.cascadingEndTimeInterval": (v49/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.display_timely_at": (v45/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.endAt": (v45/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.id": (v42/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.is_auction": (v52/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.is_closed": (v52/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.is_live_open": (v52/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.is_open": (v52/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.is_preview": (v52/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.startAt": (v45/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork": (v56/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.counts": (v57/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.counts.bidder_positions": (v58/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.endAt": (v45/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.formattedEndDateTime": (v45/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.highest_bid": (v59/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.highest_bid.display": (v45/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.id": (v42/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.lotLabel": (v45/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.opening_bid": (v60/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.opening_bid.display": (v45/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_message": (v45/*: any*/),
        "viewer.trendingLotsConnection.edges.node.slug": (v42/*: any*/),
        "viewer.trendingLotsConnection.edges.node.title": (v45/*: any*/)
      }
    },
    "name": "AuctionsApp_Test_Query",
    "operationKind": "query",
    "text": "query AuctionsApp_Test_Query {\n  viewer {\n    ...AuctionsApp_viewer\n  }\n}\n\nfragment AuctionsApp_viewer on Viewer {\n  ...CuritorialRailsTabBar_viewer\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment CuritorialRailsTabBar_viewer on Viewer {\n  ...WorksByArtistsYouFollowRail_viewer\n  ...TrendingLotsRail_viewer\n  ...StandoutLotsRail_viewer\n  me {\n    ...MyBids_me\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  isSaved\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeInterval\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotLabel\n    endAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...NewSaveButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    name\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment MyBidsBidHeader_sale on Sale {\n  coverImage {\n    cropped(width: 330, height: 100, version: [\"source\", \"wide\", \"large_rectangle\"]) {\n      src\n      srcSet\n    }\n  }\n  formattedStartDateTime\n  name\n  partner {\n    name\n    id\n  }\n  slug\n}\n\nfragment MyBidsBidItem_saleArtwork on SaleArtwork {\n  artwork {\n    artistNames\n    image {\n      cropped(width: 55, height: 55) {\n        src\n        srcSet\n        width\n        height\n      }\n    }\n    id\n  }\n  estimate\n  currentBid {\n    display\n  }\n  internalID\n  isHighestBidder\n  isWatching\n  lotState {\n    bidCount\n    sellingPrice {\n      display\n    }\n  }\n  lotLabel\n  slug\n}\n\nfragment MyBids_me on Me {\n  myBids {\n    active {\n      sale {\n        slug\n        ...MyBidsBidHeader_sale\n        id\n      }\n      saleArtworks {\n        ...MyBidsBidItem_saleArtwork\n        id\n      }\n    }\n  }\n}\n\nfragment NewSaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment ShelfArtwork_artwork_20bRBg on Artwork {\n  image {\n    resized(width: 325) {\n      src\n      srcSet\n      width\n      height\n    }\n    aspectRatio\n    height\n  }\n  imageTitle\n  title\n  href\n  is_saved: isSaved\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n\nfragment StandoutLotsRail_viewer on Viewer {\n  StandoutLotsRailConnection: saleArtworksConnection(first: 50, geneIDs: \"highlights-at-auction\") {\n    edges {\n      node {\n        internalID\n        slug\n        ...ShelfArtwork_artwork_20bRBg\n        sale {\n          isClosed\n          id\n        }\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment TrendingLotsRail_viewer on Viewer {\n  trendingLotsConnection: saleArtworksConnection(biddableSale: true, first: 10, sort: \"-bidder_positions_count\", estimateRange: \"5_000_00-*\") {\n    edges {\n      counts {\n        bidderPositions\n      }\n      node {\n        internalID\n        slug\n        ...ShelfArtwork_artwork_20bRBg\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment WorksByArtistsYouFollowRail_viewer on Viewer {\n  saleArtworksConnection(includeArtworksByFollowedArtists: true, isAuction: true, liveSale: true, first: 50) {\n    edges {\n      node {\n        internalID\n        slug\n        ...ShelfArtwork_artwork_20bRBg\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'be23721091aac45a96cf029c1f714313';
export default node;
