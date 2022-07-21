/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SendFeedbackMutationInput = {
    clientMutationId?: string | null | undefined;
    email?: string | null | undefined;
    message: string;
    name?: string | null | undefined;
    url?: string | null | undefined;
};
export type SendFeedbackSearchResultsMutationVariables = {
    input: SendFeedbackMutationInput;
};
export type SendFeedbackSearchResultsMutationResponse = {
    readonly sendFeedback: {
        readonly feedbackOrError: {
            readonly __typename: string;
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
    }
  }
}
*/

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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
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
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SendFeedbackSearchResultsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SendFeedbackSearchResultsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "aed2b499b05332303b5518aa063466b1",
    "id": null,
    "metadata": {},
    "name": "SendFeedbackSearchResultsMutation",
    "operationKind": "mutation",
    "text": "mutation SendFeedbackSearchResultsMutation(\n  $input: SendFeedbackMutationInput!\n) {\n  sendFeedback(input: $input) {\n    feedbackOrError {\n      __typename\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '155a7a2823962b6d892c21c2e6ac2e05';
export default node;
