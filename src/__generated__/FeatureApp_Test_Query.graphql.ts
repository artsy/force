/**
 * @generated SignedSource<<2f1a44c9a9f525c05b406e8ac6d52b38>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FeatureApp_Test_Query$variables = {};
export type FeatureApp_Test_Query$data = {
  readonly feature: {
    readonly " $fragmentSpreads": FragmentRefs<"FeatureApp_feature">;
  } | null;
};
export type FeatureApp_Test_Query = {
  response: FeatureApp_Test_Query$data;
  variables: FeatureApp_Test_Query$variables;
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
v3 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "HTML"
  }
],
v4 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "source",
    "wide"
  ]
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "layout",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": (v3/*: any*/),
  "kind": "ScalarField",
  "name": "description",
  "storageKey": "description(format:\"HTML\")"
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v13 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v15 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v16 = [
  (v2/*: any*/),
  (v9/*: any*/)
],
v17 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "wide"
  ]
},
v18 = [
  (v5/*: any*/),
  (v6/*: any*/),
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
v19 = [
  (v9/*: any*/)
],
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v22 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
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
v25 = [
  "DEFAULT",
  "FULL"
],
v26 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v27 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v28 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v29 = {
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
    "name": "FeatureApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Feature",
        "kind": "LinkedField",
        "name": "feature",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FeatureApp_feature"
          }
        ],
        "storageKey": "feature(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FeatureApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Feature",
        "kind": "LinkedField",
        "name": "feature",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "FeatureMeta",
            "kind": "LinkedField",
            "name": "meta",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "image",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "alias": null,
            "args": (v3/*: any*/),
            "kind": "ScalarField",
            "name": "subheadline",
            "storageKey": "subheadline(format:\"HTML\")"
          },
          {
            "alias": "defaultImage",
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  (v4/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 900
                  }
                ],
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  (v6/*: any*/)
                ],
                "storageKey": "resized(version:[\"main\",\"source\",\"wide\"],width:900)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": "fullImage",
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  (v4/*: any*/)
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:[\"main\",\"source\",\"wide\"])"
              }
            ],
            "storageKey": null
          },
          (v7/*: any*/),
          (v8/*: any*/),
          {
            "alias": null,
            "args": (v3/*: any*/),
            "kind": "ScalarField",
            "name": "callout",
            "storageKey": "callout(format:\"HTML\")"
          },
          {
            "alias": "sets",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 20
              }
            ],
            "concreteType": "OrderedSetConnection",
            "kind": "LinkedField",
            "name": "setsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "OrderedSetEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "OrderedSet",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v9/*: any*/),
                      (v7/*: any*/),
                      (v2/*: any*/),
                      (v8/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "itemType",
                        "storageKey": null
                      },
                      {
                        "alias": "orderedItems",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "first",
                            "value": 99
                          }
                        ],
                        "concreteType": "OrderedSetItemConnection",
                        "kind": "LinkedField",
                        "name": "orderedItemsConnection",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "OrderedSetItemEdge",
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              (v10/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": null,
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  (v10/*: any*/),
                                  {
                                    "kind": "InlineFragment",
                                    "selections": [
                                      (v9/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "internalID",
                                        "storageKey": null
                                      },
                                      (v11/*: any*/),
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
                                        "concreteType": "Image",
                                        "kind": "LinkedField",
                                        "name": "image",
                                        "plural": false,
                                        "selections": [
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
                                            "name": "aspectRatio",
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
                                      (v12/*: any*/),
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
                                          (v9/*: any*/)
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
                                        "args": (v13/*: any*/),
                                        "concreteType": "Artist",
                                        "kind": "LinkedField",
                                        "name": "artists",
                                        "plural": true,
                                        "selections": [
                                          (v9/*: any*/),
                                          (v12/*: any*/),
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
                                        "args": (v13/*: any*/),
                                        "concreteType": "Partner",
                                        "kind": "LinkedField",
                                        "name": "partner",
                                        "plural": false,
                                        "selections": [
                                          (v2/*: any*/),
                                          (v12/*: any*/),
                                          (v9/*: any*/)
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
                                          (v14/*: any*/),
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
                                          (v9/*: any*/),
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
                                          (v14/*: any*/),
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
                                            "selections": (v15/*: any*/),
                                            "storageKey": null
                                          },
                                          {
                                            "alias": "opening_bid",
                                            "args": null,
                                            "concreteType": "SaleArtworkOpeningBid",
                                            "kind": "LinkedField",
                                            "name": "openingBid",
                                            "plural": false,
                                            "selections": (v15/*: any*/),
                                            "storageKey": null
                                          },
                                          (v9/*: any*/)
                                        ],
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
                                        "concreteType": "AttributionClass",
                                        "kind": "LinkedField",
                                        "name": "attributionClass",
                                        "plural": false,
                                        "selections": (v16/*: any*/),
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
                                            "selections": (v16/*: any*/),
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
                                    "type": "Artwork",
                                    "abstractKey": null
                                  },
                                  {
                                    "kind": "InlineFragment",
                                    "selections": [
                                      (v9/*: any*/),
                                      (v12/*: any*/),
                                      (v11/*: any*/),
                                      {
                                        "alias": null,
                                        "args": [
                                          {
                                            "kind": "Literal",
                                            "name": "format",
                                            "value": "PLAIN"
                                          }
                                        ],
                                        "kind": "ScalarField",
                                        "name": "subtitle",
                                        "storageKey": "subtitle(format:\"PLAIN\")"
                                      },
                                      (v8/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Image",
                                        "kind": "LinkedField",
                                        "name": "image",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "alias": "small",
                                            "args": [
                                              {
                                                "kind": "Literal",
                                                "name": "height",
                                                "value": 240
                                              },
                                              (v17/*: any*/),
                                              {
                                                "kind": "Literal",
                                                "name": "width",
                                                "value": 335
                                              }
                                            ],
                                            "concreteType": "CroppedImageUrl",
                                            "kind": "LinkedField",
                                            "name": "cropped",
                                            "plural": false,
                                            "selections": (v18/*: any*/),
                                            "storageKey": "cropped(height:240,version:[\"main\",\"wide\"],width:335)"
                                          },
                                          {
                                            "alias": "medium",
                                            "args": [
                                              {
                                                "kind": "Literal",
                                                "name": "height",
                                                "value": 324
                                              },
                                              (v17/*: any*/),
                                              {
                                                "kind": "Literal",
                                                "name": "width",
                                                "value": 452
                                              }
                                            ],
                                            "concreteType": "CroppedImageUrl",
                                            "kind": "LinkedField",
                                            "name": "cropped",
                                            "plural": false,
                                            "selections": (v18/*: any*/),
                                            "storageKey": "cropped(height:324,version:[\"main\",\"wide\"],width:452)"
                                          },
                                          {
                                            "alias": "large",
                                            "args": [
                                              {
                                                "kind": "Literal",
                                                "name": "height",
                                                "value": 648
                                              },
                                              (v17/*: any*/),
                                              {
                                                "kind": "Literal",
                                                "name": "width",
                                                "value": 904
                                              }
                                            ],
                                            "concreteType": "CroppedImageUrl",
                                            "kind": "LinkedField",
                                            "name": "cropped",
                                            "plural": false,
                                            "selections": (v18/*: any*/),
                                            "storageKey": "cropped(height:648,version:[\"main\",\"wide\"],width:904)"
                                          },
                                          {
                                            "alias": "full",
                                            "args": [
                                              {
                                                "kind": "Literal",
                                                "name": "height",
                                                "value": 777
                                              },
                                              (v17/*: any*/),
                                              {
                                                "kind": "Literal",
                                                "name": "width",
                                                "value": 1085
                                              }
                                            ],
                                            "concreteType": "ResizedImageUrl",
                                            "kind": "LinkedField",
                                            "name": "resized",
                                            "plural": false,
                                            "selections": (v18/*: any*/),
                                            "storageKey": "resized(height:777,version:[\"main\",\"wide\"],width:1085)"
                                          }
                                        ],
                                        "storageKey": null
                                      }
                                    ],
                                    "type": "FeaturedLink",
                                    "abstractKey": null
                                  },
                                  {
                                    "kind": "TypeDiscriminator",
                                    "abstractKey": "__isOrderedSetItem"
                                  },
                                  {
                                    "kind": "InlineFragment",
                                    "selections": (v19/*: any*/),
                                    "type": "Node",
                                    "abstractKey": "__isNode"
                                  },
                                  {
                                    "kind": "InlineFragment",
                                    "selections": (v19/*: any*/),
                                    "type": "Profile",
                                    "abstractKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "orderedItemsConnection(first:99)"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "setsConnection(first:20)"
          },
          (v9/*: any*/)
        ],
        "storageKey": "feature(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "acbd922d0f49b7bda6fa5386cdd88ee7",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "feature": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Feature"
        },
        "feature.callout": (v20/*: any*/),
        "feature.defaultImage": (v21/*: any*/),
        "feature.defaultImage.resized": (v22/*: any*/),
        "feature.defaultImage.resized.src": (v23/*: any*/),
        "feature.defaultImage.resized.srcSet": (v23/*: any*/),
        "feature.description": (v20/*: any*/),
        "feature.fullImage": (v21/*: any*/),
        "feature.fullImage.url": (v20/*: any*/),
        "feature.id": (v24/*: any*/),
        "feature.layout": {
          "enumValues": (v25/*: any*/),
          "nullable": false,
          "plural": false,
          "type": "FeatureLayouts"
        },
        "feature.meta": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "FeatureMeta"
        },
        "feature.meta.description": (v23/*: any*/),
        "feature.meta.image": (v20/*: any*/),
        "feature.meta.name": (v23/*: any*/),
        "feature.name": (v23/*: any*/),
        "feature.sets": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "OrderedSetConnection"
        },
        "feature.sets.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "OrderedSetEdge"
        },
        "feature.sets.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "OrderedSet"
        },
        "feature.sets.edges.node.description": (v20/*: any*/),
        "feature.sets.edges.node.id": (v24/*: any*/),
        "feature.sets.edges.node.itemType": (v20/*: any*/),
        "feature.sets.edges.node.layout": {
          "enumValues": (v25/*: any*/),
          "nullable": false,
          "plural": false,
          "type": "OrderedSetLayouts"
        },
        "feature.sets.edges.node.name": (v20/*: any*/),
        "feature.sets.edges.node.orderedItems": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "OrderedSetItemConnection"
        },
        "feature.sets.edges.node.orderedItems.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "OrderedSetItemEdge"
        },
        "feature.sets.edges.node.orderedItems.edges.__typename": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "OrderedSetItem"
        },
        "feature.sets.edges.node.orderedItems.edges.node.__isNode": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.__isOrderedSetItem": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.__typename": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "feature.sets.edges.node.orderedItems.edges.node.artist.id": (v24/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.artist.targetSupply": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "feature.sets.edges.node.orderedItems.edges.node.artist.targetSupply.isP1": (v26/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.artistNames": (v20/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "feature.sets.edges.node.orderedItems.edges.node.artists.href": (v20/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.artists.id": (v24/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.artists.name": (v20/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "feature.sets.edges.node.orderedItems.edges.node.attributionClass.id": (v24/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.attributionClass.name": (v20/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.collecting_institution": (v20/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.cultural_maker": (v20/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.date": (v20/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.description": (v20/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.href": (v20/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.id": (v24/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image": (v21/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.aspectRatio": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Float"
        },
        "feature.sets.edges.node.orderedItems.edges.node.image.full": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.full.height": (v27/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.full.src": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.full.srcSet": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.full.width": (v27/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.large": (v28/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.large.height": (v29/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.large.src": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.large.srcSet": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.large.width": (v29/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.medium": (v28/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.medium.height": (v29/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.medium.src": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.medium.srcSet": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.medium.width": (v29/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.placeholder": (v20/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.small": (v28/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.small.height": (v29/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.small.src": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.small.srcSet": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.small.width": (v29/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.url": (v20/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.imageTitle": (v20/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.internalID": (v24/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.is_biddable": (v26/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.is_saved": (v26/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "feature.sets.edges.node.orderedItems.edges.node.marketPriceInsights.demandRank": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "feature.sets.edges.node.orderedItems.edges.node.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "feature.sets.edges.node.orderedItems.edges.node.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "feature.sets.edges.node.orderedItems.edges.node.mediumType.filterGene.id": (v24/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.mediumType.filterGene.name": (v20/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "feature.sets.edges.node.orderedItems.edges.node.partner.href": (v20/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.partner.id": (v24/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.partner.name": (v20/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "feature.sets.edges.node.orderedItems.edges.node.sale.cascadingEndTimeIntervalMinutes": (v27/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale.display_timely_at": (v20/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale.endAt": (v20/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale.extendedBiddingIntervalMinutes": (v27/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale.id": (v24/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale.is_auction": (v26/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale.is_closed": (v26/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale.is_preview": (v26/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale.startAt": (v20/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.counts.bidder_positions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.endAt": (v20/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.extendedBiddingEndAt": (v20/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.formattedEndDateTime": (v20/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.highest_bid.display": (v20/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.id": (v24/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.lotID": (v20/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.lotLabel": (v20/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.opening_bid.display": (v20/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale_message": (v20/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.slug": (v24/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.subtitle": (v20/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.title": (v20/*: any*/),
        "feature.slug": (v24/*: any*/),
        "feature.subheadline": (v20/*: any*/)
      }
    },
    "name": "FeatureApp_Test_Query",
    "operationKind": "query",
    "text": "query FeatureApp_Test_Query {\n  feature(id: \"example\") {\n    ...FeatureApp_feature\n    id\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...NewSaveButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment FeatureApp_feature on Feature {\n  ...FeatureMeta_feature\n  ...FeatureHeader_feature\n  description(format: HTML)\n  callout(format: HTML)\n  sets: setsConnection(first: 20) {\n    edges {\n      node {\n        id\n        ...FeatureSet_set\n      }\n    }\n  }\n}\n\nfragment FeatureFeaturedLink_featuredLink on FeaturedLink {\n  href\n  title\n  subtitle(format: PLAIN)\n  description(format: HTML)\n  image {\n    small: cropped(width: 335, height: 240, version: [\"main\", \"wide\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n    medium: cropped(width: 452, height: 324, version: [\"main\", \"wide\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n    large: cropped(width: 904, height: 648, version: [\"main\", \"wide\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n    full: resized(width: 1085, height: 777, version: [\"main\", \"wide\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n}\n\nfragment FeatureHeaderDefault_feature on Feature {\n  name\n  subheadline(format: HTML)\n  defaultImage: image {\n    resized(width: 900, version: [\"main\", \"source\", \"wide\"]) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment FeatureHeaderFull_feature on Feature {\n  name\n  subheadline(format: HTML)\n  fullImage: image {\n    url(version: [\"main\", \"source\", \"wide\"])\n  }\n}\n\nfragment FeatureHeader_feature on Feature {\n  ...FeatureHeaderDefault_feature\n  ...FeatureHeaderFull_feature\n  layout\n}\n\nfragment FeatureMeta_feature on Feature {\n  slug\n  meta {\n    name\n    description\n    image\n  }\n}\n\nfragment FeatureSetContainer_set on OrderedSet {\n  id\n  layout\n  itemType\n  orderedItems: orderedItemsConnection(first: 99) {\n    edges {\n      __typename\n    }\n  }\n}\n\nfragment FeatureSetItem_setItem on OrderedSetItem {\n  __isOrderedSetItem: __typename\n  __typename\n  ... on FeaturedLink {\n    id\n  }\n  ... on Artwork {\n    id\n  }\n  ...GridItem_artwork\n  ...FeatureFeaturedLink_featuredLink\n}\n\nfragment FeatureSetMeta_set on OrderedSet {\n  name\n  description(format: HTML)\n}\n\nfragment FeatureSet_set on OrderedSet {\n  id\n  layout\n  name\n  description(format: HTML)\n  itemType\n  orderedItems: orderedItemsConnection(first: 99) {\n    edges {\n      __typename\n      node {\n        __typename\n        ... on Artwork {\n          id\n        }\n        ... on FeaturedLink {\n          id\n        }\n        ...FeatureSetItem_setItem\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n        ... on Profile {\n          id\n        }\n      }\n    }\n  }\n  ...FeatureSetMeta_set\n  ...FeatureSetContainer_set\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  imageTitle\n  image {\n    placeholder\n    url(version: [\"larger\", \"large\"])\n    aspectRatio\n  }\n  artistNames\n  href\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n}\n\nfragment NewSaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n"
  }
};
})();

(node as any).hash = "8f25895d3707a914e267e965fb4d5a85";

export default node;
