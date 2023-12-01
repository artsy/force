/**
 * @generated SignedSource<<41481b78251dff8bed18dafd0ea12134>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type exampleRoutes_ExampleQuery$variables = Record<PropertyKey, never>;
export type exampleRoutes_ExampleQuery$data = {
  readonly system: {
    readonly " $fragmentSpreads": FragmentRefs<"ExampleApp_system">;
  } | null | undefined;
};
export type exampleRoutes_ExampleQuery = {
  response: exampleRoutes_ExampleQuery$data;
  variables: exampleRoutes_ExampleQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "exampleRoutes_ExampleQuery",
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
            "name": "ExampleApp_system"
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
    "name": "exampleRoutes_ExampleQuery",
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
    "cacheID": "c187735dfb49c9334048e18464fddf34",
    "id": null,
    "metadata": {},
    "name": "exampleRoutes_ExampleQuery",
    "operationKind": "query",
    "text": "query exampleRoutes_ExampleQuery {\n  system {\n    ...ExampleApp_system\n  }\n}\n\nfragment ExampleApp_system on System {\n  time {\n    day\n    month\n    year\n  }\n}\n"
  }
};

(node as any).hash = "5878a11299e2592a0669ac8089848737";

export default node;
