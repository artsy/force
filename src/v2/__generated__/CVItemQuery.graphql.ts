/* tslint:disable */

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
    "kind": "LocalArgument",
    "name": "count",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "cursor",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "artistID",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "sort",
    "type": "ShowSorts",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "atAFair",
    "type": "Boolean",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "soloShow",
    "type": "Boolean",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "isReference",
    "type": "Boolean",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "visibleToPublic",
    "type": "Boolean",
    "defaultValue": null
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
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CVItemQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "CVItem_artist",
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
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CVItemQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "slug",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "showsConnection",
            "storageKey": null,
            "args": (v7/*: any*/),
            "concreteType": "ShowConnection",
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
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "ShowEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Show",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "partner",
                        "storageKey": null,
                        "args": null,
                        "concreteType": null,
                        "plural": false,
                        "selections": [
                          (v9/*: any*/),
                          (v8/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "type": "ExternalPartner",
                            "selections": [
                              (v10/*: any*/)
                            ]
                          },
                          {
                            "kind": "InlineFragment",
                            "type": "Partner",
                            "selections": [
                              (v10/*: any*/),
                              (v11/*: any*/)
                            ]
                          }
                        ]
                      },
                      (v10/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": "start_at",
                        "name": "startAt",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "format",
                            "value": "YYYY"
                          }
                        ],
                        "storageKey": "startAt(format:\"YYYY\")"
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "city",
                        "args": null,
                        "storageKey": null
                      },
                      (v11/*: any*/),
                      (v9/*: any*/)
                    ]
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "cursor",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "showsConnection",
            "args": (v7/*: any*/),
            "handle": "connection",
            "key": "Artist_showsConnection",
            "filters": [
              "sort",
              "atAFair",
              "soloShow",
              "isReference",
              "visibleToPublic"
            ]
          },
          (v8/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "CVItemQuery",
    "id": null,
    "text": "query CVItemQuery(\n  $count: Int\n  $cursor: String\n  $artistID: String!\n  $sort: ShowSorts\n  $atAFair: Boolean\n  $soloShow: Boolean\n  $isReference: Boolean\n  $visibleToPublic: Boolean\n) {\n  artist(id: $artistID) {\n    ...CVItem_artist_4A66pF\n    id\n  }\n}\n\nfragment CVItem_artist_4A66pF on Artist {\n  slug\n  showsConnection(first: $count, after: $cursor, sort: $sort, atAFair: $atAFair, soloShow: $soloShow, isReference: $isReference, visibleToPublic: $visibleToPublic) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        id\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n            href\n          }\n          ... on Node {\n            id\n          }\n        }\n        name\n        start_at: startAt(format: \"YYYY\")\n        city\n        href\n        __typename\n      }\n      cursor\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '813789c45b7ebc3cc68d75dfd68b9ebb';
export default node;
