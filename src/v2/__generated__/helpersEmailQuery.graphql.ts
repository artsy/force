/* tslint:disable */

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
    "kind": "LocalArgument",
    "name": "email",
    "type": "String!",
    "defaultValue": null
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
  "kind": "ScalarField",
  "alias": null,
  "name": "userAlreadyExists",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "helpersEmailQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "helpersEmailQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "helpersEmailQuery",
    "id": null,
    "text": "query helpersEmailQuery(\n  $email: String!\n) {\n  user(email: $email) {\n    userAlreadyExists\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'bc3eea69494c29507eb5bf33dfb6c0ad';
export default node;
