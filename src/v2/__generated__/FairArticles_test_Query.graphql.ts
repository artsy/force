/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairArticles_test_QueryVariables = {
    id: string;
    first: number;
    after?: string | null;
};
export type FairArticles_test_QueryResponse = {
    readonly fair: {
        readonly " $fragmentRefs": FragmentRefs<"FairArticles_fair">;
    } | null;
};
export type FairArticles_test_Query = {
    readonly response: FairArticles_test_QueryResponse;
    readonly variables: FairArticles_test_QueryVariables;
};



/*
query FairArticles_test_Query(
  $id: String!
  $first: Int!
  $after: String
) {
  fair(id: $id) {
    ...FairArticles_fair_2HEEH6
    id
  }
}

fragment FairArticles_fair_2HEEH6 on Fair {
  slug
  articlesConnection(first: $first, after: $after) {
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
    "name": "id",
    "type": "String!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first",
    "type": "Int!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after",
    "type": "String"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
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
],
v5 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v6 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v7 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v8 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v9 = {
  "type": "CroppedImageUrl",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v10 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": false
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FairArticles_test_Query",
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
            "args": (v2/*: any*/),
            "kind": "FragmentSpread",
            "name": "FairArticles_fair"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FairArticles_test_Query",
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
            "storageKey": null
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
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "fair": {
          "type": "Fair",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fair.id": (v5/*: any*/),
        "fair.slug": (v6/*: any*/),
        "fair.articlesConnection": {
          "type": "ArticleConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fair.articlesConnection.totalCount": {
          "type": "Int",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fair.articlesConnection.edges": {
          "type": "ArticleEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "fair.articlesConnection.pageInfo": {
          "type": "PageInfo",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "fair.articlesConnection.edges.node": {
          "type": "Article",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fair.articlesConnection.edges.node.internalID": (v6/*: any*/),
        "fair.articlesConnection.edges.node.title": (v7/*: any*/),
        "fair.articlesConnection.edges.node.href": (v7/*: any*/),
        "fair.articlesConnection.edges.node.author": {
          "type": "Author",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fair.articlesConnection.edges.node.publishedAt": (v7/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailTitle": (v7/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fair.articlesConnection.edges.node.id": (v5/*: any*/),
        "fair.articlesConnection.edges.cursor": (v8/*: any*/),
        "fair.articlesConnection.pageInfo.endCursor": (v7/*: any*/),
        "fair.articlesConnection.pageInfo.hasNextPage": {
          "type": "Boolean",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "fair.articlesConnection.edges.node.author.name": (v7/*: any*/),
        "fair.articlesConnection.edges.node.author.id": (v5/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage.large": (v9/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage.medium": (v9/*: any*/),
        "fair.articlesConnection.edges.node.__typename": (v8/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage.large.width": (v10/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage.large.height": (v10/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage.large.src": (v8/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage.large.srcSet": (v8/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage.medium.width": (v10/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage.medium.height": (v10/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage.medium.src": (v8/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage.medium.srcSet": (v8/*: any*/)
      }
    },
    "name": "FairArticles_test_Query",
    "operationKind": "query",
    "text": "query FairArticles_test_Query(\n  $id: String!\n  $first: Int!\n  $after: String\n) {\n  fair(id: $id) {\n    ...FairArticles_fair_2HEEH6\n    id\n  }\n}\n\nfragment FairArticles_fair_2HEEH6 on Fair {\n  slug\n  articlesConnection(first: $first, after: $after) {\n    totalCount\n    edges {\n      node {\n        internalID\n        title\n        href\n        author {\n          name\n          id\n        }\n        publishedAt(format: \"MMM Do, YYYY\")\n        thumbnailTitle\n        thumbnailImage {\n          large: cropped(width: 733, height: 550) {\n            width\n            height\n            src\n            srcSet\n          }\n          medium: cropped(width: 267, height: 150) {\n            width\n            height\n            src\n            srcSet\n          }\n        }\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e5a588806bbc0ae5c361527adb307e32';
export default node;
