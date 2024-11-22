/**
 * @generated SignedSource<<8e8d025fa9cdb4dcbfaa478514b46913>>
 * @relayHash 54cf4fae1b4bfb8aa44405e0651d74a8
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 54cf4fae1b4bfb8aa44405e0651d74a8

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FollowGeneButton_Test_Query$variables = Record<PropertyKey, never>;
export type FollowGeneButton_Test_Query$data = {
  readonly gene: {
    readonly " $fragmentSpreads": FragmentRefs<"FollowGeneButton_gene">;
  } | null | undefined;
};
export type FollowGeneButton_Test_Query = {
  response: FollowGeneButton_Test_Query$data;
  variables: FollowGeneButton_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FollowGeneButton_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Gene",
        "kind": "LinkedField",
        "name": "gene",
        "plural": false,
        "selections": [
          {
            "args": [
              {
                "kind": "Literal",
                "name": "isLoggedIn",
                "value": true
              }
            ],
            "kind": "FragmentSpread",
            "name": "FollowGeneButton_gene"
          }
        ],
        "storageKey": "gene(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FollowGeneButton_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isFollowed",
            "storageKey": null
          }
        ],
        "storageKey": "gene(id:\"example\")"
      }
    ]
  },
  "params": {
    "id": "54cf4fae1b4bfb8aa44405e0651d74a8",
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "gene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "gene.id": (v1/*: any*/),
        "gene.internalID": (v1/*: any*/),
        "gene.isFollowed": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "gene.name": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "gene.slug": (v1/*: any*/)
      }
    },
    "name": "FollowGeneButton_Test_Query",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "e30bf14c4d1f3cb99549ba3dcb9a6a9c";

export default node;
