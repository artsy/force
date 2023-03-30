/**
 * @generated SignedSource<<c121d0ea77c6a7c82677f118b15c3a98>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type RetrospectiveYourArtTasteQuery$variables = {
  geneID: string;
  medium: string;
  rarity: ReadonlyArray<string | null>;
};
export type RetrospectiveYourArtTasteQuery$data = {
  readonly artworksConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly href: string | null;
        readonly image: {
          readonly resized: {
            readonly height: number | null;
            readonly src: string;
            readonly srcSet: string;
            readonly width: number | null;
          } | null;
        } | null;
        readonly title: string | null;
      } | null;
    } | null> | null;
  } | null;
};
export type RetrospectiveYourArtTasteQuery = {
  response: RetrospectiveYourArtTasteQuery$data;
  variables: RetrospectiveYourArtTasteQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "geneID"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "medium"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "rarity"
},
v3 = [
  {
    "kind": "Variable",
    "name": "attributionClass",
    "variableName": "rarity"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 50
  },
  {
    "kind": "Variable",
    "name": "geneID",
    "variableName": "geneID"
  },
  {
    "kind": "Variable",
    "name": "medium",
    "variableName": "medium"
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "-merchandisability"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v6 = {
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
          "value": 200
        },
        {
          "kind": "Literal",
          "name": "version",
          "value": [
            "larger",
            "large"
          ]
        }
      ],
      "concreteType": "ResizedImageUrl",
      "kind": "LinkedField",
      "name": "resized",
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
      "storageKey": "resized(height:200,version:[\"larger\",\"large\"])"
    }
  ],
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "RetrospectiveYourArtTasteQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "FilterArtworksConnection",
        "kind": "LinkedField",
        "name": "artworksConnection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "FilterArtworksEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Artwork",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
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
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "RetrospectiveYourArtTasteQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "FilterArtworksConnection",
        "kind": "LinkedField",
        "name": "artworksConnection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "FilterArtworksEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Artwork",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "67609e0c1d28d68f129dde8dd386d874",
    "id": null,
    "metadata": {},
    "name": "RetrospectiveYourArtTasteQuery",
    "operationKind": "query",
    "text": "query RetrospectiveYourArtTasteQuery(\n  $medium: String!\n  $geneID: String!\n  $rarity: [String]!\n) {\n  artworksConnection(first: 50, medium: $medium, geneID: $geneID, attributionClass: $rarity, sort: \"-merchandisability\") {\n    edges {\n      node {\n        title\n        href\n        image {\n          resized(height: 200, version: [\"larger\", \"large\"]) {\n            width\n            height\n            src\n            srcSet\n          }\n        }\n        id\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "23a1908c96bb362af028ac07d46cc330";

export default node;
