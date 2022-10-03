/**
 * @generated SignedSource<<4cba76942be80e1e74983334e3d3f9b7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SendFeedbackMutationInput = {
  clientMutationId?: string | null;
  email?: string | null;
  message: string;
  name?: string | null;
  url?: string | null;
};
export type SendFeedbackSearchResultsMutation$variables = {
  input: SendFeedbackMutationInput;
};
export type SendFeedbackSearchResultsMutation$data = {
  readonly sendFeedback: {
    readonly feedbackOrError: {
      readonly __typename: string;
    } | null;
  } | null;
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

(node as any).hash = "155a7a2823962b6d892c21c2e6ac2e05";

export default node;
