/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type settingsRoutes_SettingsRouteQueryVariables = {};
export type settingsRoutes_SettingsRouteQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"SettingsEditRoute_me">;
    } | null;
};
export type settingsRoutes_SettingsRouteQuery = {
    readonly response: settingsRoutes_SettingsRouteQueryResponse;
    readonly variables: settingsRoutes_SettingsRouteQueryVariables;
};



/*
query settingsRoutes_SettingsRouteQuery {
  me {
    ...SettingsEditRoute_me
    id
  }
}

fragment SettingsEditRoute_me on Me {
  name
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "settingsRoutes_SettingsRouteQuery",
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
            "name": "SettingsEditRoute_me"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "settingsRoutes_SettingsRouteQuery",
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
            "name": "name",
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
    "id": null,
    "metadata": {},
    "name": "settingsRoutes_SettingsRouteQuery",
    "operationKind": "query",
    "text": "query settingsRoutes_SettingsRouteQuery {\n  me {\n    ...SettingsEditRoute_me\n    id\n  }\n}\n\nfragment SettingsEditRoute_me on Me {\n  name\n}\n"
  }
};
(node as any).hash = '8bc0a8cfac3a2aee766e4d338fc944db';
export default node;
