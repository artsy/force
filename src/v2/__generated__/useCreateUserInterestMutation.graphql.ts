/**
 * @generated SignedSource<<aff1c8123fc5fef66f0450245906278e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UserInterestCategory = "COLLECTED_BEFORE" | "INTERESTED_IN_COLLECTING" | "%future added value";
export type UserInterestInterestType = "ARTIST" | "GENE" | "%future added value";
export type CreateUserInterestMutationInput = {
  anonymousSessionId?: string | null;
  body?: string | null;
  category: UserInterestCategory;
  clientMutationId?: string | null;
  interestId: string;
  interestType: UserInterestInterestType;
  sessionID?: string | null;
};
export type useCreateUserInterestMutation$variables = {
  input: CreateUserInterestMutationInput;
};
export type useCreateUserInterestMutation$data = {
  readonly createUserInterest: {
    readonly clientMutationId: string | null;
  } | null;
};
export type useCreateUserInterestMutation = {
  variables: useCreateUserInterestMutation$variables;
  response: useCreateUserInterestMutation$data;
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

(node as any).hash = "7f5bf40c5ad5bde76689681e8b3787f5";

export default node;
