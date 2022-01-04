/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type AuthenticationStatus = "INVALID" | "LOGGED_IN" | "LOGGED_OUT" | "%future added value";
export type useAuthValidationQueryVariables = {};
export type useAuthValidationQueryResponse = {
    readonly authenticationStatus: AuthenticationStatus;
};
export type useAuthValidationQuery = {
    readonly response: useAuthValidationQueryResponse;
    readonly variables: useAuthValidationQueryVariables;
};



/*
query useAuthValidationQuery {
  authenticationStatus
}
*/

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
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "useAuthValidationQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "useAuthValidationQuery",
    "operationKind": "query",
    "text": "query useAuthValidationQuery {\n  authenticationStatus\n}\n"
  }
};
})();
(node as any).hash = '2f2ccc765f2b0623e0c21ddb7e46eb08';
export default node;
