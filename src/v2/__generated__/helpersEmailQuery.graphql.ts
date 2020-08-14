/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type helpersEmailQueryVariables = {
    email: string;
};
export type helpersEmailQueryResponse = {
    readonly user: {
        readonly userAlreadyExists: boolean | null;
    } | null;
};
export type helpersEmailQuery = {
    readonly response: helpersEmailQueryResponse;
    readonly variables: helpersEmailQueryVariables;
};



/*
query helpersEmailQuery(
  $email: String!
) {
  user(email: $email) {
    userAlreadyExists
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "email",
    "type": "String!"
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
    "type": "Query"
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
    "id": null,
    "metadata": {},
    "name": "helpersEmailQuery",
    "operationKind": "query",
    "text": "query helpersEmailQuery(\n  $email: String!\n) {\n  user(email: $email) {\n    userAlreadyExists\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bc3eea69494c29507eb5bf33dfb6c0ad';
export default node;
