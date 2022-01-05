/* tslint:disable */
/* eslint-disable */

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
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v1 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v2 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v3 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v4 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": false
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
    "type": "Query"
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
                        "kind": "ScalarField",
                        "name": "href",
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
                                "name": "src",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "srcSet",
                                "storageKey": null
                              },
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
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "type": "Viewer",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.artistsConnection": {
          "type": "ArtistConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.artistsConnection.edges": {
          "type": "ArtistEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "viewer.artistsConnection.edges.node": {
          "type": "Artist",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.artistsConnection.edges.node.internalID": (v0/*: any*/),
        "viewer.artistsConnection.edges.node.isFollowed": (v1/*: any*/),
        "viewer.artistsConnection.edges.node.name": (v2/*: any*/),
        "viewer.artistsConnection.edges.node.slug": (v0/*: any*/),
        "viewer.artistsConnection.edges.node.href": (v2/*: any*/),
        "viewer.artistsConnection.edges.node.formattedNationalityAndBirthday": (v2/*: any*/),
        "viewer.artistsConnection.edges.node.image": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.artistsConnection.edges.node.id": (v0/*: any*/),
        "viewer.artistsConnection.edges.node.is_followed": (v1/*: any*/),
        "viewer.artistsConnection.edges.node.counts": {
          "type": "ArtistCounts",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.artistsConnection.edges.node.image.cropped": {
          "type": "CroppedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.artistsConnection.edges.node.counts.follows": {
          "type": "FormattedNumber",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.artistsConnection.edges.node.image.cropped.src": (v3/*: any*/),
        "viewer.artistsConnection.edges.node.image.cropped.srcSet": (v3/*: any*/),
        "viewer.artistsConnection.edges.node.image.cropped.width": (v4/*: any*/),
        "viewer.artistsConnection.edges.node.image.cropped.height": (v4/*: any*/)
      }
    },
    "name": "HomeTrendingArtistsRail_Test_Query",
    "operationKind": "query",
    "text": "query HomeTrendingArtistsRail_Test_Query {\n  viewer {\n    ...HomeTrendingArtistsRail_viewer\n  }\n}\n\nfragment FollowArtistButton_artist on Artist {\n  id\n  internalID\n  name\n  slug\n  is_followed: isFollowed\n  counts {\n    follows\n  }\n}\n\nfragment HomeTrendingArtistsRail_viewer on Viewer {\n  artistsConnection(sort: TRENDING_DESC, first: 99) {\n    edges {\n      node {\n        ...FollowArtistButton_artist\n        internalID\n        isFollowed\n        name\n        slug\n        href\n        formattedNationalityAndBirthday\n        image {\n          cropped(width: 325, height: 230) {\n            src\n            srcSet\n            width\n            height\n          }\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '576106e6e2155f43eb26a3c6386095aa';
export default node;
