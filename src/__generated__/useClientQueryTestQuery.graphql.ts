/**
 * @generated SignedSource<<21b7a64f8a07552b1ed62ca5d535c88f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
    "cacheID": "249bc7811c01aa3a1496127742d32f2c",
    "id": null,
    "metadata": {},
    "name": "useClientQueryTestQuery",
    "operationKind": "query",
    "text": "query useClientQueryTestQuery {\n  artwork(id: \"example\") {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "1f1804ac5386052514c401be9e665e7a";

export default node;
