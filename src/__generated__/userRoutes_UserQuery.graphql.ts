/**
 * @generated SignedSource<<ac5e410df19201e6e4d6af89ddb82568>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type userRoutes_UserQuery$variables = {
  collectionID: string;
  userID: string;
};
export type userRoutes_UserQuery$data = {
  readonly collection: {
    readonly " $fragmentSpreads": FragmentRefs<"UserCollectionRoute_collection">;
  } | null | undefined;
};
export type userRoutes_UserQuery = {
  response: userRoutes_UserQuery$data;
  variables: userRoutes_UserQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "collectionID"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "userID"
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "collectionID"
  },
  {
    "kind": "Variable",
    "name": "userID",
    "variableName": "userID"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "userRoutes_UserQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Collection",
        "kind": "LinkedField",
        "name": "collection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UserCollectionRoute_collection"
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "userRoutes_UserQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Collection",
        "kind": "LinkedField",
        "name": "collection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "internalID",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
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
    "cacheID": "90c2d87ae5acdf1de96a22c77d858cb2",
    "id": null,
    "metadata": {},
    "name": "userRoutes_UserQuery",
    "operationKind": "query",
    "text": "query userRoutes_UserQuery(\n  $userID: String!\n  $collectionID: String!\n) {\n  collection(id: $collectionID, userID: $userID) {\n    ...UserCollectionRoute_collection\n    id\n  }\n}\n\nfragment UserCollectionRoute_collection on Collection {\n  internalID\n  name\n  artworksConnection {\n    totalCount\n  }\n}\n"
  }
};
})();

(node as any).hash = "a748eb480e7982ed96f20706d52e4783";

export default node;
