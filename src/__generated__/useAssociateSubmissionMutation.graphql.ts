/**
 * @generated SignedSource<<b8338587d3150008fa2016d5c0e2abe3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AddUserToSubmissionMutationInput = {
  clientMutationId?: string | null | undefined;
  id: string;
};
export type useAssociateSubmissionMutation$variables = {
  input: AddUserToSubmissionMutationInput;
};
export type useAssociateSubmissionMutation$data = {
  readonly addUserToSubmission: {
    readonly clientMutationId: string | null | undefined;
  } | null | undefined;
};
export type useAssociateSubmissionMutation = {
  response: useAssociateSubmissionMutation$data;
  variables: useAssociateSubmissionMutation$variables;
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
    "concreteType": "AddUserToSubmissionMutationPayload",
    "kind": "LinkedField",
    "name": "addUserToSubmission",
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
    "name": "useAssociateSubmissionMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useAssociateSubmissionMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d2fc6ab769cf03ef3f5ea9e702893461",
    "id": null,
    "metadata": {},
    "name": "useAssociateSubmissionMutation",
    "operationKind": "mutation",
    "text": "mutation useAssociateSubmissionMutation(\n  $input: AddUserToSubmissionMutationInput!\n) {\n  addUserToSubmission(input: $input) {\n    clientMutationId\n  }\n}\n"
  }
};
})();

(node as any).hash = "1ff210dae781b61a1b3effc7df1169f0";

export default node;
