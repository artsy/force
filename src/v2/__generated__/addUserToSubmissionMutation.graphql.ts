/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AddUserToSubmissionMutationInput = {
    clientMutationId?: string | null;
    id: string;
};
export type addUserToSubmissionMutationVariables = {
    input: AddUserToSubmissionMutationInput;
};
export type addUserToSubmissionMutationResponse = {
    readonly addUserToSubmission: {
        readonly consignmentSubmission: {
            readonly internalID: string | null;
        } | null;
    } | null;
};
export type addUserToSubmissionMutation = {
    readonly response: addUserToSubmissionMutationResponse;
    readonly variables: addUserToSubmissionMutationVariables;
};



/*
mutation addUserToSubmissionMutation(
  $input: AddUserToSubmissionMutationInput!
) {
  addUserToSubmission(input: $input) {
    consignmentSubmission {
      internalID
      id
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
(node as any).hash = 'a6a0f697494fd47c1189c1852ab893fa';
export default node;
