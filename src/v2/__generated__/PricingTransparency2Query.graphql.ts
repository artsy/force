/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type PricingTransparency2QueryVariables = {
    saleId: string;
    artworkId: string;
    bidAmountMinor: number;
};
export type PricingTransparency2QueryResponse = {
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
export type PricingTransparency2Query = {
    readonly response: PricingTransparency2QueryResponse;
    readonly variables: PricingTransparency2QueryVariables;
};



/*
query PricingTransparency2Query(
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
    "name": "PricingTransparency2Query",
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
    "name": "PricingTransparency2Query",
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
    "cacheID": "3cdef12aeace4100a15f66ad49967138",
    "id": null,
    "metadata": {},
    "name": "PricingTransparency2Query",
    "operationKind": "query",
    "text": "query PricingTransparency2Query(\n  $saleId: String!\n  $artworkId: String!\n  $bidAmountMinor: Int!\n) {\n  artwork(id: $artworkId) {\n    saleArtwork(saleID: $saleId) {\n      calculatedCost(bidAmountMinor: $bidAmountMinor) {\n        bidAmount {\n          display\n        }\n        buyersPremium {\n          display\n        }\n        subtotal {\n          display\n        }\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a2e1c5d03b220f50a15a5bb112595cfd';
export default node;
