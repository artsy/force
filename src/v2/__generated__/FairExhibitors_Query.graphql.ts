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
        readonly id: string;
        readonly exhibitors: ({
            readonly edges: ReadonlyArray<({
                readonly show: ({
                    readonly id: string;
                    readonly counts: ({
                        readonly artworks: number | null;
                    }) | null;
                    readonly internalID: string;
                    readonly href: string | null;
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
                }) | null;
            }) | null> | null;
        }) | null;
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
  id
  exhibitors: showsConnection(first: 30, sort: FEATURED_ASC) {
    edges {
      show: node {
        id
        counts {
          artworks
        }
        ...FairExhibitorRail_show
      }
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
  "name": "id",
  "storageKey": null
},
v3 = [
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
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 30
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "FEATURED_ASC"
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
                "concreteType": "ShowEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": "show",
                    "args": null,
                    "concreteType": "Show",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
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
                          (v2/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": (v3/*: any*/),
                            "type": "Partner"
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v3/*: any*/),
                            "type": "ExternalPartner"
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "showsConnection(first:30,sort:\"FEATURED_ASC\")"
          }
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
    "text": "query FairExhibitors_Query(\n  $slug: String!\n) {\n  fair(id: $slug) {\n    ...FairExhibitors_fair\n    id\n  }\n}\n\nfragment FairExhibitorRail_show on Show {\n  internalID\n  href\n  partner {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on ExternalPartner {\n      name\n      id\n    }\n    ... on Node {\n      id\n    }\n  }\n  counts {\n    artworks\n  }\n}\n\nfragment FairExhibitors_fair on Fair {\n  id\n  exhibitors: showsConnection(first: 30, sort: FEATURED_ASC) {\n    edges {\n      show: node {\n        id\n        counts {\n          artworks\n        }\n        ...FairExhibitorRail_show\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '0c79ba8bfa4adb482b02f44c18f7c9d7';
export default node;
