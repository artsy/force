/**
 * @generated SignedSource<<36837463af118e42c978b9d659dbc698>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionResultTestQuery$variables = Record<PropertyKey, never>;
export type AuctionResultTestQuery$data = {
  readonly auctionResult: {
    readonly " $fragmentSpreads": FragmentRefs<"AuctionResult_auctionResult">;
  } | null | undefined;
};
export type AuctionResultTestQuery = {
  response: AuctionResultTestQuery$data;
  variables: AuctionResultTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "foo-bar"
  }
],
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
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "version",
      "value": "x-large"
    }
  ],
  "kind": "ScalarField",
  "name": "url",
  "storageKey": "url(version:\"x-large\")"
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "aspectRatio",
  "storageKey": null
},
v5 = [
  (v3/*: any*/),
  (v4/*: any*/)
],
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
  "name": "title",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "organization",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mediumText",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "saleDate",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "boughtIn",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currency",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "concreteType": "AuctionLotPerformance",
  "kind": "LinkedField",
  "name": "performance",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mid",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "concreteType": "AuctionLotEstimate",
  "kind": "LinkedField",
  "name": "estimate",
  "plural": false,
  "selections": [
    (v17/*: any*/)
  ],
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "location",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotNumber",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "saleTitle",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isUpcoming",
  "storageKey": null
},
v24 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResult"
},
v25 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artist"
},
v26 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
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
  "nullable": true,
  "plural": false,
  "type": "String"
},
v30 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v31 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v32 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionLotEstimate"
},
v33 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionLotImages"
},
v34 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v35 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionLotPerformance"
},
v36 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResultPriceRealized"
},
v37 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AuctionResultTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "AuctionResult",
        "kind": "LinkedField",
        "name": "auctionResult",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AuctionResult_auctionResult"
          }
        ],
        "storageKey": "auctionResult(id:\"foo-bar\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AuctionResultTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "AuctionResult",
        "kind": "LinkedField",
        "name": "auctionResult",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "href",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Artwork",
                "kind": "LinkedField",
                "name": "coverArtwork",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Image",
                    "kind": "LinkedField",
                    "name": "image",
                    "plural": false,
                    "selections": (v5/*: any*/),
                    "storageKey": null
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
                "name": "isPersonalArtist",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "slug",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v7/*: any*/),
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 6
              }
            ],
            "concreteType": "AuctionResultConnection",
            "kind": "LinkedField",
            "name": "comparableAuctionResults",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "AuctionResultEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AuctionResult",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v7/*: any*/),
                      {
                        "alias": "dimension_text",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "dimensionText",
                        "storageKey": null
                      },
                      (v8/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artist",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v6/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "AuctionLotImages",
                        "kind": "LinkedField",
                        "name": "images",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Image",
                            "kind": "LinkedField",
                            "name": "larger",
                            "plural": false,
                            "selections": (v5/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Image",
                            "kind": "LinkedField",
                            "name": "thumbnail",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "height",
                                    "value": 130
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "version",
                                    "value": [
                                      "square140"
                                    ]
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 130
                                  }
                                ],
                                "concreteType": "CroppedImageUrl",
                                "kind": "LinkedField",
                                "name": "cropped",
                                "plural": false,
                                "selections": [
                                  (v9/*: any*/),
                                  (v10/*: any*/),
                                  (v11/*: any*/),
                                  (v12/*: any*/)
                                ],
                                "storageKey": "cropped(height:130,version:[\"square140\"],width:130)"
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v13/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "categoryText",
                        "storageKey": null
                      },
                      {
                        "alias": "date_text",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "dateText",
                        "storageKey": null
                      },
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/),
                      {
                        "alias": "price_realized",
                        "args": null,
                        "concreteType": "AuctionResultPriceRealized",
                        "kind": "LinkedField",
                        "name": "priceRealized",
                        "plural": false,
                        "selections": [
                          (v17/*: any*/),
                          {
                            "alias": "display_usd",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "displayUSD",
                            "storageKey": null
                          },
                          {
                            "alias": "cents_usd",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "centsUSD",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v18/*: any*/),
                      (v19/*: any*/),
                      (v20/*: any*/),
                      (v21/*: any*/),
                      (v22/*: any*/),
                      (v23/*: any*/),
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "comparableAuctionResults(first:6)"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AuctionLotImages",
            "kind": "LinkedField",
            "name": "images",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "larger",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 400
                      },
                      {
                        "kind": "Literal",
                        "name": "version",
                        "value": "larger"
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 400
                      }
                    ],
                    "concreteType": "ResizedImageUrl",
                    "kind": "LinkedField",
                    "name": "resized",
                    "plural": false,
                    "selections": [
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v12/*: any*/),
                      (v11/*: any*/)
                    ],
                    "storageKey": "resized(height:400,version:\"larger\",width:400)"
                  },
                  (v3/*: any*/),
                  (v4/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v13/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "dimensionText",
            "storageKey": null
          },
          {
            "alias": "formattedSaleDate",
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "MMM DD, YYYY"
              }
            ],
            "kind": "ScalarField",
            "name": "saleDate",
            "storageKey": "saleDate(format:\"MMM DD, YYYY\")"
          },
          (v8/*: any*/),
          (v20/*: any*/),
          (v22/*: any*/),
          (v21/*: any*/),
          (v19/*: any*/),
          (v23/*: any*/),
          (v14/*: any*/),
          (v16/*: any*/),
          (v15/*: any*/),
          (v18/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "AuctionResultPriceRealized",
            "kind": "LinkedField",
            "name": "priceRealized",
            "plural": false,
            "selections": [
              (v17/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "displayUSD",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "dateText",
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": "auctionResult(id:\"foo-bar\")"
      }
    ]
  },
  "params": {
    "cacheID": "79e372c0569fd44459210968f4cb26ff",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "auctionResult": (v24/*: any*/),
        "auctionResult.artist": (v25/*: any*/),
        "auctionResult.artist.coverArtwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "auctionResult.artist.coverArtwork.id": (v26/*: any*/),
        "auctionResult.artist.coverArtwork.image": (v27/*: any*/),
        "auctionResult.artist.coverArtwork.image.aspectRatio": (v28/*: any*/),
        "auctionResult.artist.coverArtwork.image.url": (v29/*: any*/),
        "auctionResult.artist.href": (v29/*: any*/),
        "auctionResult.artist.id": (v26/*: any*/),
        "auctionResult.artist.isPersonalArtist": (v30/*: any*/),
        "auctionResult.artist.name": (v29/*: any*/),
        "auctionResult.artist.slug": (v26/*: any*/),
        "auctionResult.boughtIn": (v30/*: any*/),
        "auctionResult.comparableAuctionResults": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionResultConnection"
        },
        "auctionResult.comparableAuctionResults.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "AuctionResultEdge"
        },
        "auctionResult.comparableAuctionResults.edges.cursor": (v31/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node": (v24/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.artist": (v25/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.artist.id": (v26/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.artist.name": (v29/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.boughtIn": (v30/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.categoryText": (v29/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.currency": (v29/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.date_text": (v29/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.dimension_text": (v29/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.estimate": (v32/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.estimate.display": (v29/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.id": (v26/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.images": (v33/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.images.larger": (v27/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.images.larger.aspectRatio": (v28/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.images.larger.url": (v29/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.images.thumbnail": (v27/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.images.thumbnail.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "auctionResult.comparableAuctionResults.edges.node.images.thumbnail.cropped.height": (v34/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.images.thumbnail.cropped.src": (v31/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.images.thumbnail.cropped.srcSet": (v31/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.images.thumbnail.cropped.width": (v34/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.internalID": (v26/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.isUpcoming": (v30/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.location": (v29/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.lotNumber": (v29/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.mediumText": (v29/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.organization": (v29/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.performance": (v35/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.performance.mid": (v29/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.price_realized": (v36/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.price_realized.cents_usd": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "auctionResult.comparableAuctionResults.edges.node.price_realized.display": (v29/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.price_realized.display_usd": (v29/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.saleDate": (v29/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.saleTitle": (v29/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.title": (v29/*: any*/),
        "auctionResult.currency": (v29/*: any*/),
        "auctionResult.dateText": (v29/*: any*/),
        "auctionResult.dimensionText": (v29/*: any*/),
        "auctionResult.estimate": (v32/*: any*/),
        "auctionResult.estimate.display": (v29/*: any*/),
        "auctionResult.formattedSaleDate": (v29/*: any*/),
        "auctionResult.id": (v26/*: any*/),
        "auctionResult.images": (v33/*: any*/),
        "auctionResult.images.larger": (v27/*: any*/),
        "auctionResult.images.larger.aspectRatio": (v28/*: any*/),
        "auctionResult.images.larger.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "auctionResult.images.larger.resized.height": (v37/*: any*/),
        "auctionResult.images.larger.resized.src": (v31/*: any*/),
        "auctionResult.images.larger.resized.srcSet": (v31/*: any*/),
        "auctionResult.images.larger.resized.width": (v37/*: any*/),
        "auctionResult.images.larger.url": (v29/*: any*/),
        "auctionResult.internalID": (v26/*: any*/),
        "auctionResult.isUpcoming": (v30/*: any*/),
        "auctionResult.location": (v29/*: any*/),
        "auctionResult.lotNumber": (v29/*: any*/),
        "auctionResult.mediumText": (v29/*: any*/),
        "auctionResult.organization": (v29/*: any*/),
        "auctionResult.performance": (v35/*: any*/),
        "auctionResult.performance.mid": (v29/*: any*/),
        "auctionResult.priceRealized": (v36/*: any*/),
        "auctionResult.priceRealized.display": (v29/*: any*/),
        "auctionResult.priceRealized.displayUSD": (v29/*: any*/),
        "auctionResult.saleDate": (v29/*: any*/),
        "auctionResult.saleTitle": (v29/*: any*/),
        "auctionResult.title": (v29/*: any*/)
      }
    },
    "name": "AuctionResultTestQuery",
    "operationKind": "query",
    "text": "query AuctionResultTestQuery {\n  auctionResult(id: \"foo-bar\") {\n    ...AuctionResult_auctionResult\n    id\n  }\n}\n\nfragment ArtistAuctionResultItem_auctionResult on AuctionResult {\n  internalID\n  title\n  dimension_text: dimensionText\n  organization\n  artist {\n    name\n    id\n  }\n  images {\n    larger {\n      url(version: \"x-large\")\n      aspectRatio\n    }\n    thumbnail {\n      cropped(width: 130, height: 130, version: [\"square140\"]) {\n        src\n        srcSet\n        width\n        height\n      }\n    }\n  }\n  mediumText\n  categoryText\n  date_text: dateText\n  saleDate\n  boughtIn\n  currency\n  price_realized: priceRealized {\n    display\n    display_usd: displayUSD\n    cents_usd: centsUSD\n  }\n  performance {\n    mid\n  }\n  estimate {\n    display\n  }\n  location\n  lotNumber\n  saleTitle\n  isUpcoming\n}\n\nfragment AuctionResultImage_auctionResult on AuctionResult {\n  title\n  images {\n    larger {\n      resized(height: 400, width: 400, version: \"larger\") {\n        src\n        srcSet\n        height\n        width\n      }\n    }\n  }\n}\n\nfragment AuctionResultMetaData_auctionResult on AuctionResult {\n  mediumText\n  dimensionText\n  formattedSaleDate: saleDate(format: \"MMM DD, YYYY\")\n  organization\n  location\n  saleTitle\n  lotNumber\n  estimate {\n    display\n  }\n  isUpcoming\n}\n\nfragment AuctionResultPrice_auctionResult on AuctionResult {\n  saleDate\n  currency\n  boughtIn\n  isUpcoming\n  images {\n    larger {\n      url(version: \"x-large\")\n      aspectRatio\n    }\n  }\n  performance {\n    mid\n  }\n  estimate {\n    display\n  }\n  priceRealized {\n    display\n    displayUSD\n  }\n}\n\nfragment AuctionResultTitleInfo_auctionResult on AuctionResult {\n  artist {\n    isPersonalArtist\n    name\n    slug\n    href\n    id\n  }\n  formattedSaleDate: saleDate(format: \"MMM DD, YYYY\")\n  title\n  dateText\n  organization\n}\n\nfragment AuctionResult_auctionResult on AuctionResult {\n  internalID\n  artist {\n    name\n    href\n    coverArtwork {\n      image {\n        url(version: \"x-large\")\n        aspectRatio\n      }\n      id\n    }\n    id\n  }\n  title\n  comparableAuctionResults(first: 6) @optionalField {\n    edges {\n      cursor\n      node {\n        ...ArtistAuctionResultItem_auctionResult\n        id\n      }\n    }\n  }\n  ...AuctionResultImage_auctionResult\n  ...AuctionResultMetaData_auctionResult\n  ...AuctionResultPrice_auctionResult\n  ...AuctionResultTitleInfo_auctionResult\n}\n"
  }
};
})();

(node as any).hash = "9cb1af992391ff02d31f7e8426088c60";

export default node;
