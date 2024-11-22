/**
 * @generated SignedSource<<621117c3313233d5eae333a9c2311c7b>>
 * @relayHash a68ed85b846d0425622c52593e65d909
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID a68ed85b846d0425622c52593e65d909

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionBuyersPremiumDialog_Test_Query$variables = Record<PropertyKey, never>;
export type AuctionBuyersPremiumDialog_Test_Query$data = {
  readonly sale: {
    readonly " $fragmentSpreads": FragmentRefs<"AuctionBuyersPremiumDialog_sale">;
  } | null | undefined;
};
export type AuctionBuyersPremiumDialog_Test_Query = {
  response: AuctionBuyersPremiumDialog_Test_Query$data;
  variables: AuctionBuyersPremiumDialog_Test_Query$variables;
};

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
    "id": "a68ed85b846d0425622c52593e65d909",
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "sale.buyersPremium": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "BuyersPremium"
        },
        "sale.buyersPremium.amount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "sale.buyersPremium.cents": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "sale.buyersPremium.percent": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "sale.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        }
      }
    },
    "name": "AuctionBuyersPremiumDialog_Test_Query",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "6fe93d0d301eb094ae71261190b1ca21";

export default node;
