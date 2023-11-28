/**
 * @generated SignedSource<<0fc2edb03b20bb9bfd6214312802c495>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionBuyersPremiumDialogQuery$variables = {
  saleID: string;
};
export type AuctionBuyersPremiumDialogQuery$data = {
  readonly sale: {
    readonly " $fragmentSpreads": FragmentRefs<"AuctionBuyersPremiumDialog_sale">;
  } | null | undefined;
};
export type AuctionBuyersPremiumDialogQuery = {
  response: AuctionBuyersPremiumDialogQuery$data;
  variables: AuctionBuyersPremiumDialogQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "saleID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "saleID"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AuctionBuyersPremiumDialogQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
    "name": "AuctionBuyersPremiumDialogQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5aed1817cbf98b9e64d6f5660b032cdf",
    "id": null,
    "metadata": {},
    "name": "AuctionBuyersPremiumDialogQuery",
    "operationKind": "query",
    "text": "query AuctionBuyersPremiumDialogQuery(\n  $saleID: String!\n) {\n  sale(id: $saleID) {\n    ...AuctionBuyersPremiumDialog_sale\n    id\n  }\n}\n\nfragment AuctionBuyersPremiumDialog_sale on Sale {\n  buyersPremium {\n    amount\n    cents\n    percent\n  }\n}\n"
  }
};
})();

(node as any).hash = "d41f67af63382fd59cacfa97d66245d4";

export default node;
