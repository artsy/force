/**
 * @generated SignedSource<<d6d92d377ccac53e3e7b75068f2d8fe8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type PricingTransparencyQuery$variables = {
  artworkId: string;
  bidAmountMinor: number;
  saleId: string;
};
export type PricingTransparencyQuery$data = {
  readonly artwork: {
    readonly saleArtwork: {
      readonly calculatedCost: {
        readonly bidAmount: {
          readonly display: string | null | undefined;
        } | null | undefined;
        readonly buyersPremium: {
          readonly display: string | null | undefined;
        } | null | undefined;
        readonly subtotal: {
          readonly display: string | null | undefined;
        } | null | undefined;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type PricingTransparencyQuery = {
  response: PricingTransparencyQuery$data;
  variables: PricingTransparencyQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "artworkId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "bidAmountMinor"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "saleId"
},
v3 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artworkId"
  }
],
v4 = [
  {
    "kind": "Variable",
    "name": "saleID",
    "variableName": "saleId"
  }
],
v5 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v6 = {
  "alias": null,
  "args": [
    {
      "kind": "Variable",
      "name": "bidAmountMinor",
      "variableName": "bidAmountMinor"
    }
  ],
  "concreteType": "CalculatedCost",
  "kind": "LinkedField",
  "name": "calculatedCost",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "bidAmount",
      "plural": false,
      "selections": (v5/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "buyersPremium",
      "plural": false,
      "selections": (v5/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "subtotal",
      "plural": false,
      "selections": (v5/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "PricingTransparencyQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "SaleArtwork",
            "kind": "LinkedField",
            "name": "saleArtwork",
            "plural": false,
            "selections": [
              (v6/*: any*/)
            ],
            "storageKey": null
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
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "PricingTransparencyQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "SaleArtwork",
            "kind": "LinkedField",
            "name": "saleArtwork",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              (v7/*: any*/)
            ],
            "storageKey": null
          },
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "32ac9984618e63cde9cfe54115b5523e",
    "id": null,
    "metadata": {},
    "name": "PricingTransparencyQuery",
    "operationKind": "query",
    "text": "query PricingTransparencyQuery(\n  $saleId: String!\n  $artworkId: String!\n  $bidAmountMinor: Int!\n) {\n  artwork(id: $artworkId) {\n    saleArtwork(saleID: $saleId) {\n      calculatedCost(bidAmountMinor: $bidAmountMinor) {\n        bidAmount {\n          display\n        }\n        buyersPremium {\n          display\n        }\n        subtotal {\n          display\n        }\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "f61a93d688779864e1e5e3fb1201b2af";

export default node;
