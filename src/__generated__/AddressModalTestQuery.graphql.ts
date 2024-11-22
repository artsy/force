/**
 * @generated SignedSource<<97a7b953336490bf76b4a87cb311a7e1>>
 * @relayHash eac7d336c233bb012cfa500991bb3ed7
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID eac7d336c233bb012cfa500991bb3ed7

import { ConcreteRequest, Query } from 'relay-runtime';
export type AddressModalTestQuery$variables = Record<PropertyKey, never>;
export type AddressModalTestQuery$data = {
  readonly _unused: {
    readonly name: string | null | undefined;
  } | null | undefined;
};
export type AddressModalTestQuery = {
  response: AddressModalTestQuery$data;
  variables: AddressModalTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "whocare"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AddressModalTestQuery",
    "selections": [
      {
        "alias": "_unused",
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v1/*: any*/)
        ],
        "storageKey": "artist(id:\"whocare\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AddressModalTestQuery",
    "selections": [
      {
        "alias": "_unused",
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "artist(id:\"whocare\")"
      }
    ]
  },
  "params": {
    "id": "eac7d336c233bb012cfa500991bb3ed7",
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "_unused": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "_unused.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "_unused.name": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        }
      }
    },
    "name": "AddressModalTestQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "f324dfe97aaee9357b4cb6c344df9ca7";

export default node;
