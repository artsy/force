/**
 * @generated SignedSource<<018c1ad750aa6c05d2238356ea489015>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type buildServerAppTestQuery$variables = {};
export type buildServerAppTestQuery$data = {
  readonly me: {
    readonly id: string;
  } | null;
};
export type buildServerAppTestQuery = {
  variables: buildServerAppTestQuery$variables;
  response: buildServerAppTestQuery$data;
};

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
    "name": "buildServerAppTestQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "buildServerAppTestQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "59a7359c797c58e73d055e96eca311f1",
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
    "name": "buildServerAppTestQuery",
    "operationKind": "query",
    "text": "query buildServerAppTestQuery {\n  me {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "9e4e27bbc46d09e8de447d782682b1c0";

export default node;
