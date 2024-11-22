/**
 * @generated SignedSource<<ba35ac9075f847f5c251388fa1ff00ec>>
 * @relayHash 17c95e53e5559d703015b84ac558ffaa
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 17c95e53e5559d703015b84ac558ffaa

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ConfirmPasswordInput = {
  clientMutationId?: string | null | undefined;
  password: string;
};
export type ConfirmPasswordMutation$variables = {
  input: ConfirmPasswordInput;
};
export type ConfirmPasswordMutation$data = {
  readonly confirmPassword: {
    readonly valid: boolean;
  } | null | undefined;
};
export type ConfirmPasswordMutation$rawResponse = {
  readonly confirmPassword: {
    readonly valid: boolean;
  } | null | undefined;
};
export type ConfirmPasswordMutation = {
  rawResponse: ConfirmPasswordMutation$rawResponse;
  response: ConfirmPasswordMutation$data;
  variables: ConfirmPasswordMutation$variables;
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
    "id": "17c95e53e5559d703015b84ac558ffaa",
    "metadata": {},
    "name": "ConfirmPasswordMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "46d7950299cac02f7f6c0044677b485d";

export default node;
