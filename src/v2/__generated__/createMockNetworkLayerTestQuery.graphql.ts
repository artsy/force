/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type createMockNetworkLayerTestQueryVariables = {};
export type createMockNetworkLayerTestQueryResponse = {
    readonly artwork: {
        readonly id: string;
        readonly title: string | null;
    } | null;
};
export type createMockNetworkLayerTestQuery = {
    readonly response: createMockNetworkLayerTestQueryResponse;
    readonly variables: createMockNetworkLayerTestQueryVariables;
};



/*
query createMockNetworkLayerTestQuery {
  artwork(id: "untitled") {
    id
    title
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "artwork",
    "storageKey": "artwork(id:\"untitled\")",
    "args": [
      {
        "kind": "Literal",
        "name": "id",
        "value": "untitled"
      }
    ],
    "concreteType": "Artwork",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "title",
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
    "name": "createMockNetworkLayerTestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "createMockNetworkLayerTestQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "createMockNetworkLayerTestQuery",
    "id": null,
    "text": "query createMockNetworkLayerTestQuery {\n  artwork(id: \"untitled\") {\n    id\n    title\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'e735fd4b2d3daed26a8c2e227bc1cc5f';
export default node;
