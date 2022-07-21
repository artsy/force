/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type fairRoutes_FaiArticlesQueryVariables = {
    slug: string;
};
export type fairRoutes_FaiArticlesQueryResponse = {
    readonly fair: {
        readonly " $fragmentRefs": FragmentRefs<"FairArticles_fair">;
    } | null;
};
export type fairRoutes_FaiArticlesQuery = {
    readonly response: fairRoutes_FaiArticlesQueryResponse;
    readonly variables: fairRoutes_FaiArticlesQueryVariables;
};



/*
query fairRoutes_FaiArticlesQuery(
  $slug: String!
) {
  fair(id: $slug) @principalField {
    ...FairArticles_fair
    id
  }
}

fragment FairArticles_fair on Fair {
  slug
  articlesConnection(first: 7) {
    totalCount
    edges {
      node {
        internalID
        title
        href
        author {
          name
          id
        }
        publishedAt(format: "MMM Do, YYYY")
        thumbnailTitle
        thumbnailImage {
          large: cropped(width: 733, height: 550) {
            width
            height
            src
            srcSet
          }
          medium: cropped(width: 267, height: 150) {
            width
            height
            src
            srcSet
          }
        }
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
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 7
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "fairRoutes_FaiArticlesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairArticles_fair"
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
    "name": "fairRoutes_FaiArticlesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
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
                "kind": "ScalarField",
                "name": "totalCount",
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
                        "name": "internalID",
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
                        "name": "href",
                        "storageKey": null
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
                        "kind": "ScalarField",
                        "name": "thumbnailTitle",
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
                            "alias": "large",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 550
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 733
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": (v4/*: any*/),
                            "storageKey": "cropped(height:550,width:733)"
                          },
                          {
                            "alias": "medium",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 150
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 267
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": (v4/*: any*/),
                            "storageKey": "cropped(height:150,width:267)"
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
            "storageKey": "articlesConnection(first:7)"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "FairArticlesQuery_articlesConnection",
            "kind": "LinkedHandle",
            "name": "articlesConnection"
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c5aaeec4a9e02619741c305a06a4ea7d",
    "id": null,
    "metadata": {},
    "name": "fairRoutes_FaiArticlesQuery",
    "operationKind": "query",
    "text": "query fairRoutes_FaiArticlesQuery(\n  $slug: String!\n) {\n  fair(id: $slug) @principalField {\n    ...FairArticles_fair\n    id\n  }\n}\n\nfragment FairArticles_fair on Fair {\n  slug\n  articlesConnection(first: 7) {\n    totalCount\n    edges {\n      node {\n        internalID\n        title\n        href\n        author {\n          name\n          id\n        }\n        publishedAt(format: \"MMM Do, YYYY\")\n        thumbnailTitle\n        thumbnailImage {\n          large: cropped(width: 733, height: 550) {\n            width\n            height\n            src\n            srcSet\n          }\n          medium: cropped(width: 267, height: 150) {\n            width\n            height\n            src\n            srcSet\n          }\n        }\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '3a804b0eed7cc5ae52329dc763f9773a';
export default node;
