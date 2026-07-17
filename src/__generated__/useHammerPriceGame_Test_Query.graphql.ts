/**
 * @generated SignedSource<<c0f011d9cbdbb9a331b1c91c1f660499>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useHammerPriceGame_Test_Query$variables = Record<PropertyKey, never>;
export type useHammerPriceGame_Test_Query$data = {
  readonly auctionResult: {
    readonly " $fragmentSpreads": FragmentRefs<"useHammerPriceGame_auctionResult">;
  } | null | undefined;
};
export type useHammerPriceGame_Test_Query = {
  response: useHammerPriceGame_Test_Query$data;
  variables: useHammerPriceGame_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "useHammerPriceGame_Test_Query",
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
            "name": "useHammerPriceGame_auctionResult"
          }
        ],
        "storageKey": "auctionResult(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "useHammerPriceGame_Test_Query",
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
        "storageKey": "auctionResult(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "59511b89a8f242046b5a0148bd6a8056",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "auctionResult": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionResult"
        },
        "auctionResult.id": (v1/*: any*/),
        "auctionResult.internalID": (v1/*: any*/),
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
        }
      }
    },
    "name": "useHammerPriceGame_Test_Query",
    "operationKind": "query",
    "text": "query useHammerPriceGame_Test_Query {\n  auctionResult(id: \"example\") {\n    ...useHammerPriceGame_auctionResult\n    id\n  }\n}\n\nfragment useHammerPriceGame_auctionResult on AuctionResult {\n  internalID\n  priceRealized {\n    centsUSD\n  }\n}\n"
  }
};
})();

(node as any).hash = "a4f7bc84d61b980ffdd675de826b235a";

export default node;
