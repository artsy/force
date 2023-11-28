/**
 * @generated SignedSource<<5803dc99c94ff9ec2527d932b35e6364>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type preferencesRoutes_PreferencesQuery$variables = {
  authenticationToken?: string | null | undefined;
};
export type preferencesRoutes_PreferencesQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"PreferencesApp_viewer">;
  } | null | undefined;
};
export type preferencesRoutes_PreferencesQuery = {
  response: preferencesRoutes_PreferencesQuery$data;
  variables: preferencesRoutes_PreferencesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "authenticationToken"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "authenticationToken",
    "variableName": "authenticationToken"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "preferencesRoutes_PreferencesQuery",
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
            "args": (v1/*: any*/),
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "preferencesRoutes_PreferencesQuery",
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
            "args": (v1/*: any*/),
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
    "cacheID": "b5a42ea324a5fbc271f83dabb8544269",
    "id": null,
    "metadata": {},
    "name": "preferencesRoutes_PreferencesQuery",
    "operationKind": "query",
    "text": "query preferencesRoutes_PreferencesQuery(\n  $authenticationToken: String\n) {\n  viewer {\n    ...PreferencesApp_viewer_4kNil9\n  }\n}\n\nfragment PreferencesApp_viewer_4kNil9 on Viewer {\n  notificationPreferences(authenticationToken: $authenticationToken) {\n    name\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "a2896eeba9e9d14f09b2788b3b23e53c";

export default node;
