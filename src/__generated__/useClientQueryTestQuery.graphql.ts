/**
 * @generated SignedSource<<2e46fa712454a6f5c6f1b53d04f0b1f6>>
 * @relayHash 249bc7811c01aa3a1496127742d32f2c
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 249bc7811c01aa3a1496127742d32f2c

import { ConcreteRequest, Query } from 'relay-runtime';
export type useClientQueryTestQuery$variables = Record<PropertyKey, never>;
export type useClientQueryTestQuery$data = {
  readonly artwork: {
    readonly id: string;
  } | null | undefined;
};
export type useClientQueryTestQuery = {
  response: useClientQueryTestQuery$data;
  variables: useClientQueryTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "id",
        "value": "example"
      }
    ],
    "concreteType": "Artwork",
    "kind": "LinkedField",
    "name": "artwork",
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
    "storageKey": "artwork(id:\"example\")"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "useClientQueryTestQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "useClientQueryTestQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "249bc7811c01aa3a1496127742d32f2c",
    "metadata": {},
    "name": "useClientQueryTestQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "1f1804ac5386052514c401be9e665e7a";

export default node;
