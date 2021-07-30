/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type SubmitInquiryRequestMutationInput = {
    clientMutationId?: string | null;
    inquireableID: string;
    inquireableType: string;
    message?: string | null;
    questions?: Array<InquiryQuestionInput | null> | null;
};
export type InquiryQuestionInput = {
    details?: string | null;
    questionID: string;
};
export type useInquiryRequestMutationVariables = {
    input: SubmitInquiryRequestMutationInput;
};
export type useInquiryRequestMutationResponse = {
    readonly submitInquiryRequestMutation: {
        readonly clientMutationId: string | null;
    } | null;
};
export type useInquiryRequestMutation = {
    readonly response: useInquiryRequestMutationResponse;
    readonly variables: useInquiryRequestMutationVariables;
};



/*
mutation useInquiryRequestMutation(
  $input: SubmitInquiryRequestMutationInput!
) {
  submitInquiryRequestMutation(input: $input) {
    clientMutationId
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input",
    "type": "SubmitInquiryRequestMutationInput!"
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
    "concreteType": "SubmitInquiryRequestMutationPayload",
    "kind": "LinkedField",
    "name": "submitInquiryRequestMutation",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "clientMutationId",
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
    "name": "useInquiryRequestMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useInquiryRequestMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "useInquiryRequestMutation",
    "operationKind": "mutation",
    "text": "mutation useInquiryRequestMutation(\n  $input: SubmitInquiryRequestMutationInput!\n) {\n  submitInquiryRequestMutation(input: $input) {\n    clientMutationId\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ad33908da27698b3181f3806cf302fcb';
export default node;
