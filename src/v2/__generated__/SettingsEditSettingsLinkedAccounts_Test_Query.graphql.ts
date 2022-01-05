/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsEditSettingsLinkedAccounts_Test_QueryVariables = {};
export type SettingsEditSettingsLinkedAccounts_Test_QueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"SettingsEditSettingsLinkedAccounts_me">;
    } | null;
};
export type SettingsEditSettingsLinkedAccounts_Test_Query = {
    readonly response: SettingsEditSettingsLinkedAccounts_Test_QueryResponse;
    readonly variables: SettingsEditSettingsLinkedAccounts_Test_QueryVariables;
};



/*
query SettingsEditSettingsLinkedAccounts_Test_Query {
  me {
    ...SettingsEditSettingsLinkedAccounts_me
    id
  }
}

fragment SettingsEditSettingsLinkedAccounts_me on Me {
  authentications {
    provider
    id
  }
}
*/

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
    "type": "Query"
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
    "id": null,
    "metadata": {},
    "name": "SettingsEditSettingsLinkedAccounts_Test_Query",
    "operationKind": "query",
    "text": "query SettingsEditSettingsLinkedAccounts_Test_Query {\n  me {\n    ...SettingsEditSettingsLinkedAccounts_me\n    id\n  }\n}\n\nfragment SettingsEditSettingsLinkedAccounts_me on Me {\n  authentications {\n    provider\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a33dc101bcfeb151ef5b8580868c5874';
export default node;
