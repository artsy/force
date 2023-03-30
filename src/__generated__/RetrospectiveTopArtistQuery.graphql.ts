/**
 * @generated SignedSource<<8504c9dbc169f5c07c270355cfcdcb63>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type RetrospectiveTopArtistQuery$variables = {
  id: string;
};
export type RetrospectiveTopArtistQuery$data = {
  readonly artist: {
    readonly iconicArtworks: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly dominantColors: ReadonlyArray<string>;
          readonly image: {
            readonly resized: {
              readonly height: number | null;
              readonly src: string;
              readonly srcSet: string;
              readonly width: number | null;
            } | null;
          } | null;
        } | null;
      } | null> | null;
    } | null;
    readonly name: string | null;
    readonly slug: string;
  } | null;
};
export type RetrospectiveTopArtistQuery = {
  response: RetrospectiveTopArtistQuery$data;
  variables: RetrospectiveTopArtistQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
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
v4 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "ICONICITY_DESC"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "dominantColors",
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
          "value": 500
        },
        {
          "kind": "Literal",
          "name": "version",
          "value": [
            "normalized",
            "larger",
            "large"
          ]
        },
        {
          "kind": "Literal",
          "name": "width",
          "value": 600
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
      "storageKey": "resized(height:500,version:[\"normalized\",\"larger\",\"large\"],width:600)"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RetrospectiveTopArtistQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": "iconicArtworks",
            "args": (v4/*: any*/),
            "concreteType": "ArtworkConnection",
            "kind": "LinkedField",
            "name": "artworksConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtworkEdge",
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
                      (v5/*: any*/),
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "artworksConnection(first:1,sort:\"ICONICITY_DESC\")"
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
    "name": "RetrospectiveTopArtistQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": "iconicArtworks",
            "args": (v4/*: any*/),
            "concreteType": "ArtworkConnection",
            "kind": "LinkedField",
            "name": "artworksConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtworkEdge",
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
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "artworksConnection(first:1,sort:\"ICONICITY_DESC\")"
          },
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "71eda9473308260709f4131945cc1b30",
    "id": null,
    "metadata": {},
    "name": "RetrospectiveTopArtistQuery",
    "operationKind": "query",
    "text": "query RetrospectiveTopArtistQuery(\n  $id: String!\n) {\n  artist(id: $id) {\n    slug\n    name\n    iconicArtworks: artworksConnection(first: 1, sort: ICONICITY_DESC) {\n      edges {\n        node {\n          dominantColors\n          image {\n            resized(width: 600, height: 500, version: [\"normalized\", \"larger\", \"large\"]) {\n              width\n              height\n              src\n              srcSet\n            }\n          }\n          id\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "fbe6515eedd53640fd000ebc2df67076";

export default node;
