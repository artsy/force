/**
 * @generated SignedSource<<0afe23e69b63dc32adae146541bc71ff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CreateNewListModalWizardQuery$variables = {};
export type CreateNewListModalWizardQuery$data = {
  readonly me: {
    readonly collection: {
      readonly artworksConnection: {
        readonly totalCount: number | null;
      } | null;
    } | null;
  } | null;
};
export type CreateNewListModalWizardQuery = {
  response: CreateNewListModalWizardQuery$data;
  variables: CreateNewListModalWizardQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "saved-artwork"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "concreteType": "ArtworkConnection",
  "kind": "LinkedField",
  "name": "artworksConnection",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalCount",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateNewListModalWizardQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v0/*: any*/),
            "concreteType": "Collection",
            "kind": "LinkedField",
            "name": "collection",
            "plural": false,
            "selections": [
              (v1/*: any*/)
            ],
            "storageKey": "collection(id:\"saved-artwork\")"
          }
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
    "name": "CreateNewListModalWizardQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v0/*: any*/),
            "concreteType": "Collection",
            "kind": "LinkedField",
            "name": "collection",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": "collection(id:\"saved-artwork\")"
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2ee84ebb149c110039cc30cad673b0d1",
    "id": null,
    "metadata": {},
    "name": "CreateNewListModalWizardQuery",
    "operationKind": "query",
    "text": "query CreateNewListModalWizardQuery {\n  me {\n    collection(id: \"saved-artwork\") {\n      artworksConnection {\n        totalCount\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "f438cf41edeb321d509411beaa4d5e76";

export default node;
