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

fragment Details_artwork on Artwork {
  href
  title
  date
  sale_message: saleMessage
  cultural_maker: culturalMaker
  artist {
    targetSupply {
      isP1
    }
    id
  }
  marketPriceInsights {
    demandRank
  }
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
    cascadingEndTimeIntervalMinutes
    extendedBiddingIntervalMinutes
    startAt
    is_auction: isAuction
    is_closed: isClosed
    id
  }
  sale_artwork: saleArtwork {
    lotID
    lotLabel
    endAt
    extendedBiddingEndAt
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
    filterGene {
      name
      id
    }
  }
}

fragment Metadata_artwork on Artwork {
  ...Details_artwork
  internalID
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
        sale {
          isClosed
          id
        }
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
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
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
v7 = [
  (v5/*: any*/),
  (v0/*: any*/)
],
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkCounts"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v14 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
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
                        "concreteType": "Sale",
                        "kind": "LinkedField",
                        "name": "sale",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isClosed",
                            "storageKey": null
                          },
                          (v0/*: any*/),
                          (v1/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "cascadingEndTimeIntervalMinutes",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "extendedBiddingIntervalMinutes",
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
                              (v2/*: any*/)
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
                          (v2/*: any*/)
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
                        "args": null,
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artist",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ArtistTargetSupply",
                            "kind": "LinkedField",
                            "name": "targetSupply",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isP1",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v0/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtworkPriceInsights",
                        "kind": "LinkedField",
                        "name": "marketPriceInsights",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "demandRank",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v4/*: any*/),
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artists",
                        "plural": true,
                        "selections": [
                          (v0/*: any*/),
                          (v3/*: any*/),
                          (v5/*: any*/)
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
                        "args": (v4/*: any*/),
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/),
                          (v3/*: any*/),
                          (v0/*: any*/)
                        ],
                        "storageKey": "partner(shallow:true)"
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
                            "name": "lotID",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "lotLabel",
                            "storageKey": null
                          },
                          (v1/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "extendedBiddingEndAt",
                            "storageKey": null
                          },
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
                          (v0/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v0/*: any*/),
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
                        "concreteType": "AttributionClass",
                        "kind": "LinkedField",
                        "name": "attributionClass",
                        "plural": false,
                        "selections": (v7/*: any*/),
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
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Gene",
                            "kind": "LinkedField",
                            "name": "filterGene",
                            "plural": false,
                            "selections": (v7/*: any*/),
                            "storageKey": null
                          }
                        ],
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
                  (v0/*: any*/)
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
    "cacheID": "415e13f88479dea77f09a1984af95f8c",
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
        "viewer.trendingLotsConnection.edges.counts": (v8/*: any*/),
        "viewer.trendingLotsConnection.edges.counts.bidderPositions": (v9/*: any*/),
        "viewer.trendingLotsConnection.edges.id": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "viewer.trendingLotsConnection.edges.node.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "viewer.trendingLotsConnection.edges.node.artist.id": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.artist.targetSupply": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "viewer.trendingLotsConnection.edges.node.artist.targetSupply.isP1": (v11/*: any*/),
        "viewer.trendingLotsConnection.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "viewer.trendingLotsConnection.edges.node.artists.href": (v12/*: any*/),
        "viewer.trendingLotsConnection.edges.node.artists.id": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.artists.name": (v12/*: any*/),
        "viewer.trendingLotsConnection.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "viewer.trendingLotsConnection.edges.node.attributionClass.id": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.attributionClass.name": (v12/*: any*/),
        "viewer.trendingLotsConnection.edges.node.collecting_institution": (v12/*: any*/),
        "viewer.trendingLotsConnection.edges.node.cultural_maker": (v12/*: any*/),
        "viewer.trendingLotsConnection.edges.node.date": (v12/*: any*/),
        "viewer.trendingLotsConnection.edges.node.href": (v12/*: any*/),
        "viewer.trendingLotsConnection.edges.node.id": (v10/*: any*/),
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
        "viewer.trendingLotsConnection.edges.node.image.height": (v13/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "viewer.trendingLotsConnection.edges.node.image.resized.height": (v13/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.resized.src": (v14/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.resized.srcSet": (v14/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.resized.width": (v13/*: any*/),
        "viewer.trendingLotsConnection.edges.node.imageTitle": (v12/*: any*/),
        "viewer.trendingLotsConnection.edges.node.internalID": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.is_biddable": (v11/*: any*/),
        "viewer.trendingLotsConnection.edges.node.is_saved": (v11/*: any*/),
        "viewer.trendingLotsConnection.edges.node.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "viewer.trendingLotsConnection.edges.node.marketPriceInsights.demandRank": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "viewer.trendingLotsConnection.edges.node.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "viewer.trendingLotsConnection.edges.node.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "viewer.trendingLotsConnection.edges.node.mediumType.filterGene.id": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.mediumType.filterGene.name": (v12/*: any*/),
        "viewer.trendingLotsConnection.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "viewer.trendingLotsConnection.edges.node.partner.href": (v12/*: any*/),
        "viewer.trendingLotsConnection.edges.node.partner.id": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.partner.name": (v12/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "viewer.trendingLotsConnection.edges.node.sale.cascadingEndTimeIntervalMinutes": (v13/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.display_timely_at": (v12/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.endAt": (v12/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.extendedBiddingIntervalMinutes": (v13/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.id": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.isClosed": (v11/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.is_auction": (v11/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.is_closed": (v11/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.is_preview": (v11/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.startAt": (v12/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "viewer.trendingLotsConnection.edges.node.sale_artwork.counts": (v8/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.counts.bidder_positions": (v9/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.endAt": (v12/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.extendedBiddingEndAt": (v12/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.formattedEndDateTime": (v12/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "viewer.trendingLotsConnection.edges.node.sale_artwork.highest_bid.display": (v12/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.id": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.lotID": (v12/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.lotLabel": (v12/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "viewer.trendingLotsConnection.edges.node.sale_artwork.opening_bid.display": (v12/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_message": (v12/*: any*/),
        "viewer.trendingLotsConnection.edges.node.slug": (v10/*: any*/),
        "viewer.trendingLotsConnection.edges.node.title": (v12/*: any*/)
      }
    },
    "name": "TrendingLotsRail_Test_Query",
    "operationKind": "query",
    "text": "query TrendingLotsRail_Test_Query {\n  viewer {\n    ...TrendingLotsRail_viewer\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...NewSaveButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n}\n\nfragment NewSaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment ShelfArtwork_artwork_20bRBg on Artwork {\n  image {\n    resized(width: 325) {\n      src\n      srcSet\n      width\n      height\n    }\n    aspectRatio\n    height\n  }\n  imageTitle\n  title\n  href\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n\nfragment TrendingLotsRail_viewer on Viewer {\n  trendingLotsConnection: saleArtworksConnection(biddableSale: true, first: 10, sort: \"-bidder_positions_count\", estimateRange: \"5_000_00-*\") {\n    edges {\n      counts {\n        bidderPositions\n      }\n      node {\n        internalID\n        slug\n        sale {\n          isClosed\n          id\n        }\n        ...ShelfArtwork_artwork_20bRBg\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '13e07efe3913341abc19761d7450f18e';
export default node;
