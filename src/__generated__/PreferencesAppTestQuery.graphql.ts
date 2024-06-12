/**
 * @generated SignedSource<<724a54a6495567db1d2612f95c3bacc0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PreferencesAppTestQuery$variables = Record<PropertyKey, never>;
export type PreferencesAppTestQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"PreferencesApp_viewer">;
  } | null | undefined;
};
export type PreferencesAppTestQuery = {
  response: PreferencesAppTestQuery$data;
  variables: PreferencesAppTestQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PreferencesAppTestQuery",
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
    "name": "PreferencesAppTestQuery",
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
    "cacheID": "1a18f0845044c123c015049ea2a69573",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.notificationPreferences": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "NotificationPreference"
        },
        "viewer.notificationPreferences.name": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "String"
        },
        "viewer.notificationPreferences.status": {
          "enumValues": [
            "SUBSCRIBED",
            "UNSUBSCRIBED"
          ],
          "nullable": false,
          "plural": false,
          "type": "SubGroupStatus"
        }
      }
    },
    "name": "PreferencesAppTestQuery",
    "operationKind": "query",
    "text": "query PreferencesAppTestQuery {\n  viewer {\n    ...PreferencesApp_viewer\n  }\n}\n\nfragment PreferencesApp_viewer on Viewer {\n  notificationPreferences {\n    name\n    status\n  }\n}\n"
  }
};

(node as any).hash = "643af9897cedd91a59e33cc6ce08fe50";

export default node;
