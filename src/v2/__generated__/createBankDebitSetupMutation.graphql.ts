/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CreateBankDebitSetupInput = {
    clientMutationId?: string | null;
    paymentMethodTypes: Array<string>;
};
export type createBankDebitSetupMutationVariables = {
    input: CreateBankDebitSetupInput;
};
export type createBankDebitSetupMutationResponse = {
    readonly createBankDebitSetup: {
        readonly clientSecret: string;
    } | null;
};
export type createBankDebitSetupMutation = {
    readonly response: createBankDebitSetupMutationResponse;
    readonly variables: createBankDebitSetupMutationVariables;
};



/*
mutation createBankDebitSetupMutation(
  $input: CreateBankDebitSetupInput!
) {
  createBankDebitSetup(input: $input) {
    clientSecret
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
    "concreteType": "CreateBankDebitSetupPayload",
    "kind": "LinkedField",
    "name": "createBankDebitSetup",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "clientSecret",
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
    "name": "createBankDebitSetupMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "createBankDebitSetupMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1c27621fdb798c7fbe0df09a84ce5bb5",
    "id": null,
    "metadata": {},
    "name": "createBankDebitSetupMutation",
    "operationKind": "mutation",
    "text": "mutation createBankDebitSetupMutation(\n  $input: CreateBankDebitSetupInput!\n) {\n  createBankDebitSetup(input: $input) {\n    clientSecret\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd2bdb40cbd3f6d000a779f30a3e9ac40';
export default node;
