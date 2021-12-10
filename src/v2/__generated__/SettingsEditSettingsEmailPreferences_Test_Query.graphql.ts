/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsEditSettingsEmailPreferences_Test_QueryVariables = {};
export type SettingsEditSettingsEmailPreferences_Test_QueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"SettingsEditSettingsEmailPreferences_me">;
    } | null;
};
export type SettingsEditSettingsEmailPreferences_Test_Query = {
    readonly response: SettingsEditSettingsEmailPreferences_Test_QueryResponse;
    readonly variables: SettingsEditSettingsEmailPreferences_Test_QueryVariables;
};



/*
query SettingsEditSettingsEmailPreferences_Test_Query {
  me {
    ...SettingsEditSettingsEmailPreferences_me
    id
  }
}

fragment SettingsEditSettingsEmailPreferences_me on Me {
  emailFrequency
  id
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsEditSettingsEmailPreferences_Test_Query",
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
            "name": "SettingsEditSettingsEmailPreferences_me"
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
    "name": "SettingsEditSettingsEmailPreferences_Test_Query",
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
            "name": "emailFrequency",
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
    "cacheID": "5fbcedf8304252fff2c26f9120abf586",
    "id": null,
    "metadata": {},
    "name": "SettingsEditSettingsEmailPreferences_Test_Query",
    "operationKind": "query",
    "text": "query SettingsEditSettingsEmailPreferences_Test_Query {\n  me {\n    ...SettingsEditSettingsEmailPreferences_me\n    id\n  }\n}\n\nfragment SettingsEditSettingsEmailPreferences_me on Me {\n  emailFrequency\n  id\n}\n"
  }
};
(node as any).hash = 'd36fbfd8b838f0d4c1258a1fb65c6613';
export default node;
