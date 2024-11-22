/**
 * @generated SignedSource<<c1268905203426ddef08e4902620e8e5>>
 * @relayHash 91e2cf635c0b6d86e89128b7faeb2318
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 91e2cf635c0b6d86e89128b7faeb2318

import { ConcreteRequest, Query } from 'relay-runtime';
export type timeQuery$variables = Record<PropertyKey, never>;
export type timeQuery$data = {
  readonly system: {
    readonly time: {
      readonly unix: number | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type timeQuery = {
  response: timeQuery$data;
  variables: timeQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "System",
    "kind": "LinkedField",
    "name": "system",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "SystemTime",
        "kind": "LinkedField",
        "name": "time",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "unix",
            "storageKey": null
          }
        ],
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
    "name": "timeQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "timeQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "91e2cf635c0b6d86e89128b7faeb2318",
    "metadata": {},
    "name": "timeQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "5b825690c273b568243eaa817a5fd0dc";

export default node;
