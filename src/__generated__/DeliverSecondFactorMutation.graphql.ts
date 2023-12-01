/**
 * @generated SignedSource<<008716676c5eaa67b81c3d504ed3f4e7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeliverSecondFactorInput = {
  clientMutationId?: string | null | undefined;
  secondFactorID: string;
};
export type DeliverSecondFactorMutation$variables = {
  input: DeliverSecondFactorInput;
};
export type DeliverSecondFactorMutation$data = {
  readonly deliverSecondFactor: {
    readonly secondFactorOrErrors: {
      readonly __typename: "Errors";
      readonly errors: ReadonlyArray<{
        readonly code: string;
        readonly message: string;
      }>;
    } | {
      readonly __typename: "SmsSecondFactor";
      readonly formattedPhoneNumber: string | null | undefined;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    };
  } | null | undefined;
};
export type DeliverSecondFactorMutation$rawResponse = {
  readonly deliverSecondFactor: {
    readonly secondFactorOrErrors: {
      readonly __typename: "Errors";
      readonly errors: ReadonlyArray<{
        readonly code: string;
        readonly message: string;
      }>;
    } | {
      readonly __typename: "SmsSecondFactor";
      readonly formattedPhoneNumber: string | null | undefined;
    } | {
      readonly __typename: string;
    };
  } | null | undefined;
};
export type DeliverSecondFactorMutation = {
  rawResponse: DeliverSecondFactorMutation$rawResponse;
  response: DeliverSecondFactorMutation$data;
  variables: DeliverSecondFactorMutation$variables;
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
  "name": "formattedPhoneNumber",
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
    "name": "DeliverSecondFactorMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeliverSecondFactorPayload",
        "kind": "LinkedField",
        "name": "deliverSecondFactor",
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
    "name": "DeliverSecondFactorMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeliverSecondFactorPayload",
        "kind": "LinkedField",
        "name": "deliverSecondFactor",
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
    "cacheID": "e9fd78d472e42f3544ba78102bdeebf8",
    "id": null,
    "metadata": {},
    "name": "DeliverSecondFactorMutation",
    "operationKind": "mutation",
    "text": "mutation DeliverSecondFactorMutation(\n  $input: DeliverSecondFactorInput!\n) {\n  deliverSecondFactor(input: $input) {\n    secondFactorOrErrors {\n      __typename\n      ... on SmsSecondFactor {\n        __typename\n        formattedPhoneNumber\n      }\n      ... on Errors {\n        __typename\n        errors {\n          message\n          code\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "df969678bd1a9ce3e240489af95504c0";

export default node;
