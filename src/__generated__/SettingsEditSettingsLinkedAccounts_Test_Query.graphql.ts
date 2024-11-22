/**
 * @generated SignedSource<<58d62a14011fdb4976070ae7baef80c0>>
 * @relayHash 80873362a12b6f0256e1534d3b35f5d2
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 80873362a12b6f0256e1534d3b35f5d2

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
    "id": "80873362a12b6f0256e1534d3b35f5d2",
    "metadata": {},
    "name": "SettingsEditSettingsLinkedAccounts_Test_Query",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "a33dc101bcfeb151ef5b8580868c5874";

export default node;
