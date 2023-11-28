/**
 * @generated SignedSource<<8ce05eb478ff91075890a55cce342e0d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SendFeedbackMutationInput = {
  clientMutationId?: string | null | undefined;
  email?: string | null | undefined;
  message: string;
  name?: string | null | undefined;
  url?: string | null | undefined;
};
export type SendFeedbackSearchResultsMutation$variables = {
  input: SendFeedbackMutationInput;
};
export type SendFeedbackSearchResultsMutation$data = {
  readonly sendFeedback: {
    readonly feedbackOrError: {
      readonly __typename: "SendFeedbackMutationFailure";
      readonly mutationError: {
        readonly detail: string | null | undefined;
        readonly message: string;
      } | null | undefined;
    } | {
      readonly __typename: "SendFeedbackMutationSuccess";
      readonly feedback: {
        readonly internalID: string;
      } | null | undefined;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null | undefined;
  } | null | undefined;
};
export type SendFeedbackSearchResultsMutation = {
  response: SendFeedbackSearchResultsMutation$data;
  variables: SendFeedbackSearchResultsMutation$variables;
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
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "GravityMutationError",
      "kind": "LinkedField",
      "name": "mutationError",
      "plural": false,
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
          "name": "detail",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "SendFeedbackMutationFailure",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SendFeedbackSearchResultsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SendFeedbackMutationPayload",
        "kind": "LinkedField",
        "name": "sendFeedback",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "feedbackOrError",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Feedback",
                    "kind": "LinkedField",
                    "name": "feedback",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "SendFeedbackMutationSuccess",
                "abstractKey": null
              },
              (v4/*: any*/)
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
    "name": "SendFeedbackSearchResultsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SendFeedbackMutationPayload",
        "kind": "LinkedField",
        "name": "sendFeedback",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "feedbackOrError",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Feedback",
                    "kind": "LinkedField",
                    "name": "feedback",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
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
                ],
                "type": "SendFeedbackMutationSuccess",
                "abstractKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0495699a58ae9c1bfae5fe0f293230c1",
    "id": null,
    "metadata": {},
    "name": "SendFeedbackSearchResultsMutation",
    "operationKind": "mutation",
    "text": "mutation SendFeedbackSearchResultsMutation(\n  $input: SendFeedbackMutationInput!\n) {\n  sendFeedback(input: $input) {\n    feedbackOrError {\n      __typename\n      ... on SendFeedbackMutationSuccess {\n        feedback {\n          internalID\n          id\n        }\n      }\n      ... on SendFeedbackMutationFailure {\n        mutationError {\n          message\n          detail\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "682ec1c907a87967fae7fcf1ed68eb7a";

export default node;
