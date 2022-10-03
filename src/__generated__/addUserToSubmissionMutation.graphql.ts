/**
 * @generated SignedSource<<4ffe2b95113bd15d50c9d4dce282e5e1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AddUserToSubmissionMutationInput = {
  clientMutationId?: string | null;
  id: string;
};
export type addUserToSubmissionMutation$variables = {
  input: AddUserToSubmissionMutationInput;
};
export type addUserToSubmissionMutation$data = {
  readonly addUserToSubmission: {
    readonly consignmentSubmission: {
      readonly internalID: string | null;
    } | null;
  } | null;
};
export type addUserToSubmissionMutation = {
  response: addUserToSubmissionMutation$data;
  variables: addUserToSubmissionMutation$variables;
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
  "name": "internalID",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "addUserToSubmissionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AddUserToSubmissionMutationPayload",
        "kind": "LinkedField",
        "name": "addUserToSubmission",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ConsignmentSubmission",
            "kind": "LinkedField",
            "name": "consignmentSubmission",
            "plural": false,
            "selections": [
              (v2/*: any*/)
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
    "name": "addUserToSubmissionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AddUserToSubmissionMutationPayload",
        "kind": "LinkedField",
        "name": "addUserToSubmission",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ConsignmentSubmission",
            "kind": "LinkedField",
            "name": "consignmentSubmission",
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "471cabd3fefad3811aa07e659eceb0ff",
    "id": null,
    "metadata": {},
    "name": "addUserToSubmissionMutation",
    "operationKind": "mutation",
    "text": "mutation addUserToSubmissionMutation(\n  $input: AddUserToSubmissionMutationInput!\n) {\n  addUserToSubmission(input: $input) {\n    consignmentSubmission {\n      internalID\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a6a0f697494fd47c1189c1852ab893fa";

export default node;
