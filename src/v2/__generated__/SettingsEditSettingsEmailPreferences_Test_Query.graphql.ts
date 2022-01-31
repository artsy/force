/**
 * @generated SignedSource<<0f26d77c75935e1e6e6170efc4045a32>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsEditSettingsEmailPreferences_Test_Query$variables = {};
export type SettingsEditSettingsEmailPreferences_Test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SettingsEditSettingsEmailPreferences_me">;
  } | null;
};
export type SettingsEditSettingsEmailPreferences_Test_Query = {
  variables: SettingsEditSettingsEmailPreferences_Test_Query$variables;
  response: SettingsEditSettingsEmailPreferences_Test_Query$data;
};

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

(node as any).hash = "d36fbfd8b838f0d4c1258a1fb65c6613";

export default node;
