/**
 * @generated SignedSource<<d6422ec78efe6a9bd1f85959e6c2ff65>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EmailPreferenceWarningMessageQuery$variables = Record<PropertyKey, never>;
export type EmailPreferenceWarningMessageQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"EmailPreferenceWarningMessage_viewer">;
  } | null | undefined;
};
export type EmailPreferenceWarningMessageQuery = {
  response: EmailPreferenceWarningMessageQuery$data;
  variables: EmailPreferenceWarningMessageQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "EmailPreferenceWarningMessageQuery",
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
            "name": "EmailPreferenceWarningMessage_viewer"
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
    "name": "EmailPreferenceWarningMessageQuery",
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
    "cacheID": "2b118ed57279ed579c6c061f0d9781ca",
    "id": null,
    "metadata": {},
    "name": "EmailPreferenceWarningMessageQuery",
    "operationKind": "query",
    "text": "query EmailPreferenceWarningMessageQuery {\n  viewer {\n    ...EmailPreferenceWarningMessage_viewer\n  }\n}\n\nfragment EmailPreferenceWarningMessage_viewer on Viewer {\n  notificationPreferences {\n    channel\n    name\n    status\n  }\n}\n"
  }
};

(node as any).hash = "b70cc7290e95e848f43d8a7b17889665";

export default node;
