/**
 * @generated SignedSource<<e6388f8e8a6e5aac15f7e9c0a189f2c8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistCurrentArticlesRail_Test_Query$variables = {};
export type ArtistCurrentArticlesRail_Test_Query$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistCurrentArticlesRail_artist">;
  } | null;
};
export type ArtistCurrentArticlesRail_Test_Query = {
  variables: ArtistCurrentArticlesRail_Test_Query$variables;
  response: ArtistCurrentArticlesRail_Test_Query$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "test"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
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
  "name": "id",
  "storageKey": null
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistCurrentArticlesRail_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistCurrentArticlesRail_artist"
          }
        ],
        "storageKey": "artist(id:\"test\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtistCurrentArticlesRail_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 10
              },
              {
                "kind": "Literal",
                "name": "inEditorialFeed",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "PUBLISHED_AT_DESC"
              }
            ],
            "concreteType": "ArticleConnection",
            "kind": "LinkedField",
            "name": "articlesConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArticleEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Article",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v2/*: any*/),
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
                        "name": "thumbnailTitle",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "format",
                            "value": "MMM Do, YYYY"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "publishedAt",
                        "storageKey": "publishedAt(format:\"MMM Do, YYYY\")"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "thumbnailImage",
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
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "articlesConnection(first:10,inEditorialFeed:true,sort:\"PUBLISHED_AT_DESC\")"
          },
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": "artist(id:\"test\")"
      }
    ]
  },
  "params": {
    "cacheID": "d1dd826dff83de2467027b30ba325afb",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "artist.articlesConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleConnection"
        },
        "artist.articlesConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArticleEdge"
        },
        "artist.articlesConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Article"
        },
        "artist.articlesConnection.edges.node.href": (v4/*: any*/),
        "artist.articlesConnection.edges.node.id": (v5/*: any*/),
        "artist.articlesConnection.edges.node.internalID": (v5/*: any*/),
        "artist.articlesConnection.edges.node.publishedAt": (v4/*: any*/),
        "artist.articlesConnection.edges.node.slug": (v4/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "artist.articlesConnection.edges.node.thumbnailImage.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "artist.articlesConnection.edges.node.thumbnailImage.cropped.height": (v6/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.cropped.src": (v7/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.cropped.srcSet": (v7/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.cropped.width": (v6/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailTitle": (v4/*: any*/),
        "artist.id": (v5/*: any*/),
        "artist.internalID": (v5/*: any*/),
        "artist.name": (v4/*: any*/),
        "artist.slug": (v5/*: any*/)
      }
    },
    "name": "ArtistCurrentArticlesRail_Test_Query",
    "operationKind": "query",
    "text": "query ArtistCurrentArticlesRail_Test_Query {\n  artist(id: \"test\") {\n    ...ArtistCurrentArticlesRail_artist\n    id\n  }\n}\n\nfragment ArtistCurrentArticlesRail_artist on Artist {\n  articlesConnection(first: 10, sort: PUBLISHED_AT_DESC, inEditorialFeed: true) {\n    edges {\n      node {\n        internalID\n        slug\n        href\n        thumbnailTitle\n        publishedAt(format: \"MMM Do, YYYY\")\n        thumbnailImage {\n          cropped(width: 325, height: 230) {\n            width\n            height\n            src\n            srcSet\n          }\n        }\n        id\n      }\n    }\n  }\n  internalID\n  name\n  slug\n}\n"
  }
};
})();

(node as any).hash = "657c4df676abd28381caff8e95e67023";

export default node;
