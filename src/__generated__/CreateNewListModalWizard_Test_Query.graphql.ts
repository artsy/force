/**
 * @generated SignedSource<<2c19491e93a804b7e6940166c8f66ea3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CreateNewListModalWizard_Test_Query$variables = {};
export type CreateNewListModalWizard_Test_Query$data = {
  readonly me: {
    readonly collection: {
      readonly artworksConnection: {
        readonly totalCount: number | null;
      } | null;
    } | null;
  } | null;
};
export type CreateNewListModalWizard_Test_Query = {
  response: CreateNewListModalWizard_Test_Query$data;
  variables: CreateNewListModalWizard_Test_Query$variables;
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
    "name": "CreateNewListModalWizard_Test_Query",
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
    "name": "CreateNewListModalWizard_Test_Query",
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
    "cacheID": "12cb5bf67795fbc76257da632921749d",
    "id": null,
    "metadata": {},
    "name": "CreateNewListModalWizard_Test_Query",
    "operationKind": "query",
    "text": "query CreateNewListModalWizard_Test_Query {\n  me {\n    collection(id: \"saved-artwork\") {\n      artworksConnection {\n        totalCount\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "19e057fce55a5c697d2523307c4928f0";

export default node;
