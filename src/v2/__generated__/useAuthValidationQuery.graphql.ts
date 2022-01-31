/**
 * @generated SignedSource<<f41b0d25d37677d87f605402abf74156>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type AuthenticationStatus = "INVALID" | "LOGGED_IN" | "LOGGED_OUT" | "%future added value";
export type useAuthValidationQuery$variables = {};
export type useAuthValidationQuery$data = {
  readonly authenticationStatus: AuthenticationStatus;
};
export type useAuthValidationQuery = {
  variables: useAuthValidationQuery$variables;
  response: useAuthValidationQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "authenticationStatus",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "useAuthValidationQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "useAuthValidationQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "abde732d3af0c5c7ee480209560f6de0",
    "id": null,
    "metadata": {},
    "name": "useAuthValidationQuery",
    "operationKind": "query",
    "text": "query useAuthValidationQuery {\n  authenticationStatus\n}\n"
  }
};
})();

(node as any).hash = "2f2ccc765f2b0623e0c21ddb7e46eb08";

export default node;
