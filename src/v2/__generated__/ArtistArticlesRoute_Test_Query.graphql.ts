/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistArticlesRoute_Test_QueryVariables = {};
export type ArtistArticlesRoute_Test_QueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistArticlesRoute_artist">;
    } | null;
};
export type ArtistArticlesRoute_Test_Query = {
    readonly response: ArtistArticlesRoute_Test_QueryResponse;
    readonly variables: ArtistArticlesRoute_Test_QueryVariables;
};



/*
query ArtistArticlesRoute_Test_Query {
  artist(id: "example") {
    ...ArtistArticlesRoute_artist
    id
  }
}

fragment ArtistArticlesRoute_artist on Artist {
  articlesConnection(first: 10, sort: PUBLISHED_AT_DESC, inEditorialFeed: true) {
    pageInfo {
      hasNextPage
      endCursor
    }
    pageCursors {
      ...Pagination_pageCursors
    }
    edges {
      node {
        internalID
        href
        thumbnailTitle
        author {
          name
          id
        }
        publishedAt(format: "MMM Do, YYYY")
        thumbnailImage {
          cropped(width: 210, height: 150) {
            src
            srcSet
            width
            height
          }
        }
        id
      }
    }
  }
  name
  slug
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
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v7 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v8 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v9 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v10 = {
  "type": "PageCursor",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v11 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v12 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": false
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
    "type": "Query"
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
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
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
                        "name": "thumbnailTitle",
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
                          (v4/*: any*/),
                          (v5/*: any*/)
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
                                "value": 150
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 210
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
                            "storageKey": "cropped(height:150,width:210)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "articlesConnection(first:10,inEditorialFeed:true,sort:\"PUBLISHED_AT_DESC\")"
          },
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": {
          "type": "Artist",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.id": (v6/*: any*/),
        "artist.articlesConnection": {
          "type": "ArticleConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.name": (v7/*: any*/),
        "artist.slug": (v8/*: any*/),
        "artist.articlesConnection.pageInfo": {
          "type": "PageInfo",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "artist.articlesConnection.pageCursors": {
          "type": "PageCursors",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "artist.articlesConnection.edges": {
          "type": "ArticleEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "artist.articlesConnection.pageInfo.hasNextPage": (v9/*: any*/),
        "artist.articlesConnection.pageInfo.endCursor": (v7/*: any*/),
        "artist.articlesConnection.edges.node": {
          "type": "Article",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.articlesConnection.pageCursors.around": {
          "type": "PageCursor",
          "enumValues": null,
          "plural": true,
          "nullable": false
        },
        "artist.articlesConnection.pageCursors.first": (v10/*: any*/),
        "artist.articlesConnection.pageCursors.last": (v10/*: any*/),
        "artist.articlesConnection.pageCursors.previous": (v10/*: any*/),
        "artist.articlesConnection.edges.node.internalID": (v8/*: any*/),
        "artist.articlesConnection.edges.node.href": (v7/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailTitle": (v7/*: any*/),
        "artist.articlesConnection.edges.node.author": {
          "type": "Author",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.articlesConnection.edges.node.publishedAt": (v7/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.articlesConnection.edges.node.id": (v6/*: any*/),
        "artist.articlesConnection.pageCursors.around.cursor": (v11/*: any*/),
        "artist.articlesConnection.pageCursors.around.page": (v12/*: any*/),
        "artist.articlesConnection.pageCursors.around.isCurrent": (v9/*: any*/),
        "artist.articlesConnection.pageCursors.first.cursor": (v11/*: any*/),
        "artist.articlesConnection.pageCursors.first.page": (v12/*: any*/),
        "artist.articlesConnection.pageCursors.first.isCurrent": (v9/*: any*/),
        "artist.articlesConnection.pageCursors.last.cursor": (v11/*: any*/),
        "artist.articlesConnection.pageCursors.last.page": (v12/*: any*/),
        "artist.articlesConnection.pageCursors.last.isCurrent": (v9/*: any*/),
        "artist.articlesConnection.pageCursors.previous.cursor": (v11/*: any*/),
        "artist.articlesConnection.pageCursors.previous.page": (v12/*: any*/),
        "artist.articlesConnection.edges.node.author.name": (v7/*: any*/),
        "artist.articlesConnection.edges.node.author.id": (v6/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.cropped": {
          "type": "CroppedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.articlesConnection.edges.node.thumbnailImage.cropped.src": (v11/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.cropped.srcSet": (v11/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.cropped.width": (v12/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.cropped.height": (v12/*: any*/)
      }
    },
    "name": "ArtistArticlesRoute_Test_Query",
    "operationKind": "query",
    "text": "query ArtistArticlesRoute_Test_Query {\n  artist(id: \"example\") {\n    ...ArtistArticlesRoute_artist\n    id\n  }\n}\n\nfragment ArtistArticlesRoute_artist on Artist {\n  articlesConnection(first: 10, sort: PUBLISHED_AT_DESC, inEditorialFeed: true) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        internalID\n        href\n        thumbnailTitle\n        author {\n          name\n          id\n        }\n        publishedAt(format: \"MMM Do, YYYY\")\n        thumbnailImage {\n          cropped(width: 210, height: 150) {\n            src\n            srcSet\n            width\n            height\n          }\n        }\n        id\n      }\n    }\n  }\n  name\n  slug\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n"
  }
};
})();
(node as any).hash = '20e1b1e5caf2dd7fe9aafb03733f626b';
export default node;
