/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UserInterestCategory = "COLLECTED_BEFORE" | "INTERESTED_IN_COLLECTING" | "%future added value";
export type UserInterestInterestType = "ARTIST" | "GENE" | "%future added value";
export type CreateUserInterestMutationInput = {
    anonymousSessionId?: string | null | undefined;
    body?: string | null | undefined;
    category: UserInterestCategory;
    clientMutationId?: string | null | undefined;
    interestId: string;
    interestType: UserInterestInterestType;
    sessionID?: string | null | undefined;
};
export type useCreateUserInterestMutationVariables = {
    input: CreateUserInterestMutationInput;
};
export type useCreateUserInterestMutationResponse = {
    readonly createUserInterest: {
        readonly clientMutationId: string | null;
    } | null;
};
export type useCreateUserInterestMutation = {
    readonly response: useCreateUserInterestMutationResponse;
    readonly variables: useCreateUserInterestMutationVariables;
};



/*
mutation useCreateUserInterestMutation(
  $input: CreateUserInterestMutationInput!
) {
  createUserInterest(input: $input) {
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
    "concreteType": "CreateUserInterestMutationPayload",
    "kind": "LinkedField",
    "name": "createUserInterest",
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
    "name": "useCreateUserInterestMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useCreateUserInterestMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "26d06dec6d7e0a2344adf861126f02cd",
    "id": null,
    "metadata": {},
    "name": "useCreateUserInterestMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateUserInterestMutation(\n  $input: CreateUserInterestMutationInput!\n) {\n  createUserInterest(input: $input) {\n    clientMutationId\n  }\n}\n"
  }
};
})();
(node as any).hash = '7f5bf40c5ad5bde76689681e8b3787f5';
export default node;
