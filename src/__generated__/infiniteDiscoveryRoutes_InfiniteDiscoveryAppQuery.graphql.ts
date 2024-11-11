/**
 * @generated SignedSource<<184f753f73547b5ecf9eff5cd0eb25df>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type infiniteDiscoveryRoutes_InfiniteDiscoveryAppQuery$variables = {
  userId: string;
};
export type infiniteDiscoveryRoutes_InfiniteDiscoveryAppQuery$data = {
  readonly discoverArtworks: {
    readonly " $fragmentSpreads": FragmentRefs<"InfiniteDiscoveryApp_artworks">;
  } | null | undefined;
};
export type infiniteDiscoveryRoutes_InfiniteDiscoveryAppQuery = {
  response: infiniteDiscoveryRoutes_InfiniteDiscoveryAppQuery$data;
  variables: infiniteDiscoveryRoutes_InfiniteDiscoveryAppQuery$variables;
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
    "kind": "Literal",
    "name": "useRelatedArtworks",
    "value": true
  },
  {
    "kind": "Variable",
    "name": "userId",
    "variableName": "userId"
  }
],
v2 = {
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
    "name": "infiniteDiscoveryRoutes_InfiniteDiscoveryAppQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ArtworkConnection",
        "kind": "LinkedField",
        "name": "discoverArtworks",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "InfiniteDiscoveryApp_artworks"
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
    "name": "infiniteDiscoveryRoutes_InfiniteDiscoveryAppQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ArtworkConnection",
        "kind": "LinkedField",
        "name": "discoverArtworks",
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artist",
                    "kind": "LinkedField",
                    "name": "artist",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "name",
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "title",
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
                            "value": [
                              "large"
                            ]
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "url",
                        "storageKey": "url(version:[\"large\"])"
                      }
                    ],
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
                    "name": "href",
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
                    "name": "isSaved",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isDisliked",
                    "storageKey": null
                  }
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
    "cacheID": "480dbb175376b0389751b9d0516cbe12",
    "id": null,
    "metadata": {},
    "name": "infiniteDiscoveryRoutes_InfiniteDiscoveryAppQuery",
    "operationKind": "query",
    "text": "query infiniteDiscoveryRoutes_InfiniteDiscoveryAppQuery(\n  $userId: String!\n) {\n  discoverArtworks(userId: $userId, useRelatedArtworks: true) {\n    ...InfiniteDiscoveryApp_artworks\n  }\n}\n\nfragment InfiniteDiscoveryApp_artwork on Artwork {\n  artist {\n    name\n    id\n  }\n  title\n  image {\n    url(version: [\"large\"])\n  }\n  id\n  internalID\n  href\n  slug\n  isSaved\n}\n\nfragment InfiniteDiscoveryApp_artworks on ArtworkConnection {\n  edges {\n    node {\n      id\n      ...InfiniteDiscoveryApp_artwork\n      internalID\n      slug\n      isDisliked\n      isSaved\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "404d750248f16f2b9bc4db69b2c40bb2";

export default node;
