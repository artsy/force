/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
    "alias": null,
    "args": null,
    "concreteType": "System",
    "kind": "LinkedField",
    "name": "system",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "SystemTime",
        "kind": "LinkedField",
        "name": "time",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "unix",
            "storageKey": null
          }
        ],
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
    "name": "timeQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "timeQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "91e2cf635c0b6d86e89128b7faeb2318",
    "id": null,
    "metadata": {},
    "name": "timeQuery",
    "operationKind": "query",
    "text": "query timeQuery {\n  system {\n    time {\n      unix\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '5b825690c273b568243eaa817a5fd0dc';
export default node;
