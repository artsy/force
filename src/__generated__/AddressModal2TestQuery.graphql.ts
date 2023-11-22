/**
 * @generated SignedSource<<34fdde24b564bea3a6e4f5fb41852a34>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type AddressModal2TestQuery$variables = Record<PropertyKey, never>;
export type AddressModal2TestQuery$data = {
  readonly _unused: {
    readonly name: string | null | undefined;
  } | null | undefined;
};
export type AddressModal2TestQuery = {
  response: AddressModal2TestQuery$data;
  variables: AddressModal2TestQuery$variables;
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
    "name": "AddressModal2TestQuery",
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
    "name": "AddressModal2TestQuery",
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
    "cacheID": "183979d8a78785afa924dd92b817d07c",
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
    "name": "AddressModal2TestQuery",
    "operationKind": "query",
    "text": "query AddressModal2TestQuery {\n  _unused: artist(id: \"whocare\") {\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "b982ae8ea6d38ee099b7e60f49ce3b87";

export default node;
