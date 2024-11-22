/**
 * @generated SignedSource<<493a8e82262d3b8540e76d2b5773eee2>>
 * @relayHash 56f290024dea3cbb28a1c36247dbdce7
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 56f290024dea3cbb28a1c36247dbdce7

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WorksForYouFeedPaginationQuery$variables = {
  count: number;
  cursor?: string | null | undefined;
};
export type WorksForYouFeedPaginationQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"WorksForYouFeed_viewer">;
  } | null | undefined;
};
export type WorksForYouFeedPaginationQuery = {
  response: WorksForYouFeedPaginationQuery$data;
  variables: WorksForYouFeedPaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "count"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  },
  {
    "kind": "Literal",
    "name": "forSale",
    "value": true
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "PUBLISHED_AT_DESC"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
  "name": "__typename",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v6 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "larger",
    "large"
  ]
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v10 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v11 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotID",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "extendedBiddingEndAt",
  "storageKey": null
},
v15 = [
  (v12/*: any*/),
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "WorksForYouFeedPaginationQuery",
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
                "kind": "Variable",
                "name": "count",
                "variableName": "count"
              },
              {
                "kind": "Variable",
                "name": "cursor",
                "variableName": "cursor"
              }
            ],
            "kind": "FragmentSpread",
            "name": "WorksForYouFeed_viewer"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "WorksForYouFeedPaginationQuery",
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
            "args": null,
            "concreteType": "Me",
            "kind": "LinkedField",
            "name": "me",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FollowsAndSaves",
                "kind": "LinkedField",
                "name": "followsAndSaves",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": (v1/*: any*/),
                    "concreteType": "FollowedArtistsArtworksGroupConnection",
                    "kind": "LinkedField",
                    "name": "bundledArtworksByArtistConnection",
                    "plural": false,
                    "selections": [
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
                        "concreteType": "FollowedArtistsArtworksGroupEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "FollowedArtistsArtworksGroup",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              (v3/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "summary",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "artists",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "format",
                                    "value": "MMM DD"
                                  }
                                ],
                                "kind": "ScalarField",
                                "name": "publishedAt",
                                "storageKey": "publishedAt(format:\"MMM DD\")"
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ArtworkConnection",
                                "kind": "LinkedField",
                                "name": "artworksConnection",
                                "plural": false,
                                "selections": [
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
                                          (v4/*: any*/),
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "Artwork",
                                            "kind": "LinkedField",
                                            "name": "node",
                                            "plural": false,
                                            "selections": [
                                              (v2/*: any*/),
                                              {
                                                "alias": null,
                                                "args": null,
                                                "kind": "ScalarField",
                                                "name": "slug",
                                                "storageKey": null
                                              },
                                              (v3/*: any*/),
                                              (v5/*: any*/),
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
                                                  {
                                                    "alias": null,
                                                    "args": null,
                                                    "kind": "ScalarField",
                                                    "name": "aspectRatio",
                                                    "storageKey": null
                                                  },
                                                  (v5/*: any*/),
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
                                                      (v6/*: any*/)
                                                    ],
                                                    "kind": "ScalarField",
                                                    "name": "url",
                                                    "storageKey": "url(version:[\"larger\",\"large\"])"
                                                  },
                                                  {
                                                    "alias": null,
                                                    "args": null,
                                                    "kind": "ScalarField",
                                                    "name": "versions",
                                                    "storageKey": null
                                                  },
                                                  {
                                                    "alias": null,
                                                    "args": null,
                                                    "kind": "ScalarField",
                                                    "name": "blurhashDataURL",
                                                    "storageKey": null
                                                  },
                                                  {
                                                    "alias": null,
                                                    "args": [
                                                      (v6/*: any*/),
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
                                                      (v7/*: any*/),
                                                      (v8/*: any*/),
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
                                              {
                                                "alias": null,
                                                "args": null,
                                                "kind": "ScalarField",
                                                "name": "title",
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
                                                      (v9/*: any*/),
                                                      {
                                                        "alias": null,
                                                        "args": null,
                                                        "concreteType": "Money",
                                                        "kind": "LinkedField",
                                                        "name": "priceWithDiscount",
                                                        "plural": false,
                                                        "selections": (v10/*: any*/),
                                                        "storageKey": null
                                                      },
                                                      (v2/*: any*/)
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
                                                "args": (v11/*: any*/),
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
                                                "args": (v11/*: any*/),
                                                "concreteType": "Artist",
                                                "kind": "LinkedField",
                                                "name": "artists",
                                                "plural": true,
                                                "selections": [
                                                  (v2/*: any*/),
                                                  (v3/*: any*/),
                                                  (v12/*: any*/)
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
                                                "args": (v11/*: any*/),
                                                "concreteType": "Partner",
                                                "kind": "LinkedField",
                                                "name": "partner",
                                                "plural": false,
                                                "selections": [
                                                  (v12/*: any*/),
                                                  (v3/*: any*/),
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
                                                  (v9/*: any*/),
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
                                                  (v13/*: any*/),
                                                  {
                                                    "alias": null,
                                                    "args": null,
                                                    "kind": "ScalarField",
                                                    "name": "lotLabel",
                                                    "storageKey": null
                                                  },
                                                  (v9/*: any*/),
                                                  (v14/*: any*/),
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
                                                    "selections": (v10/*: any*/),
                                                    "storageKey": null
                                                  },
                                                  {
                                                    "alias": "opening_bid",
                                                    "args": null,
                                                    "concreteType": "SaleArtworkOpeningBid",
                                                    "kind": "LinkedField",
                                                    "name": "openingBid",
                                                    "plural": false,
                                                    "selections": (v10/*: any*/),
                                                    "storageKey": null
                                                  },
                                                  (v2/*: any*/)
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
                                                  (v13/*: any*/),
                                                  (v2/*: any*/),
                                                  (v9/*: any*/),
                                                  (v14/*: any*/)
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
                                                "selections": (v15/*: any*/),
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
                                                    "selections": (v15/*: any*/),
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
                                            "selections": [
                                              (v2/*: any*/)
                                            ],
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
                                        "value": 80
                                      },
                                      {
                                        "kind": "Literal",
                                        "name": "width",
                                        "value": 80
                                      }
                                    ],
                                    "concreteType": "ResizedImageUrl",
                                    "kind": "LinkedField",
                                    "name": "resized",
                                    "plural": false,
                                    "selections": [
                                      (v7/*: any*/),
                                      (v8/*: any*/)
                                    ],
                                    "storageKey": "resized(height:80,width:80)"
                                  }
                                ],
                                "storageKey": null
                              },
                              (v4/*: any*/)
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
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": (v1/*: any*/),
                    "filters": [
                      "sort",
                      "forSale"
                    ],
                    "handle": "connection",
                    "key": "WorksForYouFeed_bundledArtworksByArtistConnection",
                    "kind": "LinkedHandle",
                    "name": "bundledArtworksByArtistConnection"
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "56f290024dea3cbb28a1c36247dbdce7",
    "metadata": {},
    "name": "WorksForYouFeedPaginationQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "149b7694e3ce81d09a3b328ae2ae1b4d";

export default node;
