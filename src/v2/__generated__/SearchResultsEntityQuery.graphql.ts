/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SearchEntity = "ARTICLE" | "ARTIST" | "ARTIST_SERIES" | "ARTWORK" | "CITY" | "COLLECTION" | "FAIR" | "FEATURE" | "GALLERY" | "GENE" | "INSTITUTION" | "PAGE" | "PROFILE" | "SALE" | "SHOW" | "TAG" | "%future added value";
export type SearchResultsEntityQueryVariables = {
    first?: number | null;
    last?: number | null;
    after?: string | null;
    before?: string | null;
    term: string;
    page?: number | null;
    entities?: ReadonlyArray<SearchEntity | null> | null;
};
export type SearchResultsEntityQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"SearchResultsEntity_viewer">;
    } | null;
};
export type SearchResultsEntityQuery = {
    readonly response: SearchResultsEntityQueryResponse;
    readonly variables: SearchResultsEntityQueryVariables;
};



/*
query SearchResultsEntityQuery(
  $first: Int
  $last: Int
  $after: String
  $before: String
  $term: String!
  $page: Int
  $entities: [SearchEntity]
) {
  viewer {
    ...SearchResultsEntity_viewer_4tOGvB
  }
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

fragment SearchResultsEntity_viewer_4tOGvB on Viewer {
  searchConnection(query: $term, first: $first, after: $after, before: $before, last: $last, page: $page, entities: $entities) @principalField {
    pageInfo {
      hasNextPage
      endCursor
    }
    pageCursors {
      ...Pagination_pageCursors
    }
    edges {
      node {
        __typename
        ... on SearchableItem {
          description
          displayLabel
          href
          internalID
          imageUrl
          displayType
        }
        ... on Node {
          id
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "first",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "last",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "after",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "before",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "term",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "page",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "entities",
    "type": "[SearchEntity]",
    "defaultValue": null
  }
],
v1 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v2 = {
  "kind": "Variable",
  "name": "before",
  "variableName": "before"
},
v3 = {
  "kind": "Variable",
  "name": "entities",
  "variableName": "entities"
},
v4 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v5 = {
  "kind": "Variable",
  "name": "last",
  "variableName": "last"
},
v6 = {
  "kind": "Variable",
  "name": "page",
  "variableName": "page"
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "page",
  "args": null,
  "storageKey": null
},
v9 = [
  (v7/*: any*/),
  (v8/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "isCurrent",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "SearchResultsEntityQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "SearchResultsEntity_viewer",
            "args": [
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "kind": "Variable",
                "name": "term",
                "variableName": "term"
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "SearchResultsEntityQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "searchConnection",
            "storageKey": null,
            "args": [
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "kind": "Variable",
                "name": "query",
                "variableName": "term"
              }
            ],
            "concreteType": "SearchableConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "pageInfo",
                "storageKey": null,
                "args": null,
                "concreteType": "PageInfo",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "hasNextPage",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "endCursor",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "pageCursors",
                "storageKey": null,
                "args": null,
                "concreteType": "PageCursors",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "around",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "plural": true,
                    "selections": (v9/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "first",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "plural": false,
                    "selections": (v9/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "last",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "plural": false,
                    "selections": (v9/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "previous",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
                      (v8/*: any*/)
                    ]
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "SearchableEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": null,
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "__typename",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "id",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "type": "SearchableItem",
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "description",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "displayLabel",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "href",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "internalID",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "imageUrl",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "displayType",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "SearchResultsEntityQuery",
    "id": null,
    "text": "query SearchResultsEntityQuery(\n  $first: Int\n  $last: Int\n  $after: String\n  $before: String\n  $term: String!\n  $page: Int\n  $entities: [SearchEntity]\n) {\n  viewer {\n    ...SearchResultsEntity_viewer_4tOGvB\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment SearchResultsEntity_viewer_4tOGvB on Viewer {\n  searchConnection(query: $term, first: $first, after: $after, before: $before, last: $last, page: $page, entities: $entities) @principalField {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        __typename\n        ... on SearchableItem {\n          description\n          displayLabel\n          href\n          internalID\n          imageUrl\n          displayType\n        }\n        ... on Node {\n          id\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '6db171bc8aa2ccfdee6ad207f60ab6be';
export default node;
