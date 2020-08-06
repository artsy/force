/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type timeQueryVariables = {};
export type timeQueryResponse = {
    readonly system: {
        readonly time: {
            readonly unix: number | null;
        } | null;
    } | null;
};
export type timeQuery = {
    readonly response: timeQueryResponse;
    readonly variables: timeQueryVariables;
};



/*
query timeQuery {
  system {
    time {
      unix
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "system",
    "storageKey": null,
    "args": null,
    "concreteType": "System",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "time",
        "storageKey": null,
        "args": null,
        "concreteType": "SystemTime",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "unix",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "timeQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "timeQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "timeQuery",
    "id": null,
    "text": "query timeQuery {\n  system {\n    time {\n      unix\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '5b825690c273b568243eaa817a5fd0dc';
export default node;
