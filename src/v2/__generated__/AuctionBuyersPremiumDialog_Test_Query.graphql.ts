/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionBuyersPremiumDialog_Test_QueryVariables = {};
export type AuctionBuyersPremiumDialog_Test_QueryResponse = {
    readonly sale: {
        readonly " $fragmentRefs": FragmentRefs<"AuctionBuyersPremiumDialog_sale">;
    } | null;
};
export type AuctionBuyersPremiumDialog_Test_Query = {
    readonly response: AuctionBuyersPremiumDialog_Test_QueryResponse;
    readonly variables: AuctionBuyersPremiumDialog_Test_QueryVariables;
};



/*
query AuctionBuyersPremiumDialog_Test_Query {
  sale(id: "example") {
    ...AuctionBuyersPremiumDialog_sale
    id
  }
}

fragment AuctionBuyersPremiumDialog_sale on Sale {
  buyersPremium {
    amount
    cents
    percent
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AuctionBuyersPremiumDialog_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AuctionBuyersPremiumDialog_sale"
          }
        ],
        "storageKey": "sale(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AuctionBuyersPremiumDialog_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "BuyersPremium",
            "kind": "LinkedField",
            "name": "buyersPremium",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "amount",
                "storageKey": null
              },
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
                "name": "percent",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "sale(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "a68ed85b846d0425622c52593e65d909",
    "id": null,
    "metadata": {},
    "name": "AuctionBuyersPremiumDialog_Test_Query",
    "operationKind": "query",
    "text": "query AuctionBuyersPremiumDialog_Test_Query {\n  sale(id: \"example\") {\n    ...AuctionBuyersPremiumDialog_sale\n    id\n  }\n}\n\nfragment AuctionBuyersPremiumDialog_sale on Sale {\n  buyersPremium {\n    amount\n    cents\n    percent\n  }\n}\n"
  }
};
})();
(node as any).hash = '63a4cfceea8621f9335ae96c210ea7c1';
export default node;
