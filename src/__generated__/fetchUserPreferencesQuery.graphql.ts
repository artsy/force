/**
 * @generated SignedSource<<16fb78736c9f22e819f42db8777b3175>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
    "cacheID": "6629daf159af50f7e1cc97aa8a41f428",
    "id": null,
    "metadata": {},
    "name": "fetchUserPreferencesQuery",
    "operationKind": "query",
    "text": "query fetchUserPreferencesQuery {\n  me {\n    lengthUnitPreference\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "3b561d0da012a9e902e3237f942c6b80";

export default node;
