/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeTrendingArtistsRail_Test_QueryVariables = {};
export type HomeTrendingArtistsRail_Test_QueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"HomeTrendingArtistsRail_viewer">;
    } | null;
};
export type HomeTrendingArtistsRail_Test_Query = {
    readonly response: HomeTrendingArtistsRail_Test_QueryResponse;
    readonly variables: HomeTrendingArtistsRail_Test_QueryVariables;
};



/*
query HomeTrendingArtistsRail_Test_Query {
  viewer {
    ...HomeTrendingArtistsRail_viewer
  }
}

fragment EntityHeaderArtist_artist on Artist {
  internalID
  href
  slug
  name
  initials
  formattedNationalityAndBirthday
  counts {
    artworks
    forSaleArtworks
  }
  avatar: image {
    cropped(width: 45, height: 45) {
      src
      srcSet
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

fragment HomeTrendingArtistsRail_viewer on Viewer {
  artistsConnection(sort: TRENDING_DESC, first: 99) {
    edges {
      node {
        ...FollowArtistButton_artist
        ...EntityHeaderArtist_artist
        internalID
        isFollowed
        name
        slug
        href
        formattedNationalityAndBirthday
        image {
          cropped(width: 325, height: 230) {
            src
            srcSet
            width
            height
          }
        }
        id
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v2 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeTrendingArtistsRail_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "HomeTrendingArtistsRail_viewer"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HomeTrendingArtistsRail_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 99
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "TRENDING_DESC"
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
                        "name": "internalID",
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
                        "name": "slug",
                        "storageKey": null
                      },
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
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "artworks",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "forSaleArtworks",
                            "storageKey": null
                          }
                        ],
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
                        "name": "initials",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "formattedNationalityAndBirthday",
                        "storageKey": null
                      },
                      {
                        "alias": "avatar",
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
                                "value": 45
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 45
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": [
                              (v0/*: any*/),
                              (v1/*: any*/)
                            ],
                            "storageKey": "cropped(height:45,width:45)"
                          }
                        ],
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
                              (v0/*: any*/),
                              (v1/*: any*/),
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
                            "storageKey": "cropped(height:230,width:325)"
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
            "storageKey": "artistsConnection(first:99,sort:\"TRENDING_DESC\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b749d93e30d3d5e43fb07c4ff3e840e7",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.artistsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistConnection"
        },
        "viewer.artistsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtistEdge"
        },
        "viewer.artistsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "viewer.artistsConnection.edges.node.avatar": (v2/*: any*/),
        "viewer.artistsConnection.edges.node.avatar.cropped": (v3/*: any*/),
        "viewer.artistsConnection.edges.node.avatar.cropped.src": (v4/*: any*/),
        "viewer.artistsConnection.edges.node.avatar.cropped.srcSet": (v4/*: any*/),
        "viewer.artistsConnection.edges.node.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistCounts"
        },
        "viewer.artistsConnection.edges.node.counts.artworks": (v5/*: any*/),
        "viewer.artistsConnection.edges.node.counts.follows": (v5/*: any*/),
        "viewer.artistsConnection.edges.node.counts.forSaleArtworks": (v5/*: any*/),
        "viewer.artistsConnection.edges.node.formattedNationalityAndBirthday": (v6/*: any*/),
        "viewer.artistsConnection.edges.node.href": (v6/*: any*/),
        "viewer.artistsConnection.edges.node.id": (v7/*: any*/),
        "viewer.artistsConnection.edges.node.image": (v2/*: any*/),
        "viewer.artistsConnection.edges.node.image.cropped": (v3/*: any*/),
        "viewer.artistsConnection.edges.node.image.cropped.height": (v8/*: any*/),
        "viewer.artistsConnection.edges.node.image.cropped.src": (v4/*: any*/),
        "viewer.artistsConnection.edges.node.image.cropped.srcSet": (v4/*: any*/),
        "viewer.artistsConnection.edges.node.image.cropped.width": (v8/*: any*/),
        "viewer.artistsConnection.edges.node.initials": (v6/*: any*/),
        "viewer.artistsConnection.edges.node.internalID": (v7/*: any*/),
        "viewer.artistsConnection.edges.node.isFollowed": (v9/*: any*/),
        "viewer.artistsConnection.edges.node.is_followed": (v9/*: any*/),
        "viewer.artistsConnection.edges.node.name": (v6/*: any*/),
        "viewer.artistsConnection.edges.node.slug": (v7/*: any*/)
      }
    },
    "name": "HomeTrendingArtistsRail_Test_Query",
    "operationKind": "query",
    "text": "query HomeTrendingArtistsRail_Test_Query {\n  viewer {\n    ...HomeTrendingArtistsRail_viewer\n  }\n}\n\nfragment EntityHeaderArtist_artist on Artist {\n  internalID\n  href\n  slug\n  name\n  initials\n  formattedNationalityAndBirthday\n  counts {\n    artworks\n    forSaleArtworks\n  }\n  avatar: image {\n    cropped(width: 45, height: 45) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment FollowArtistButton_artist on Artist {\n  id\n  internalID\n  name\n  slug\n  is_followed: isFollowed\n  counts {\n    follows\n  }\n}\n\nfragment HomeTrendingArtistsRail_viewer on Viewer {\n  artistsConnection(sort: TRENDING_DESC, first: 99) {\n    edges {\n      node {\n        ...FollowArtistButton_artist\n        ...EntityHeaderArtist_artist\n        internalID\n        isFollowed\n        name\n        slug\n        href\n        formattedNationalityAndBirthday\n        image {\n          cropped(width: 325, height: 230) {\n            src\n            srcSet\n            width\n            height\n          }\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '576106e6e2155f43eb26a3c6386095aa';
export default node;
