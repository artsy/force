/**
 * @generated SignedSource<<10511062a1dda46fcedd8efe56498b97>>
 * @relayHash d2fc6ab769cf03ef3f5ea9e702893461
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID d2fc6ab769cf03ef3f5ea9e702893461

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
    "id": "d2fc6ab769cf03ef3f5ea9e702893461",
    "metadata": {},
    "name": "useAssociateSubmissionMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "1ff210dae781b61a1b3effc7df1169f0";

export default node;
