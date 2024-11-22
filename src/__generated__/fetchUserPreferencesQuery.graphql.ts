/**
 * @generated SignedSource<<a370fb81bfe94387c50b1e76b97bbc81>>
 * @relayHash 6629daf159af50f7e1cc97aa8a41f428
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 6629daf159af50f7e1cc97aa8a41f428

import { ConcreteRequest, Query } from 'relay-runtime';
export type LengthUnitPreference = "CM" | "IN" | "%future added value";
export type fetchUserPreferencesQuery$variables = Record<PropertyKey, never>;
export type fetchUserPreferencesQuery$data = {
  readonly me: {
    readonly lengthUnitPreference: LengthUnitPreference;
  } | null | undefined;
};
export type fetchUserPreferencesQuery = {
  response: fetchUserPreferencesQuery$data;
  variables: fetchUserPreferencesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lengthUnitPreference",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "fetchUserPreferencesQuery",
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
    "name": "fetchUserPreferencesQuery",
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
    "id": "6629daf159af50f7e1cc97aa8a41f428",
    "metadata": {},
    "name": "fetchUserPreferencesQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "3b561d0da012a9e902e3237f942c6b80";

export default node;
