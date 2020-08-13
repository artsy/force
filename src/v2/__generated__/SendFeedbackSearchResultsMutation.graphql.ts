/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type SendFeedbackMutationInput = {
    clientMutationId?: string | null;
    email?: string | null;
    message: string;
    name?: string | null;
    url?: string | null;
};
export type SendFeedbackSearchResultsMutationVariables = {
    input: SendFeedbackMutationInput;
};
export type SendFeedbackSearchResultsMutationResponse = {
    readonly sendFeedback: {
        readonly feedbackOrError: {
            readonly feedback?: {
                readonly message: string;
            } | null;
            readonly mutationError?: {
                readonly type: string | null;
                readonly message: string | null;
                readonly detail: string | null;
            } | null;
        } | null;
    } | null;
};
export type SendFeedbackSearchResultsMutation = {
    readonly response: SendFeedbackSearchResultsMutationResponse;
    readonly variables: SendFeedbackSearchResultsMutationVariables;
};



/*
mutation SendFeedbackSearchResultsMutation(
  $input: SendFeedbackMutationInput!
) {
  sendFeedback(input: $input) {
    feedbackOrError {
      __typename
      ... on SendFeedbackMutationSuccess {
        feedback {
          message
          id
        }
      }
      ... on SendFeedbackMutationFailure {
        mutationError {
          type
          message
          detail
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input",
    "type": "SendFeedbackMutationInput!"
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
  "name": "message",
  "storageKey": null
},
v3 = {
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
          "name": "type",
          "storageKey": null
        },
        (v2/*: any*/),
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
  "type": "SendFeedbackMutationFailure"
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
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "SendFeedbackMutationSuccess"
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
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
                      (v2/*: any*/),
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
                "type": "SendFeedbackMutationSuccess"
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "SendFeedbackSearchResultsMutation",
    "operationKind": "mutation",
    "text": "mutation SendFeedbackSearchResultsMutation(\n  $input: SendFeedbackMutationInput!\n) {\n  sendFeedback(input: $input) {\n    feedbackOrError {\n      __typename\n      ... on SendFeedbackMutationSuccess {\n        feedback {\n          message\n          id\n        }\n      }\n      ... on SendFeedbackMutationFailure {\n        mutationError {\n          type\n          message\n          detail\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '37c6ef609611534460d2c76061671dac';
export default node;
