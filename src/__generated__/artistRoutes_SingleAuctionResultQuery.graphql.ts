/**
 * @generated SignedSource<<fd5edaeb479df0c81e8e434548940968>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type artistRoutes_SingleAuctionResultQuery$variables = {
  auctionResultId: string;
};
export type artistRoutes_SingleAuctionResultQuery$data = {
  readonly auctionResult: {
    readonly " $fragmentSpreads": FragmentRefs<"SingleAuctionResult_auctionResult">;
  } | null;
};
export type artistRoutes_SingleAuctionResultQuery = {
  response: artistRoutes_SingleAuctionResultQuery$data;
  variables: artistRoutes_SingleAuctionResultQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "auctionResultId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "auctionResultId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "artistRoutes_SingleAuctionResultQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AuctionResult",
        "kind": "LinkedField",
        "name": "auctionResult",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SingleAuctionResult_auctionResult"
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
    "name": "artistRoutes_SingleAuctionResultQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AuctionResult",
        "kind": "LinkedField",
        "name": "auctionResult",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
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
            "name": "artistID",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "boughtIn",
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
            "kind": "ScalarField",
            "name": "categoryText",
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
            "alias": null,
            "args": null,
            "concreteType": "AuctionLotDimensions",
            "kind": "LinkedField",
            "name": "dimensions",
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
            "kind": "ScalarField",
            "name": "dimensionText",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AuctionLotEstimate",
            "kind": "LinkedField",
            "name": "estimate",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "high",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "low",
                "storageKey": null
              }
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
                        "name": "version",
                        "value": "square140"
                      }
                    ],
                    "kind": "ScalarField",
                    "name": "url",
                    "storageKey": "url(version:\"square140\")"
                  },
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "aspectRatio",
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
            "args": null,
            "kind": "ScalarField",
            "name": "location",
            "storageKey": null
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
            "name": "organization",
            "storageKey": null
          },
          {
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
                "name": "cents",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "centsUSD",
                "storageKey": null
              },
              (v4/*: any*/),
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
            "name": "saleDate",
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
            "name": "title",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3cff83b4dc730ad38d3ee28d0d45e746",
    "id": null,
    "metadata": {},
    "name": "artistRoutes_SingleAuctionResultQuery",
    "operationKind": "query",
    "text": "query artistRoutes_SingleAuctionResultQuery(\n  $auctionResultId: String!\n) {\n  auctionResult(id: $auctionResultId) {\n    ...SingleAuctionResult_auctionResult\n    id\n  }\n}\n\nfragment SingleAuctionResult_auctionResult on AuctionResult {\n  id\n  internalID\n  artistID\n  boughtIn\n  currency\n  categoryText\n  dateText\n  dimensions {\n    height\n    width\n  }\n  dimensionText\n  estimate {\n    display\n    high\n    low\n  }\n  images {\n    thumbnail {\n      url(version: \"square140\")\n      height\n      width\n      aspectRatio\n    }\n  }\n  location\n  mediumText\n  organization\n  performance {\n    mid\n  }\n  priceRealized {\n    cents\n    centsUSD\n    display\n    displayUSD\n  }\n  saleDate\n  saleTitle\n  title\n}\n"
  }
};
})();

(node as any).hash = "18a222a9b011e333bf16a2d1d11d7135";

export default node;
