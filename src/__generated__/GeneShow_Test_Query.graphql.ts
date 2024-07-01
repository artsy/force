/**
 * @generated SignedSource<<ef16b989607f52b7cd3a5e359083da94>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GeneShow_Test_Query$variables = Record<PropertyKey, never>;
export type GeneShow_Test_Query$data = {
  readonly gene: {
    readonly " $fragmentSpreads": FragmentRefs<"GeneShow_gene">;
  } | null | undefined;
};
export type GeneShow_Test_Query = {
  response: GeneShow_Test_Query$data;
  variables: GeneShow_Test_Query$variables;
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
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
  "name": "slug",
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
  "name": "cursor",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v9 = [
  (v7/*: any*/),
  (v8/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v10 = [
  (v6/*: any*/)
],
v11 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "larger",
    "large"
  ]
},
v12 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotID",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "extendedBiddingEndAt",
  "storageKey": null
},
v16 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v17 = [
  (v1/*: any*/),
  (v6/*: any*/)
],
v18 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v19 = [
  (v5/*: any*/),
  (v1/*: any*/),
  (v2/*: any*/),
  (v6/*: any*/)
],
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Gene"
},
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artist"
},
v22 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v23 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v24 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FilterArtworksConnection"
},
v25 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v26 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v27 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v28 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v29 = {
  "enumValues": null,
  "nullable": true,
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
  "type": "SaleArtwork"
},
v32 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
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
    "name": "GeneShow_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Gene",
        "kind": "LinkedField",
        "name": "gene",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "GeneShow_gene"
          }
        ],
        "storageKey": "gene(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "GeneShow_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Gene",
        "kind": "LinkedField",
        "name": "gene",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "displayName",
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "GeneMeta",
            "kind": "LinkedField",
            "name": "meta",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
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
                    "name": "height",
                    "value": 630
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 1200
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": [
                  (v3/*: any*/)
                ],
                "storageKey": "cropped(height:630,width:1200)"
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": "sidebar",
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
                "concreteType": "ArtworksAggregationResults",
                "kind": "LinkedField",
                "name": "aggregations",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "slice",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AggregationCount",
                    "kind": "LinkedField",
                    "name": "counts",
                    "plural": true,
                    "selections": [
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "value",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "count",
                        "storageKey": null
                      }
                    ],
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
              (v6/*: any*/),
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
                    "selections": (v9/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "first",
                    "plural": false,
                    "selections": (v9/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "last",
                    "plural": false,
                    "selections": (v9/*: any*/),
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
                      (v7/*: any*/),
                      (v8/*: any*/)
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
                    "selections": (v10/*: any*/),
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
                          (v4/*: any*/),
                          (v2/*: any*/),
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
                                  (v11/*: any*/)
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
                                  (v11/*: any*/),
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
                                  (v3/*: any*/),
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
                            "args": (v12/*: any*/),
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
                            "args": (v12/*: any*/),
                            "concreteType": "Artist",
                            "kind": "LinkedField",
                            "name": "artists",
                            "plural": true,
                            "selections": [
                              (v6/*: any*/),
                              (v2/*: any*/),
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
                            "args": (v12/*: any*/),
                            "concreteType": "Partner",
                            "kind": "LinkedField",
                            "name": "partner",
                            "plural": false,
                            "selections": [
                              (v1/*: any*/),
                              (v2/*: any*/),
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
                              (v6/*: any*/),
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
                              (v14/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "lotLabel",
                                "storageKey": null
                              },
                              (v13/*: any*/),
                              (v15/*: any*/),
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
                                "selections": (v16/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": "opening_bid",
                                "args": null,
                                "concreteType": "SaleArtworkOpeningBid",
                                "kind": "LinkedField",
                                "name": "openingBid",
                                "plural": false,
                                "selections": (v16/*: any*/),
                                "storageKey": null
                              },
                              (v6/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isSaved",
                            "storageKey": null
                          },
                          {
                            "alias": "preview",
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
                                    "name": "version",
                                    "value": "square"
                                  }
                                ],
                                "kind": "ScalarField",
                                "name": "url",
                                "storageKey": "url(version:\"square\")"
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isSavedToList",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "AttributionClass",
                            "kind": "LinkedField",
                            "name": "attributionClass",
                            "plural": false,
                            "selections": (v17/*: any*/),
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
                                "selections": (v17/*: any*/),
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
                            "alias": "is_biddable",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isBiddable",
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
                              (v15/*: any*/),
                              (v14/*: any*/),
                              (v6/*: any*/)
                            ],
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
                        "selections": (v10/*: any*/),
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
          {
            "alias": "formattedDescription",
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "HTML"
              }
            ],
            "kind": "ScalarField",
            "name": "description",
            "storageKey": "description(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": (v18/*: any*/),
            "concreteType": "GeneConnection",
            "kind": "LinkedField",
            "name": "similar",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GeneEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Gene",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": (v19/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "similar(first:10)"
          },
          {
            "alias": null,
            "args": (v18/*: any*/),
            "concreteType": "ArtistConnection",
            "kind": "LinkedField",
            "name": "artistsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtistEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artist",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": (v19/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "artistsConnection(first:10)"
          },
          (v6/*: any*/)
        ],
        "storageKey": "gene(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "b0f51ebd9bd54c89947c33a9625dd328",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "gene": (v20/*: any*/),
        "gene.artistsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistConnection"
        },
        "gene.artistsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtistEdge"
        },
        "gene.artistsConnection.edges.node": (v21/*: any*/),
        "gene.artistsConnection.edges.node.href": (v22/*: any*/),
        "gene.artistsConnection.edges.node.id": (v23/*: any*/),
        "gene.artistsConnection.edges.node.internalID": (v23/*: any*/),
        "gene.artistsConnection.edges.node.name": (v22/*: any*/),
        "gene.displayName": (v22/*: any*/),
        "gene.filtered_artworks": (v24/*: any*/),
        "gene.filtered_artworks.__isArtworkConnectionInterface": (v25/*: any*/),
        "gene.filtered_artworks.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FilterArtworksCounts"
        },
        "gene.filtered_artworks.counts.total": (v26/*: any*/),
        "gene.filtered_artworks.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworkEdgeInterface"
        },
        "gene.filtered_artworks.edges.__isNode": (v25/*: any*/),
        "gene.filtered_artworks.edges.__typename": (v25/*: any*/),
        "gene.filtered_artworks.edges.id": (v23/*: any*/),
        "gene.filtered_artworks.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "gene.filtered_artworks.edges.node.artist": (v21/*: any*/),
        "gene.filtered_artworks.edges.node.artist.id": (v23/*: any*/),
        "gene.filtered_artworks.edges.node.artist.targetSupply": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "gene.filtered_artworks.edges.node.artist.targetSupply.isP1": (v27/*: any*/),
        "gene.filtered_artworks.edges.node.artistNames": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "gene.filtered_artworks.edges.node.artists.href": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.artists.id": (v23/*: any*/),
        "gene.filtered_artworks.edges.node.artists.name": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "gene.filtered_artworks.edges.node.attributionClass.id": (v23/*: any*/),
        "gene.filtered_artworks.edges.node.attributionClass.name": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.collecting_institution": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.cultural_maker": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.date": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.href": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.id": (v23/*: any*/),
        "gene.filtered_artworks.edges.node.image": (v28/*: any*/),
        "gene.filtered_artworks.edges.node.image.aspectRatio": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Float"
        },
        "gene.filtered_artworks.edges.node.image.blurhashDataURL": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.image.internalID": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ID"
        },
        "gene.filtered_artworks.edges.node.image.placeholder": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "gene.filtered_artworks.edges.node.image.resized.height": (v29/*: any*/),
        "gene.filtered_artworks.edges.node.image.resized.src": (v25/*: any*/),
        "gene.filtered_artworks.edges.node.image.resized.srcSet": (v25/*: any*/),
        "gene.filtered_artworks.edges.node.image.resized.width": (v29/*: any*/),
        "gene.filtered_artworks.edges.node.image.url": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.image.versions": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "String"
        },
        "gene.filtered_artworks.edges.node.imageTitle": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.image_title": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.internalID": (v23/*: any*/),
        "gene.filtered_artworks.edges.node.isSaved": (v27/*: any*/),
        "gene.filtered_artworks.edges.node.isSavedToList": (v30/*: any*/),
        "gene.filtered_artworks.edges.node.isUnlisted": (v30/*: any*/),
        "gene.filtered_artworks.edges.node.is_biddable": (v27/*: any*/),
        "gene.filtered_artworks.edges.node.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "gene.filtered_artworks.edges.node.marketPriceInsights.demandRank": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "gene.filtered_artworks.edges.node.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "gene.filtered_artworks.edges.node.mediumType.filterGene": (v20/*: any*/),
        "gene.filtered_artworks.edges.node.mediumType.filterGene.id": (v23/*: any*/),
        "gene.filtered_artworks.edges.node.mediumType.filterGene.name": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "gene.filtered_artworks.edges.node.partner.href": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.partner.id": (v23/*: any*/),
        "gene.filtered_artworks.edges.node.partner.name": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.preview": (v28/*: any*/),
        "gene.filtered_artworks.edges.node.preview.url": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "gene.filtered_artworks.edges.node.sale.cascadingEndTimeIntervalMinutes": (v29/*: any*/),
        "gene.filtered_artworks.edges.node.sale.display_timely_at": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.sale.endAt": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.sale.extendedBiddingIntervalMinutes": (v29/*: any*/),
        "gene.filtered_artworks.edges.node.sale.extendedBiddingPeriodMinutes": (v29/*: any*/),
        "gene.filtered_artworks.edges.node.sale.id": (v23/*: any*/),
        "gene.filtered_artworks.edges.node.sale.is_auction": (v27/*: any*/),
        "gene.filtered_artworks.edges.node.sale.is_closed": (v27/*: any*/),
        "gene.filtered_artworks.edges.node.sale.is_preview": (v27/*: any*/),
        "gene.filtered_artworks.edges.node.sale.startAt": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.saleArtwork": (v31/*: any*/),
        "gene.filtered_artworks.edges.node.saleArtwork.endAt": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.saleArtwork.extendedBiddingEndAt": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.saleArtwork.id": (v23/*: any*/),
        "gene.filtered_artworks.edges.node.saleArtwork.lotID": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.sale_artwork": (v31/*: any*/),
        "gene.filtered_artworks.edges.node.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "gene.filtered_artworks.edges.node.sale_artwork.counts.bidder_positions": (v26/*: any*/),
        "gene.filtered_artworks.edges.node.sale_artwork.endAt": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.sale_artwork.extendedBiddingEndAt": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.sale_artwork.formattedEndDateTime": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "gene.filtered_artworks.edges.node.sale_artwork.highest_bid.display": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.sale_artwork.id": (v23/*: any*/),
        "gene.filtered_artworks.edges.node.sale_artwork.lotID": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.sale_artwork.lotLabel": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "gene.filtered_artworks.edges.node.sale_artwork.opening_bid.display": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.sale_message": (v22/*: any*/),
        "gene.filtered_artworks.edges.node.slug": (v23/*: any*/),
        "gene.filtered_artworks.edges.node.title": (v22/*: any*/),
        "gene.filtered_artworks.id": (v23/*: any*/),
        "gene.filtered_artworks.pageCursors": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageCursors"
        },
        "gene.filtered_artworks.pageCursors.around": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "PageCursor"
        },
        "gene.filtered_artworks.pageCursors.around.cursor": (v25/*: any*/),
        "gene.filtered_artworks.pageCursors.around.isCurrent": (v30/*: any*/),
        "gene.filtered_artworks.pageCursors.around.page": (v32/*: any*/),
        "gene.filtered_artworks.pageCursors.first": (v33/*: any*/),
        "gene.filtered_artworks.pageCursors.first.cursor": (v25/*: any*/),
        "gene.filtered_artworks.pageCursors.first.isCurrent": (v30/*: any*/),
        "gene.filtered_artworks.pageCursors.first.page": (v32/*: any*/),
        "gene.filtered_artworks.pageCursors.last": (v33/*: any*/),
        "gene.filtered_artworks.pageCursors.last.cursor": (v25/*: any*/),
        "gene.filtered_artworks.pageCursors.last.isCurrent": (v30/*: any*/),
        "gene.filtered_artworks.pageCursors.last.page": (v32/*: any*/),
        "gene.filtered_artworks.pageCursors.previous": (v33/*: any*/),
        "gene.filtered_artworks.pageCursors.previous.cursor": (v25/*: any*/),
        "gene.filtered_artworks.pageCursors.previous.page": (v32/*: any*/),
        "gene.filtered_artworks.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "gene.filtered_artworks.pageInfo.endCursor": (v22/*: any*/),
        "gene.filtered_artworks.pageInfo.hasNextPage": (v30/*: any*/),
        "gene.formattedDescription": (v22/*: any*/),
        "gene.href": (v22/*: any*/),
        "gene.id": (v23/*: any*/),
        "gene.image": (v28/*: any*/),
        "gene.image.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "gene.image.cropped.src": (v25/*: any*/),
        "gene.internalID": (v23/*: any*/),
        "gene.meta": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "GeneMeta"
        },
        "gene.meta.description": (v25/*: any*/),
        "gene.name": (v22/*: any*/),
        "gene.sidebar": (v24/*: any*/),
        "gene.sidebar.aggregations": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworksAggregationResults"
        },
        "gene.sidebar.aggregations.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "AggregationCount"
        },
        "gene.sidebar.aggregations.counts.count": (v32/*: any*/),
        "gene.sidebar.aggregations.counts.name": (v25/*: any*/),
        "gene.sidebar.aggregations.counts.value": (v25/*: any*/),
        "gene.sidebar.aggregations.slice": {
          "enumValues": [
            "ARTIST",
            "ARTIST_NATIONALITY",
            "ARTIST_SERIES",
            "ATTRIBUTION_CLASS",
            "COLOR",
            "DIMENSION_RANGE",
            "FOLLOWED_ARTISTS",
            "GALLERY",
            "INSTITUTION",
            "LOCATION_CITY",
            "MAJOR_PERIOD",
            "MATERIALS_TERMS",
            "MEDIUM",
            "MERCHANDISABLE_ARTISTS",
            "PARTNER",
            "PARTNER_CITY",
            "PERIOD",
            "PRICE_RANGE",
            "SIMPLE_PRICE_HISTOGRAM",
            "TOTAL"
          ],
          "nullable": true,
          "plural": false,
          "type": "ArtworkAggregation"
        },
        "gene.sidebar.id": (v23/*: any*/),
        "gene.similar": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "GeneConnection"
        },
        "gene.similar.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "GeneEdge"
        },
        "gene.similar.edges.node": (v20/*: any*/),
        "gene.similar.edges.node.href": (v22/*: any*/),
        "gene.similar.edges.node.id": (v23/*: any*/),
        "gene.similar.edges.node.internalID": (v23/*: any*/),
        "gene.similar.edges.node.name": (v22/*: any*/),
        "gene.slug": (v23/*: any*/)
      }
    },
    "name": "GeneShow_Test_Query",
    "operationKind": "query",
    "text": "query GeneShow_Test_Query {\n  gene(id: \"example\") {\n    ...GeneShow_gene\n    id\n  }\n}\n\nfragment ArtworkFilterArtworkGrid_filtered_artworks on FilterArtworksConnection {\n  id\n  pageInfo {\n    hasNextPage\n    endCursor\n  }\n  pageCursors {\n    ...Pagination_pageCursors\n  }\n  edges {\n    node {\n      id\n    }\n  }\n  ...ArtworkGrid_artworks_3QDGWC\n}\n\nfragment ArtworkGrid_artworks_3QDGWC on ArtworkConnectionInterface {\n  __isArtworkConnectionInterface: __typename\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      internalID\n      image(includeAll: false) {\n        aspectRatio\n      }\n      ...GridItem_artwork_3QDGWC\n      ...FlatGridItem_artwork_3QDGWC\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment DeprecatedSaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  isSaved\n  title\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...SaveButton_artwork\n  ...SaveArtworkToListsButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment ExclusiveAccessBadge_artwork on Artwork {\n  isUnlisted\n}\n\nfragment FlatGridItem_artwork_3QDGWC on Artwork {\n  ...Metadata_artwork\n  ...DeprecatedSaveButton_artwork\n  sale {\n    extendedBiddingPeriodMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    id\n  }\n  saleArtwork {\n    endAt\n    extendedBiddingEndAt\n    lotID\n    id\n  }\n  internalID\n  title\n  image_title: imageTitle\n  image(includeAll: false) {\n    resized(width: 445, version: [\"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n    blurhashDataURL\n  }\n  artistNames\n  href\n  isSaved\n}\n\nfragment GeneArtworkFilter_gene_2NZCvC on Gene {\n  slug\n  internalID\n  sidebar: filterArtworksConnection(first: 1) {\n    aggregations {\n      slice\n      counts {\n        name\n        value\n        count\n      }\n    }\n    id\n  }\n  filtered_artworks: filterArtworksConnection(first: 30) {\n    id\n    counts {\n      total(format: \"0,0\")\n    }\n    ...ArtworkFilterArtworkGrid_filtered_artworks\n  }\n}\n\nfragment GeneMeta_gene on Gene {\n  name\n  displayName\n  href\n  meta {\n    description\n  }\n  image {\n    cropped(width: 1200, height: 630) {\n      src\n    }\n  }\n}\n\nfragment GeneShow_gene on Gene {\n  ...GeneMeta_gene\n  ...GeneArtworkFilter_gene_2NZCvC\n  internalID\n  name\n  displayName\n  formattedDescription: description(format: HTML)\n  similar(first: 10) {\n    edges {\n      node {\n        internalID\n        name\n        href\n        id\n      }\n    }\n  }\n  artistsConnection(first: 10) {\n    edges {\n      node {\n        internalID\n        name\n        href\n        id\n      }\n    }\n  }\n}\n\nfragment GridItem_artwork_3QDGWC on Artwork {\n  internalID\n  title\n  imageTitle\n  image(includeAll: false) {\n    internalID\n    placeholder\n    url(version: [\"larger\", \"large\"])\n    aspectRatio\n    versions\n    blurhashDataURL\n  }\n  artistNames\n  href\n  ...Metadata_artwork\n  ...ExclusiveAccessBadge_artwork\n  ...Badge_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment SaveArtworkToListsButton_artwork on Artwork {\n  id\n  internalID\n  isSaved\n  slug\n  title\n  date\n  artistNames\n  preview: image {\n    url(version: \"square\")\n  }\n  isSavedToList\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  isSaved\n  title\n}\n"
  }
};
})();

(node as any).hash = "a133b56c5a96885afe9f9b6effd89a28";

export default node;
