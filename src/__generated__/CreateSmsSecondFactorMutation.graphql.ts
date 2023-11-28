/**
 * @generated SignedSource<<18f7501f1a59b328440e1843e862f418>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateSmsSecondFactorInput = {
  attributes: SmsSecondFactorAttributes;
  clientMutationId?: string | null | undefined;
  password: string;
};
export type SmsSecondFactorAttributes = {
  countryCode?: string | null | undefined;
  phoneNumber?: string | null | undefined;
};
export type CreateSmsSecondFactorMutation$variables = {
  input: CreateSmsSecondFactorInput;
};
export type CreateSmsSecondFactorMutation$data = {
  readonly createSmsSecondFactor: {
    readonly secondFactorOrErrors: {
      readonly __typename: "Errors";
      readonly errors: ReadonlyArray<{
        readonly code: string;
        readonly message: string;
      }>;
    } | {
      readonly __typename: "SmsSecondFactor";
      readonly internalID: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    };
  } | null | undefined;
};
export type CreateSmsSecondFactorMutation$rawResponse = {
  readonly createSmsSecondFactor: {
    readonly secondFactorOrErrors: {
      readonly __typename: "Errors";
      readonly errors: ReadonlyArray<{
        readonly code: string;
        readonly message: string;
      }>;
    } | {
      readonly __typename: "SmsSecondFactor";
      readonly internalID: string;
    } | {
      readonly __typename: string;
    };
  } | null | undefined;
};
export type CreateSmsSecondFactorMutation = {
  rawResponse: CreateSmsSecondFactorMutation$rawResponse;
  response: CreateSmsSecondFactorMutation$data;
  variables: CreateSmsSecondFactorMutation$variables;
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
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "Error",
  "kind": "LinkedField",
  "name": "errors",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "message",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "code",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateSmsSecondFactorMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateSmsSecondFactorPayload",
        "kind": "LinkedField",
        "name": "createSmsSecondFactor",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "secondFactorOrErrors",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/)
                ],
                "type": "SmsSecondFactor",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  (v4/*: any*/)
                ],
                "type": "Errors",
                "abstractKey": null
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
    "name": "CreateSmsSecondFactorMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateSmsSecondFactorPayload",
        "kind": "LinkedField",
        "name": "createSmsSecondFactor",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "secondFactorOrErrors",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v3/*: any*/)
                ],
                "type": "SmsSecondFactor",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v4/*: any*/)
                ],
                "type": "Errors",
                "abstractKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "fd2bca6f550f8e01bbacf8305f3773d7",
    "id": null,
    "metadata": {},
    "name": "CreateSmsSecondFactorMutation",
    "operationKind": "mutation",
    "text": "mutation CreateSmsSecondFactorMutation(\n  $input: CreateSmsSecondFactorInput!\n) {\n  createSmsSecondFactor(input: $input) {\n    secondFactorOrErrors {\n      __typename\n      ... on SmsSecondFactor {\n        __typename\n        internalID\n      }\n      ... on Errors {\n        __typename\n        errors {\n          message\n          code\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2ecc9fd98f69d9f9197cdd78f399016f";

export default node;
