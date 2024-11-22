/**
 * @generated SignedSource<<c36ba0d7e687b722de40f9f02996c39f>>
 * @relayHash d40af8102a19f44dea2bd6699a1a52ed
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID d40af8102a19f44dea2bd6699a1a52ed

import { ConcreteRequest, Query } from 'relay-runtime';
export type SavedAddressesTestQuery$variables = Record<PropertyKey, never>;
export type SavedAddressesTestQuery$data = {
  readonly me: {
    readonly email: string | null | undefined;
  } | null | undefined;
};
export type SavedAddressesTestQuery = {
  response: SavedAddressesTestQuery$data;
  variables: SavedAddressesTestQuery$variables;
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
    "name": "SavedAddressesTestQuery",
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
    "name": "SavedAddressesTestQuery",
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
    "id": "d40af8102a19f44dea2bd6699a1a52ed",
    "metadata": {},
    "name": "SavedAddressesTestQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "1a6c0ba8fe55459138403740bd174de0";

export default node;
