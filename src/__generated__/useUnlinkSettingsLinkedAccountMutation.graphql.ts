/**
 * @generated SignedSource<<3077f390ef86ddce9d6a7557fb280acc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuthenticationProvider = "APPLE" | "FACEBOOK" | "GOOGLE" | "%future added value";
export type UnlinkAuthenticationMutationInput = {
  clientMutationId?: string | null | undefined;
  provider: AuthenticationProvider;
};
export type useUnlinkSettingsLinkedAccountMutation$variables = {
  input: UnlinkAuthenticationMutationInput;
};
export type useUnlinkSettingsLinkedAccountMutation$data = {
  readonly unlinkAuthentication: {
    readonly me: {
      readonly " $fragmentSpreads": FragmentRefs<"SettingsEditSettingsLinkedAccounts_me">;
    };
  } | null | undefined;
};
export type useUnlinkSettingsLinkedAccountMutation = {
  response: useUnlinkSettingsLinkedAccountMutation$data;
  variables: useUnlinkSettingsLinkedAccountMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useUnlinkSettingsLinkedAccountMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UnlinkAuthenticationMutationPayload",
        "kind": "LinkedField",
        "name": "unlinkAuthentication",
        "plural": false,
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
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUnlinkSettingsLinkedAccountMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UnlinkAuthenticationMutationPayload",
        "kind": "LinkedField",
        "name": "unlinkAuthentication",
        "plural": false,
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
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "cdde76258fc053765ad6faef429a63e3",
    "id": null,
    "metadata": {},
    "name": "useUnlinkSettingsLinkedAccountMutation",
    "operationKind": "mutation",
    "text": "mutation useUnlinkSettingsLinkedAccountMutation(\n  $input: UnlinkAuthenticationMutationInput!\n) {\n  unlinkAuthentication(input: $input) {\n    me {\n      ...SettingsEditSettingsLinkedAccounts_me\n      id\n    }\n  }\n}\n\nfragment SettingsEditSettingsLinkedAccounts_me on Me {\n  hasSecondFactorEnabled\n  authentications {\n    provider\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "2d4d6f192a2ea7f57809f354ba7fd0fb";

export default node;
