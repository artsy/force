/**
 * @generated SignedSource<<845c464b8a8635868852e8127b2f99ec>>
 * @relayHash 1838aefbc22504b484439724d1b52b4e
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 1838aefbc22504b484439724d1b52b4e

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type settingsRoutes_DeleteAccountRouteQuery$variables = Record<PropertyKey, never>;
export type settingsRoutes_DeleteAccountRouteQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"DeleteAccountRoute_me">;
  } | null | undefined;
};
export type settingsRoutes_DeleteAccountRouteQuery = {
  response: settingsRoutes_DeleteAccountRouteQuery$data;
  variables: settingsRoutes_DeleteAccountRouteQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "settingsRoutes_DeleteAccountRouteQuery",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "DeleteAccountRoute_me"
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
    "name": "settingsRoutes_DeleteAccountRouteQuery",
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
            "args": null,
            "kind": "ScalarField",
            "name": "hasPassword",
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
    "id": "1838aefbc22504b484439724d1b52b4e",
    "metadata": {},
    "name": "settingsRoutes_DeleteAccountRouteQuery",
    "operationKind": "query",
    "text": null
  }
};

(node as any).hash = "c54bb2421e59e40f01d0a70e9f8bca56";

export default node;
