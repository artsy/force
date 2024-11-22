/**
 * @generated SignedSource<<8dc33c7e5f06adffd5a600e50b78440a>>
 * @relayHash 1f0454408f898044b1b23cffbe01146f
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 1f0454408f898044b1b23cffbe01146f

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AddUserToSubmissionMutationInput = {
  clientMutationId?: string | null | undefined;
  id: string;
};
export type AuthIntentAssociateSubmissionMutation$variables = {
  input: AddUserToSubmissionMutationInput;
};
export type AuthIntentAssociateSubmissionMutation$data = {
  readonly addUserToSubmission: {
    readonly consignmentSubmission: {
      readonly internalID: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type AuthIntentAssociateSubmissionMutation$rawResponse = {
  readonly addUserToSubmission: {
    readonly consignmentSubmission: {
      readonly id: string;
      readonly internalID: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type AuthIntentAssociateSubmissionMutation = {
  rawResponse: AuthIntentAssociateSubmissionMutation$rawResponse;
  response: AuthIntentAssociateSubmissionMutation$data;
  variables: AuthIntentAssociateSubmissionMutation$variables;
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
    "name": "AuthIntentAssociateSubmissionMutation",
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
    "name": "AuthIntentAssociateSubmissionMutation",
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
    "id": "1f0454408f898044b1b23cffbe01146f",
    "metadata": {},
    "name": "AuthIntentAssociateSubmissionMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "4ca993b00e81df3e48c09706d7e76de1";

export default node;
