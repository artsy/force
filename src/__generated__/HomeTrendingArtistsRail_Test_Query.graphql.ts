/**
 * @generated SignedSource<<46410162cdfa7420b8dcabf4a118682d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeTrendingArtistsRail_Test_Query$variables = Record<PropertyKey, never>;
export type HomeTrendingArtistsRail_Test_Query$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"HomeTrendingArtistsRail_viewer">;
  } | null | undefined;
};
export type HomeTrendingArtistsRail_Test_Query = {
  response: HomeTrendingArtistsRail_Test_Query$data;
  variables: HomeTrendingArtistsRail_Test_Query$variables;
};

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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
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
                "value": 20
              }
            ],
            "concreteType": "ArtistConnection",
            "kind": "LinkedField",
            "name": "curatedTrendingArtists",
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
                        "alias": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "kind": "LinkedField",
                        "name": "coverArtwork",
                        "plural": false,
                        "selections": [
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
                          (v1/*: any*/),
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
                                "storageKey": "cropped(height:334,version:[\"larger\",\"large\"],width:445)"
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "curatedTrendingArtists(first:20)"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "df10e58ec8852aee3b15b95cdb018794",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.curatedTrendingArtists": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistConnection"
        },
        "viewer.curatedTrendingArtists.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtistEdge"
        },
        "viewer.curatedTrendingArtists.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "viewer.curatedTrendingArtists.edges.node.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistCounts"
        },
        "viewer.curatedTrendingArtists.edges.node.counts.artworks": (v2/*: any*/),
        "viewer.curatedTrendingArtists.edges.node.counts.forSaleArtworks": (v2/*: any*/),
        "viewer.curatedTrendingArtists.edges.node.coverArtwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "viewer.curatedTrendingArtists.edges.node.coverArtwork.avatar": (v3/*: any*/),
        "viewer.curatedTrendingArtists.edges.node.coverArtwork.avatar.cropped": (v4/*: any*/),
        "viewer.curatedTrendingArtists.edges.node.coverArtwork.avatar.cropped.src": (v5/*: any*/),
        "viewer.curatedTrendingArtists.edges.node.coverArtwork.avatar.cropped.srcSet": (v5/*: any*/),
        "viewer.curatedTrendingArtists.edges.node.coverArtwork.id": (v6/*: any*/),
        "viewer.curatedTrendingArtists.edges.node.coverArtwork.image": (v3/*: any*/),
        "viewer.curatedTrendingArtists.edges.node.coverArtwork.image.cropped": (v4/*: any*/),
        "viewer.curatedTrendingArtists.edges.node.coverArtwork.image.cropped.src": (v5/*: any*/),
        "viewer.curatedTrendingArtists.edges.node.coverArtwork.image.cropped.srcSet": (v5/*: any*/),
        "viewer.curatedTrendingArtists.edges.node.formattedNationalityAndBirthday": (v7/*: any*/),
        "viewer.curatedTrendingArtists.edges.node.href": (v7/*: any*/),
        "viewer.curatedTrendingArtists.edges.node.id": (v6/*: any*/),
        "viewer.curatedTrendingArtists.edges.node.initials": (v7/*: any*/),
        "viewer.curatedTrendingArtists.edges.node.internalID": (v6/*: any*/),
        "viewer.curatedTrendingArtists.edges.node.name": (v7/*: any*/),
        "viewer.curatedTrendingArtists.edges.node.slug": (v6/*: any*/)
      }
    },
    "name": "HomeTrendingArtistsRail_Test_Query",
    "operationKind": "query",
    "text": "query HomeTrendingArtistsRail_Test_Query {\n  viewer {\n    ...HomeTrendingArtistsRail_viewer\n  }\n}\n\nfragment CellArtist_artist on Artist {\n  ...EntityHeaderArtist_artist\n  internalID\n  slug\n  name\n  href\n  initials\n  coverArtwork {\n    image {\n      cropped(width: 445, height: 334, version: [\"larger\", \"large\"]) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment EntityHeaderArtist_artist on Artist {\n  internalID\n  href\n  slug\n  name\n  initials\n  formattedNationalityAndBirthday\n  counts {\n    artworks\n    forSaleArtworks\n  }\n  coverArtwork {\n    avatar: image {\n      cropped(width: 45, height: 45) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment HomeTrendingArtistsRail_viewer on Viewer {\n  curatedTrendingArtists(first: 20) {\n    edges {\n      node {\n        ...CellArtist_artist\n        internalID\n        slug\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "576106e6e2155f43eb26a3c6386095aa";

export default node;
