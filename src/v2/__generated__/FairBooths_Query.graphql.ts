/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowSorts = "END_AT_ASC" | "END_AT_DESC" | "FEATURED_ASC" | "FEATURED_DESC" | "FEATURED_DESC_END_AT_DESC" | "NAME_ASC" | "NAME_DESC" | "PARTNER_ASC" | "SORTABLE_NAME_ASC" | "SORTABLE_NAME_DESC" | "START_AT_ASC" | "START_AT_DESC" | "UPDATED_AT_ASC" | "UPDATED_AT_DESC" | "%future added value";
export type FairBooths_QueryVariables = {
    id: string;
    first?: number | null;
    page?: number | null;
    sort?: ShowSorts | null;
};
export type FairBooths_QueryResponse = {
    readonly fair: {
        readonly " $fragmentRefs": FragmentRefs<"FairBooths_fair">;
    } | null;
};
export type FairBooths_QueryRawResponse = {
    readonly fair: ({
        readonly slug: string;
        readonly exhibitors: ({
            readonly pageInfo: {
                readonly hasNextPage: boolean;
            };
            readonly pageCursors: {
                readonly around: ReadonlyArray<{
                    readonly cursor: string;
                    readonly page: number;
                    readonly isCurrent: boolean;
                }>;
                readonly first: ({
                    readonly cursor: string;
                    readonly page: number;
                    readonly isCurrent: boolean;
                }) | null;
                readonly last: ({
                    readonly cursor: string;
                    readonly page: number;
                    readonly isCurrent: boolean;
                }) | null;
                readonly previous: ({
                    readonly cursor: string;
                    readonly page: number;
                }) | null;
            };
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly id: string;
                    readonly counts: ({
                        readonly artworks: number | null;
                    }) | null;
                    readonly partner: ({
                        readonly __typename: "Partner";
                        readonly id: string | null;
                        readonly name: string | null;
                    } | {
                        readonly __typename: "ExternalPartner";
                        readonly id: string | null;
                        readonly name: string | null;
                    } | {
                        readonly __typename: string | null;
                        readonly id: string | null;
                    }) | null;
                    readonly internalID: string;
                    readonly slug: string;
                    readonly href: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type FairBooths_Query = {
    readonly response: FairBooths_QueryResponse;
    readonly variables: FairBooths_QueryVariables;
    readonly rawResponse: FairBooths_QueryRawResponse;
};



/*
query FairBooths_Query(
  $id: String!
  $first: Int
  $page: Int
  $sort: ShowSorts
) {
  fair(id: $id) {
    ...FairBooths_fair_1HMhop
    id
  }
}

fragment FairBoothRail_show on Show {
  internalID
  slug
  href
  partner {
    __typename
    ... on Partner {
      name
    }
    ... on ExternalPartner {
      name
      id
    }
    ... on Node {
      id
    }
  }
  counts {
    artworks
  }
}

fragment FairBooths_fair_1HMhop on Fair {
  slug
  exhibitors: showsConnection(sort: $sort, first: $first, page: $page, totalCount: true) {
    pageInfo {
      hasNextPage
    }
    pageCursors {
      ...Pagination_pageCursors
    }
    edges {
      node {
        id
        counts {
          artworks
        }
        partner {
          __typename
          ... on Partner {
            id
          }
          ... on ExternalPartner {
            id
          }
          ... on Node {
            id
          }
        }
        ...FairBoothRail_show
      }
    }
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
    "type": "Int"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "page",
    "type": "Int"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "sort",
    "type": "ShowSorts"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v3 = {
  "kind": "Variable",
  "name": "page",
  "variableName": "page"
},
v4 = {
  "kind": "Variable",
  "name": "sort",
  "variableName": "sort"
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v8 = [
  (v6/*: any*/),
  (v7/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v10 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
],
v11 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v12 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v13 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": false
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
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FairBooths_Query",
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
            "args": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "FairBooths_fair"
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
    "name": "FairBooths_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          {
            "alias": "exhibitors",
            "args": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "kind": "Literal",
                "name": "totalCount",
                "value": true
              }
            ],
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
                    "selections": (v8/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "first",
                    "plural": false,
                    "selections": (v8/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "last",
                    "plural": false,
                    "selections": (v8/*: any*/),
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
                      (v6/*: any*/),
                      (v7/*: any*/)
                    ],
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
                      (v9/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ShowCounts",
                        "kind": "LinkedField",
                        "name": "counts",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "artworks",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "__typename",
                            "storageKey": null
                          },
                          (v9/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": (v10/*: any*/),
                            "type": "Partner"
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v10/*: any*/),
                            "type": "ExternalPartner"
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
                      (v5/*: any*/),
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
            "storageKey": null
          },
          (v9/*: any*/)
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
        "fair.id": (v11/*: any*/),
        "fair.slug": (v12/*: any*/),
        "fair.exhibitors": {
          "type": "ShowConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fair.exhibitors.pageInfo": {
          "type": "PageInfo",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "fair.exhibitors.pageCursors": {
          "type": "PageCursors",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "fair.exhibitors.edges": {
          "type": "ShowEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "fair.exhibitors.pageInfo.hasNextPage": (v13/*: any*/),
        "fair.exhibitors.edges.node": {
          "type": "Show",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fair.exhibitors.pageCursors.around": {
          "type": "PageCursor",
          "enumValues": null,
          "plural": true,
          "nullable": false
        },
        "fair.exhibitors.pageCursors.first": (v14/*: any*/),
        "fair.exhibitors.pageCursors.last": (v14/*: any*/),
        "fair.exhibitors.pageCursors.previous": (v14/*: any*/),
        "fair.exhibitors.edges.node.id": (v12/*: any*/),
        "fair.exhibitors.edges.node.counts": {
          "type": "ShowCounts",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fair.exhibitors.edges.node.partner": {
          "type": "PartnerTypes",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fair.exhibitors.pageCursors.around.cursor": (v15/*: any*/),
        "fair.exhibitors.pageCursors.around.page": (v16/*: any*/),
        "fair.exhibitors.pageCursors.around.isCurrent": (v13/*: any*/),
        "fair.exhibitors.pageCursors.first.cursor": (v15/*: any*/),
        "fair.exhibitors.pageCursors.first.page": (v16/*: any*/),
        "fair.exhibitors.pageCursors.first.isCurrent": (v13/*: any*/),
        "fair.exhibitors.pageCursors.last.cursor": (v15/*: any*/),
        "fair.exhibitors.pageCursors.last.page": (v16/*: any*/),
        "fair.exhibitors.pageCursors.last.isCurrent": (v13/*: any*/),
        "fair.exhibitors.pageCursors.previous.cursor": (v15/*: any*/),
        "fair.exhibitors.pageCursors.previous.page": (v16/*: any*/),
        "fair.exhibitors.edges.node.counts.artworks": {
          "type": "Int",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fair.exhibitors.edges.node.internalID": (v12/*: any*/),
        "fair.exhibitors.edges.node.slug": (v12/*: any*/),
        "fair.exhibitors.edges.node.href": (v17/*: any*/),
        "fair.exhibitors.edges.node.partner.id": (v11/*: any*/),
        "fair.exhibitors.edges.node.partner.name": (v17/*: any*/)
      }
    },
    "name": "FairBooths_Query",
    "operationKind": "query",
    "text": "query FairBooths_Query(\n  $id: String!\n  $first: Int\n  $page: Int\n  $sort: ShowSorts\n) {\n  fair(id: $id) {\n    ...FairBooths_fair_1HMhop\n    id\n  }\n}\n\nfragment FairBoothRail_show on Show {\n  internalID\n  slug\n  href\n  partner {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on ExternalPartner {\n      name\n      id\n    }\n    ... on Node {\n      id\n    }\n  }\n  counts {\n    artworks\n  }\n}\n\nfragment FairBooths_fair_1HMhop on Fair {\n  slug\n  exhibitors: showsConnection(sort: $sort, first: $first, page: $page, totalCount: true) {\n    pageInfo {\n      hasNextPage\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        id\n        counts {\n          artworks\n        }\n        partner {\n          __typename\n          ... on Partner {\n            id\n          }\n          ... on ExternalPartner {\n            id\n          }\n          ... on Node {\n            id\n          }\n        }\n        ...FairBoothRail_show\n      }\n    }\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bbdf2c942ed469364437bad9140fe5eb';
export default node;
