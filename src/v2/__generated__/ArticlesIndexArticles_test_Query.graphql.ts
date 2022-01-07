/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticlesIndexArticles_test_QueryVariables = {
    after?: string | null;
};
export type ArticlesIndexArticles_test_QueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"ArticlesIndexArticles_viewer">;
    } | null;
};
export type ArticlesIndexArticles_test_Query = {
    readonly response: ArticlesIndexArticles_test_QueryResponse;
    readonly variables: ArticlesIndexArticles_test_QueryVariables;
};



/*
query ArticlesIndexArticles_test_Query(
  $after: String
) {
  viewer {
    ...ArticlesIndexArticles_viewer_WGPvJ
  }
}

fragment ArticlesIndexArticle_article on Article {
  href
  title
  publishedAt(format: "MMMM Do YYYY")
  author {
    name
    id
  }
  thumbnailImage {
    cropped(width: 910, height: 511) {
      src
      srcSet
    }
  }
}

fragment ArticlesIndexArticles_viewer_WGPvJ on Viewer {
  articlesConnection(first: 15, after: $after, sort: PUBLISHED_AT_DESC) {
    edges {
      node {
        internalID
        ...ArticlesIndexArticle_article
        id
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  }
],
v1 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v2 = [
  (v1/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 15
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "PUBLISHED_AT_DESC"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "enumValues": null,
  "nullable": false,
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
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArticlesIndexArticles_test_Query",
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
            "args": [
              (v1/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "ArticlesIndexArticles_viewer"
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
    "name": "ArticlesIndexArticles_test_Query",
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
            "args": (v2/*: any*/),
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
                        "name": "title",
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
                        "concreteType": "Author",
                        "kind": "LinkedField",
                        "name": "author",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "name",
                            "storageKey": null
                          },
                          (v3/*: any*/)
                        ],
                        "storageKey": null
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
                                "value": 511
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
                              }
                            ],
                            "storageKey": "cropped(height:511,width:910)"
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
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "filters": [
              "sort"
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
    "cacheID": "d076d1c2a4e3482e8c2a5adb949fa4aa",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.articlesConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleConnection"
        },
        "viewer.articlesConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArticleEdge"
        },
        "viewer.articlesConnection.edges.cursor": (v4/*: any*/),
        "viewer.articlesConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Article"
        },
        "viewer.articlesConnection.edges.node.__typename": (v4/*: any*/),
        "viewer.articlesConnection.edges.node.author": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Author"
        },
        "viewer.articlesConnection.edges.node.author.id": (v5/*: any*/),
        "viewer.articlesConnection.edges.node.author.name": (v6/*: any*/),
        "viewer.articlesConnection.edges.node.href": (v6/*: any*/),
        "viewer.articlesConnection.edges.node.id": (v5/*: any*/),
        "viewer.articlesConnection.edges.node.internalID": (v5/*: any*/),
        "viewer.articlesConnection.edges.node.publishedAt": (v6/*: any*/),
        "viewer.articlesConnection.edges.node.thumbnailImage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "viewer.articlesConnection.edges.node.thumbnailImage.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "viewer.articlesConnection.edges.node.thumbnailImage.cropped.src": (v4/*: any*/),
        "viewer.articlesConnection.edges.node.thumbnailImage.cropped.srcSet": (v4/*: any*/),
        "viewer.articlesConnection.edges.node.title": (v6/*: any*/),
        "viewer.articlesConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "viewer.articlesConnection.pageInfo.endCursor": (v6/*: any*/),
        "viewer.articlesConnection.pageInfo.hasNextPage": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        }
      }
    },
    "name": "ArticlesIndexArticles_test_Query",
    "operationKind": "query",
    "text": "query ArticlesIndexArticles_test_Query(\n  $after: String\n) {\n  viewer {\n    ...ArticlesIndexArticles_viewer_WGPvJ\n  }\n}\n\nfragment ArticlesIndexArticle_article on Article {\n  href\n  title\n  publishedAt(format: \"MMMM Do YYYY\")\n  author {\n    name\n    id\n  }\n  thumbnailImage {\n    cropped(width: 910, height: 511) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ArticlesIndexArticles_viewer_WGPvJ on Viewer {\n  articlesConnection(first: 15, after: $after, sort: PUBLISHED_AT_DESC) {\n    edges {\n      node {\n        internalID\n        ...ArticlesIndexArticle_article\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '4bf0671f474db753a7ab8f2f863df565';
export default node;
