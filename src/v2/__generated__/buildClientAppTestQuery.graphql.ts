/* tslint:disable */
/* eslint-disable */

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
    "alias": null,
    "args": null,
    "concreteType": "Me",
    "kind": "LinkedField",
    "name": "me",
    "plural": false,
    "selections": [
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "buildClientAppTestQuery",
    "selections": (v0/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "buildClientAppTestQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "buildClientAppTestQuery",
    "operationKind": "query",
    "text": "query buildClientAppTestQuery {\n  me {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ca5ac123598ee572b83f461b5863ce9d';
export default node;
