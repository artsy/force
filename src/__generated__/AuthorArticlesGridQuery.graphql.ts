/**
 * @generated SignedSource<<70249735cc73f76160065ba80ed23c84>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuthorArticlesGridQuery$variables = {
  after?: string | null | undefined;
  first: number;
  id: string;
};
export type AuthorArticlesGridQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"AuthorArticlesGrid_query">;
};
export type AuthorArticlesGridQuery = {
  response: AuthorArticlesGridQuery$data;
  variables: AuthorArticlesGridQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "after"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v3 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v4 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v5 = {
  "kind": "Variable",
  "name": "id",
  "variableName": "id"
},
v6 = [
  (v3/*: any*/),
  (v4/*: any*/)
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AuthorArticlesGridQuery",
    "selections": [
      {
        "args": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "AuthorArticlesGrid_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "AuthorArticlesGridQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          (v5/*: any*/)
        ],
        "concreteType": "Author",
        "kind": "LinkedField",
        "name": "author",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v6/*: any*/),
            "concreteType": "AuthorArticlesConnectionConnection",
            "kind": "LinkedField",
            "name": "articlesConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "AuthorArticlesConnectionEdge",
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
                              (v7/*: any*/),
                              (v8/*: any*/)
                            ],
                            "storageKey": "cropped(height:334,width:445)"
                          },
                          {
                            "alias": "large",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 600
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 600
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": [
                              (v7/*: any*/),
                              (v8/*: any*/)
                            ],
                            "storageKey": "cropped(height:600,width:600)"
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
                      (v9/*: any*/),
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
            "args": (v6/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "AuthorArticlesGrid_articlesConnection",
            "kind": "LinkedHandle",
            "name": "articlesConnection"
          },
          (v9/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a1023e25c4941ea97f5c60c32417fb64",
    "id": null,
    "metadata": {},
    "name": "AuthorArticlesGridQuery",
    "operationKind": "query",
    "text": "query AuthorArticlesGridQuery(\n  $id: String!\n  $first: Int!\n  $after: String\n) {\n  ...AuthorArticlesGrid_query_XKRaI\n}\n\nfragment AuthorArticlesGrid_query_XKRaI on Query {\n  author(id: $id) {\n    articlesConnection(first: $first, after: $after) {\n      edges {\n        node {\n          ...CellArticle_article\n          internalID\n          href\n          vertical\n          thumbnailTitle\n          title\n          byline\n          publishedAt(format: \"MMM D, YYYY\")\n          thumbnailImage {\n            large: cropped(width: 600, height: 600) {\n              src\n              srcSet\n            }\n          }\n          id\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n    id\n  }\n}\n\nfragment CellArticle_article on Article {\n  vertical\n  title\n  thumbnailTitle\n  byline\n  href\n  publishedAt(format: \"MMM D, YYYY\")\n  thumbnailImage {\n    cropped(width: 445, height: 334) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2d0e5eb46d90ef5f3eda6f0a24f4d111";

export default node;
