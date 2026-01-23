/**
 * @generated SignedSource<<99254e1564030507c7bf925c3f22ea04>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
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
},
v2 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "main"
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:\"main\")"
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "aspectRatio",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "blurhash",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "gene(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "ada6711a7dcfcccad7fd8557203be173",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "gene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "gene.id": (v1/*: any*/),
        "gene.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "gene.image.aspectRatio": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Float"
        },
        "gene.image.blurhash": (v2/*: any*/),
        "gene.image.url": (v2/*: any*/),
        "gene.internalID": (v1/*: any*/),
        "gene.isFollowed": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "gene.name": (v2/*: any*/),
        "gene.slug": (v1/*: any*/)
      }
    },
    "name": "FollowGeneButton_Test_Query",
    "operationKind": "query",
    "text": "query FollowGeneButton_Test_Query {\n  gene(id: \"example\") {\n    ...FollowGeneButton_gene_2OV785\n    id\n  }\n}\n\nfragment FollowGeneButton_gene_2OV785 on Gene {\n  id\n  slug\n  name\n  internalID\n  isFollowed\n  image {\n    url(version: \"main\")\n    aspectRatio\n    blurhash\n  }\n}\n"
  }
};
})();

(node as any).hash = "e30bf14c4d1f3cb99549ba3dcb9a6a9c";

export default node;
