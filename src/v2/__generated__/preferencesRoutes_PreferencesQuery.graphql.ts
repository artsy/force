/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type preferencesRoutes_PreferencesQueryVariables = {};
export type preferencesRoutes_PreferencesQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"PreferencesApp_viewer">;
    } | null;
};
export type preferencesRoutes_PreferencesQuery = {
    readonly response: preferencesRoutes_PreferencesQueryResponse;
    readonly variables: preferencesRoutes_PreferencesQueryVariables;
};



/*
query preferencesRoutes_PreferencesQuery {
  viewer @principalField {
    ...PreferencesApp_viewer
  }
}

fragment PreferencesApp_viewer on Viewer {
  notificationPreferences {
    id
    name
    channel
    status
  }
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
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
                "name": "id",
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
                "name": "channel",
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
    "cacheID": "fef6226dc7dfcc8f2bcb1368e0b37438",
    "id": null,
    "metadata": {},
    "name": "preferencesRoutes_PreferencesQuery",
    "operationKind": "query",
    "text": "query preferencesRoutes_PreferencesQuery {\n  viewer @principalField {\n    ...PreferencesApp_viewer\n  }\n}\n\nfragment PreferencesApp_viewer on Viewer {\n  notificationPreferences {\n    id\n    name\n    channel\n    status\n  }\n}\n"
  }
};
(node as any).hash = '5d943fd9f5d8230da4d0c1eade889dd2';
export default node;
