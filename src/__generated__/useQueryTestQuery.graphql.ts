/**
 * @generated SignedSource<<92e71b6205ff62217fe32ef66b75f792>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type useQueryTestQuery$variables = {};
export type useQueryTestQuery$data = {
  readonly artwork: {
    readonly id: string;
  } | null;
};
export type useQueryTestQuery = {
  response: useQueryTestQuery$data;
  variables: useQueryTestQuery$variables;
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
    "name": "useQueryTestQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "useQueryTestQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "92df5a7bbee7373e3e18a3f2d24163de",
    "id": null,
    "metadata": {},
    "name": "useQueryTestQuery",
    "operationKind": "query",
    "text": "query useQueryTestQuery {\n  artwork(id: \"example\") {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "a01b68c8bcd00a77f59a283837617044";

export default node;
