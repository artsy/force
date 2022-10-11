/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SoldRecentlyOnArtsy_tests_QueryVariables = {};
export type SoldRecentlyOnArtsy_tests_QueryResponse = {
    readonly recentlySoldArtworks: {
        readonly " $fragmentRefs": FragmentRefs<"SoldRecentlyOnArtsy_recentlySoldArtworks">;
    } | null;
};
export type SoldRecentlyOnArtsy_tests_Query = {
    readonly response: SoldRecentlyOnArtsy_tests_QueryResponse;
    readonly variables: SoldRecentlyOnArtsy_tests_QueryVariables;
};



/*
query SoldRecentlyOnArtsy_tests_Query {
  recentlySoldArtworks {
    ...SoldRecentlyOnArtsy_recentlySoldArtworks
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

fragment SoldRecentlyOnArtsy_recentlySoldArtworks on RecentlySoldArtworkTypeConnection {
  edges {
    node {
      artwork {
        ...ShelfArtwork_artwork_20bRBg
        slug
        href
        internalID
        id
      }
      lowEstimate {
        display
      }
      highEstimate {
        display
      }
      priceRealized {
        display
      }
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
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
v7 = [
  (v4/*: any*/),
  (v2/*: any*/)
],
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
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
  "type": "Money"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SoldRecentlyOnArtsy_tests_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "RecentlySoldArtworkTypeConnection",
        "kind": "LinkedField",
        "name": "recentlySoldArtworks",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SoldRecentlyOnArtsy_recentlySoldArtworks"
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
    "name": "SoldRecentlyOnArtsy_tests_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "RecentlySoldArtworkTypeConnection",
        "kind": "LinkedField",
        "name": "recentlySoldArtworks",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "RecentlySoldArtworkTypeEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "RecentlySoldArtworkType",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
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
                          (v2/*: any*/)
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
                        "args": (v3/*: any*/),
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artists",
                        "plural": true,
                        "selections": [
                          (v2/*: any*/),
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
                        "args": (v3/*: any*/),
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          (v1/*: any*/),
                          (v2/*: any*/)
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
                          (v2/*: any*/),
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
                          (v5/*: any*/),
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
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "lowEstimate",
                    "plural": false,
                    "selections": (v6/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "highEstimate",
                    "plural": false,
                    "selections": (v6/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "priceRealized",
                    "plural": false,
                    "selections": (v6/*: any*/),
                    "storageKey": null
                  }
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
    "cacheID": "d7a4b17159589b064fc66e2b2bc777a2",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "recentlySoldArtworks": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "RecentlySoldArtworkTypeConnection"
        },
        "recentlySoldArtworks.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "RecentlySoldArtworkTypeEdge"
        },
        "recentlySoldArtworks.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "RecentlySoldArtworkType"
        },
        "recentlySoldArtworks.edges.node.artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "recentlySoldArtworks.edges.node.artwork.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "recentlySoldArtworks.edges.node.artwork.artist.id": (v8/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.artist.targetSupply": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "recentlySoldArtworks.edges.node.artwork.artist.targetSupply.isP1": (v9/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "recentlySoldArtworks.edges.node.artwork.artists.href": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.artists.id": (v8/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.artists.name": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "recentlySoldArtworks.edges.node.artwork.attributionClass.id": (v8/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.attributionClass.name": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.collecting_institution": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.cultural_maker": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.date": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.href": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.id": (v8/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "recentlySoldArtworks.edges.node.artwork.image.aspectRatio": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Float"
        },
        "recentlySoldArtworks.edges.node.artwork.image.height": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "recentlySoldArtworks.edges.node.artwork.image.resized.height": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.image.resized.src": (v12/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.image.resized.srcSet": (v12/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.image.resized.width": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.imageTitle": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.internalID": (v8/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.is_biddable": (v9/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.is_saved": (v9/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "recentlySoldArtworks.edges.node.artwork.marketPriceInsights.demandRank": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "recentlySoldArtworks.edges.node.artwork.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "recentlySoldArtworks.edges.node.artwork.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "recentlySoldArtworks.edges.node.artwork.mediumType.filterGene.id": (v8/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.mediumType.filterGene.name": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "recentlySoldArtworks.edges.node.artwork.partner.href": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.partner.id": (v8/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.partner.name": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "recentlySoldArtworks.edges.node.artwork.sale.cascadingEndTimeIntervalMinutes": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale.display_timely_at": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale.endAt": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale.extendedBiddingIntervalMinutes": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale.id": (v8/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale.is_auction": (v9/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale.is_closed": (v9/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale.is_preview": (v9/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale.startAt": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale_artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.counts.bidder_positions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.endAt": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.extendedBiddingEndAt": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.formattedEndDateTime": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.highest_bid.display": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.id": (v8/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.lotID": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.lotLabel": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.opening_bid.display": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale_message": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.slug": (v8/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.title": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.highEstimate": (v13/*: any*/),
        "recentlySoldArtworks.edges.node.highEstimate.display": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.lowEstimate": (v13/*: any*/),
        "recentlySoldArtworks.edges.node.lowEstimate.display": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.priceRealized": (v13/*: any*/),
        "recentlySoldArtworks.edges.node.priceRealized.display": (v10/*: any*/)
      }
    },
    "name": "SoldRecentlyOnArtsy_tests_Query",
    "operationKind": "query",
    "text": "query SoldRecentlyOnArtsy_tests_Query {\n  recentlySoldArtworks {\n    ...SoldRecentlyOnArtsy_recentlySoldArtworks\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...NewSaveButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n}\n\nfragment NewSaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment ShelfArtwork_artwork_20bRBg on Artwork {\n  image {\n    resized(width: 325) {\n      src\n      srcSet\n      width\n      height\n    }\n    aspectRatio\n    height\n  }\n  imageTitle\n  title\n  href\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n\nfragment SoldRecentlyOnArtsy_recentlySoldArtworks on RecentlySoldArtworkTypeConnection {\n  edges {\n    node {\n      artwork {\n        ...ShelfArtwork_artwork_20bRBg\n        slug\n        href\n        internalID\n        id\n      }\n      lowEstimate {\n        display\n      }\n      highEstimate {\n        display\n      }\n      priceRealized {\n        display\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '442ff54b073be1549339a7f7e4ad3479';
export default node;
