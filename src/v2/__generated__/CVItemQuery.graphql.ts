/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowSorts = "END_AT_ASC" | "END_AT_DESC" | "FEATURED_ASC" | "FEATURED_DESC" | "NAME_ASC" | "NAME_DESC" | "PARTNER_ASC" | "SORTABLE_NAME_ASC" | "SORTABLE_NAME_DESC" | "START_AT_ASC" | "START_AT_DESC" | "UPDATED_AT_ASC" | "UPDATED_AT_DESC" | "%future added value";
export type CVItemQueryVariables = {
    count?: number | null;
    cursor?: string | null;
    artistID: string;
    sort?: ShowSorts | null;
    atAFair?: boolean | null;
    soloShow?: boolean | null;
    isReference?: boolean | null;
    visibleToPublic?: boolean | null;
};
export type CVItemQueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"CVItem_artist">;
    } | null;
};
export type CVItemQuery = {
    readonly response: CVItemQueryResponse;
    readonly variables: CVItemQueryVariables;
};



/*
query CVItemQuery(
  $count: Int
  $cursor: String
  $artistID: String!
  $sort: ShowSorts
  $atAFair: Boolean
  $soloShow: Boolean
  $isReference: Boolean
  $visibleToPublic: Boolean
) {
  artist(id: $artistID) {
    ...CVItem_artist_4A66pF
    id
  }
}

fragment CVItem_artist_4A66pF on Artist {
  slug
  showsConnection(first: $count, after: $cursor, sort: $sort, atAFair: $atAFair, soloShow: $soloShow, isReference: $isReference, visibleToPublic: $visibleToPublic) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        partner {
          __typename
          ... on ExternalPartner {
            name
            id
          }
          ... on Partner {
            name
            href
          }
          ... on Node {
            id
          }
        }
        name
        start_at: startAt(format: "YYYY")
        city
        href
        __typename
      }
      cursor
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "count",
    "type": "Int"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor",
    "type": "String"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistID",
    "type": "String!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "sort",
    "type": "ShowSorts"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "atAFair",
    "type": "Boolean"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "soloShow",
    "type": "Boolean"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "isReference",
    "type": "Boolean"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "visibleToPublic",
    "type": "Boolean"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID"
  }
],
v2 = {
  "kind": "Variable",
  "name": "atAFair",
  "variableName": "atAFair"
},
v3 = {
  "kind": "Variable",
  "name": "isReference",
  "variableName": "isReference"
},
v4 = {
  "kind": "Variable",
  "name": "soloShow",
  "variableName": "soloShow"
},
v5 = {
  "kind": "Variable",
  "name": "sort",
  "variableName": "sort"
},
v6 = {
  "kind": "Variable",
  "name": "visibleToPublic",
  "variableName": "visibleToPublic"
},
v7 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  (v2/*: any*/),
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  },
  (v3/*: any*/),
  (v4/*: any*/),
  (v5/*: any*/),
  (v6/*: any*/)
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CVItemQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": [
              (v2/*: any*/),
              {
                "kind": "Variable",
                "name": "count",
                "variableName": "count"
              },
              {
                "kind": "Variable",
                "name": "cursor",
                "variableName": "cursor"
              },
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "CVItem_artist"
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
    "name": "CVItemQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
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
            "args": (v7/*: any*/),
            "concreteType": "ShowConnection",
            "kind": "LinkedField",
            "name": "showsConnection",
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
                "concreteType": "ShowEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Show",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v9/*: any*/),
                          (v8/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v10/*: any*/)
                            ],
                            "type": "ExternalPartner"
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v10/*: any*/),
                              (v11/*: any*/)
                            ],
                            "type": "Partner"
                          }
                        ],
                        "storageKey": null
                      },
                      (v10/*: any*/),
                      {
                        "alias": "start_at",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "format",
                            "value": "YYYY"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "startAt",
                        "storageKey": "startAt(format:\"YYYY\")"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "city",
                        "storageKey": null
                      },
                      (v11/*: any*/),
                      (v9/*: any*/)
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
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v7/*: any*/),
            "filters": [
              "sort",
              "atAFair",
              "soloShow",
              "isReference",
              "visibleToPublic"
            ],
            "handle": "connection",
            "key": "Artist_showsConnection",
            "kind": "LinkedHandle",
            "name": "showsConnection"
          },
          (v8/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "CVItemQuery",
    "operationKind": "query",
    "text": "query CVItemQuery(\n  $count: Int\n  $cursor: String\n  $artistID: String!\n  $sort: ShowSorts\n  $atAFair: Boolean\n  $soloShow: Boolean\n  $isReference: Boolean\n  $visibleToPublic: Boolean\n) {\n  artist(id: $artistID) {\n    ...CVItem_artist_4A66pF\n    id\n  }\n}\n\nfragment CVItem_artist_4A66pF on Artist {\n  slug\n  showsConnection(first: $count, after: $cursor, sort: $sort, atAFair: $atAFair, soloShow: $soloShow, isReference: $isReference, visibleToPublic: $visibleToPublic) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        id\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n            href\n          }\n          ... on Node {\n            id\n          }\n        }\n        name\n        start_at: startAt(format: \"YYYY\")\n        city\n        href\n        __typename\n      }\n      cursor\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '813789c45b7ebc3cc68d75dfd68b9ebb';
export default node;
