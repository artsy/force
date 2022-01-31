/**
 * @generated SignedSource<<d53e4938ff8e9c3673bb0d1de0f645af>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type helpersEmailQuery$variables = {
  email: string;
};
export type helpersEmailQuery$data = {
  readonly user: {
    readonly userAlreadyExists: boolean | null;
  } | null;
};
export type helpersEmailQuery = {
  variables: helpersEmailQuery$variables;
  response: helpersEmailQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "email"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "email",
    "variableName": "email"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "userAlreadyExists",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "helpersEmailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "helpersEmailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
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
    ]
  },
  "params": {
    "cacheID": "6134ac24c778172a2433a6d0162fa2ed",
    "id": null,
    "metadata": {},
    "name": "helpersEmailQuery",
    "operationKind": "query",
    "text": "query helpersEmailQuery(\n  $email: String!\n) {\n  user(email: $email) {\n    userAlreadyExists\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "bc3eea69494c29507eb5bf33dfb6c0ad";

export default node;
