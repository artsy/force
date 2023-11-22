/**
 * @generated SignedSource<<049fe2191619ecdfb97b86f16ccc8451>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
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
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "organization",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mediumText",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "saleDate",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "boughtIn",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currency",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v15 = {
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
v16 = {
  "alias": null,
  "args": null,
  "concreteType": "AuctionLotEstimate",
  "kind": "LinkedField",
  "name": "estimate",
  "plural": false,
  "selections": [
    (v14/*: any*/)
  ],
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "location",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotNumber",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "saleTitle",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isUpcoming",
  "storageKey": null
},
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResult"
},
v22 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artist"
},
v23 = {
  "enumValues": null,
  "nullable": true,
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
  "type": "Boolean"
},
v26 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v27 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionLotEstimate"
},
v28 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionLotImages"
},
v29 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v30 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v31 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionLotPerformance"
},
v32 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResultPriceRealized"
},
v33 = {
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
              (v3/*: any*/),
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
          (v4/*: any*/),
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
                      (v4/*: any*/),
                      {
                        "alias": "dimension_text",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "dimensionText",
                        "storageKey": null
                      },
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artist",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v3/*: any*/)
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
                                  (v6/*: any*/),
                                  (v7/*: any*/),
                                  (v8/*: any*/),
                                  (v9/*: any*/)
                                ],
                                "storageKey": "cropped(height:130,version:[\"square140\"],width:130)"
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v10/*: any*/),
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
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/),
                      {
                        "alias": "price_realized",
                        "args": null,
                        "concreteType": "AuctionResultPriceRealized",
                        "kind": "LinkedField",
                        "name": "priceRealized",
                        "plural": false,
                        "selections": [
                          (v14/*: any*/),
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
                      (v15/*: any*/),
                      (v16/*: any*/),
                      (v17/*: any*/),
                      (v18/*: any*/),
                      (v19/*: any*/),
                      (v20/*: any*/),
                      (v3/*: any*/)
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
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v9/*: any*/),
                      (v8/*: any*/)
                    ],
                    "storageKey": "resized(height:400,version:\"larger\",width:400)"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v10/*: any*/),
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
          (v5/*: any*/),
          (v17/*: any*/),
          (v19/*: any*/),
          (v18/*: any*/),
          (v16/*: any*/),
          (v20/*: any*/),
          (v11/*: any*/),
          (v13/*: any*/),
          (v12/*: any*/),
          (v15/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "AuctionResultPriceRealized",
            "kind": "LinkedField",
            "name": "priceRealized",
            "plural": false,
            "selections": [
              (v14/*: any*/),
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
          (v3/*: any*/)
        ],
        "storageKey": "auctionResult(id:\"foo-bar\")"
      }
    ]
  },
  "params": {
    "cacheID": "9539d27999786cdaecfa3ed7e2b1c148",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "auctionResult": (v21/*: any*/),
        "auctionResult.artist": (v22/*: any*/),
        "auctionResult.artist.href": (v23/*: any*/),
        "auctionResult.artist.id": (v24/*: any*/),
        "auctionResult.artist.isPersonalArtist": (v25/*: any*/),
        "auctionResult.artist.name": (v23/*: any*/),
        "auctionResult.artist.slug": (v24/*: any*/),
        "auctionResult.boughtIn": (v25/*: any*/),
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
        "auctionResult.comparableAuctionResults.edges.cursor": (v26/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node": (v21/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.artist": (v22/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.artist.id": (v24/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.artist.name": (v23/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.boughtIn": (v25/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.categoryText": (v23/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.currency": (v23/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.date_text": (v23/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.dimension_text": (v23/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.estimate": (v27/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.estimate.display": (v23/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.id": (v24/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.images": (v28/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.images.thumbnail": (v29/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.images.thumbnail.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "auctionResult.comparableAuctionResults.edges.node.images.thumbnail.cropped.height": (v30/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.images.thumbnail.cropped.src": (v26/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.images.thumbnail.cropped.srcSet": (v26/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.images.thumbnail.cropped.width": (v30/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.internalID": (v24/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.isUpcoming": (v25/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.location": (v23/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.lotNumber": (v23/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.mediumText": (v23/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.organization": (v23/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.performance": (v31/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.performance.mid": (v23/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.price_realized": (v32/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.price_realized.cents_usd": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "auctionResult.comparableAuctionResults.edges.node.price_realized.display": (v23/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.price_realized.display_usd": (v23/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.saleDate": (v23/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.saleTitle": (v23/*: any*/),
        "auctionResult.comparableAuctionResults.edges.node.title": (v23/*: any*/),
        "auctionResult.currency": (v23/*: any*/),
        "auctionResult.dateText": (v23/*: any*/),
        "auctionResult.dimensionText": (v23/*: any*/),
        "auctionResult.estimate": (v27/*: any*/),
        "auctionResult.estimate.display": (v23/*: any*/),
        "auctionResult.formattedSaleDate": (v23/*: any*/),
        "auctionResult.id": (v24/*: any*/),
        "auctionResult.images": (v28/*: any*/),
        "auctionResult.images.larger": (v29/*: any*/),
        "auctionResult.images.larger.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "auctionResult.images.larger.resized.height": (v33/*: any*/),
        "auctionResult.images.larger.resized.src": (v26/*: any*/),
        "auctionResult.images.larger.resized.srcSet": (v26/*: any*/),
        "auctionResult.images.larger.resized.width": (v33/*: any*/),
        "auctionResult.internalID": (v24/*: any*/),
        "auctionResult.isUpcoming": (v25/*: any*/),
        "auctionResult.location": (v23/*: any*/),
        "auctionResult.lotNumber": (v23/*: any*/),
        "auctionResult.mediumText": (v23/*: any*/),
        "auctionResult.organization": (v23/*: any*/),
        "auctionResult.performance": (v31/*: any*/),
        "auctionResult.performance.mid": (v23/*: any*/),
        "auctionResult.priceRealized": (v32/*: any*/),
        "auctionResult.priceRealized.display": (v23/*: any*/),
        "auctionResult.priceRealized.displayUSD": (v23/*: any*/),
        "auctionResult.saleDate": (v23/*: any*/),
        "auctionResult.saleTitle": (v23/*: any*/),
        "auctionResult.title": (v23/*: any*/)
      }
    },
    "name": "AuctionResultTestQuery",
    "operationKind": "query",
    "text": "query AuctionResultTestQuery {\n  auctionResult(id: \"foo-bar\") {\n    ...AuctionResult_auctionResult\n    id\n  }\n}\n\nfragment ArtistAuctionResultItem_auctionResult on AuctionResult {\n  internalID\n  title\n  dimension_text: dimensionText\n  organization\n  artist {\n    name\n    id\n  }\n  images {\n    thumbnail {\n      cropped(width: 130, height: 130, version: [\"square140\"]) {\n        src\n        srcSet\n        width\n        height\n      }\n    }\n  }\n  mediumText\n  categoryText\n  date_text: dateText\n  saleDate\n  boughtIn\n  currency\n  price_realized: priceRealized {\n    display\n    display_usd: displayUSD\n    cents_usd: centsUSD\n  }\n  performance {\n    mid\n  }\n  estimate {\n    display\n  }\n  location\n  lotNumber\n  saleTitle\n  isUpcoming\n}\n\nfragment AuctionResultImage_auctionResult on AuctionResult {\n  title\n  images {\n    larger {\n      resized(height: 400, width: 400, version: \"larger\") {\n        src\n        srcSet\n        height\n        width\n      }\n    }\n  }\n}\n\nfragment AuctionResultMetaData_auctionResult on AuctionResult {\n  mediumText\n  dimensionText\n  formattedSaleDate: saleDate(format: \"MMM DD, YYYY\")\n  organization\n  location\n  saleTitle\n  lotNumber\n  estimate {\n    display\n  }\n  isUpcoming\n}\n\nfragment AuctionResultPrice_auctionResult on AuctionResult {\n  saleDate\n  currency\n  boughtIn\n  isUpcoming\n  performance {\n    mid\n  }\n  estimate {\n    display\n  }\n  priceRealized {\n    display\n    displayUSD\n  }\n}\n\nfragment AuctionResultTitleInfo_auctionResult on AuctionResult {\n  artist {\n    isPersonalArtist\n    name\n    slug\n    href\n    id\n  }\n  formattedSaleDate: saleDate(format: \"MMM DD, YYYY\")\n  title\n  dateText\n  organization\n}\n\nfragment AuctionResult_auctionResult on AuctionResult {\n  internalID\n  artist {\n    name\n    href\n    id\n  }\n  title\n  comparableAuctionResults(first: 6) @optionalField {\n    edges {\n      cursor\n      node {\n        ...ArtistAuctionResultItem_auctionResult\n        id\n      }\n    }\n  }\n  ...AuctionResultImage_auctionResult\n  ...AuctionResultMetaData_auctionResult\n  ...AuctionResultPrice_auctionResult\n  ...AuctionResultTitleInfo_auctionResult\n}\n"
  }
};
})();

(node as any).hash = "9cb1af992391ff02d31f7e8426088c60";

export default node;
