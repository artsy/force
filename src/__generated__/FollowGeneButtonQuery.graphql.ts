/**
 * @generated SignedSource<<6db422d477efd3f9b37d521ffacb1c45>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FollowGeneButtonQuery$variables = {
  id: string;
  isLoggedIn: boolean;
};
export type FollowGeneButtonQuery$data = {
  readonly gene: {
    readonly " $fragmentSpreads": FragmentRefs<"FollowGeneButton_gene">;
  } | null | undefined;
};
export type FollowGeneButtonQuery = {
  response: FollowGeneButtonQuery$data;
  variables: FollowGeneButtonQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "isLoggedIn"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FollowGeneButtonQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Gene",
        "kind": "LinkedField",
        "name": "gene",
        "plural": false,
        "selections": [
          {
            "args": [
              {
                "kind": "Variable",
                "name": "isLoggedIn",
                "variableName": "isLoggedIn"
              }
            ],
            "kind": "FragmentSpread",
            "name": "FollowGeneButton_gene"
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
    "name": "FollowGeneButtonQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Gene",
        "kind": "LinkedField",
        "name": "gene",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
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
            "kind": "ScalarField",
            "name": "internalID",
            "storageKey": null
          },
          {
            "condition": "isLoggedIn",
            "kind": "Condition",
            "passingValue": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isFollowed",
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8c7c5558867414c43413ce9818030b69",
    "id": null,
    "metadata": {},
    "name": "FollowGeneButtonQuery",
    "operationKind": "query",
    "text": "query FollowGeneButtonQuery(\n  $id: String!\n  $isLoggedIn: Boolean!\n) {\n  gene(id: $id) {\n    ...FollowGeneButton_gene_4dcqWc\n    id\n  }\n}\n\nfragment FollowGeneButton_gene_4dcqWc on Gene {\n  id\n  slug\n  name\n  internalID\n  isFollowed @include(if: $isLoggedIn)\n}\n"
  }
};
})();

(node as any).hash = "03f266c04c0445d31031110e9942f7d8";

export default node;
