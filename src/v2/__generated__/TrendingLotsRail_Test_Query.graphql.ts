/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TrendingLotsRail_Test_QueryVariables = {};
export type TrendingLotsRail_Test_QueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"TrendingLotsRail_viewer">;
    } | null;
};
export type TrendingLotsRail_Test_Query = {
    readonly response: TrendingLotsRail_Test_QueryResponse;
    readonly variables: TrendingLotsRail_Test_QueryVariables;
};



/*
query TrendingLotsRail_Test_Query {
  viewer {
    ...TrendingLotsRail_viewer
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
  is_saved: isSaved
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
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v2 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v6 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkCounts"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v9 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v12 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "TrendingLotsRail_Test_Query",
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
            "name": "TrendingLotsRail_viewer"
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
    "name": "TrendingLotsRail_Test_Query",
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
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
                        "kind": "ScalarField",
                        "name": "slug",
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
                                "name": "width",
                                "value": 325
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
                              (v0/*: any*/)
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
                          (v0/*: any*/)
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
                      (v1/*: any*/),
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
                        "args": (v2/*: any*/),
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artists",
                        "plural": true,
                        "selections": [
                          (v3/*: any*/),
                          (v1/*: any*/),
                          (v4/*: any*/)
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
                        "args": (v2/*: any*/),
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          (v1/*: any*/),
                          (v3/*: any*/),
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
                          (v5/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "cascadingEndTimeInterval",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "startAt",
                            "storageKey": null
                          },
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
                          (v3/*: any*/),
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
                            "kind": "ScalarField",
                            "name": "lotLabel",
                            "storageKey": null
                          },
                          (v5/*: any*/),
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
                            "selections": (v6/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": "opening_bid",
                            "args": null,
                            "concreteType": "SaleArtworkOpeningBid",
                            "kind": "LinkedField",
                            "name": "openingBid",
                            "plural": false,
                            "selections": (v6/*: any*/),
                            "storageKey": null
                          },
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "AttributionClass",
                        "kind": "LinkedField",
                        "name": "attributionClass",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtworkMedium",
                        "kind": "LinkedField",
                        "name": "mediumType",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/)
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
                  (v3/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "saleArtworksConnection(biddableSale:true,estimateRange:\"5_000_00-*\",first:10,sort:\"-bidder_positions_count\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2213b7ea1e3f3a735c309abde5f02d8b",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.trendingLotsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworksConnection"
        },
        "viewer.trendingLotsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "SaleArtwork"
        },
        "viewer.trendingLotsConnection.edges.counts": (v7/*: any*/),
        "viewer.trendingLotsConnection.edges.counts.bidderPositions": (v8/*: any*/),
        "viewer.trendingLotsConnection.edges.id": (v9/*: any*/),
        "viewer.trendingLotsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "viewer.trendingLotsConnection.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "viewer.trendingLotsConnection.edges.node.artists.href": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.artists.id": (v9/*: any*/),
        "viewer.trendingLotsConnection.edges.node.artists.name": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "viewer.trendingLotsConnection.edges.node.attributionClass.id": (v9/*: any*/),
        "viewer.trendingLotsConnection.edges.node.attributionClass.name": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.collecting_institution": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.cultural_maker": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.date": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.href": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.id": (v9/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "viewer.trendingLotsConnection.edges.node.image.aspectRatio": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Float"
        },
        "viewer.trendingLotsConnection.edges.node.image.height": (v11/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "viewer.trendingLotsConnection.edges.node.image.resized.height": (v11/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.resized.src": (v12/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.resized.srcSet": (v12/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.resized.width": (v11/*: any*/),
        "viewer.trendingLotsConnection.edges.node.imageTitle": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.internalID": (v9/*: any*/),
        "viewer.trendingLotsConnection.edges.node.is_biddable": (v13/*: any*/),
        "viewer.trendingLotsConnection.edges.node.is_inquireable": (v13/*: any*/),
        "viewer.trendingLotsConnection.edges.node.is_saved": (v13/*: any*/),
        "viewer.trendingLotsConnection.edges.node.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "viewer.trendingLotsConnection.edges.node.mediumType.name": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "viewer.trendingLotsConnection.edges.node.partner.href": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.partner.id": (v9/*: any*/),
        "viewer.trendingLotsConnection.edges.node.partner.name": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.partner.type": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "viewer.trendingLotsConnection.edges.node.sale.cascadingEndTimeInterval": (v11/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.display_timely_at": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.endAt": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.id": (v9/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.is_auction": (v13/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.is_closed": (v13/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.is_live_open": (v13/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.is_open": (v13/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.is_preview": (v13/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.startAt": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "viewer.trendingLotsConnection.edges.node.sale_artwork.counts": (v7/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.counts.bidder_positions": (v8/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.endAt": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.formattedEndDateTime": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "viewer.trendingLotsConnection.edges.node.sale_artwork.highest_bid.display": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.id": (v9/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.lotLabel": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "viewer.trendingLotsConnection.edges.node.sale_artwork.opening_bid.display": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_message": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.slug": (v9/*: any*/),
        "viewer.trendingLotsConnection.edges.node.title": (v10/*: any*/)
      }
    },
    "name": "TrendingLotsRail_Test_Query",
    "operationKind": "query",
    "text": "query TrendingLotsRail_Test_Query {\n  viewer {\n    ...TrendingLotsRail_viewer\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  is_saved: isSaved\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeInterval\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotLabel\n    endAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...NewSaveButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    name\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment NewSaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment ShelfArtwork_artwork_20bRBg on Artwork {\n  image {\n    resized(width: 325) {\n      src\n      srcSet\n      width\n      height\n    }\n    aspectRatio\n    height\n  }\n  imageTitle\n  title\n  href\n  is_saved: isSaved\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n\nfragment TrendingLotsRail_viewer on Viewer {\n  trendingLotsConnection: saleArtworksConnection(biddableSale: true, first: 10, sort: \"-bidder_positions_count\", estimateRange: \"5_000_00-*\") {\n    edges {\n      counts {\n        bidderPositions\n      }\n      node {\n        internalID\n        slug\n        ...ShelfArtwork_artwork_20bRBg\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '13e07efe3913341abc19761d7450f18e';
export default node;
