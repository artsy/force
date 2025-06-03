/**
 * @generated SignedSource<<f1938e37f7df8b56ae6202a9d376f152>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2DetailsHelpLinks_Test_Query$variables = Record<PropertyKey, never>;
export type Order2DetailsHelpLinks_Test_Query$data = {
  readonly me: {
    readonly order: {
      readonly " $fragmentSpreads": FragmentRefs<"Order2DetailsHelpLinks_order">;
    } | null | undefined;
  } | null | undefined;
};
export type Order2DetailsHelpLinks_Test_Query$rawResponse = {
  readonly me: {
    readonly id: string;
    readonly order: {
      readonly id: string;
      readonly internalID: string;
    } | null | undefined;
  } | null | undefined;
};
export type Order2DetailsHelpLinks_Test_Query = {
  rawResponse: Order2DetailsHelpLinks_Test_Query$rawResponse;
  response: Order2DetailsHelpLinks_Test_Query$data;
  variables: Order2DetailsHelpLinks_Test_Query$variables;
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
    "name": "Order2DetailsHelpLinks_Test_Query",
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
                "name": "Order2DetailsHelpLinks_order"
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
    "name": "Order2DetailsHelpLinks_Test_Query",
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
    "cacheID": "8c8e5ad0ffdcecd5f0e413c090879f89",
    "id": null,
    "metadata": {},
    "name": "Order2DetailsHelpLinks_Test_Query",
    "operationKind": "query",
    "text": "query Order2DetailsHelpLinks_Test_Query {\n  me {\n    order(id: \"123\") {\n      ...Order2DetailsHelpLinks_order\n      id\n    }\n    id\n  }\n}\n\nfragment Order2DetailsHelpLinks_order on Order {\n  internalID\n}\n"
  }
};
})();

(node as any).hash = "9055536d95056cedbe5697b8f1c5d0d8";

export default node;
