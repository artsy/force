/**
 * @generated SignedSource<<12bdad62eccc94dd1d01a635917ff31a>>
 * @relayHash 43fac0034838582150d5333fea6faa38
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 43fac0034838582150d5333fea6faa38

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NotificationPreferencesQuery$variables = Record<PropertyKey, never>;
export type NotificationPreferencesQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"NotificationPreferences_viewer">;
  } | null | undefined;
};
export type NotificationPreferencesQuery = {
  response: NotificationPreferencesQuery$data;
  variables: NotificationPreferencesQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "NotificationPreferencesQuery",
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
            "name": "NotificationPreferences_viewer"
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
    "name": "NotificationPreferencesQuery",
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
                "name": "channel",
                "storageKey": null
              },
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
    "id": "43fac0034838582150d5333fea6faa38",
    "metadata": {},
    "name": "NotificationPreferencesQuery",
    "operationKind": "query",
    "text": null
  }
};

(node as any).hash = "59f3999f3f59f823cc03ba0795090112";

export default node;
