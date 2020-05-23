/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type buildServerAppTestQueryVariables = {};
export type buildServerAppTestQueryResponse = {
    readonly me: {
        readonly id: string;
    } | null;
};
export type buildServerAppTestQuery = {
    readonly response: buildServerAppTestQueryResponse;
    readonly variables: buildServerAppTestQueryVariables;
};



/*
query buildServerAppTestQuery {
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
    "name": "buildServerAppTestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "buildServerAppTestQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "buildServerAppTestQuery",
    "id": null,
    "text": "query buildServerAppTestQuery {\n  me {\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'd34e9263d0745de3f84fb7f2be7855c7';
export default node;
