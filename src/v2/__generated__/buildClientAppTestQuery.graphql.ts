/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type buildClientAppTestQueryVariables = {};
export type buildClientAppTestQueryResponse = {
    readonly me: {
        readonly id: string;
    } | null;
};
export type buildClientAppTestQuery = {
    readonly response: buildClientAppTestQueryResponse;
    readonly variables: buildClientAppTestQueryVariables;
};



/*
query buildClientAppTestQuery {
  me {
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "me",
    "storageKey": null,
    "args": null,
    "concreteType": "Me",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "buildClientAppTestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "buildClientAppTestQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "buildClientAppTestQuery",
    "id": null,
    "text": "query buildClientAppTestQuery {\n  me {\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'ca5ac123598ee572b83f461b5863ce9d';
export default node;
