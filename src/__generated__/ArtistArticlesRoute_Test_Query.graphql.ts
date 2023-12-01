/**
 * @generated SignedSource<<2804549efc0bcfc1f620dd106d47e6fb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistArticlesRoute_Test_Query$variables = Record<PropertyKey, never>;
export type ArtistArticlesRoute_Test_Query$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistArticlesRoute_artist">;
  } | null | undefined;
};
export type ArtistArticlesRoute_Test_Query = {
  response: ArtistArticlesRoute_Test_Query$data;
  variables: ArtistArticlesRoute_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v3 = [
  (v1/*: any*/),
  (v2/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
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
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v9 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PageCursor"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistArticlesRoute_Test_Query",
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
            "name": "ArtistArticlesRoute_artist"
          }
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtistArticlesRoute_Test_Query",
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
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "page",
                "value": 1
              },
              {
                "kind": "Literal",
                "name": "size",
                "value": 12
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
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageCursors",
                "kind": "LinkedField",
                "name": "pageCursors",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "around",
                    "plural": true,
                    "selections": (v3/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "first",
                    "plural": false,
                    "selections": (v3/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "last",
                    "plural": false,
                    "selections": (v3/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "previous",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "vertical",
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
                        "kind": "ScalarField",
                        "name": "thumbnailTitle",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "byline",
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
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "format",
                            "value": "MMM D, YYYY"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "publishedAt",
                        "storageKey": "publishedAt(format:\"MMM D, YYYY\")"
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
                                "value": 334
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
                            "storageKey": "cropped(height:334,width:445)"
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
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "articlesConnection(page:1,size:12,sort:\"PUBLISHED_AT_DESC\")"
          },
          (v4/*: any*/)
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "4e463f9239232fffe4e0e97d6fd49d0f",
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
        "artist.articlesConnection.edges.node.byline": (v5/*: any*/),
        "artist.articlesConnection.edges.node.href": (v5/*: any*/),
        "artist.articlesConnection.edges.node.id": (v6/*: any*/),
        "artist.articlesConnection.edges.node.internalID": (v6/*: any*/),
        "artist.articlesConnection.edges.node.publishedAt": (v5/*: any*/),
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
        "artist.articlesConnection.edges.node.thumbnailImage.cropped.height": (v7/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.cropped.src": (v8/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.cropped.srcSet": (v8/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.cropped.width": (v7/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailTitle": (v5/*: any*/),
        "artist.articlesConnection.edges.node.title": (v5/*: any*/),
        "artist.articlesConnection.edges.node.vertical": (v5/*: any*/),
        "artist.articlesConnection.pageCursors": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageCursors"
        },
        "artist.articlesConnection.pageCursors.around": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "PageCursor"
        },
        "artist.articlesConnection.pageCursors.around.cursor": (v8/*: any*/),
        "artist.articlesConnection.pageCursors.around.isCurrent": (v9/*: any*/),
        "artist.articlesConnection.pageCursors.around.page": (v7/*: any*/),
        "artist.articlesConnection.pageCursors.first": (v10/*: any*/),
        "artist.articlesConnection.pageCursors.first.cursor": (v8/*: any*/),
        "artist.articlesConnection.pageCursors.first.isCurrent": (v9/*: any*/),
        "artist.articlesConnection.pageCursors.first.page": (v7/*: any*/),
        "artist.articlesConnection.pageCursors.last": (v10/*: any*/),
        "artist.articlesConnection.pageCursors.last.cursor": (v8/*: any*/),
        "artist.articlesConnection.pageCursors.last.isCurrent": (v9/*: any*/),
        "artist.articlesConnection.pageCursors.last.page": (v7/*: any*/),
        "artist.articlesConnection.pageCursors.previous": (v10/*: any*/),
        "artist.articlesConnection.pageCursors.previous.cursor": (v8/*: any*/),
        "artist.articlesConnection.pageCursors.previous.page": (v7/*: any*/),
        "artist.articlesConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "artist.articlesConnection.pageInfo.hasNextPage": (v9/*: any*/),
        "artist.id": (v6/*: any*/),
        "artist.name": (v5/*: any*/),
        "artist.slug": (v6/*: any*/)
      }
    },
    "name": "ArtistArticlesRoute_Test_Query",
    "operationKind": "query",
    "text": "query ArtistArticlesRoute_Test_Query {\n  artist(id: \"example\") {\n    ...ArtistArticlesRoute_artist\n    id\n  }\n}\n\nfragment ArtistArticlesRoute_artist on Artist {\n  name\n  slug\n  articlesConnection(page: 1, size: 12, sort: PUBLISHED_AT_DESC) {\n    pageInfo {\n      hasNextPage\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        ...CellArticle_article\n        internalID\n        id\n      }\n    }\n  }\n}\n\nfragment CellArticle_article on Article {\n  vertical\n  title\n  thumbnailTitle\n  byline\n  href\n  publishedAt(format: \"MMM D, YYYY\")\n  thumbnailImage {\n    cropped(width: 445, height: 334) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n"
  }
};
})();

(node as any).hash = "20e1b1e5caf2dd7fe9aafb03733f626b";

export default node;
