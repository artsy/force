/**
 * @generated SignedSource<<8d8f56ce2789c0f2ab68d32f6b204460>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
    "cacheID": "1838aefbc22504b484439724d1b52b4e",
    "id": null,
    "metadata": {},
    "name": "settingsRoutes_DeleteAccountRouteQuery",
    "operationKind": "query",
    "text": "query settingsRoutes_DeleteAccountRouteQuery {\n  me {\n    ...DeleteAccountRoute_me\n    id\n  }\n}\n\nfragment DeleteAccountRoute_me on Me {\n  hasPassword\n}\n"
  }
};

(node as any).hash = "c54bb2421e59e40f01d0a70e9f8bca56";

export default node;
