/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ConfirmPasswordInput = {
    clientMutationId?: string | null | undefined;
    password: string;
};
export type ConfirmPasswordMutationVariables = {
    input: ConfirmPasswordInput;
};
export type ConfirmPasswordMutationResponse = {
    readonly confirmPassword: {
        readonly valid: boolean;
    } | null;
};
export type ConfirmPasswordMutationRawResponse = {
    readonly confirmPassword: ({
        readonly valid: boolean;
    }) | null;
};
export type ConfirmPasswordMutation = {
    readonly response: ConfirmPasswordMutationResponse;
    readonly variables: ConfirmPasswordMutationVariables;
    readonly rawResponse: ConfirmPasswordMutationRawResponse;
};



/*
mutation ConfirmPasswordMutation(
  $input: ConfirmPasswordInput!
) {
  confirmPassword(input: $input) {
    valid
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
    "concreteType": "ConfirmPasswordPayload",
    "kind": "LinkedField",
    "name": "confirmPassword",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "valid",
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
    "name": "ConfirmPasswordMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ConfirmPasswordMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "17c95e53e5559d703015b84ac558ffaa",
    "id": null,
    "metadata": {},
    "name": "ConfirmPasswordMutation",
    "operationKind": "mutation",
    "text": "mutation ConfirmPasswordMutation(\n  $input: ConfirmPasswordInput!\n) {\n  confirmPassword(input: $input) {\n    valid\n  }\n}\n"
  }
};
})();
(node as any).hash = '46d7950299cac02f7f6c0044677b485d';
export default node;
