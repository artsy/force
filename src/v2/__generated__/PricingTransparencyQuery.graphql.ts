/* tslint:disable */

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
    "kind": "LocalArgument",
    "name": "saleId",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "artworkId",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "bidAmountMinor",
    "type": "Int!",
    "defaultValue": null
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
    "kind": "ScalarField",
    "alias": null,
    "name": "display",
    "args": null,
    "storageKey": null
  }
],
v4 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "calculatedCost",
  "storageKey": null,
  "args": [
    {
      "kind": "Variable",
      "name": "bidAmountMinor",
      "variableName": "bidAmountMinor"
    }
  ],
  "concreteType": "CalculatedCost",
  "plural": false,
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "bidAmount",
      "storageKey": null,
      "args": null,
      "concreteType": "Money",
      "plural": false,
      "selections": (v3/*: any*/)
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "buyersPremium",
      "storageKey": null,
      "args": null,
      "concreteType": "Money",
      "plural": false,
      "selections": (v3/*: any*/)
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "subtotal",
      "storageKey": null,
      "args": null,
      "concreteType": "Money",
      "plural": false,
      "selections": (v3/*: any*/)
    }
  ]
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "PricingTransparencyQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "saleArtwork",
            "storageKey": null,
            "args": (v2/*: any*/),
            "concreteType": "SaleArtwork",
            "plural": false,
            "selections": [
              (v4/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "PricingTransparencyQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "saleArtwork",
            "storageKey": null,
            "args": (v2/*: any*/),
            "concreteType": "SaleArtwork",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/)
            ]
          },
          (v5/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "PricingTransparencyQuery",
    "id": null,
    "text": "query PricingTransparencyQuery(\n  $saleId: String!\n  $artworkId: String!\n  $bidAmountMinor: Int!\n) {\n  artwork(id: $artworkId) {\n    saleArtwork(saleID: $saleId) {\n      calculatedCost(bidAmountMinor: $bidAmountMinor) {\n        bidAmount {\n          display\n        }\n        buyersPremium {\n          display\n        }\n        subtotal {\n          display\n        }\n      }\n      id\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'f61a93d688779864e1e5e3fb1201b2af';
export default node;
