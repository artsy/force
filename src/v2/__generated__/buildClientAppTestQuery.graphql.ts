/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "buildClientAppTestQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "b21d943fb883a7693887b01b773ad5e9",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        }
      }
    },
    "name": "buildClientAppTestQuery",
    "operationKind": "query",
    "text": "query buildClientAppTestQuery {\n  me {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '3c905c887770618ef318f43d80e4b464';
export default node;
