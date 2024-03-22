/**
 * @generated SignedSource<<3cf17b2b6f6661e2c54c350ffec876f6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type SavedAddresses2TestQuery$variables = Record<PropertyKey, never>;
export type SavedAddresses2TestQuery$data = {
  readonly me: {
    readonly email: string | null | undefined;
  } | null | undefined;
};
export type SavedAddresses2TestQuery = {
  response: SavedAddresses2TestQuery$data;
  variables: SavedAddresses2TestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SavedAddresses2TestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SavedAddresses2TestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "1e1737887acbe95487e9e6ed4ad5a72c",
    "id": null,
    "metadata": {},
    "name": "SavedAddresses2TestQuery",
    "operationKind": "query",
    "text": "query SavedAddresses2TestQuery {\n  me {\n    email\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "e2d5609866e74bb1c1c13043e7933472";

export default node;
