/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type PricingTransparencyQueryVariables = {
    saleId: string;
    artworkId: string;
    bidAmountMinor: number;
};
export type PricingTransparencyQueryResponse = {
    readonly artwork: {
        readonly saleArtwork: {
            readonly calculatedCost: {
                readonly bidAmount: {
                    readonly display: string | null;
                } | null;
                readonly buyersPremium: {
                    readonly display: string | null;
                } | null;
                readonly subtotal: {
                    readonly display: string | null;
                } | null;
            } | null;
        } | null;
    } | null;
};
export type PricingTransparencyQuery = {
    readonly response: PricingTransparencyQueryResponse;
    readonly variables: PricingTransparencyQueryVariables;
};



/*
query PricingTransparencyQuery(
  $saleId: String!
  $artworkId: String!
  $bidAmountMinor: Int!
) {
  artwork(id: $artworkId) {
    saleArtwork(saleID: $saleId) {
      calculatedCost(bidAmountMinor: $bidAmountMinor) {
        bidAmount {
          display
        }
        buyersPremium {
          display
        }
        subtotal {
          display
        }
      }
      id
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "saleId",
    "type": "String!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artworkId",
    "type": "String!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "bidAmountMinor",
    "type": "Int!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artworkId"
  }
],
v2 = [
  {
    "kind": "Variable",
    "name": "saleID",
    "variableName": "saleId"
  }
],
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v4 = {
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
      "selections": (v3/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "buyersPremium",
      "plural": false,
      "selections": (v3/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "subtotal",
      "plural": false,
      "selections": (v3/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PricingTransparencyQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "SaleArtwork",
            "kind": "LinkedField",
            "name": "saleArtwork",
            "plural": false,
            "selections": [
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PricingTransparencyQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "SaleArtwork",
            "kind": "LinkedField",
            "name": "saleArtwork",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "PricingTransparencyQuery",
    "operationKind": "query",
    "text": "query PricingTransparencyQuery(\n  $saleId: String!\n  $artworkId: String!\n  $bidAmountMinor: Int!\n) {\n  artwork(id: $artworkId) {\n    saleArtwork(saleID: $saleId) {\n      calculatedCost(bidAmountMinor: $bidAmountMinor) {\n        bidAmount {\n          display\n        }\n        buyersPremium {\n          display\n        }\n        subtotal {\n          display\n        }\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f61a93d688779864e1e5e3fb1201b2af';
export default node;
