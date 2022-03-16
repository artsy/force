/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type preferencesRoutes_PreferencesQueryVariables = {
    authenticationToken?: string | null;
};
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
query preferencesRoutes_PreferencesQuery(
  $authenticationToken: String
) {
  viewer @principalField {
    ...PreferencesApp_viewer_4kNil9
  }
}

fragment PreferencesApp_viewer_4kNil9 on Viewer {
  notificationPreferences(authenticationToken: $authenticationToken) {
    id
    name
    channel
    status
  }
}
*/

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
    "cacheID": "edd1b2c59aa9370d63d57be3a6c9649f",
    "id": null,
    "metadata": {},
    "name": "preferencesRoutes_PreferencesQuery",
    "operationKind": "query",
    "text": "query preferencesRoutes_PreferencesQuery(\n  $authenticationToken: String\n) {\n  viewer @principalField {\n    ...PreferencesApp_viewer_4kNil9\n  }\n}\n\nfragment PreferencesApp_viewer_4kNil9 on Viewer {\n  notificationPreferences(authenticationToken: $authenticationToken) {\n    id\n    name\n    channel\n    status\n  }\n}\n"
  }
};
})();
(node as any).hash = '0fae2794f8107dcaf8ff3139fddb79c1';
export default node;
