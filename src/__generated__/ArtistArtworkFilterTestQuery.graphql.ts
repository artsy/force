/**
 * @generated SignedSource<<caaf7d6fe693db6592f616755368da22>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistArtworkFilterTestQuery$variables = Record<PropertyKey, never>;
export type ArtistArtworkFilterTestQuery$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistArtworkFilter_artist">;
  } | null | undefined;
};
export type ArtistArtworkFilterTestQuery = {
  response: ArtistArtworkFilterTestQuery$data;
  variables: ArtistArtworkFilterTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
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
v5 = [
  (v1/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "aspectRatio",
  "storageKey": null
},
v8 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "larger",
    "large"
  ]
},
v9 = {
  "alias": null,
  "args": [
    (v8/*: any*/)
  ],
  "kind": "ScalarField",
  "name": "url",
  "storageKey": "url(version:[\"larger\",\"large\"])"
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v14 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v15 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotID",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "extendedBiddingEndAt",
  "storageKey": null
},
v19 = [
  (v16/*: any*/),
  (v1/*: any*/)
],
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artist"
},
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v22 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v23 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v24 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v25 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v26 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v27 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v28 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Float"
},
v29 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v30 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v31 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v32 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
},
v33 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PageCursor"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistArtworkFilterTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistArtworkFilter_artist"
          }
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtistArtworkFilterTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistCounts",
            "kind": "LinkedField",
            "name": "counts",
            "plural": false,
            "selections": [
              {
                "alias": "partner_shows",
                "args": null,
                "kind": "ScalarField",
                "name": "partnerShows",
                "storageKey": null
              },
              {
                "alias": "for_sale_artworks",
                "args": null,
                "kind": "ScalarField",
                "name": "forSaleArtworks",
                "storageKey": null
              },
              {
                "alias": "ecommerce_artworks",
                "args": null,
                "kind": "ScalarField",
                "name": "ecommerceArtworks",
                "storageKey": null
              },
              {
                "alias": "auction_artworks",
                "args": null,
                "kind": "ScalarField",
                "name": "auctionArtworks",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "artworks",
                "storageKey": null
              },
              {
                "alias": "has_make_offer_artworks",
                "args": null,
                "kind": "ScalarField",
                "name": "hasMakeOfferArtworks",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": "filtered_artworks",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 30
              }
            ],
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "filterArtworksConnection",
            "plural": false,
            "selections": [
              (v1/*: any*/),
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
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "format",
                        "value": "0,0"
                      }
                    ],
                    "kind": "ScalarField",
                    "name": "total",
                    "storageKey": "total(format:\"0,0\")"
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
                    "selections": (v5/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": "immersiveArtworkNode",
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "formattedMetadata",
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
                          (v7/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "blurhash",
                            "storageKey": null
                          },
                          (v9/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
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
                          (v6/*: any*/),
                          (v10/*: any*/),
                          (v11/*: any*/),
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "includeAll",
                                "value": false
                              }
                            ],
                            "concreteType": "Image",
                            "kind": "LinkedField",
                            "name": "image",
                            "plural": false,
                            "selections": [
                              (v7/*: any*/),
                              (v11/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "placeholder",
                                "storageKey": null
                              },
                              (v9/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "versions",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": [
                                  (v8/*: any*/),
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 445
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
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "height",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": "resized(version:[\"larger\",\"large\"],width:445)"
                              }
                            ],
                            "storageKey": "image(includeAll:false)"
                          },
                          (v12/*: any*/),
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
                            "name": "artistNames",
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
                            "concreteType": "CollectorSignals",
                            "kind": "LinkedField",
                            "name": "collectorSignals",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "primaryLabel",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "AuctionCollectorSignals",
                                "kind": "LinkedField",
                                "name": "auction",
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
                                    "kind": "ScalarField",
                                    "name": "lotClosesAt",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "liveBiddingStarted",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "registrationEndsAt",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "onlineBiddingExtended",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "PartnerOfferToCollector",
                                "kind": "LinkedField",
                                "name": "partnerOffer",
                                "plural": false,
                                "selections": [
                                  (v13/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Money",
                                    "kind": "LinkedField",
                                    "name": "priceWithDiscount",
                                    "plural": false,
                                    "selections": (v14/*: any*/),
                                    "storageKey": null
                                  },
                                  (v1/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
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
                            "args": (v15/*: any*/),
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
                              (v1/*: any*/)
                            ],
                            "storageKey": "artist(shallow:true)"
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
                            "args": (v15/*: any*/),
                            "concreteType": "Artist",
                            "kind": "LinkedField",
                            "name": "artists",
                            "plural": true,
                            "selections": [
                              (v1/*: any*/),
                              (v10/*: any*/),
                              (v16/*: any*/)
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
                            "args": (v15/*: any*/),
                            "concreteType": "Partner",
                            "kind": "LinkedField",
                            "name": "partner",
                            "plural": false,
                            "selections": [
                              (v16/*: any*/),
                              (v10/*: any*/),
                              (v1/*: any*/)
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
                              (v13/*: any*/),
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
                              (v1/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isOpen",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "extendedBiddingPeriodMinutes",
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
                              (v17/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "lotLabel",
                                "storageKey": null
                              },
                              (v13/*: any*/),
                              (v18/*: any*/),
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
                                "selections": (v14/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": "opening_bid",
                                "args": null,
                                "concreteType": "SaleArtworkOpeningBid",
                                "kind": "LinkedField",
                                "name": "openingBid",
                                "plural": false,
                                "selections": (v14/*: any*/),
                                "storageKey": null
                              },
                              (v1/*: any*/)
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
                              (v17/*: any*/),
                              (v1/*: any*/),
                              (v13/*: any*/),
                              (v18/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "AttributionClass",
                            "kind": "LinkedField",
                            "name": "attributionClass",
                            "plural": false,
                            "selections": (v19/*: any*/),
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
                                "selections": (v19/*: any*/),
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isUnlisted",
                            "storageKey": null
                          },
                          {
                            "alias": "image_title",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "imageTitle",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v5/*: any*/),
                        "type": "Node",
                        "abstractKey": "__isNode"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "ArtworkConnectionInterface",
                "abstractKey": "__isArtworkConnectionInterface"
              }
            ],
            "storageKey": "filterArtworksConnection(first:30)"
          },
          (v11/*: any*/),
          (v16/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "page",
                "value": "ARTWORKS"
              }
            ],
            "concreteType": "ArtistMeta",
            "kind": "LinkedField",
            "name": "meta",
            "plural": false,
            "selections": [
              (v12/*: any*/)
            ],
            "storageKey": "meta(page:\"ARTWORKS\")"
          },
          (v1/*: any*/)
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "f534f275d2062135fe8cbe529b2cce2c",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": (v20/*: any*/),
        "artist.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistCounts"
        },
        "artist.counts.artworks": (v21/*: any*/),
        "artist.counts.auction_artworks": (v21/*: any*/),
        "artist.counts.ecommerce_artworks": (v21/*: any*/),
        "artist.counts.for_sale_artworks": (v21/*: any*/),
        "artist.counts.has_make_offer_artworks": (v22/*: any*/),
        "artist.counts.partner_shows": (v21/*: any*/),
        "artist.filtered_artworks": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FilterArtworksConnection"
        },
        "artist.filtered_artworks.__isArtworkConnectionInterface": (v23/*: any*/),
        "artist.filtered_artworks.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FilterArtworksCounts"
        },
        "artist.filtered_artworks.counts.total": (v21/*: any*/),
        "artist.filtered_artworks.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworkEdgeInterface"
        },
        "artist.filtered_artworks.edges.__isNode": (v23/*: any*/),
        "artist.filtered_artworks.edges.__typename": (v23/*: any*/),
        "artist.filtered_artworks.edges.id": (v24/*: any*/),
        "artist.filtered_artworks.edges.immersiveArtworkNode": (v25/*: any*/),
        "artist.filtered_artworks.edges.immersiveArtworkNode.formattedMetadata": (v26/*: any*/),
        "artist.filtered_artworks.edges.immersiveArtworkNode.id": (v24/*: any*/),
        "artist.filtered_artworks.edges.immersiveArtworkNode.image": (v27/*: any*/),
        "artist.filtered_artworks.edges.immersiveArtworkNode.image.aspectRatio": (v28/*: any*/),
        "artist.filtered_artworks.edges.immersiveArtworkNode.image.blurhash": (v26/*: any*/),
        "artist.filtered_artworks.edges.immersiveArtworkNode.image.url": (v26/*: any*/),
        "artist.filtered_artworks.edges.immersiveArtworkNode.slug": (v24/*: any*/),
        "artist.filtered_artworks.edges.node": (v25/*: any*/),
        "artist.filtered_artworks.edges.node.artist": (v20/*: any*/),
        "artist.filtered_artworks.edges.node.artist.id": (v24/*: any*/),
        "artist.filtered_artworks.edges.node.artist.targetSupply": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "artist.filtered_artworks.edges.node.artist.targetSupply.isP1": (v22/*: any*/),
        "artist.filtered_artworks.edges.node.artistNames": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "artist.filtered_artworks.edges.node.artists.href": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.artists.id": (v24/*: any*/),
        "artist.filtered_artworks.edges.node.artists.name": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artist.filtered_artworks.edges.node.attributionClass.id": (v24/*: any*/),
        "artist.filtered_artworks.edges.node.attributionClass.name": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.collecting_institution": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.collectorSignals": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CollectorSignals"
        },
        "artist.filtered_artworks.edges.node.collectorSignals.auction": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionCollectorSignals"
        },
        "artist.filtered_artworks.edges.node.collectorSignals.auction.bidCount": (v29/*: any*/),
        "artist.filtered_artworks.edges.node.collectorSignals.auction.liveBiddingStarted": (v30/*: any*/),
        "artist.filtered_artworks.edges.node.collectorSignals.auction.lotClosesAt": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.collectorSignals.auction.onlineBiddingExtended": (v30/*: any*/),
        "artist.filtered_artworks.edges.node.collectorSignals.auction.registrationEndsAt": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.collectorSignals.partnerOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollector"
        },
        "artist.filtered_artworks.edges.node.collectorSignals.partnerOffer.endAt": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.collectorSignals.partnerOffer.id": (v24/*: any*/),
        "artist.filtered_artworks.edges.node.collectorSignals.partnerOffer.priceWithDiscount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "artist.filtered_artworks.edges.node.collectorSignals.partnerOffer.priceWithDiscount.display": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.collectorSignals.primaryLabel": {
          "enumValues": [
            "CURATORS_PICK",
            "INCREASED_INTEREST",
            "PARTNER_OFFER"
          ],
          "nullable": true,
          "plural": false,
          "type": "LabelSignalEnum"
        },
        "artist.filtered_artworks.edges.node.cultural_maker": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.date": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.href": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.id": (v24/*: any*/),
        "artist.filtered_artworks.edges.node.image": (v27/*: any*/),
        "artist.filtered_artworks.edges.node.image.aspectRatio": (v28/*: any*/),
        "artist.filtered_artworks.edges.node.image.internalID": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ID"
        },
        "artist.filtered_artworks.edges.node.image.placeholder": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "artist.filtered_artworks.edges.node.image.resized.height": (v31/*: any*/),
        "artist.filtered_artworks.edges.node.image.resized.src": (v23/*: any*/),
        "artist.filtered_artworks.edges.node.image.resized.srcSet": (v23/*: any*/),
        "artist.filtered_artworks.edges.node.image.resized.width": (v31/*: any*/),
        "artist.filtered_artworks.edges.node.image.url": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.image.versions": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "String"
        },
        "artist.filtered_artworks.edges.node.imageTitle": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.image_title": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.internalID": (v24/*: any*/),
        "artist.filtered_artworks.edges.node.isUnlisted": (v30/*: any*/),
        "artist.filtered_artworks.edges.node.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "artist.filtered_artworks.edges.node.marketPriceInsights.demandRank": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "artist.filtered_artworks.edges.node.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "artist.filtered_artworks.edges.node.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "artist.filtered_artworks.edges.node.mediumType.filterGene.id": (v24/*: any*/),
        "artist.filtered_artworks.edges.node.mediumType.filterGene.name": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artist.filtered_artworks.edges.node.partner.href": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.partner.id": (v24/*: any*/),
        "artist.filtered_artworks.edges.node.partner.name": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "artist.filtered_artworks.edges.node.sale.cascadingEndTimeIntervalMinutes": (v31/*: any*/),
        "artist.filtered_artworks.edges.node.sale.endAt": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.sale.extendedBiddingIntervalMinutes": (v31/*: any*/),
        "artist.filtered_artworks.edges.node.sale.extendedBiddingPeriodMinutes": (v31/*: any*/),
        "artist.filtered_artworks.edges.node.sale.id": (v24/*: any*/),
        "artist.filtered_artworks.edges.node.sale.isOpen": (v22/*: any*/),
        "artist.filtered_artworks.edges.node.sale.is_auction": (v22/*: any*/),
        "artist.filtered_artworks.edges.node.sale.is_closed": (v22/*: any*/),
        "artist.filtered_artworks.edges.node.sale.startAt": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.saleArtwork": (v32/*: any*/),
        "artist.filtered_artworks.edges.node.saleArtwork.endAt": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.saleArtwork.extendedBiddingEndAt": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.saleArtwork.id": (v24/*: any*/),
        "artist.filtered_artworks.edges.node.saleArtwork.lotID": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.sale_artwork": (v32/*: any*/),
        "artist.filtered_artworks.edges.node.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "artist.filtered_artworks.edges.node.sale_artwork.counts.bidder_positions": (v21/*: any*/),
        "artist.filtered_artworks.edges.node.sale_artwork.endAt": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.sale_artwork.extendedBiddingEndAt": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.sale_artwork.formattedEndDateTime": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "artist.filtered_artworks.edges.node.sale_artwork.highest_bid.display": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.sale_artwork.id": (v24/*: any*/),
        "artist.filtered_artworks.edges.node.sale_artwork.lotID": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.sale_artwork.lotLabel": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "artist.filtered_artworks.edges.node.sale_artwork.opening_bid.display": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.sale_message": (v26/*: any*/),
        "artist.filtered_artworks.edges.node.slug": (v24/*: any*/),
        "artist.filtered_artworks.edges.node.title": (v26/*: any*/),
        "artist.filtered_artworks.id": (v24/*: any*/),
        "artist.filtered_artworks.pageCursors": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageCursors"
        },
        "artist.filtered_artworks.pageCursors.around": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "PageCursor"
        },
        "artist.filtered_artworks.pageCursors.around.cursor": (v23/*: any*/),
        "artist.filtered_artworks.pageCursors.around.isCurrent": (v30/*: any*/),
        "artist.filtered_artworks.pageCursors.around.page": (v29/*: any*/),
        "artist.filtered_artworks.pageCursors.first": (v33/*: any*/),
        "artist.filtered_artworks.pageCursors.first.cursor": (v23/*: any*/),
        "artist.filtered_artworks.pageCursors.first.isCurrent": (v30/*: any*/),
        "artist.filtered_artworks.pageCursors.first.page": (v29/*: any*/),
        "artist.filtered_artworks.pageCursors.last": (v33/*: any*/),
        "artist.filtered_artworks.pageCursors.last.cursor": (v23/*: any*/),
        "artist.filtered_artworks.pageCursors.last.isCurrent": (v30/*: any*/),
        "artist.filtered_artworks.pageCursors.last.page": (v29/*: any*/),
        "artist.filtered_artworks.pageCursors.previous": (v33/*: any*/),
        "artist.filtered_artworks.pageCursors.previous.cursor": (v23/*: any*/),
        "artist.filtered_artworks.pageCursors.previous.page": (v29/*: any*/),
        "artist.filtered_artworks.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "artist.filtered_artworks.pageInfo.endCursor": (v26/*: any*/),
        "artist.filtered_artworks.pageInfo.hasNextPage": (v30/*: any*/),
        "artist.id": (v24/*: any*/),
        "artist.internalID": (v24/*: any*/),
        "artist.meta": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistMeta"
        },
        "artist.meta.title": (v23/*: any*/),
        "artist.name": (v26/*: any*/),
        "artist.slug": (v24/*: any*/)
      }
    },
    "name": "ArtistArtworkFilterTestQuery",
    "operationKind": "query",
    "text": "query ArtistArtworkFilterTestQuery {\n  artist(id: \"example\") {\n    ...ArtistArtworkFilter_artist\n    id\n  }\n}\n\nfragment ArtistArtworkFilter_artist on Artist {\n  counts {\n    partner_shows: partnerShows\n    for_sale_artworks: forSaleArtworks\n    ecommerce_artworks: ecommerceArtworks\n    auction_artworks: auctionArtworks\n    artworks\n    has_make_offer_artworks: hasMakeOfferArtworks\n  }\n  filtered_artworks: filterArtworksConnection(first: 30) {\n    id\n    counts {\n      total(format: \"0,0\")\n    }\n    ...ArtworkFilterArtworkGrid_filtered_artworks\n    ...ImmersiveView_filtered_artworks\n  }\n  internalID\n  name\n  slug\n  meta(page: ARTWORKS) {\n    title\n  }\n}\n\nfragment ArtworkFilterArtworkGrid_filtered_artworks on FilterArtworksConnection {\n  id\n  pageInfo {\n    hasNextPage\n    endCursor\n  }\n  pageCursors {\n    ...Pagination_pageCursors\n  }\n  edges {\n    node {\n      id\n    }\n  }\n  ...ArtworkGrid_artworks\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnectionInterface {\n  __isArtworkConnectionInterface: __typename\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      internalID\n      image(includeAll: false) {\n        aspectRatio\n      }\n      ...GridItem_artwork\n      ...FlatGridItem_artwork\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment BidTimerLine_artwork on Artwork {\n  saleArtwork {\n    lotID\n    id\n  }\n  collectorSignals {\n    auction {\n      lotClosesAt\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  collectorSignals {\n    primaryLabel\n    auction {\n      bidCount\n      lotClosesAt\n      liveBiddingStarted\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...PrimaryLabelLine_artwork\n  ...BidTimerLine_artwork\n  ...HoverDetails_artwork\n}\n\nfragment ExclusiveAccessBadge_artwork on Artwork {\n  isUnlisted\n}\n\nfragment FlatGridItem_artwork on Artwork {\n  ...Metadata_artwork\n  sale {\n    extendedBiddingPeriodMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    isOpen\n    id\n  }\n  saleArtwork {\n    endAt\n    extendedBiddingEndAt\n    lotID\n    id\n  }\n  internalID\n  title\n  image_title: imageTitle\n  image(includeAll: false) {\n    resized(width: 445, version: [\"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n  artistNames\n  href\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  imageTitle\n  image(includeAll: false) {\n    internalID\n    placeholder\n    url(version: [\"larger\", \"large\"])\n    aspectRatio\n    versions\n  }\n  artistNames\n  href\n  ...Metadata_artwork\n  ...ExclusiveAccessBadge_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment ImmersiveView_filtered_artworks on FilterArtworksConnection {\n  pageInfo {\n    hasNextPage\n  }\n  edges {\n    immersiveArtworkNode: node {\n      slug\n      formattedMetadata\n      image {\n        aspectRatio\n        blurhash\n        url(version: [\"larger\", \"large\"])\n      }\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n  sale {\n    isOpen\n    id\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment PrimaryLabelLine_artwork on Artwork {\n  internalID\n  collectorSignals {\n    primaryLabel\n    partnerOffer {\n      endAt\n      priceWithDiscount {\n        display\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "00a3e98ea332f8e11ad22d289079e0c3";

export default node;
