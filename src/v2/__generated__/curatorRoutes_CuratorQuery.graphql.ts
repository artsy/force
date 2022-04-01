/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type curatorRoutes_CuratorQueryVariables = {};
export type curatorRoutes_CuratorQueryResponse = {
    readonly artworks: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly artist: {
                    readonly name: string | null;
                    readonly href: string | null;
                } | null;
                readonly href: string | null;
                readonly imageUrl: string | null;
                readonly image: {
                    readonly width: number | null;
                    readonly height: number | null;
                } | null;
                readonly title: string | null;
                readonly isSaved: boolean | null;
                readonly id: string;
                readonly slug: string;
                readonly internalID: string;
            } | null;
        } | null> | null;
    } | null;
};
export type curatorRoutes_CuratorQuery = {
    readonly response: curatorRoutes_CuratorQueryResponse;
    readonly variables: curatorRoutes_CuratorQueryVariables;
};



/*
query curatorRoutes_CuratorQuery {
  artworks: artworksConnection(first: 10) {
    edges {
      node {
        artist {
          name
          href
          id
        }
        href
        imageUrl
        image {
          width
          height
        }
        title
        isSaved
        id
        slug
        internalID
      }
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "imageUrl",
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
    }
  ],
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isSaved",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "curatorRoutes_CuratorQuery",
    "selections": [
      {
        "alias": "artworks",
        "args": (v0/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artist",
                    "kind": "LinkedField",
                    "name": "artist",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "artworksConnection(first:10)"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "curatorRoutes_CuratorQuery",
    "selections": [
      {
        "alias": "artworks",
        "args": (v0/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artist",
                    "kind": "LinkedField",
                    "name": "artist",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v2/*: any*/),
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v7/*: any*/)
        ],
        "storageKey": "artworksConnection(first:10)"
      }
    ]
  },
  "params": {
    "cacheID": "75d7fb86ad9084b7ed2555955b192435",
    "id": null,
    "metadata": {},
    "name": "curatorRoutes_CuratorQuery",
    "operationKind": "query",
    "text": "query curatorRoutes_CuratorQuery {\n  artworks: artworksConnection(first: 10) {\n    edges {\n      node {\n        artist {\n          name\n          href\n          id\n        }\n        href\n        imageUrl\n        image {\n          width\n          height\n        }\n        title\n        isSaved\n        id\n        slug\n        internalID\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ea6b91be00199ba5ab15c0a90641ffb8';
export default node;
