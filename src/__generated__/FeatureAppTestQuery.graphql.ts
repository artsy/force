/**
 * @generated SignedSource<<5fb4f41c896e3edd2053973b3ee3dce5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FeatureAppTestQuery$variables = Record<PropertyKey, never>;
export type FeatureAppTestQuery$data = {
  readonly feature: {
    readonly " $fragmentSpreads": FragmentRefs<"FeatureApp_feature">;
  } | null | undefined;
};
export type FeatureAppTestQuery = {
  response: FeatureAppTestQuery$data;
  variables: FeatureAppTestQuery$variables;
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
  "name": "name",
  "storageKey": null
},
v2 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "HTML"
  }
],
v3 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "source",
    "wide"
  ]
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "layout",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": (v2/*: any*/),
  "kind": "ScalarField",
  "name": "description",
  "storageKey": "description(format:\"HTML\")"
},
v8 = [
  {
    "kind": "Literal",
    "name": "autoPlay",
    "value": true
  }
],
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
  "name": "href",
  "storageKey": null
},
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
  "name": "lotID",
  "storageKey": null
},
v18 = [
  (v1/*: any*/),
  (v9/*: any*/)
],
v19 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "wide"
  ]
},
v20 = [
  (v4/*: any*/),
  (v5/*: any*/),
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
v21 = [
  (v9/*: any*/)
],
v22 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v23 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v24 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
},
v25 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v26 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v27 = [
  "DEFAULT",
  "FULL"
],
v28 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
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
  "type": "CroppedImageUrl"
},
v33 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FeatureAppTestQuery",
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
    "name": "FeatureAppTestQuery",
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
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "FeatureMeta",
            "kind": "LinkedField",
            "name": "meta",
            "plural": false,
            "selections": [
              (v1/*: any*/),
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
          (v1/*: any*/),
          {
            "alias": null,
            "args": (v2/*: any*/),
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
                  (v3/*: any*/),
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
                  (v4/*: any*/),
                  (v5/*: any*/)
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
                  (v3/*: any*/)
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:[\"main\",\"source\",\"wide\"])"
              }
            ],
            "storageKey": null
          },
          (v6/*: any*/),
          (v7/*: any*/),
          {
            "alias": null,
            "args": (v2/*: any*/),
            "kind": "ScalarField",
            "name": "callout",
            "storageKey": "callout(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "FeatureVideo",
            "kind": "LinkedField",
            "name": "video",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v8/*: any*/),
                "kind": "ScalarField",
                "name": "embed",
                "storageKey": "embed(autoPlay:true)"
              },
              {
                "alias": "fallbackEmbed",
                "args": (v8/*: any*/),
                "kind": "ScalarField",
                "name": "embed",
                "storageKey": "embed(autoPlay:true)"
              }
            ],
            "storageKey": null
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
                      (v6/*: any*/),
                      (v1/*: any*/),
                      (v7/*: any*/),
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
                                      (v11/*: any*/),
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
                                          (v11/*: any*/),
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
                                          },
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "versions",
                                            "storageKey": null
                                          }
                                        ],
                                        "storageKey": "image(includeAll:false)"
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "artistNames",
                                        "storageKey": null
                                      },
                                      (v13/*: any*/),
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
                                              (v14/*: any*/),
                                              {
                                                "alias": null,
                                                "args": null,
                                                "concreteType": "Money",
                                                "kind": "LinkedField",
                                                "name": "priceWithDiscount",
                                                "plural": false,
                                                "selections": (v15/*: any*/),
                                                "storageKey": null
                                              },
                                              (v9/*: any*/)
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
                                        "args": (v16/*: any*/),
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
                                        "args": (v16/*: any*/),
                                        "concreteType": "Artist",
                                        "kind": "LinkedField",
                                        "name": "artists",
                                        "plural": true,
                                        "selections": [
                                          (v9/*: any*/),
                                          (v13/*: any*/),
                                          (v1/*: any*/)
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
                                        "args": (v16/*: any*/),
                                        "concreteType": "Partner",
                                        "kind": "LinkedField",
                                        "name": "partner",
                                        "plural": false,
                                        "selections": [
                                          (v1/*: any*/),
                                          (v13/*: any*/),
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
                                          (v17/*: any*/),
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
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "SaleArtwork",
                                        "kind": "LinkedField",
                                        "name": "saleArtwork",
                                        "plural": false,
                                        "selections": [
                                          (v17/*: any*/),
                                          (v9/*: any*/)
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
                                        "selections": (v18/*: any*/),
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
                                            "selections": (v18/*: any*/),
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
                                      }
                                    ],
                                    "type": "Artwork",
                                    "abstractKey": null
                                  },
                                  {
                                    "kind": "InlineFragment",
                                    "selections": [
                                      (v9/*: any*/),
                                      (v13/*: any*/),
                                      (v12/*: any*/),
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
                                      (v7/*: any*/),
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
                                                "value": 480
                                              },
                                              (v19/*: any*/),
                                              {
                                                "kind": "Literal",
                                                "name": "width",
                                                "value": 670
                                              }
                                            ],
                                            "concreteType": "CroppedImageUrl",
                                            "kind": "LinkedField",
                                            "name": "cropped",
                                            "plural": false,
                                            "selections": (v20/*: any*/),
                                            "storageKey": "cropped(height:480,version:[\"main\",\"wide\"],width:670)"
                                          },
                                          {
                                            "alias": "medium",
                                            "args": [
                                              {
                                                "kind": "Literal",
                                                "name": "height",
                                                "value": 648
                                              },
                                              (v19/*: any*/),
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
                                            "selections": (v20/*: any*/),
                                            "storageKey": "cropped(height:648,version:[\"main\",\"wide\"],width:904)"
                                          },
                                          {
                                            "alias": "large",
                                            "args": [
                                              {
                                                "kind": "Literal",
                                                "name": "height",
                                                "value": 1296
                                              },
                                              (v19/*: any*/),
                                              {
                                                "kind": "Literal",
                                                "name": "width",
                                                "value": 1808
                                              }
                                            ],
                                            "concreteType": "CroppedImageUrl",
                                            "kind": "LinkedField",
                                            "name": "cropped",
                                            "plural": false,
                                            "selections": (v20/*: any*/),
                                            "storageKey": "cropped(height:1296,version:[\"main\",\"wide\"],width:1808)"
                                          },
                                          {
                                            "alias": "full",
                                            "args": [
                                              {
                                                "kind": "Literal",
                                                "name": "height",
                                                "value": 1554
                                              },
                                              (v19/*: any*/),
                                              {
                                                "kind": "Literal",
                                                "name": "width",
                                                "value": 2170
                                              }
                                            ],
                                            "concreteType": "ResizedImageUrl",
                                            "kind": "LinkedField",
                                            "name": "resized",
                                            "plural": false,
                                            "selections": (v20/*: any*/),
                                            "storageKey": "resized(height:1554,version:[\"main\",\"wide\"],width:2170)"
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
                                    "selections": (v21/*: any*/),
                                    "type": "Node",
                                    "abstractKey": "__isNode"
                                  },
                                  {
                                    "kind": "InlineFragment",
                                    "selections": (v21/*: any*/),
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
    "cacheID": "e95565bb0f009efa15c68b2ab3c862de",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "feature": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Feature"
        },
        "feature.callout": (v22/*: any*/),
        "feature.defaultImage": (v23/*: any*/),
        "feature.defaultImage.resized": (v24/*: any*/),
        "feature.defaultImage.resized.src": (v25/*: any*/),
        "feature.defaultImage.resized.srcSet": (v25/*: any*/),
        "feature.description": (v22/*: any*/),
        "feature.fullImage": (v23/*: any*/),
        "feature.fullImage.url": (v22/*: any*/),
        "feature.id": (v26/*: any*/),
        "feature.layout": {
          "enumValues": (v27/*: any*/),
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
        "feature.meta.description": (v25/*: any*/),
        "feature.meta.image": (v22/*: any*/),
        "feature.meta.name": (v25/*: any*/),
        "feature.name": (v25/*: any*/),
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
        "feature.sets.edges.node.description": (v22/*: any*/),
        "feature.sets.edges.node.id": (v26/*: any*/),
        "feature.sets.edges.node.itemType": (v22/*: any*/),
        "feature.sets.edges.node.layout": {
          "enumValues": (v27/*: any*/),
          "nullable": false,
          "plural": false,
          "type": "OrderedSetLayouts"
        },
        "feature.sets.edges.node.name": (v22/*: any*/),
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
        "feature.sets.edges.node.orderedItems.edges.__typename": (v25/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "OrderedSetItem"
        },
        "feature.sets.edges.node.orderedItems.edges.node.__isNode": (v25/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.__isOrderedSetItem": (v25/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.__typename": (v25/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "feature.sets.edges.node.orderedItems.edges.node.artist.id": (v26/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.artist.targetSupply": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "feature.sets.edges.node.orderedItems.edges.node.artist.targetSupply.isP1": (v28/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.artistNames": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "feature.sets.edges.node.orderedItems.edges.node.artists.href": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.artists.id": (v26/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.artists.name": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "feature.sets.edges.node.orderedItems.edges.node.attributionClass.id": (v26/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.attributionClass.name": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.collecting_institution": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.collectorSignals": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CollectorSignals"
        },
        "feature.sets.edges.node.orderedItems.edges.node.collectorSignals.auction": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionCollectorSignals"
        },
        "feature.sets.edges.node.orderedItems.edges.node.collectorSignals.auction.bidCount": (v29/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.collectorSignals.auction.liveBiddingStarted": (v30/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.collectorSignals.auction.lotClosesAt": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.collectorSignals.auction.onlineBiddingExtended": (v30/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.collectorSignals.auction.registrationEndsAt": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.collectorSignals.partnerOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollector"
        },
        "feature.sets.edges.node.orderedItems.edges.node.collectorSignals.partnerOffer.endAt": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.collectorSignals.partnerOffer.id": (v26/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.collectorSignals.partnerOffer.priceWithDiscount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "feature.sets.edges.node.orderedItems.edges.node.collectorSignals.partnerOffer.priceWithDiscount.display": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.collectorSignals.primaryLabel": {
          "enumValues": [
            "CURATORS_PICK",
            "INCREASED_INTEREST",
            "PARTNER_OFFER"
          ],
          "nullable": true,
          "plural": false,
          "type": "LabelSignalEnum"
        },
        "feature.sets.edges.node.orderedItems.edges.node.cultural_maker": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.date": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.description": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.href": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.id": (v26/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.aspectRatio": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Float"
        },
        "feature.sets.edges.node.orderedItems.edges.node.image.full": (v24/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.full.height": (v31/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.full.src": (v25/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.full.srcSet": (v25/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.full.width": (v31/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.internalID": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ID"
        },
        "feature.sets.edges.node.orderedItems.edges.node.image.large": (v32/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.large.height": (v29/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.large.src": (v25/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.large.srcSet": (v25/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.large.width": (v29/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.medium": (v32/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.medium.height": (v29/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.medium.src": (v25/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.medium.srcSet": (v25/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.medium.width": (v29/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.placeholder": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.small": (v32/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.small.height": (v29/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.small.src": (v25/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.small.srcSet": (v25/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.small.width": (v29/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.url": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.versions": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "String"
        },
        "feature.sets.edges.node.orderedItems.edges.node.imageTitle": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.internalID": (v26/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.isUnlisted": (v30/*: any*/),
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
        "feature.sets.edges.node.orderedItems.edges.node.mediumType.filterGene.id": (v26/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.mediumType.filterGene.name": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "feature.sets.edges.node.orderedItems.edges.node.partner.href": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.partner.id": (v26/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.partner.name": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "feature.sets.edges.node.orderedItems.edges.node.sale.cascadingEndTimeIntervalMinutes": (v31/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale.endAt": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale.extendedBiddingIntervalMinutes": (v31/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale.id": (v26/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale.isOpen": (v28/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale.is_auction": (v28/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale.is_closed": (v28/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale.startAt": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.saleArtwork": (v33/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.saleArtwork.id": (v26/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.saleArtwork.lotID": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork": (v33/*: any*/),
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
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.endAt": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.extendedBiddingEndAt": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.formattedEndDateTime": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.highest_bid.display": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.id": (v26/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.lotID": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.lotLabel": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.opening_bid.display": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale_message": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.subtitle": (v22/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.title": (v22/*: any*/),
        "feature.slug": (v26/*: any*/),
        "feature.subheadline": (v22/*: any*/),
        "feature.video": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FeatureVideo"
        },
        "feature.video.embed": (v22/*: any*/),
        "feature.video.fallbackEmbed": (v22/*: any*/)
      }
    },
    "name": "FeatureAppTestQuery",
    "operationKind": "query",
    "text": "query FeatureAppTestQuery {\n  feature(id: \"example\") {\n    ...FeatureApp_feature\n    id\n  }\n}\n\nfragment BidTimerLine_artwork on Artwork {\n  saleArtwork {\n    lotID\n    id\n  }\n  collectorSignals {\n    auction {\n      lotClosesAt\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  collectorSignals {\n    primaryLabel\n    auction {\n      bidCount\n      lotClosesAt\n      liveBiddingStarted\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...PrimaryLabelLine_artwork\n  ...BidTimerLine_artwork\n  ...HoverDetails_artwork\n}\n\nfragment ExclusiveAccessBadge_artwork on Artwork {\n  isUnlisted\n}\n\nfragment FeatureApp_feature on Feature {\n  ...FeatureMeta_feature\n  ...FeatureHeader_feature\n  description(format: HTML)\n  callout(format: HTML)\n  video {\n    ...FeatureVideo_video\n  }\n  sets: setsConnection(first: 20) {\n    edges {\n      node {\n        id\n        ...FeatureSet_set\n      }\n    }\n  }\n}\n\nfragment FeatureFeaturedLink_featuredLink on FeaturedLink {\n  href\n  title\n  subtitle(format: PLAIN)\n  description(format: HTML)\n  image {\n    small: cropped(width: 670, height: 480, version: [\"main\", \"wide\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n    medium: cropped(width: 904, height: 648, version: [\"main\", \"wide\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n    large: cropped(width: 1808, height: 1296, version: [\"main\", \"wide\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n    full: resized(width: 2170, height: 1554, version: [\"main\", \"wide\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n}\n\nfragment FeatureHeaderDefault_feature on Feature {\n  name\n  subheadline(format: HTML)\n  defaultImage: image {\n    resized(width: 900, version: [\"main\", \"source\", \"wide\"]) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment FeatureHeaderFull_feature on Feature {\n  name\n  subheadline(format: HTML)\n  fullImage: image {\n    url(version: [\"main\", \"source\", \"wide\"])\n  }\n}\n\nfragment FeatureHeader_feature on Feature {\n  ...FeatureHeaderDefault_feature\n  ...FeatureHeaderFull_feature\n  layout\n}\n\nfragment FeatureMeta_feature on Feature {\n  slug\n  meta {\n    name\n    description\n    image\n  }\n}\n\nfragment FeatureSetContainer_set on OrderedSet {\n  id\n  layout\n  itemType\n  orderedItems: orderedItemsConnection(first: 99) {\n    edges {\n      __typename\n    }\n  }\n}\n\nfragment FeatureSetItem_setItem on OrderedSetItem {\n  __isOrderedSetItem: __typename\n  __typename\n  ... on FeaturedLink {\n    id\n  }\n  ... on Artwork {\n    id\n  }\n  ...GridItem_artwork\n  ...FeatureFeaturedLink_featuredLink\n}\n\nfragment FeatureSetMeta_set on OrderedSet {\n  name\n  description(format: HTML)\n}\n\nfragment FeatureSet_set on OrderedSet {\n  id\n  layout\n  name\n  description(format: HTML)\n  itemType\n  orderedItems: orderedItemsConnection(first: 99) {\n    edges {\n      __typename\n      node {\n        __typename\n        ... on Artwork {\n          id\n        }\n        ... on FeaturedLink {\n          id\n        }\n        ...FeatureSetItem_setItem\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n        ... on Profile {\n          id\n        }\n      }\n    }\n  }\n  ...FeatureSetMeta_set\n  ...FeatureSetContainer_set\n}\n\nfragment FeatureVideo_video on FeatureVideo {\n  embed(autoPlay: true)\n  fallbackEmbed: embed(autoPlay: true)\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  imageTitle\n  image(includeAll: false) {\n    internalID\n    placeholder\n    url(version: [\"larger\", \"large\"])\n    aspectRatio\n    versions\n  }\n  artistNames\n  href\n  ...Metadata_artwork\n  ...ExclusiveAccessBadge_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n  sale {\n    isOpen\n    id\n  }\n}\n\nfragment PrimaryLabelLine_artwork on Artwork {\n  internalID\n  collectorSignals {\n    primaryLabel\n    partnerOffer {\n      endAt\n      priceWithDiscount {\n        display\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "fb3ece34c68d392d3f749019c45c7c32";

export default node;
