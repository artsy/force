/**
 * @generated SignedSource<<7205a92e68b078d4fe1483cd104876e1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type order3Routes_Order3Query$variables = Record<PropertyKey, never>;
export type order3Routes_Order3Query$data = {
  readonly system: {
    readonly " $fragmentSpreads": FragmentRefs<"Order3App_system">;
  } | null | undefined;
};
export type order3Routes_Order3Query = {
  response: order3Routes_Order3Query$data;
  variables: order3Routes_Order3Query$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "order3Routes_Order3Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "System",
        "kind": "LinkedField",
        "name": "system",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Order3App_system"
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
    "name": "order3Routes_Order3Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "System",
        "kind": "LinkedField",
        "name": "system",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SystemTime",
            "kind": "LinkedField",
            "name": "time",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "day",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "month",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "year",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c8ddf1e2b79e7f94c88f84258d7619a3",
    "id": null,
    "metadata": {},
    "name": "order3Routes_Order3Query",
    "operationKind": "query",
    "text": "query order3Routes_Order3Query {\n  system {\n    ...Order3App_system\n  }\n}\n\nfragment Order3App_system on System {\n  time {\n    day\n    month\n    year\n  }\n}\n"
  }
};

(node as any).hash = "d12d469a0380cf4925d471d22436f86f";

export default node;
