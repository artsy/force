/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type exampleRoutes_ExampleQueryVariables = {};
export type exampleRoutes_ExampleQueryResponse = {
    readonly me: {
        readonly id: string;
    } | null;
};
export type exampleRoutes_ExampleQuery = {
    readonly response: exampleRoutes_ExampleQueryResponse;
    readonly variables: exampleRoutes_ExampleQueryVariables;
};



/*
query exampleRoutes_ExampleQuery {
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
    "name": "exampleRoutes_ExampleQuery",
    "selections": (v0/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "exampleRoutes_ExampleQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "exampleRoutes_ExampleQuery",
    "operationKind": "query",
    "text": "query exampleRoutes_ExampleQuery {\n  me {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '198d54b91d38ed37bc65484bf08ab78a';
export default node;
