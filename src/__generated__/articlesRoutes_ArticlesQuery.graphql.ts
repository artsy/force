/**
 * @generated SignedSource<<4feda5cad43a003d789d318061d51ebc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type articlesRoutes_ArticlesQuery$variables = Record<PropertyKey, never>;
export type articlesRoutes_ArticlesQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"ArticlesApp_viewer">;
  } | null | undefined;
};
export type articlesRoutes_ArticlesQuery = {
  response: articlesRoutes_ArticlesQuery$data;
  variables: articlesRoutes_ArticlesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "Literal",
  "name": "sort",
  "value": "PUBLISHED_AT_DESC"
},
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
  "name": "href",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "featured",
    "value": true
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 15
  },
  (v0/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "articlesRoutes_ArticlesQuery",
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
            "name": "ArticlesApp_viewer"
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
    "name": "articlesRoutes_ArticlesQuery",
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
                "name": "layout",
                "value": "NEWS"
              },
              {
                "kind": "Literal",
                "name": "limit",
                "value": 3
              },
              {
                "kind": "Literal",
                "name": "published",
                "value": true
              },
              (v0/*: any*/)
            ],
            "concreteType": "Article",
            "kind": "LinkedField",
            "name": "articles",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": "articles(layout:\"NEWS\",limit:3,published:true,sort:\"PUBLISHED_AT_DESC\")"
          },
          {
            "alias": null,
            "args": (v4/*: any*/),
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
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "format",
                            "value": "MMMM Do YYYY"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "publishedAt",
                        "storageKey": "publishedAt(format:\"MMMM Do YYYY\")"
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
                                "value": 607
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 910
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
                            "storageKey": "cropped(height:607,width:910)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
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
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "articlesConnection(featured:true,first:15,sort:\"PUBLISHED_AT_DESC\")"
          },
          {
            "alias": null,
            "args": (v4/*: any*/),
            "filters": [
              "sort",
              "featured"
            ],
            "handle": "connection",
            "key": "ArticlesIndexArticles_articlesConnection",
            "kind": "LinkedHandle",
            "name": "articlesConnection"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9f6b88922cedacb6f93c9a47fe7989b5",
    "id": null,
    "metadata": {},
    "name": "articlesRoutes_ArticlesQuery",
    "operationKind": "query",
    "text": "query articlesRoutes_ArticlesQuery {\n  viewer {\n    ...ArticlesApp_viewer\n  }\n}\n\nfragment ArticlesApp_viewer on Viewer {\n  ...ArticlesIndexNews_viewer\n  ...ArticlesIndexArticles_viewer\n}\n\nfragment ArticlesIndexArticle_article on Article {\n  href\n  thumbnailTitle\n  byline\n  publishedAt(format: \"MMMM Do YYYY\")\n  thumbnailImage {\n    cropped(width: 910, height: 607) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n}\n\nfragment ArticlesIndexArticles_viewer on Viewer {\n  articlesConnection(first: 15, sort: PUBLISHED_AT_DESC, featured: true) {\n    edges {\n      node {\n        internalID\n        ...ArticlesIndexArticle_article\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment ArticlesIndexNews_viewer on Viewer {\n  articles(published: true, limit: 3, sort: PUBLISHED_AT_DESC, layout: NEWS) {\n    internalID\n    title\n    href\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "0e45eb8d493b0f51730a98972c5ad64e";

export default node;
