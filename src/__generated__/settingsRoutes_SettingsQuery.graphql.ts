/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type settingsRoutes_SettingsQueryVariables = {};
export type settingsRoutes_SettingsQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"SettingsApp_me">;
    } | null;
};
export type settingsRoutes_SettingsQuery = {
    readonly response: settingsRoutes_SettingsQueryResponse;
    readonly variables: settingsRoutes_SettingsQueryVariables;
};



/*
query settingsRoutes_SettingsQuery {
  me @principalField {
    ...SettingsApp_me
    id
  }
}

fragment SettingsApp_me on Me {
  name
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "settingsRoutes_SettingsQuery",
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
            "name": "SettingsApp_me"
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
    "name": "settingsRoutes_SettingsQuery",
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
    "cacheID": "47bbe2aace6d693bae79702c711df3a4",
    "id": null,
    "metadata": {},
    "name": "settingsRoutes_SettingsQuery",
    "operationKind": "query",
    "text": "query settingsRoutes_SettingsQuery {\n  me @principalField {\n    ...SettingsApp_me\n    id\n  }\n}\n\nfragment SettingsApp_me on Me {\n  name\n}\n"
  }
};
(node as any).hash = '2110a4436f8f780bd8c2218f9081f92f';
export default node;
