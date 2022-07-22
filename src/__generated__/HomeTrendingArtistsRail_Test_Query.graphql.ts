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

fragment CellArtist_artist on Artist {
  ...EntityHeaderArtist_artist
  internalID
  slug
  name
  href
  initials
  image {
    cropped(width: 445, height: 334, version: ["normalized", "larger", "large"]) {
      src
      srcSet
    }
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

fragment HomeTrendingArtistsRail_viewer on Viewer {
  artistsConnection(sort: TRENDING_DESC, first: 99) {
    edges {
      node {
        ...CellArtist_artist
        internalID
        slug
        id
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
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
v1 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v2 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
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
                        "name": "name",
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
                            "selections": (v0/*: any*/),
                            "storageKey": "cropped(height:45,width:45)"
                          }
                        ],
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
                                "value": 334
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
                                "value": 445
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": (v0/*: any*/),
                            "storageKey": "cropped(height:334,version:[\"normalized\",\"larger\",\"large\"],width:445)"
                          }
                        ],
                        "storageKey": null
                      },
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
    "cacheID": "4472d98d5bad863ac5281c93bc155e99",
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
        "viewer.artistsConnection.edges.node.avatar": (v1/*: any*/),
        "viewer.artistsConnection.edges.node.avatar.cropped": (v2/*: any*/),
        "viewer.artistsConnection.edges.node.avatar.cropped.src": (v3/*: any*/),
        "viewer.artistsConnection.edges.node.avatar.cropped.srcSet": (v3/*: any*/),
        "viewer.artistsConnection.edges.node.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistCounts"
        },
        "viewer.artistsConnection.edges.node.counts.artworks": (v4/*: any*/),
        "viewer.artistsConnection.edges.node.counts.forSaleArtworks": (v4/*: any*/),
        "viewer.artistsConnection.edges.node.formattedNationalityAndBirthday": (v5/*: any*/),
        "viewer.artistsConnection.edges.node.href": (v5/*: any*/),
        "viewer.artistsConnection.edges.node.id": (v6/*: any*/),
        "viewer.artistsConnection.edges.node.image": (v1/*: any*/),
        "viewer.artistsConnection.edges.node.image.cropped": (v2/*: any*/),
        "viewer.artistsConnection.edges.node.image.cropped.src": (v3/*: any*/),
        "viewer.artistsConnection.edges.node.image.cropped.srcSet": (v3/*: any*/),
        "viewer.artistsConnection.edges.node.initials": (v5/*: any*/),
        "viewer.artistsConnection.edges.node.internalID": (v6/*: any*/),
        "viewer.artistsConnection.edges.node.name": (v5/*: any*/),
        "viewer.artistsConnection.edges.node.slug": (v6/*: any*/)
      }
    },
    "name": "HomeTrendingArtistsRail_Test_Query",
    "operationKind": "query",
    "text": "query HomeTrendingArtistsRail_Test_Query {\n  viewer {\n    ...HomeTrendingArtistsRail_viewer\n  }\n}\n\nfragment CellArtist_artist on Artist {\n  ...EntityHeaderArtist_artist\n  internalID\n  slug\n  name\n  href\n  initials\n  image {\n    cropped(width: 445, height: 334, version: [\"normalized\", \"larger\", \"large\"]) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment EntityHeaderArtist_artist on Artist {\n  internalID\n  href\n  slug\n  name\n  initials\n  formattedNationalityAndBirthday\n  counts {\n    artworks\n    forSaleArtworks\n  }\n  avatar: image {\n    cropped(width: 45, height: 45) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment HomeTrendingArtistsRail_viewer on Viewer {\n  artistsConnection(sort: TRENDING_DESC, first: 99) {\n    edges {\n      node {\n        ...CellArtist_artist\n        internalID\n        slug\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '576106e6e2155f43eb26a3c6386095aa';
export default node;
