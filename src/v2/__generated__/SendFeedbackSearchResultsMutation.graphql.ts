/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type SendFeedbackMutationInput = {
    readonly clientMutationId?: string | null;
    readonly email?: string | null;
    readonly message: string;
    readonly name?: string | null;
    readonly url?: string | null;
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
    "kind": "LocalArgument",
    "name": "input",
    "type": "SendFeedbackMutationInput!",
    "defaultValue": null
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
  "kind": "ScalarField",
  "alias": null,
  "name": "message",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "InlineFragment",
  "type": "SendFeedbackMutationFailure",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "mutationError",
      "storageKey": null,
      "args": null,
      "concreteType": "GravityMutationError",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "type",
          "args": null,
          "storageKey": null
        },
        (v2/*: any*/),
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "detail",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "SendFeedbackSearchResultsMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "sendFeedback",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "SendFeedbackMutationPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "feedbackOrError",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "type": "SendFeedbackMutationSuccess",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "feedback",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Feedback",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/)
                    ]
                  }
                ]
              },
              (v3/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "SendFeedbackSearchResultsMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "sendFeedback",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "SendFeedbackMutationPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "feedbackOrError",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "__typename",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "type": "SendFeedbackMutationSuccess",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "feedback",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Feedback",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "id",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  }
                ]
              },
              (v3/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "SendFeedbackSearchResultsMutation",
    "id": null,
    "text": "mutation SendFeedbackSearchResultsMutation(\n  $input: SendFeedbackMutationInput!\n) {\n  sendFeedback(input: $input) {\n    feedbackOrError {\n      __typename\n      ... on SendFeedbackMutationSuccess {\n        feedback {\n          message\n          id\n        }\n      }\n      ... on SendFeedbackMutationFailure {\n        mutationError {\n          type\n          message\n          detail\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '37c6ef609611534460d2c76061671dac';
export default node;
