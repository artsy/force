/**
 * @generated SignedSource<<aac70bd1bd6704b67792441ec0faac3b>>
 * @relayHash c187735dfb49c9334048e18464fddf34
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID c187735dfb49c9334048e18464fddf34

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
    "id": "c187735dfb49c9334048e18464fddf34",
    "metadata": {},
    "name": "exampleRoutes_ExampleQuery",
    "operationKind": "query",
    "text": null
  }
};

(node as any).hash = "5878a11299e2592a0669ac8089848737";

export default node;
