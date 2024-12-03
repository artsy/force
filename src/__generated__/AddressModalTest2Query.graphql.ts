/**
 * @generated SignedSource<<793b726658daae5c6bbca00b42e1456e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type AddressModalTest2Query$variables = Record<PropertyKey, never>;
export type AddressModalTest2Query$data = {
  readonly _unused: {
    readonly name: string | null | undefined;
  } | null | undefined;
};
export type AddressModalTest2Query = {
  response: AddressModalTest2Query$data;
  variables: AddressModalTest2Query$variables;
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
    "name": "AddressModalTest2Query",
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
    "name": "AddressModalTest2Query",
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
    "cacheID": "54f6d22b70561ec790e643d3e6509109",
    "id": null,
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
    "name": "AddressModalTest2Query",
    "operationKind": "query",
    "text": "query AddressModalTest2Query {\n  _unused: artist(id: \"whocare\") {\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "3a1f5a7c40b15a812a5292185fad5187";

export default node;
