/**
 * @generated SignedSource<<874203a6377ab871771cc1ac2a0acad8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type Order2HelpLinks_Test_Query$variables = Record<PropertyKey, never>;
export type Order2HelpLinks_Test_Query$data = {
  readonly me: {
    readonly order: {
      readonly " $fragmentSpreads": FragmentRefs<"Order2HelpLinks_order">;
    } | null | undefined;
  } | null | undefined;
};
export type Order2HelpLinks_Test_Query$rawResponse = {
  readonly me: {
    readonly id: string;
    readonly order: {
      readonly id: string;
      readonly internalID: string;
      readonly mode: OrderModeEnum;
    } | null | undefined;
  } | null | undefined;
};
export type Order2HelpLinks_Test_Query = {
  rawResponse: Order2HelpLinks_Test_Query$rawResponse;
  response: Order2HelpLinks_Test_Query$data;
  variables: Order2HelpLinks_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "123"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "Order2HelpLinks_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v0/*: any*/),
            "concreteType": "Order",
            "kind": "LinkedField",
            "name": "order",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Order2HelpLinks_order"
              }
            ],
            "storageKey": "order(id:\"123\")"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "Order2HelpLinks_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v0/*: any*/),
            "concreteType": "Order",
            "kind": "LinkedField",
            "name": "order",
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
                "name": "mode",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": "order(id:\"123\")"
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "492e5e36b5f9bf34de4408c66370bffd",
    "id": null,
    "metadata": {},
    "name": "Order2HelpLinks_Test_Query",
    "operationKind": "query",
    "text": "query Order2HelpLinks_Test_Query {\n  me {\n    order(id: \"123\") {\n      ...Order2HelpLinks_order\n      id\n    }\n    id\n  }\n}\n\nfragment Order2HelpLinks_order on Order {\n  internalID\n  mode\n}\n"
  }
};
})();

(node as any).hash = "03044d1ea8b45c690926b08f7e0cd5bb";

export default node;
