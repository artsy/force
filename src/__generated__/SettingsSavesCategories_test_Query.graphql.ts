/**
 * @generated SignedSource<<0a12efd2d5c688d87ced21fcd5964a2b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsSavesCategories_test_Query$variables = {
  after?: string | null | undefined;
};
export type SettingsSavesCategories_test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SettingsSavesCategories_me">;
  } | null | undefined;
};
export type SettingsSavesCategories_test_Query = {
  response: SettingsSavesCategories_test_Query$data;
  variables: SettingsSavesCategories_test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  }
],
v1 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v2 = [
  (v1/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 4
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
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
v9 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotID",
  "storageKey": null
},
v11 = [
  (v5/*: any*/),
  (v6/*: any*/)
],
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
  "type": "Gene"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FilterArtworksConnection"
},
v16 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v18 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v19 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
},
v22 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsSavesCategories_test_Query",
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
            "args": [
              (v1/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "SettingsSavesCategories_me"
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
    "name": "SettingsSavesCategories_test_Query",
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
                "alias": "categoriesConnection",
                "args": (v2/*: any*/),
                "concreteType": "FollowGeneConnection",
                "kind": "LinkedField",
                "name": "genesConnection",
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
                    "concreteType": "FollowGeneEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "FollowGene",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          {
                            "alias": "category",
                            "args": null,
                            "concreteType": "Gene",
                            "kind": "LinkedField",
                            "name": "gene",
                            "plural": false,
                            "selections": [
                              (v3/*: any*/),
                              (v4/*: any*/),
                              (v5/*: any*/),
                              {
                                "alias": "avatar",
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
                                        "value": 45
                                      },
                                      {
                                        "kind": "Literal",
                                        "name": "version",
                                        "value": [
                                          "big_and_tall",
                                          "tall"
                                        ]
                                      },
                                      {
                                        "kind": "Literal",
                                        "name": "width",
                                        "value": 45
                                      }
                                    ],
                                    "concreteType": "CroppedImageUrl",
                                    "kind": "LinkedField",
                                    "name": "cropped",
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
                                      }
                                    ],
                                    "storageKey": "cropped(height:45,version:[\"big_and_tall\",\"tall\"],width:45)"
                                  }
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "first",
                                    "value": 1
                                  }
                                ],
                                "concreteType": "FilterArtworksConnection",
                                "kind": "LinkedField",
                                "name": "filterArtworksConnection",
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
                                        "name": "total",
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  },
                                  (v6/*: any*/)
                                ],
                                "storageKey": "filterArtworksConnection(first:1)"
                              },
                              {
                                "alias": "filterArtworks",
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "first",
                                    "value": 10
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "sort",
                                    "value": "-decayed_merch"
                                  }
                                ],
                                "concreteType": "FilterArtworksConnection",
                                "kind": "LinkedField",
                                "name": "filterArtworksConnection",
                                "plural": false,
                                "selections": [
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
                                          (v3/*: any*/),
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "isUnlisted",
                                            "storageKey": null
                                          },
                                          (v4/*: any*/),
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
                                                  (v7/*: any*/),
                                                  {
                                                    "alias": null,
                                                    "args": null,
                                                    "concreteType": "Money",
                                                    "kind": "LinkedField",
                                                    "name": "priceWithDiscount",
                                                    "plural": false,
                                                    "selections": (v8/*: any*/),
                                                    "storageKey": null
                                                  },
                                                  (v6/*: any*/)
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
                                            "args": (v9/*: any*/),
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
                                              (v6/*: any*/)
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
                                            "args": (v9/*: any*/),
                                            "concreteType": "Artist",
                                            "kind": "LinkedField",
                                            "name": "artists",
                                            "plural": true,
                                            "selections": [
                                              (v6/*: any*/),
                                              (v4/*: any*/),
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
                                            "args": (v9/*: any*/),
                                            "concreteType": "Partner",
                                            "kind": "LinkedField",
                                            "name": "partner",
                                            "plural": false,
                                            "selections": [
                                              (v5/*: any*/),
                                              (v4/*: any*/),
                                              (v6/*: any*/)
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
                                              (v7/*: any*/),
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
                                              (v6/*: any*/),
                                              {
                                                "alias": null,
                                                "args": null,
                                                "kind": "ScalarField",
                                                "name": "isOpen",
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
                                              (v10/*: any*/),
                                              {
                                                "alias": null,
                                                "args": null,
                                                "kind": "ScalarField",
                                                "name": "lotLabel",
                                                "storageKey": null
                                              },
                                              (v7/*: any*/),
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
                                              (v6/*: any*/)
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
                                              (v6/*: any*/)
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
                                            "selections": (v11/*: any*/),
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
                                                "selections": (v11/*: any*/),
                                                "storageKey": null
                                              }
                                            ],
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
                                            "concreteType": "Image",
                                            "kind": "LinkedField",
                                            "name": "image",
                                            "plural": false,
                                            "selections": [
                                              {
                                                "alias": "src",
                                                "args": [
                                                  {
                                                    "kind": "Literal",
                                                    "name": "version",
                                                    "value": [
                                                      "larger",
                                                      "large"
                                                    ]
                                                  }
                                                ],
                                                "kind": "ScalarField",
                                                "name": "url",
                                                "storageKey": "url(version:[\"larger\",\"large\"])"
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
                                            "storageKey": null
                                          },
                                          (v6/*: any*/)
                                        ],
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  },
                                  (v6/*: any*/)
                                ],
                                "storageKey": "filterArtworksConnection(first:10,sort:\"-decayed_merch\")"
                              },
                              (v6/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v6/*: any*/),
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
                "storageKey": null
              },
              {
                "alias": "categoriesConnection",
                "args": (v2/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "SettingsSavesCategories_categoriesConnection",
                "kind": "LinkedHandle",
                "name": "genesConnection"
              }
            ],
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d3a56c82b5a9b77d46d09060763b5f8f",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.followsAndSaves": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FollowsAndSaves"
        },
        "me.followsAndSaves.categoriesConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FollowGeneConnection"
        },
        "me.followsAndSaves.categoriesConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "FollowGeneEdge"
        },
        "me.followsAndSaves.categoriesConnection.edges.cursor": (v12/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FollowGene"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.__typename": (v12/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category": (v13/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.avatar": (v14/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.avatar.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.avatar.cropped.src": (v12/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.avatar.cropped.srcSet": (v12/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "FilterArtworksEdge"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.artist.id": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.artist.targetSupply": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.artist.targetSupply.isP1": (v17/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.artistNames": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.artists.href": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.artists.id": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.artists.name": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.attributionClass.id": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.attributionClass.name": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.collecting_institution": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.collectorSignals": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CollectorSignals"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.collectorSignals.auction": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionCollectorSignals"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.collectorSignals.auction.bidCount": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Int"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.collectorSignals.auction.liveBiddingStarted": (v19/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.collectorSignals.auction.lotClosesAt": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.collectorSignals.auction.onlineBiddingExtended": (v19/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.collectorSignals.auction.registrationEndsAt": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.collectorSignals.partnerOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollector"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.collectorSignals.partnerOffer.endAt": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.collectorSignals.partnerOffer.id": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.collectorSignals.partnerOffer.priceWithDiscount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.collectorSignals.partnerOffer.priceWithDiscount.display": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.collectorSignals.primaryLabel": {
          "enumValues": [
            "CURATORS_PICK",
            "INCREASED_INTEREST",
            "PARTNER_OFFER"
          ],
          "nullable": true,
          "plural": false,
          "type": "LabelSignalEnum"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.cultural_maker": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.date": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.href": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.id": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.image": (v14/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.image.height": (v20/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.image.src": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.image.width": (v20/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.internalID": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.isUnlisted": (v19/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.marketPriceInsights.demandRank": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.mediumType.filterGene": (v13/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.mediumType.filterGene.id": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.mediumType.filterGene.name": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.partner.href": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.partner.id": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.partner.name": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.sale.cascadingEndTimeIntervalMinutes": (v20/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.sale.endAt": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.sale.extendedBiddingIntervalMinutes": (v20/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.sale.id": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.sale.isOpen": (v17/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.sale.is_auction": (v17/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.sale.is_closed": (v17/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.sale.startAt": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.saleArtwork": (v21/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.saleArtwork.id": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.saleArtwork.lotID": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.sale_artwork": (v21/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.sale_artwork.counts.bidder_positions": (v22/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.sale_artwork.endAt": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.sale_artwork.extendedBiddingEndAt": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.sale_artwork.formattedEndDateTime": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.sale_artwork.highest_bid.display": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.sale_artwork.id": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.sale_artwork.lotID": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.sale_artwork.lotLabel": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.sale_artwork.opening_bid.display": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.sale_message": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.edges.node.title": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworks.id": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FilterArtworksCounts"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.counts.total": (v22/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.id": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.href": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.id": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.internalID": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.name": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.id": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.internalID": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "me.followsAndSaves.categoriesConnection.pageInfo.endCursor": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.pageInfo.hasNextPage": (v19/*: any*/),
        "me.followsAndSaves.categoriesConnection.totalCount": (v20/*: any*/),
        "me.id": (v16/*: any*/)
      }
    },
    "name": "SettingsSavesCategories_test_Query",
    "operationKind": "query",
    "text": "query SettingsSavesCategories_test_Query(\n  $after: String\n) {\n  me {\n    ...SettingsSavesCategories_me_WGPvJ\n    id\n  }\n}\n\nfragment BidTimerLine_artwork on Artwork {\n  saleArtwork {\n    lotID\n    id\n  }\n  collectorSignals {\n    auction {\n      lotClosesAt\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n}\n\nfragment CategoryRail_category on Gene {\n  ...EntityHeaderGene_gene\n  name\n  href\n  filterArtworks: filterArtworksConnection(first: 10, sort: \"-decayed_merch\") {\n    edges {\n      node {\n        internalID\n        ...ShelfArtwork_artwork\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  collectorSignals {\n    primaryLabel\n    auction {\n      bidCount\n      lotClosesAt\n      liveBiddingStarted\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...PrimaryLabelLine_artwork\n  ...BidTimerLine_artwork\n  ...HoverDetails_artwork\n}\n\nfragment EntityHeaderGene_gene on Gene {\n  internalID\n  href\n  name\n  avatar: image {\n    cropped(width: 45, height: 45, version: [\"big_and_tall\", \"tall\"]) {\n      src\n      srcSet\n    }\n  }\n  filterArtworksConnection(first: 1) {\n    counts {\n      total\n    }\n    id\n  }\n}\n\nfragment ExclusiveAccessBadge_artwork on Artwork {\n  isUnlisted\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n  sale {\n    isOpen\n    id\n  }\n}\n\nfragment PrimaryLabelLine_artwork on Artwork {\n  internalID\n  collectorSignals {\n    primaryLabel\n    partnerOffer {\n      endAt\n      priceWithDiscount {\n        display\n      }\n      id\n    }\n  }\n}\n\nfragment SettingsSavesCategories_me_WGPvJ on Me {\n  followsAndSaves {\n    categoriesConnection: genesConnection(first: 4, after: $after) {\n      totalCount\n      edges {\n        node {\n          internalID\n          category: gene {\n            internalID\n            ...CategoryRail_category\n            id\n          }\n          id\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment ShelfArtwork_artwork on Artwork {\n  ...ExclusiveAccessBadge_artwork\n  ...Metadata_artwork\n  title\n  href\n  artistNames\n  isUnlisted\n  image {\n    src: url(version: [\"larger\", \"large\"])\n    width\n    height\n  }\n}\n"
  }
};
})();

(node as any).hash = "431d98efacf3ba4732d4d271fcb48674";

export default node;
