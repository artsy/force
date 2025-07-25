/**
 * @generated SignedSource<<288c3ef8b9d51d1f01310c97de0dfe6a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type serverRouterQuery$variables = Record<PropertyKey, never>;
export type serverRouterQuery$data = {
  readonly me: {
    readonly id: string;
  } | null | undefined;
};
export type serverRouterQuery = {
  response: serverRouterQuery$data;
  variables: serverRouterQuery$variables;
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
    "name": "serverRouterQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "serverRouterQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "dadb12eaa3008fce6aa88943470f6f22",
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
    "name": "serverRouterQuery",
    "operationKind": "query",
    "text": "query serverRouterQuery {\n  me {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "3f3fa4f1feb46e1824dca4fd0ee6ddf9";

export default node;
