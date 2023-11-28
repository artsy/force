/**
 * @generated SignedSource<<3e1d81235c93b5f135cc7a453f4d91e5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
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
    "cacheID": "80873362a12b6f0256e1534d3b35f5d2",
    "id": null,
    "metadata": {},
    "name": "SettingsEditSettingsLinkedAccounts_Test_Query",
    "operationKind": "query",
    "text": "query SettingsEditSettingsLinkedAccounts_Test_Query {\n  me {\n    ...SettingsEditSettingsLinkedAccounts_me\n    id\n  }\n}\n\nfragment SettingsEditSettingsLinkedAccounts_me on Me {\n  authentications {\n    provider\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "a33dc101bcfeb151ef5b8580868c5874";

export default node;
