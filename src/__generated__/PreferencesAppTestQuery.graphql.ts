/**
 * @generated SignedSource<<5369f2340b50ca4b61cf2b15661f3268>>
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

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "authenticationToken",
    "value": "123"
  }
];
return {
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
            "args": (v0/*: any*/),
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
            "args": (v0/*: any*/),
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
            "storageKey": "notificationPreferences(authenticationToken:\"123\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9e502959c4441f0cdce67b766bbc6f2a",
    "id": null,
    "metadata": {},
    "name": "PreferencesAppTestQuery",
    "operationKind": "query",
    "text": "query PreferencesAppTestQuery {\n  viewer {\n    ...PreferencesApp_viewer_1hTG6C\n  }\n}\n\nfragment PreferencesApp_viewer_1hTG6C on Viewer {\n  notificationPreferences(authenticationToken: \"123\") {\n    name\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "2b3d5ff860b9ce102cde04d52e242790";

export default node;
