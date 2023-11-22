/**
 * @generated SignedSource<<a06057e46ae9912e6db541bdaf1c0795>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateSmsSecondFactorInput = {
  attributes: SmsSecondFactorAttributes;
  clientMutationId?: string | null | undefined;
  secondFactorID: string;
};
export type SmsSecondFactorAttributes = {
  countryCode?: string | null | undefined;
  phoneNumber?: string | null | undefined;
};
export type UpdateSmsSecondFactorMutation$variables = {
  input: UpdateSmsSecondFactorInput;
};
export type UpdateSmsSecondFactorMutation$data = {
  readonly updateSmsSecondFactor: {
    readonly secondFactorOrErrors: {
      readonly __typename: "Errors";
      readonly errors: ReadonlyArray<{
        readonly code: string;
        readonly data: any | null | undefined;
        readonly message: string;
      }>;
    } | {
      readonly __typename: "SmsSecondFactor";
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    };
  } | null | undefined;
};
export type UpdateSmsSecondFactorMutation$rawResponse = {
  readonly updateSmsSecondFactor: {
    readonly secondFactorOrErrors: {
      readonly __typename: "Errors";
      readonly errors: ReadonlyArray<{
        readonly code: string;
        readonly data: any | null | undefined;
        readonly message: string;
      }>;
    } | {
      readonly __typename: string;
    };
  } | null | undefined;
};
export type UpdateSmsSecondFactorMutation = {
  rawResponse: UpdateSmsSecondFactorMutation$rawResponse;
  response: UpdateSmsSecondFactorMutation$data;
  variables: UpdateSmsSecondFactorMutation$variables;
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "data",
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
    "name": "UpdateSmsSecondFactorMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateSmsSecondFactorPayload",
        "kind": "LinkedField",
        "name": "updateSmsSecondFactor",
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
                  (v2/*: any*/)
                ],
                "type": "SmsSecondFactor",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/)
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
    "name": "UpdateSmsSecondFactorMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateSmsSecondFactorPayload",
        "kind": "LinkedField",
        "name": "updateSmsSecondFactor",
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
    "cacheID": "f4db46f599af7f985f9e1c27bd15d87f",
    "id": null,
    "metadata": {},
    "name": "UpdateSmsSecondFactorMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateSmsSecondFactorMutation(\n  $input: UpdateSmsSecondFactorInput!\n) {\n  updateSmsSecondFactor(input: $input) {\n    secondFactorOrErrors {\n      __typename\n      ... on SmsSecondFactor {\n        __typename\n      }\n      ... on Errors {\n        __typename\n        errors {\n          message\n          code\n          data\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b80fa9c087543c25564b1ede065855ca";

export default node;
