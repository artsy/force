/**
 * @generated SignedSource<<855eaf7cab27aef8c148581c0a77900d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type RetrospectiveTopGenesQuery$variables = {
  ids: ReadonlyArray<string>;
};
export type RetrospectiveTopGenesQuery$data = {
  readonly genes: ReadonlyArray<{
    readonly image: {
      readonly cropped: {
        readonly height: number;
        readonly src: string;
        readonly srcSet: string;
        readonly width: number;
      } | null;
    } | null;
    readonly name: string | null;
    readonly slug: string;
  } | null> | null;
};
export type RetrospectiveTopGenesQuery = {
  response: RetrospectiveTopGenesQuery$data;
  variables: RetrospectiveTopGenesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "ids"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slugs",
    "variableName": "ids"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
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
          "name": "height",
          "value": 100
        },
        {
          "kind": "Literal",
          "name": "version",
          "value": [
            "big_and_tall",
            "square500",
            "tall"
          ]
        },
        {
          "kind": "Literal",
          "name": "width",
          "value": 100
        }
      ],
      "concreteType": "CroppedImageUrl",
      "kind": "LinkedField",
      "name": "cropped",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "width",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "height",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "src",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "srcSet",
          "storageKey": null
        }
      ],
      "storageKey": "cropped(height:100,version:[\"big_and_tall\",\"square500\",\"tall\"],width:100)"
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RetrospectiveTopGenesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Gene",
        "kind": "LinkedField",
        "name": "genes",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/)
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
    "name": "RetrospectiveTopGenesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Gene",
        "kind": "LinkedField",
        "name": "genes",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
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
    "cacheID": "cebd6ded1a70dd1877695cf9230e48ac",
    "id": null,
    "metadata": {},
    "name": "RetrospectiveTopGenesQuery",
    "operationKind": "query",
    "text": "query RetrospectiveTopGenesQuery(\n  $ids: [String!]!\n) {\n  genes(slugs: $ids) {\n    slug\n    name\n    image {\n      cropped(width: 100, height: 100, version: [\"big_and_tall\", \"square500\", \"tall\"]) {\n        width\n        height\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "5fb60cf8398ec3b09f156974000e5763";

export default node;
