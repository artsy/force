/* tslint:disable */
/* eslint-disable */

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

fragment FairEditorialItemLink_article on Article {
  internalID
  slug
  title
  href
  publishedAt(format: "MMMM D, YYYY")
}

fragment FairEditorialItem_article on Article {
  id
  title
  publishedAt(format: "MMMM D, YYYY")
  thumbnailTitle
  thumbnailImage {
    large: cropped(width: 670, height: 720) {
      width
      height
      src
      srcSet
    }
    small: cropped(width: 325, height: 240) {
      width
      height
      src
      srcSet
    }
  }
  ...FairEditorialItemLink_article
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
        id
        ...FairEditorialItem_article
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
  "name": "slug",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v4 = [
  (v2/*: any*/),
  (v3/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v8 = [
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
  (v6/*: any*/),
  (v7/*: any*/)
],
v9 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v10 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v11 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v12 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v13 = {
  "type": "Image",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v14 = {
  "type": "PageCursor",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v15 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v16 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v17 = {
  "type": "CroppedImageUrl",
  "enumValues": null,
  "plural": false,
  "nullable": true
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
    "type": "Query"
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
          (v1/*: any*/),
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
                    "selections": (v4/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "first",
                    "plural": false,
                    "selections": (v4/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "last",
                    "plural": false,
                    "selections": (v4/*: any*/),
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
                      (v2/*: any*/),
                      (v3/*: any*/)
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
                      (v5/*: any*/),
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
                            "value": "MMMM D, YYYY"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "publishedAt",
                        "storageKey": "publishedAt(format:\"MMMM D, YYYY\")"
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
                                "value": 720
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 670
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": (v8/*: any*/),
                            "storageKey": "cropped(height:720,width:670)"
                          },
                          {
                            "alias": "small",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 240
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
                            "selections": (v8/*: any*/),
                            "storageKey": "cropped(height:240,width:325)"
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
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "href",
                        "storageKey": null
                      }
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
                      (v6/*: any*/),
                      (v7/*: any*/)
                    ],
                    "storageKey": "resized(height:30,version:\"square\",width:30)"
                  }
                ],
                "storageKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": "fairOrganizer(id:\"example\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "fairOrganizer": {
          "type": "FairOrganizer",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fairOrganizer.id": (v9/*: any*/),
        "fairOrganizer.slug": (v10/*: any*/),
        "fairOrganizer.name": (v11/*: any*/),
        "fairOrganizer.articlesConnection": {
          "type": "ArticleConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fairOrganizer.articlesConnection.totalCount": {
          "type": "Int",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fairOrganizer.articlesConnection.pageInfo": {
          "type": "PageInfo",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "fairOrganizer.articlesConnection.pageCursors": {
          "type": "PageCursors",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "fairOrganizer.articlesConnection.edges": {
          "type": "ArticleEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "fairOrganizer.profile": {
          "type": "Profile",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fairOrganizer.articlesConnection.pageInfo.hasNextPage": (v12/*: any*/),
        "fairOrganizer.articlesConnection.edges.node": {
          "type": "Article",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fairOrganizer.profile.image": (v13/*: any*/),
        "fairOrganizer.profile.id": (v9/*: any*/),
        "fairOrganizer.articlesConnection.pageCursors.around": {
          "type": "PageCursor",
          "enumValues": null,
          "plural": true,
          "nullable": false
        },
        "fairOrganizer.articlesConnection.pageCursors.first": (v14/*: any*/),
        "fairOrganizer.articlesConnection.pageCursors.last": (v14/*: any*/),
        "fairOrganizer.articlesConnection.pageCursors.previous": (v14/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.id": (v10/*: any*/),
        "fairOrganizer.profile.image.resized": {
          "type": "ResizedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fairOrganizer.articlesConnection.pageCursors.around.cursor": (v15/*: any*/),
        "fairOrganizer.articlesConnection.pageCursors.around.page": (v16/*: any*/),
        "fairOrganizer.articlesConnection.pageCursors.around.isCurrent": (v12/*: any*/),
        "fairOrganizer.articlesConnection.pageCursors.first.cursor": (v15/*: any*/),
        "fairOrganizer.articlesConnection.pageCursors.first.page": (v16/*: any*/),
        "fairOrganizer.articlesConnection.pageCursors.first.isCurrent": (v12/*: any*/),
        "fairOrganizer.articlesConnection.pageCursors.last.cursor": (v15/*: any*/),
        "fairOrganizer.articlesConnection.pageCursors.last.page": (v16/*: any*/),
        "fairOrganizer.articlesConnection.pageCursors.last.isCurrent": (v12/*: any*/),
        "fairOrganizer.articlesConnection.pageCursors.previous.cursor": (v15/*: any*/),
        "fairOrganizer.articlesConnection.pageCursors.previous.page": (v16/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.title": (v11/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.publishedAt": (v11/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailTitle": (v11/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage": (v13/*: any*/),
        "fairOrganizer.profile.image.resized.src": (v15/*: any*/),
        "fairOrganizer.profile.image.resized.srcSet": (v15/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.large": (v17/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.small": (v17/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.internalID": (v10/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.slug": (v11/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.href": (v11/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.large.width": (v16/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.large.height": (v16/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.large.src": (v15/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.large.srcSet": (v15/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.small.width": (v16/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.small.height": (v16/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.small.src": (v15/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.small.srcSet": (v15/*: any*/)
      }
    },
    "name": "FairOrganizerDedicatedArticles_Test_Query",
    "operationKind": "query",
    "text": "query FairOrganizerDedicatedArticles_Test_Query {\n  fairOrganizer(id: \"example\") {\n    ...FairOrganizerDedicatedArticles_fairOrganizer\n    id\n  }\n}\n\nfragment DedicatedArticlesBreadcrumbs_fairOrganizer on FairOrganizer {\n  slug\n  name\n  profile {\n    image {\n      resized(width: 30, height: 30, version: \"square\") {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment FairEditorialItemLink_article on Article {\n  internalID\n  slug\n  title\n  href\n  publishedAt(format: \"MMMM D, YYYY\")\n}\n\nfragment FairEditorialItem_article on Article {\n  id\n  title\n  publishedAt(format: \"MMMM D, YYYY\")\n  thumbnailTitle\n  thumbnailImage {\n    large: cropped(width: 670, height: 720) {\n      width\n      height\n      src\n      srcSet\n    }\n    small: cropped(width: 325, height: 240) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n  ...FairEditorialItemLink_article\n}\n\nfragment FairOrganizerDedicatedArticles_fairOrganizer on FairOrganizer {\n  slug\n  name\n  articlesConnection(first: 16, page: 1, sort: PUBLISHED_AT_DESC) {\n    totalCount\n    pageInfo {\n      hasNextPage\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        id\n        ...FairEditorialItem_article\n      }\n    }\n  }\n  ...DedicatedArticlesBreadcrumbs_fairOrganizer\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n"
  }
};
})();
(node as any).hash = '2992c76416f49af62f07b30ef6eef636';
export default node;
