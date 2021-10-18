/* tslint:disable */
/* eslint-disable */

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
  me {
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
    "type": "Query"
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
    "id": null,
    "metadata": {},
    "name": "settingsRoutes_SettingsQuery",
    "operationKind": "query",
    "text": "query settingsRoutes_SettingsQuery {\n  me {\n    ...SettingsApp_me\n    id\n  }\n}\n\nfragment SettingsApp_me on Me {\n  name\n}\n"
  }
};
(node as any).hash = '41ffd02fc8cd23db2c073a63982eb3c0';
export default node;
