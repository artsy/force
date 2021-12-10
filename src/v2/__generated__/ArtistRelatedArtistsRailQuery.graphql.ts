/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistRelatedArtistsRailQueryVariables = {
    slug: string;
};
export type ArtistRelatedArtistsRailQueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistRelatedArtistsRail_artist">;
    } | null;
};
export type ArtistRelatedArtistsRailQuery = {
    readonly response: ArtistRelatedArtistsRailQueryResponse;
    readonly variables: ArtistRelatedArtistsRailQueryVariables;
};



/*
query ArtistRelatedArtistsRailQuery(
  $slug: String!
) {
  artist(id: $slug) {
    ...ArtistRelatedArtistsRail_artist
    id
  }
}

fragment ArtistRelatedArtistsRail_artist on Artist {
  name
  href
  related {
    artistsConnection(kind: MAIN, first: 20) {
      edges {
        node {
          ...FollowArtistButton_artist
          name
          href
          internalID
          isFollowed
          slug
          nationality
          birthday
          filterArtworksConnection(sort: "-weighted_iconicity", first: 1) {
            edges {
              node {
                internalID
                slug
                image {
                  cropped(width: 325, height: 230) {
                    width
                    height
                    src
                    srcSet
                  }
                }
                id
              }
            }
            id
          }
          image {
            cropped(width: 50, height: 50) {
              url
            }
          }
          id
        }
      }
    }
  }
}

fragment FollowArtistButton_artist on Artist {
  id
  internalID
  name
  slug
  is_followed: isFollowed
  counts {
    follows
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistRelatedArtistsRailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistRelatedArtistsRail_artist"
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
    "name": "ArtistRelatedArtistsRailQuery",
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
            "alias": null,
            "args": null,
            "concreteType": "ArtistRelatedData",
            "kind": "LinkedField",
            "name": "related",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 20
                  },
                  {
                    "kind": "Literal",
                    "name": "kind",
                    "value": "MAIN"
                  }
                ],
                "concreteType": "ArtistConnection",
                "kind": "LinkedField",
                "name": "artistsConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ArtistEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          (v5/*: any*/),
                          (v2/*: any*/),
                          (v6/*: any*/),
                          {
                            "alias": "is_followed",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isFollowed",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ArtistCounts",
                            "kind": "LinkedField",
                            "name": "counts",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "follows",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v3/*: any*/),
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
                            "kind": "ScalarField",
                            "name": "nationality",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "birthday",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "first",
                                "value": 1
                              },
                              {
                                "kind": "Literal",
                                "name": "sort",
                                "value": "-weighted_iconicity"
                              }
                            ],
                            "concreteType": "FilterArtworksConnection",
                            "kind": "LinkedField",
                            "name": "filterArtworksConnection",
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
                                      (v5/*: any*/),
                                      (v6/*: any*/),
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
                                                "name": "height",
                                                "value": 230
                                              },
                                              {
                                                "kind": "Literal",
                                                "name": "width",
                                                "value": 325
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
                                            "storageKey": "cropped(height:230,width:325)"
                                          }
                                        ],
                                        "storageKey": null
                                      },
                                      (v4/*: any*/)
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              (v4/*: any*/)
                            ],
                            "storageKey": "filterArtworksConnection(first:1,sort:\"-weighted_iconicity\")"
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
                                    "name": "height",
                                    "value": 50
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 50
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
                                    "name": "url",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": "cropped(height:50,width:50)"
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
                ],
                "storageKey": "artistsConnection(first:20,kind:\"MAIN\")"
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c6a3c3ca50f9a0cf61c6bc5a65785508",
    "id": null,
    "metadata": {},
    "name": "ArtistRelatedArtistsRailQuery",
    "operationKind": "query",
    "text": "query ArtistRelatedArtistsRailQuery(\n  $slug: String!\n) {\n  artist(id: $slug) {\n    ...ArtistRelatedArtistsRail_artist\n    id\n  }\n}\n\nfragment ArtistRelatedArtistsRail_artist on Artist {\n  name\n  href\n  related {\n    artistsConnection(kind: MAIN, first: 20) {\n      edges {\n        node {\n          ...FollowArtistButton_artist\n          name\n          href\n          internalID\n          isFollowed\n          slug\n          nationality\n          birthday\n          filterArtworksConnection(sort: \"-weighted_iconicity\", first: 1) {\n            edges {\n              node {\n                internalID\n                slug\n                image {\n                  cropped(width: 325, height: 230) {\n                    width\n                    height\n                    src\n                    srcSet\n                  }\n                }\n                id\n              }\n            }\n            id\n          }\n          image {\n            cropped(width: 50, height: 50) {\n              url\n            }\n          }\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment FollowArtistButton_artist on Artist {\n  id\n  internalID\n  name\n  slug\n  is_followed: isFollowed\n  counts {\n    follows\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b1c36c43ce75912bdf69405f7b37dd92';
export default node;
