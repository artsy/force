/**
 * @generated SignedSource<<cd4b7b0192ffce850de6d8a7d56f0ac5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PreferencesApp_Test_Query$variables = Record<PropertyKey, never>;
export type PreferencesApp_Test_Query$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"PreferencesApp_viewer">;
  } | null | undefined;
};
export type PreferencesApp_Test_Query = {
  response: PreferencesApp_Test_Query$data;
  variables: PreferencesApp_Test_Query$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PreferencesApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PreferencesApp_viewer"
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
    "name": "PreferencesApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "NotificationPreference",
            "kind": "LinkedField",
            "name": "notificationPreferences",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "status",
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
    "cacheID": "3c609f2aa4166cec897927154e5d8a5b",
    "id": null,
    "metadata": {},
    "name": "PreferencesApp_Test_Query",
    "operationKind": "query",
    "text": "query PreferencesApp_Test_Query {\n  viewer {\n    ...PreferencesApp_viewer\n  }\n}\n\nfragment PreferencesApp_viewer on Viewer {\n  notificationPreferences {\n    name\n    status\n  }\n}\n"
  }
};

(node as any).hash = "3cd1bb8a6e936672c0d8273f5c5d5c18";

export default node;
