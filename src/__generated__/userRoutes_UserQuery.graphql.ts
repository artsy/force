/**
 * @generated SignedSource<<0d6495b1ead691e7b4bbbd75f2ed10e4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type userRoutes_UserQuery$variables = {
  userId: string;
};
export type userRoutes_UserQuery$data = {
  readonly user: {
    readonly " $fragmentSpreads": FragmentRefs<"UserCollectionRoute_user">;
  } | null | undefined;
};
export type userRoutes_UserQuery = {
  response: userRoutes_UserQuery$data;
  variables: userRoutes_UserQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "userId"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "userRoutes_UserQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UserCollectionRoute_user"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "userRoutes_UserQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
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
    "cacheID": "0a4a36757f80c033f5669894e781bfb3",
    "id": null,
    "metadata": {},
    "name": "userRoutes_UserQuery",
    "operationKind": "query",
    "text": "query userRoutes_UserQuery(\n  $userId: String!\n) {\n  user(id: $userId) {\n    ...UserCollectionRoute_user\n    id\n  }\n}\n\nfragment UserCollectionRoute_user on User {\n  id\n}\n"
  }
};
})();

(node as any).hash = "dedc2f29c1e0f684ca54b154cab0d35c";

export default node;
