/**
 * @generated SignedSource<<11b86879403f0bfd337ad495b36b35ef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsEditSettingsLinkedAccounts_Test_Query$variables = Record<PropertyKey, never>;
export type SettingsEditSettingsLinkedAccounts_Test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SettingsEditSettingsLinkedAccounts_me">;
  } | null | undefined;
};
export type SettingsEditSettingsLinkedAccounts_Test_Query = {
  response: SettingsEditSettingsLinkedAccounts_Test_Query$data;
  variables: SettingsEditSettingsLinkedAccounts_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsEditSettingsLinkedAccounts_Test_Query",
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
            "name": "SettingsEditSettingsLinkedAccounts_me"
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
    "name": "SettingsEditSettingsLinkedAccounts_Test_Query",
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
            "name": "hasSecondFactorEnabled",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AuthenticationType",
            "kind": "LinkedField",
            "name": "authentications",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "provider",
                "storageKey": null
              },
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e533c0c3c4c29315de10523831031490",
    "id": null,
    "metadata": {},
    "name": "SettingsEditSettingsLinkedAccounts_Test_Query",
    "operationKind": "query",
    "text": "query SettingsEditSettingsLinkedAccounts_Test_Query {\n  me {\n    ...SettingsEditSettingsLinkedAccounts_me\n    id\n  }\n}\n\nfragment SettingsEditSettingsLinkedAccounts_me on Me {\n  hasSecondFactorEnabled\n  authentications {\n    provider\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "a33dc101bcfeb151ef5b8580868c5874";

export default node;
