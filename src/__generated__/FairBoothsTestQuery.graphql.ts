/**
 * @generated SignedSource<<34487eb07a2bd0ae0aa54bc9edce3933>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowSorts = "CREATED_AT_DESC" | "END_AT_ASC" | "END_AT_DESC" | "FEATURED_ASC" | "FEATURED_DESC" | "FEATURED_DESC_END_AT_DESC" | "NAME_ASC" | "NAME_DESC" | "PARTNER_ASC" | "SORTABLE_NAME_ASC" | "SORTABLE_NAME_DESC" | "START_AT_ASC" | "START_AT_DESC" | "UPDATED_AT_ASC" | "UPDATED_AT_DESC" | "%future added value";
export type FairBoothsTestQuery$variables = {
  first?: number | null | undefined;
  id: string;
  page?: number | null | undefined;
  sort?: ShowSorts | null | undefined;
};
export type FairBoothsTestQuery$data = {
  readonly fair: {
    readonly " $fragmentSpreads": FragmentRefs<"FairBooths_fair">;
  } | null | undefined;
};
export type FairBoothsTestQuery = {
  response: FairBoothsTestQuery$data;
  variables: FairBoothsTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "page"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "sort"
},
v4 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v5 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v6 = {
  "kind": "Variable",
  "name": "page",
  "variableName": "page"
},
v7 = {
  "kind": "Variable",
  "name": "sort",
  "variableName": "sort"
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v11 = [
  (v9/*: any*/),
  (v10/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v13 = [
  (v12/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
],
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v15 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v16 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v17 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v18 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PageCursor"
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "FairBoothsTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          {
            "args": [
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "FairBooths_fair"
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "FairBoothsTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          (v8/*: any*/),
          {
            "alias": "exhibitors",
            "args": [
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
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
                    "selections": (v11/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "first",
                    "plural": false,
                    "selections": (v11/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "last",
                    "plural": false,
                    "selections": (v11/*: any*/),
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
                      (v9/*: any*/),
                      (v10/*: any*/)
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
                      (v12/*: any*/),
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
                          {
                            "kind": "InlineFragment",
                            "selections": (v13/*: any*/),
                            "type": "Partner",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v13/*: any*/),
                            "type": "ExternalPartner",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v12/*: any*/)
                            ],
                            "type": "Node",
                            "abstractKey": "__isNode"
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
                      (v8/*: any*/),
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
          (v12/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8a98382e5c56be5586f396e866519464",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "fair": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Fair"
        },
        "fair.exhibitors": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ShowConnection"
        },
        "fair.exhibitors.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ShowEdge"
        },
        "fair.exhibitors.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Show"
        },
        "fair.exhibitors.edges.node.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ShowCounts"
        },
        "fair.exhibitors.edges.node.counts.artworks": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "fair.exhibitors.edges.node.href": (v14/*: any*/),
        "fair.exhibitors.edges.node.id": (v15/*: any*/),
        "fair.exhibitors.edges.node.internalID": (v15/*: any*/),
        "fair.exhibitors.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerTypes"
        },
        "fair.exhibitors.edges.node.partner.__isNode": (v16/*: any*/),
        "fair.exhibitors.edges.node.partner.__typename": (v16/*: any*/),
        "fair.exhibitors.edges.node.partner.id": (v15/*: any*/),
        "fair.exhibitors.edges.node.partner.name": (v14/*: any*/),
        "fair.exhibitors.edges.node.slug": (v15/*: any*/),
        "fair.exhibitors.pageCursors": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageCursors"
        },
        "fair.exhibitors.pageCursors.around": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "PageCursor"
        },
        "fair.exhibitors.pageCursors.around.cursor": (v16/*: any*/),
        "fair.exhibitors.pageCursors.around.isCurrent": (v17/*: any*/),
        "fair.exhibitors.pageCursors.around.page": (v18/*: any*/),
        "fair.exhibitors.pageCursors.first": (v19/*: any*/),
        "fair.exhibitors.pageCursors.first.cursor": (v16/*: any*/),
        "fair.exhibitors.pageCursors.first.isCurrent": (v17/*: any*/),
        "fair.exhibitors.pageCursors.first.page": (v18/*: any*/),
        "fair.exhibitors.pageCursors.last": (v19/*: any*/),
        "fair.exhibitors.pageCursors.last.cursor": (v16/*: any*/),
        "fair.exhibitors.pageCursors.last.isCurrent": (v17/*: any*/),
        "fair.exhibitors.pageCursors.last.page": (v18/*: any*/),
        "fair.exhibitors.pageCursors.previous": (v19/*: any*/),
        "fair.exhibitors.pageCursors.previous.cursor": (v16/*: any*/),
        "fair.exhibitors.pageCursors.previous.page": (v18/*: any*/),
        "fair.exhibitors.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "fair.exhibitors.pageInfo.hasNextPage": (v17/*: any*/),
        "fair.id": (v15/*: any*/),
        "fair.slug": (v15/*: any*/)
      }
    },
    "name": "FairBoothsTestQuery",
    "operationKind": "query",
    "text": "query FairBoothsTestQuery(\n  $id: String!\n  $first: Int\n  $page: Int\n  $sort: ShowSorts\n) {\n  fair(id: $id) {\n    ...FairBooths_fair_1HMhop\n    id\n  }\n}\n\nfragment FairBoothRail_show on Show {\n  internalID\n  slug\n  href\n  partner {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on ExternalPartner {\n      name\n      id\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  counts {\n    artworks\n  }\n}\n\nfragment FairBooths_fair_1HMhop on Fair {\n  slug\n  exhibitors: showsConnection(sort: $sort, first: $first, page: $page, totalCount: true) {\n    pageInfo {\n      hasNextPage\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        id\n        counts {\n          artworks\n        }\n        partner {\n          __typename\n          ... on Partner {\n            id\n          }\n          ... on ExternalPartner {\n            id\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        ...FairBoothRail_show\n      }\n    }\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n"
  }
};
})();

(node as any).hash = "223d4d7d9883f50be22e2a8ccac029d7";

export default node;
