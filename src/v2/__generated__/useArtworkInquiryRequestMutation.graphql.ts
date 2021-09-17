/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SubmitInquiryRequestMutationInput = {
    clientMutationId?: string | null;
    contactGallery?: boolean | null;
    inquireableID: string;
    inquireableType: string;
    message?: string | null;
    questions?: Array<InquiryQuestionInput | null> | null;
};
export type InquiryQuestionInput = {
    details?: string | null;
    questionID: string;
};
export type useArtworkInquiryRequestMutationVariables = {
    input: SubmitInquiryRequestMutationInput;
};
export type useArtworkInquiryRequestMutationResponse = {
    readonly submitInquiryRequestMutation: {
        readonly clientMutationId: string | null;
    } | null;
};
export type useArtworkInquiryRequestMutation = {
    readonly response: useArtworkInquiryRequestMutationResponse;
    readonly variables: useArtworkInquiryRequestMutationVariables;
};



/*
mutation useArtworkInquiryRequestMutation(
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
    "name": "useArtworkInquiryRequestMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useArtworkInquiryRequestMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f169ae8dd1d388d71d4c07843cfebca5",
    "id": null,
    "metadata": {},
    "name": "useArtworkInquiryRequestMutation",
    "operationKind": "mutation",
    "text": "mutation useArtworkInquiryRequestMutation(\n  $input: SubmitInquiryRequestMutationInput!\n) {\n  submitInquiryRequestMutation(input: $input) {\n    clientMutationId\n  }\n}\n"
  }
};
})();
(node as any).hash = '3e8d95650aa3cdddaf88f2f1f2cea86f';
export default node;
