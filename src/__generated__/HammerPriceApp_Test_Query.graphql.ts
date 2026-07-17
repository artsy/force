/**
 * @generated SignedSource<<6dd6f27fb5646a9c12a8c251923940b8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HammerPriceApp_Test_Query$variables = Record<PropertyKey, never>;
export type HammerPriceApp_Test_Query$data = {
  readonly auctionResult: {
    readonly " $fragmentSpreads": FragmentRefs<"HammerPriceApp_auctionResult">;
  } | null | undefined;
};
export type HammerPriceApp_Test_Query = {
  response: HammerPriceApp_Test_Query$data;
  variables: HammerPriceApp_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "7231067"
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
  "kind": "Literal",
  "name": "version",
  "value": "larger"
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HammerPriceApp_Test_Query",
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
            "name": "HammerPriceApp_auctionResult"
          }
        ],
        "storageKey": "auctionResult(id:\"7231067\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HammerPriceApp_Test_Query",
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
            "name": "title",
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
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              (v1/*: any*/)
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
                  {
                    "alias": null,
                    "args": [
                      (v2/*: any*/)
                    ],
                    "kind": "ScalarField",
                    "name": "url",
                    "storageKey": "url(version:\"larger\")"
                  },
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 400
                      },
                      (v2/*: any*/),
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
                        "name": "height",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "width",
                        "storageKey": null
                      }
                    ],
                    "storageKey": "resized(height:400,version:\"larger\",width:400)"
                  }
                ],
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "mediumText",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "dimensionText",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "organization",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "location",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "saleTitle",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "lotNumber",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "currency",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AuctionResultPriceRealized",
            "kind": "LinkedField",
            "name": "priceRealized",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "centsUSD",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "display",
                "storageKey": null
              },
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
          (v1/*: any*/)
        ],
        "storageKey": "auctionResult(id:\"7231067\")"
      }
    ]
  },
  "params": {
    "cacheID": "af648b440924cb191f30f5f1acc6dfbb",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "auctionResult": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionResult"
        },
        "auctionResult.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "auctionResult.artist.id": (v3/*: any*/),
        "auctionResult.artist.name": (v4/*: any*/),
        "auctionResult.currency": (v4/*: any*/),
        "auctionResult.dateText": (v4/*: any*/),
        "auctionResult.dimensionText": (v4/*: any*/),
        "auctionResult.formattedSaleDate": (v4/*: any*/),
        "auctionResult.id": (v3/*: any*/),
        "auctionResult.images": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionLotImages"
        },
        "auctionResult.images.larger": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "auctionResult.images.larger.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "auctionResult.images.larger.resized.height": (v5/*: any*/),
        "auctionResult.images.larger.resized.src": (v6/*: any*/),
        "auctionResult.images.larger.resized.srcSet": (v6/*: any*/),
        "auctionResult.images.larger.resized.width": (v5/*: any*/),
        "auctionResult.images.larger.url": (v4/*: any*/),
        "auctionResult.internalID": (v3/*: any*/),
        "auctionResult.location": (v4/*: any*/),
        "auctionResult.lotNumber": (v4/*: any*/),
        "auctionResult.mediumText": (v4/*: any*/),
        "auctionResult.organization": (v4/*: any*/),
        "auctionResult.priceRealized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionResultPriceRealized"
        },
        "auctionResult.priceRealized.centsUSD": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "auctionResult.priceRealized.display": (v4/*: any*/),
        "auctionResult.priceRealized.displayUSD": (v4/*: any*/),
        "auctionResult.saleTitle": (v4/*: any*/),
        "auctionResult.title": (v4/*: any*/)
      }
    },
    "name": "HammerPriceApp_Test_Query",
    "operationKind": "query",
    "text": "query HammerPriceApp_Test_Query {\n  auctionResult(id: \"7231067\") {\n    ...HammerPriceApp_auctionResult\n    id\n  }\n}\n\nfragment AuctionResultImage_auctionResult on AuctionResult {\n  title\n  images {\n    larger {\n      resized(height: 400, width: 400, version: \"larger\") {\n        src\n        srcSet\n        height\n        width\n      }\n    }\n  }\n}\n\nfragment HammerPriceApp_auctionResult on AuctionResult {\n  internalID\n  ...HammerPriceMeta_auctionResult\n  ...HammerPriceLotDetails_auctionResult\n  ...HammerPriceGamePanel_auctionResult\n}\n\nfragment HammerPriceGamePanel_auctionResult on AuctionResult {\n  internalID\n  ...useHammerPriceGame_auctionResult\n  ...HammerPriceResultModal_auctionResult\n}\n\nfragment HammerPriceLotDetails_auctionResult on AuctionResult {\n  internalID\n  title\n  dateText\n  artist {\n    name\n    id\n  }\n  formattedSaleDate: saleDate(format: \"MMM DD, YYYY\")\n  mediumText\n  dimensionText\n  organization\n  location\n  saleTitle\n  lotNumber\n  currency\n  ...AuctionResultImage_auctionResult\n}\n\nfragment HammerPriceMeta_auctionResult on AuctionResult {\n  internalID\n  title\n  artist {\n    name\n    id\n  }\n  images {\n    larger {\n      url(version: \"larger\")\n    }\n  }\n}\n\nfragment HammerPriceResultModal_auctionResult on AuctionResult {\n  internalID\n  title\n  dateText\n  currency\n  artist {\n    name\n    id\n  }\n  priceRealized {\n    display\n    displayUSD\n  }\n}\n\nfragment useHammerPriceGame_auctionResult on AuctionResult {\n  internalID\n  priceRealized {\n    centsUSD\n  }\n}\n"
  }
};
})();

(node as any).hash = "52d57138c2a56221c5fd0daad6b9564f";

export default node;
