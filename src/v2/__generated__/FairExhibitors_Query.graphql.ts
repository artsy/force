/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairExhibitors_QueryVariables = {
    slug: string;
};
export type FairExhibitors_QueryResponse = {
    readonly fair: {
        readonly " $fragmentRefs": FragmentRefs<"FairExhibitors_fair">;
    } | null;
};
export type FairExhibitors_QueryRawResponse = {
    readonly fair: ({
        readonly slug: string;
        readonly exhibitors: ({
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
                    readonly __typename: "Show";
                }) | null;
                readonly cursor: string;
            }) | null> | null;
            readonly pageInfo: {
                readonly endCursor: string | null;
                readonly hasNextPage: boolean;
            };
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type FairExhibitors_Query = {
    readonly response: FairExhibitors_QueryResponse;
    readonly variables: FairExhibitors_QueryVariables;
    readonly rawResponse: FairExhibitors_QueryRawResponse;
};



/*
query FairExhibitors_Query(
  $slug: String!
) {
  fair(id: $slug) {
    ...FairExhibitors_fair
    id
  }
}

fragment FairExhibitorRail_show on Show {
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

fragment FairExhibitors_fair on Fair {
  slug
  exhibitors: showsConnection(sort: FEATURED_DESC, first: 3, totalCount: true) {
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
        ...FairExhibitorRail_show
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
    "name": "slug",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 3
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "FEATURED_DESC"
  },
  {
    "kind": "Literal",
    "name": "totalCount",
    "value": true
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v6 = [
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FairExhibitors_Query",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairExhibitors_fair"
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
    "name": "FairExhibitors_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": "exhibitors",
            "args": (v3/*: any*/),
            "concreteType": "ShowConnection",
            "kind": "LinkedField",
            "name": "showsConnection",
            "plural": false,
            "selections": [
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
                      (v4/*: any*/),
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
                          (v5/*: any*/),
                          (v4/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": (v6/*: any*/),
                            "type": "Partner"
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v6/*: any*/),
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
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "href",
                        "storageKey": null
                      },
                      (v5/*: any*/)
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
            "storageKey": "showsConnection(first:3,sort:\"FEATURED_DESC\",totalCount:true)"
          },
          {
            "alias": "exhibitors",
            "args": (v3/*: any*/),
            "filters": [
              "sort",
              "totalCount"
            ],
            "handle": "connection",
            "key": "FairExhibitorsQuery_exhibitors",
            "kind": "LinkedHandle",
            "name": "showsConnection"
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "FairExhibitors_Query",
    "operationKind": "query",
    "text": "query FairExhibitors_Query(\n  $slug: String!\n) {\n  fair(id: $slug) {\n    ...FairExhibitors_fair\n    id\n  }\n}\n\nfragment FairExhibitorRail_show on Show {\n  internalID\n  slug\n  href\n  partner {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on ExternalPartner {\n      name\n      id\n    }\n    ... on Node {\n      id\n    }\n  }\n  counts {\n    artworks\n  }\n}\n\nfragment FairExhibitors_fair on Fair {\n  slug\n  exhibitors: showsConnection(sort: FEATURED_DESC, first: 3, totalCount: true) {\n    edges {\n      node {\n        id\n        counts {\n          artworks\n        }\n        partner {\n          __typename\n          ... on Partner {\n            id\n          }\n          ... on ExternalPartner {\n            id\n          }\n          ... on Node {\n            id\n          }\n        }\n        ...FairExhibitorRail_show\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '0c79ba8bfa4adb482b02f44c18f7c9d7';
export default node;
