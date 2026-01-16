/**
 * @generated SignedSource<<860d215da6e61a9bb0addc83b04c3527>>
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
  "args": null,
  "kind": "ScalarField",
  "name": "aspectRatio",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "organization",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mediumText",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "saleDate",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "boughtIn",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currency",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v17 = {
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
v18 = {
  "alias": null,
  "args": null,
  "concreteType": "AuctionLotEstimate",
  "kind": "LinkedField",
  "name": "estimate",
  "plural": false,
  "selections": [
    (v16/*: any*/)
  ],
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "location",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotNumber",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "saleTitle",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isUpcoming",
  "storageKey": null
},
v23 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResult"
},
v24 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artist"
},
v25 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v26 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v27 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Float"
},
v28 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v29 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v30 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v31 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionLotEstimate"
},
v32 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionLotImages"
},
v33 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v34 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionLotPerformance"
},
v35 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResultPriceRealized"
},
v36 = {
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
                    "selections": [
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "version",
                            "value": "large"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "url",
                        "storageKey": "url(version:\"large\")"
                      },
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v4/*: any*/),
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
          (v5/*: any*/),
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
                      (v5/*: any*/),
                      {
                        "alias": "dimension_text",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "dimensionText",
                        "storageKey": null
                      },
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artist",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v4/*: any*/)
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
                            "selections": [
                              (v7/*: any*/),
                              (v3/*: any*/)
                            ],
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
                                  (v8/*: any*/),
                                  (v9/*: any*/),
                                  (v10/*: any*/),
                                  (v11/*: any*/)
                                ],
                                "storageKey": "cropped(height:130,version:[\"square140\"],width:130)"
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v12/*: any*/),
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
                      (v13/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      {
                        "alias": "price_realized",
                        "args": null,
                        "concreteType": "AuctionResultPriceRealized",
                        "kind": "LinkedField",
                        "name": "priceRealized",
                        "plural": false,
                        "selections": [
                          (v16/*: any*/),
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
                      (v17/*: any*/),
                      (v18/*: any*/),
                      (v19/*: any*/),
                      (v20/*: any*/),
                      (v21/*: any*/),
                      (v22/*: any*/),
                      (v4/*: any*/)
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
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v11/*: any*/),
                      (v10/*: any*/)
                    ],
                    "storageKey": "resized(height:400,version:\"larger\",width:400)"
                  },
                  (v7/*: any*/),
                  (v3/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v12/*: any*/),
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
          (v6/*: any*/),
          (v19/*: any*/),
          (v21/*: any*/),
          (v20/*: any*/),
          (v18/*: any*/),
          (v22/*: any*/),
          (v13/*: any*/),
          (v15/*: any*/),
          (v14/*: any*/),
          (v17/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "AuctionResultPriceRealized",
            "kind": "LinkedField",
            "name": "priceRealized",
            "plural": false,
            "selections": [
              (v16/*: any*/),
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
          (v4/*: any*/)
        ],
        "storageKey": "auctionResult(id:\"foo-bar\")"
      }
    ]
  },
  "params": {
    "cacheID": "a146ab66ac43d62e7b0365c666d6b6ec",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "auctionResult": (v23/*: any*/),
        "auctionResult.artist": (v24/*: any*/),
        "auctionResult.artist.coverArtwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "auctionResult.artist.coverArtwork.id": (v25/*: any*/),
        "auctionResult.artist.coverArtwork.image": (v26/*: any*/),
        "auctionResult.artist.coverArtwork.image.aspectRatio": (v27/*: any*/),
        "auctionResult.artist.coverArtwork.image.url": (v28/*: any*/),
        "auctionResult.artist.href": (v28/*: any*/),
        "auctionResult.artist.id": (v25/*: any*/),
        "auctionResult.artist.isPersonalArtist": (v29/*: any*/),
        "auctionResult.artist.name": (v28/*: any*/),
        "auctionResult.artist.slug": (v25/*: any*/),
        "auctionResult.boughtIn": (v29/*: any*/),
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
        "auctionResult.comparableAuctionResults.edges.cursor": (v30/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node": (v23/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.artist": (v24/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.artist.id": (v25/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.artist.name": (v28/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.boughtIn": (v29/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.categoryText": (v28/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.currency": (v28/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.date_text": (v28/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.dimension_text": (v28/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.estimate": (v31/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.estimate.display": (v28/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.id": (v25/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.images": (v32/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.images.larger": (v26/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.images.larger.aspectRatio": (v27/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.images.larger.url": (v28/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.images.thumbnail": (v26/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.images.thumbnail.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "auctionResult.comparableAuctionResults.edges.node.images.thumbnail.cropped.height": (v33/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.images.thumbnail.cropped.src": (v30/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.images.thumbnail.cropped.srcSet": (v30/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.images.thumbnail.cropped.width": (v33/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.internalID": (v25/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.isUpcoming": (v29/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.location": (v28/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.lotNumber": (v28/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.mediumText": (v28/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.organization": (v28/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.performance": (v34/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.performance.mid": (v28/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.price_realized": (v35/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.price_realized.cents_usd": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "auctionResult.comparableAuctionResults.edges.node.price_realized.display": (v28/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.price_realized.display_usd": (v28/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.saleDate": (v28/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.saleTitle": (v28/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.title": (v28/*: any*/),
        "auctionResult.currency": (v28/*: any*/),
        "auctionResult.dateText": (v28/*: any*/),
        "auctionResult.dimensionText": (v28/*: any*/),
        "auctionResult.estimate": (v31/*: any*/),
        "auctionResult.estimate.display": (v28/*: any*/),
        "auctionResult.formattedSaleDate": (v28/*: any*/),
        "auctionResult.id": (v25/*: any*/),
        "auctionResult.images": (v32/*: any*/),
        "auctionResult.images.larger": (v26/*: any*/),
        "auctionResult.images.larger.aspectRatio": (v27/*: any*/),
        "auctionResult.images.larger.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "auctionResult.images.larger.resized.height": (v36/*: any*/),
        "auctionResult.images.larger.resized.src": (v30/*: any*/),
        "auctionResult.images.larger.resized.srcSet": (v30/*: any*/),
        "auctionResult.images.larger.resized.width": (v36/*: any*/),
        "auctionResult.images.larger.url": (v28/*: any*/),
        "auctionResult.internalID": (v25/*: any*/),
        "auctionResult.isUpcoming": (v29/*: any*/),
        "auctionResult.location": (v28/*: any*/),
        "auctionResult.lotNumber": (v28/*: any*/),
        "auctionResult.mediumText": (v28/*: any*/),
        "auctionResult.organization": (v28/*: any*/),
        "auctionResult.performance": (v34/*: any*/),
        "auctionResult.performance.mid": (v28/*: any*/),
        "auctionResult.priceRealized": (v35/*: any*/),
        "auctionResult.priceRealized.display": (v28/*: any*/),
        "auctionResult.priceRealized.displayUSD": (v28/*: any*/),
        "auctionResult.saleDate": (v28/*: any*/),
        "auctionResult.saleTitle": (v28/*: any*/),
        "auctionResult.title": (v28/*: any*/)
      }
    },
    "name": "AuctionResultTestQuery",
    "operationKind": "query",
    "text": "query AuctionResultTestQuery {\n  auctionResult(id: \"foo-bar\") {\n    ...AuctionResult_auctionResult\n    id\n  }\n}\n\nfragment ArtistAuctionResultItem_auctionResult on AuctionResult {\n  internalID\n  title\n  dimension_text: dimensionText\n  organization\n  artist {\n    name\n    id\n  }\n  images {\n    larger {\n      url\n      aspectRatio\n    }\n    thumbnail {\n      cropped(width: 130, height: 130, version: [\"square140\"]) {\n        src\n        srcSet\n        width\n        height\n      }\n    }\n  }\n  mediumText\n  categoryText\n  date_text: dateText\n  saleDate\n  boughtIn\n  currency\n  price_realized: priceRealized {\n    display\n    display_usd: displayUSD\n    cents_usd: centsUSD\n  }\n  performance {\n    mid\n  }\n  estimate {\n    display\n  }\n  location\n  lotNumber\n  saleTitle\n  isUpcoming\n}\n\nfragment AuctionResultImage_auctionResult on AuctionResult {\n  title\n  images {\n    larger {\n      resized(height: 400, width: 400, version: \"larger\") {\n        src\n        srcSet\n        height\n        width\n      }\n    }\n  }\n}\n\nfragment AuctionResultMetaData_auctionResult on AuctionResult {\n  mediumText\n  dimensionText\n  formattedSaleDate: saleDate(format: \"MMM DD, YYYY\")\n  organization\n  location\n  saleTitle\n  lotNumber\n  estimate {\n    display\n  }\n  isUpcoming\n}\n\nfragment AuctionResultPrice_auctionResult on AuctionResult {\n  saleDate\n  currency\n  boughtIn\n  isUpcoming\n  images {\n    larger {\n      url\n      aspectRatio\n    }\n  }\n  performance {\n    mid\n  }\n  estimate {\n    display\n  }\n  priceRealized {\n    display\n    displayUSD\n  }\n}\n\nfragment AuctionResultTitleInfo_auctionResult on AuctionResult {\n  artist {\n    isPersonalArtist\n    name\n    slug\n    href\n    id\n  }\n  formattedSaleDate: saleDate(format: \"MMM DD, YYYY\")\n  title\n  dateText\n  organization\n}\n\nfragment AuctionResult_auctionResult on AuctionResult {\n  internalID\n  artist {\n    name\n    href\n    coverArtwork {\n      image {\n        url(version: \"large\")\n        aspectRatio\n      }\n      id\n    }\n    id\n  }\n  title\n  comparableAuctionResults(first: 6) @optionalField {\n    edges {\n      cursor\n      node {\n        ...ArtistAuctionResultItem_auctionResult\n        id\n      }\n    }\n  }\n  ...AuctionResultImage_auctionResult\n  ...AuctionResultMetaData_auctionResult\n  ...AuctionResultPrice_auctionResult\n  ...AuctionResultTitleInfo_auctionResult\n}\n"
  }
};
})();

(node as any).hash = "9cb1af992391ff02d31f7e8426088c60";

export default node;
