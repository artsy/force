/**
 * @generated SignedSource<<31356a1f16bf12c00dcd76302b790728>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TrendingSearchesQuery$variables = {
  artistIds?: ReadonlyArray<string | null | undefined> | null | undefined;
  artworkIds?: ReadonlyArray<string | null | undefined> | null | undefined;
};
export type TrendingSearchesQuery$data = {
  readonly artists: ReadonlyArray<{
    readonly coverArtwork: {
      readonly image: {
        readonly cropped: {
          readonly src: string;
          readonly srcSet: string;
        } | null | undefined;
      } | null | undefined;
    } | null | undefined;
    readonly href: string | null | undefined;
    readonly initials: string | null | undefined;
    readonly internalID: string;
    readonly name: string | null | undefined;
    readonly slug: string;
  } | null | undefined> | null | undefined;
  readonly artworks: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly href: string | null | undefined;
        readonly image: {
          readonly cropped: {
            readonly src: string;
            readonly srcSet: string;
          } | null | undefined;
        } | null | undefined;
        readonly internalID: string;
        readonly slug: string;
        readonly title: string | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
};
export type TrendingSearchesQuery = {
  response: TrendingSearchesQuery$data;
  variables: TrendingSearchesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistIds"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artworkIds"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "ids",
    "variableName": "artistIds"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
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
  "kind": "ScalarField",
  "name": "initials",
  "storageKey": null
},
v7 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "square",
    "small",
    "large"
  ]
},
v8 = [
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
v9 = {
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
          "value": 80
        },
        (v7/*: any*/),
        {
          "kind": "Literal",
          "name": "width",
          "value": 80
        }
      ],
      "concreteType": "CroppedImageUrl",
      "kind": "LinkedField",
      "name": "cropped",
      "plural": false,
      "selections": (v8/*: any*/),
      "storageKey": "cropped(height:80,version:[\"square\",\"small\",\"large\"],width:80)"
    }
  ],
  "storageKey": null
},
v10 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 50
  },
  {
    "kind": "Variable",
    "name": "ids",
    "variableName": "artworkIds"
  },
  {
    "kind": "Literal",
    "name": "respectParamsOrder",
    "value": true
  }
],
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v12 = {
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
          "value": 184
        },
        (v7/*: any*/),
        {
          "kind": "Literal",
          "name": "width",
          "value": 184
        }
      ],
      "concreteType": "CroppedImageUrl",
      "kind": "LinkedField",
      "name": "cropped",
      "plural": false,
      "selections": (v8/*: any*/),
      "storageKey": "cropped(height:184,version:[\"square\",\"small\",\"large\"],width:184)"
    }
  ],
  "storageKey": null
},
v13 = {
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
    "name": "TrendingSearchesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artists",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Artwork",
            "kind": "LinkedField",
            "name": "coverArtwork",
            "plural": false,
            "selections": [
              (v9/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v10/*: any*/),
        "concreteType": "ArtworkConnection",
        "kind": "LinkedField",
        "name": "artworks",
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
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v5/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/)
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TrendingSearchesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artists",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Artwork",
            "kind": "LinkedField",
            "name": "coverArtwork",
            "plural": false,
            "selections": [
              (v9/*: any*/),
              (v13/*: any*/)
            ],
            "storageKey": null
          },
          (v13/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v10/*: any*/),
        "concreteType": "ArtworkConnection",
        "kind": "LinkedField",
        "name": "artworks",
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
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v5/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6657d2a4d42af13b7be30f7c86bc95db",
    "id": null,
    "metadata": {},
    "name": "TrendingSearchesQuery",
    "operationKind": "query",
    "text": "query TrendingSearchesQuery(\n  $artistIds: [String]\n  $artworkIds: [String]\n) {\n  artists(ids: $artistIds) {\n    internalID\n    slug\n    name\n    href\n    initials\n    coverArtwork {\n      image {\n        cropped(width: 80, height: 80, version: [\"square\", \"small\", \"large\"]) {\n          src\n          srcSet\n        }\n      }\n      id\n    }\n    id\n  }\n  artworks(ids: $artworkIds, first: 50, respectParamsOrder: true) {\n    edges {\n      node {\n        internalID\n        slug\n        href\n        title\n        image {\n          cropped(width: 184, height: 184, version: [\"square\", \"small\", \"large\"]) {\n            src\n            srcSet\n          }\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0bf2e48a97a334d24fc832792b890676";

export default node;
