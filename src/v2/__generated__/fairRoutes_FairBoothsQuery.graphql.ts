/**
 * @generated SignedSource<<1905a10aa32c2ea672cef429971fe4aa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowSorts = "END_AT_ASC" | "END_AT_DESC" | "FEATURED_ASC" | "FEATURED_DESC" | "FEATURED_DESC_END_AT_DESC" | "NAME_ASC" | "NAME_DESC" | "PARTNER_ASC" | "SORTABLE_NAME_ASC" | "SORTABLE_NAME_DESC" | "START_AT_ASC" | "START_AT_DESC" | "UPDATED_AT_ASC" | "UPDATED_AT_DESC" | "%future added value";
export type fairRoutes_FairBoothsQuery$variables = {
  slug: string;
  page?: number | null;
  sort?: ShowSorts | null;
};
export type fairRoutes_FairBoothsQuery$data = {
  readonly fair: {
    readonly " $fragmentSpreads": FragmentRefs<"FairBooths_fair">;
  } | null;
};
export type fairRoutes_FairBoothsQuery = {
  variables: fairRoutes_FairBoothsQuery$variables;
  response: fairRoutes_FairBoothsQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "page"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "slug"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "sort"
},
v3 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
],
v4 = {
  "kind": "Variable",
  "name": "page",
  "variableName": "page"
},
v5 = {
  "kind": "Variable",
  "name": "sort",
  "variableName": "sort"
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v9 = [
  (v7/*: any*/),
  (v8/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v11 = [
  (v10/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "fairRoutes_FairBoothsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          {
            "args": [
              (v4/*: any*/),
              (v5/*: any*/)
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
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "fairRoutes_FairBoothsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          (v6/*: any*/),
          {
            "alias": "exhibitors",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 15
              },
              (v4/*: any*/),
              (v5/*: any*/),
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
                    "selections": (v9/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "first",
                    "plural": false,
                    "selections": (v9/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "last",
                    "plural": false,
                    "selections": (v9/*: any*/),
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
                      (v7/*: any*/),
                      (v8/*: any*/)
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
                      (v10/*: any*/),
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
                            "selections": (v11/*: any*/),
                            "type": "Partner",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v11/*: any*/),
                            "type": "ExternalPartner",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v10/*: any*/)
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
                      (v6/*: any*/),
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
          (v10/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "94e7ec3d366542daf102e434a0901029",
    "id": null,
    "metadata": {},
    "name": "fairRoutes_FairBoothsQuery",
    "operationKind": "query",
    "text": "query fairRoutes_FairBoothsQuery(\n  $slug: String!\n  $page: Int\n  $sort: ShowSorts\n) {\n  fair(id: $slug) @principalField {\n    ...FairBooths_fair_20XdsY\n    id\n  }\n}\n\nfragment FairBoothRail_show on Show {\n  internalID\n  slug\n  href\n  partner {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on ExternalPartner {\n      name\n      id\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  counts {\n    artworks\n  }\n}\n\nfragment FairBooths_fair_20XdsY on Fair {\n  slug\n  exhibitors: showsConnection(sort: $sort, first: 15, page: $page, totalCount: true) {\n    pageInfo {\n      hasNextPage\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        id\n        counts {\n          artworks\n        }\n        partner {\n          __typename\n          ... on Partner {\n            id\n          }\n          ... on ExternalPartner {\n            id\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        ...FairBoothRail_show\n      }\n    }\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n"
  }
};
})();

(node as any).hash = "6d0d13aec52a75860a38948d1508eac1";

export default node;
