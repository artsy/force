/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerDedicatedArticles_Test_QueryVariables = {};
export type FairOrganizerDedicatedArticles_Test_QueryResponse = {
    readonly fairOrganizer: {
        readonly " $fragmentRefs": FragmentRefs<"FairOrganizerDedicatedArticles_fairOrganizer">;
    } | null;
};
export type FairOrganizerDedicatedArticles_Test_Query = {
    readonly response: FairOrganizerDedicatedArticles_Test_QueryResponse;
    readonly variables: FairOrganizerDedicatedArticles_Test_QueryVariables;
};



/*
query FairOrganizerDedicatedArticles_Test_Query {
  fairOrganizer(id: "example") {
    ...FairOrganizerDedicatedArticles_fairOrganizer
    id
  }
}

fragment CellArticle_article on Article {
  vertical
  title
  thumbnailTitle
  byline
  href
  publishedAt(format: "MMM D, YYYY")
  thumbnailImage {
    cropped(width: 445, height: 334) {
      width
      height
      src
      srcSet
    }
  }
}

fragment DedicatedArticlesBreadcrumbs_fairOrganizer on FairOrganizer {
  slug
  name
  profile {
    image {
      resized(width: 30, height: 30, version: "square") {
        src
        srcSet
      }
    }
    id
  }
}

fragment FairOrganizerDedicatedArticles_fairOrganizer on FairOrganizer {
  slug
  name
  articlesConnection(first: 16, page: 1, sort: PUBLISHED_AT_DESC) {
    totalCount
    pageInfo {
      hasNextPage
    }
    pageCursors {
      ...Pagination_pageCursors
    }
    edges {
      node {
        ...CellArticle_article
        id
      }
    }
  }
  ...DedicatedArticlesBreadcrumbs_fairOrganizer
}

fragment Pagination_pageCursors on PageCursors {
  around {
    cursor
    page
    isCurrent
  }
  first {
    cursor
    page
    isCurrent
  }
  last {
    cursor
    page
    isCurrent
  }
  previous {
    cursor
    page
  }
}
*/

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
  "name": "src",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v11 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v12 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v13 = {
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
    "name": "FairOrganizerDedicatedArticles_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "FairOrganizer",
        "kind": "LinkedField",
        "name": "fairOrganizer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairOrganizerDedicatedArticles_fairOrganizer"
          }
        ],
        "storageKey": "fairOrganizer(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FairOrganizerDedicatedArticles_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "FairOrganizer",
        "kind": "LinkedField",
        "name": "fairOrganizer",
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
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 16
              },
              {
                "kind": "Literal",
                "name": "page",
                "value": 1
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
                "kind": "ScalarField",
                "name": "totalCount",
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
                              (v4/*: any*/),
                              (v5/*: any*/)
                            ],
                            "storageKey": "cropped(height:334,width:445)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "articlesConnection(first:16,page:1,sort:\"PUBLISHED_AT_DESC\")"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Profile",
            "kind": "LinkedField",
            "name": "profile",
            "plural": false,
            "selections": [
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
                        "value": 30
                      },
                      {
                        "kind": "Literal",
                        "name": "version",
                        "value": "square"
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 30
                      }
                    ],
                    "concreteType": "ResizedImageUrl",
                    "kind": "LinkedField",
                    "name": "resized",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v5/*: any*/)
                    ],
                    "storageKey": "resized(height:30,version:\"square\",width:30)"
                  }
                ],
                "storageKey": null
              },
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": "fairOrganizer(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "cee8fe574d18412edac8f67c751db4ac",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "fairOrganizer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FairOrganizer"
        },
        "fairOrganizer.articlesConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleConnection"
        },
        "fairOrganizer.articlesConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArticleEdge"
        },
        "fairOrganizer.articlesConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Article"
        },
        "fairOrganizer.articlesConnection.edges.node.byline": (v7/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.href": (v7/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.id": (v8/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.publishedAt": (v7/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage": (v9/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.cropped.height": (v10/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.cropped.src": (v11/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.cropped.srcSet": (v11/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.cropped.width": (v10/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailTitle": (v7/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.title": (v7/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.vertical": (v7/*: any*/),
        "fairOrganizer.articlesConnection.pageCursors": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageCursors"
        },
        "fairOrganizer.articlesConnection.pageCursors.around": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "PageCursor"
        },
        "fairOrganizer.articlesConnection.pageCursors.around.cursor": (v11/*: any*/),
        "fairOrganizer.articlesConnection.pageCursors.around.isCurrent": (v12/*: any*/),
        "fairOrganizer.articlesConnection.pageCursors.around.page": (v10/*: any*/),
        "fairOrganizer.articlesConnection.pageCursors.first": (v13/*: any*/),
        "fairOrganizer.articlesConnection.pageCursors.first.cursor": (v11/*: any*/),
        "fairOrganizer.articlesConnection.pageCursors.first.isCurrent": (v12/*: any*/),
        "fairOrganizer.articlesConnection.pageCursors.first.page": (v10/*: any*/),
        "fairOrganizer.articlesConnection.pageCursors.last": (v13/*: any*/),
        "fairOrganizer.articlesConnection.pageCursors.last.cursor": (v11/*: any*/),
        "fairOrganizer.articlesConnection.pageCursors.last.isCurrent": (v12/*: any*/),
        "fairOrganizer.articlesConnection.pageCursors.last.page": (v10/*: any*/),
        "fairOrganizer.articlesConnection.pageCursors.previous": (v13/*: any*/),
        "fairOrganizer.articlesConnection.pageCursors.previous.cursor": (v11/*: any*/),
        "fairOrganizer.articlesConnection.pageCursors.previous.page": (v10/*: any*/),
        "fairOrganizer.articlesConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "fairOrganizer.articlesConnection.pageInfo.hasNextPage": (v12/*: any*/),
        "fairOrganizer.articlesConnection.totalCount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "fairOrganizer.id": (v8/*: any*/),
        "fairOrganizer.name": (v7/*: any*/),
        "fairOrganizer.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "fairOrganizer.profile.id": (v8/*: any*/),
        "fairOrganizer.profile.image": (v9/*: any*/),
        "fairOrganizer.profile.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "fairOrganizer.profile.image.resized.src": (v11/*: any*/),
        "fairOrganizer.profile.image.resized.srcSet": (v11/*: any*/),
        "fairOrganizer.slug": (v8/*: any*/)
      }
    },
    "name": "FairOrganizerDedicatedArticles_Test_Query",
    "operationKind": "query",
    "text": "query FairOrganizerDedicatedArticles_Test_Query {\n  fairOrganizer(id: \"example\") {\n    ...FairOrganizerDedicatedArticles_fairOrganizer\n    id\n  }\n}\n\nfragment CellArticle_article on Article {\n  vertical\n  title\n  thumbnailTitle\n  byline\n  href\n  publishedAt(format: \"MMM D, YYYY\")\n  thumbnailImage {\n    cropped(width: 445, height: 334) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment DedicatedArticlesBreadcrumbs_fairOrganizer on FairOrganizer {\n  slug\n  name\n  profile {\n    image {\n      resized(width: 30, height: 30, version: \"square\") {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment FairOrganizerDedicatedArticles_fairOrganizer on FairOrganizer {\n  slug\n  name\n  articlesConnection(first: 16, page: 1, sort: PUBLISHED_AT_DESC) {\n    totalCount\n    pageInfo {\n      hasNextPage\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        ...CellArticle_article\n        id\n      }\n    }\n  }\n  ...DedicatedArticlesBreadcrumbs_fairOrganizer\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n"
  }
};
})();
(node as any).hash = '2992c76416f49af62f07b30ef6eef636';
export default node;
