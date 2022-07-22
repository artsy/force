/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type partnerRoutes_ShowsQueryVariables = {
    partnerId: string;
};
export type partnerRoutes_ShowsQueryResponse = {
    readonly partner: {
        readonly counts: {
            readonly displayableShows: number | null;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"Shows_partner">;
    } | null;
};
export type partnerRoutes_ShowsQuery = {
    readonly response: partnerRoutes_ShowsQueryResponse;
    readonly variables: partnerRoutes_ShowsQueryVariables;
};



/*
query partnerRoutes_ShowsQuery(
  $partnerId: String!
) {
  partner(id: $partnerId) @principalField {
    counts {
      displayableShows
    }
    ...Shows_partner
    id
  }
}

fragment CellShow_show on Show {
  internalID
  slug
  name
  href
  startAt
  endAt
  isFairBooth
  exhibitionPeriod
  partner {
    __typename
    ... on Partner {
      name
    }
    ... on Node {
      __isNode: __typename
      id
    }
    ... on ExternalPartner {
      id
    }
  }
  coverImage {
    cropped(width: 445, height: 334, version: ["normalized", "larger", "large"]) {
      src
      srcSet
    }
  }
}

fragment ShowBanner_show on Show {
  slug
  name
  href
  isFairBooth
  exhibitionPeriod
  status
  description
  location {
    city
    id
  }
  coverImage {
    medium: cropped(width: 600, height: 480, version: ["normalized", "larger", "large"]) {
      src
      srcSet
    }
  }
}

fragment ShowEvents_edges on ShowEdge {
  node {
    ...CellShow_show
    internalID
    id
  }
}

fragment Shows_partner on Partner {
  slug
  featuredEvents: showsConnection(first: 1, status: ALL, sort: FEATURED_DESC_END_AT_DESC, isDisplayable: true) {
    edges {
      node {
        isFeatured
        internalID
        ...ShowBanner_show
        id
      }
    }
  }
  currentEvents: showsConnection(first: 12, status: RUNNING, isDisplayable: true) {
    edges {
      node {
        internalID
        id
      }
      ...ShowEvents_edges
    }
  }
  upcomingEvents: showsConnection(first: 12, status: UPCOMING, isDisplayable: true) {
    edges {
      node {
        internalID
        id
      }
      ...ShowEvents_edges
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "partnerId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "partnerId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "PartnerCounts",
  "kind": "LinkedField",
  "name": "counts",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "displayableShows",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v4 = {
  "kind": "Literal",
  "name": "isDisplayable",
  "value": true
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isFairBooth",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "exhibitionPeriod",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v11 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "normalized",
    "larger",
    "large"
  ]
},
v12 = [
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
  }
],
v13 = {
  "kind": "Literal",
  "name": "first",
  "value": 12
},
v14 = [
  (v10/*: any*/)
],
v15 = [
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
          (v5/*: any*/),
          (v10/*: any*/),
          (v3/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "startAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "endAt",
            "storageKey": null
          },
          (v8/*: any*/),
          (v9/*: any*/),
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
                "selections": [
                  (v6/*: any*/)
                ],
                "type": "Partner",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v14/*: any*/),
                "type": "Node",
                "abstractKey": "__isNode"
              },
              {
                "kind": "InlineFragment",
                "selections": (v14/*: any*/),
                "type": "ExternalPartner",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "coverImage",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 334
                  },
                  (v11/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 445
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v12/*: any*/),
                "storageKey": "cropped(height:334,version:[\"normalized\",\"larger\",\"large\"],width:445)"
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "partnerRoutes_ShowsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Shows_partner"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "partnerRoutes_ShowsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": "featuredEvents",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 1
              },
              (v4/*: any*/),
              {
                "kind": "Literal",
                "name": "sort",
                "value": "FEATURED_DESC_END_AT_DESC"
              },
              {
                "kind": "Literal",
                "name": "status",
                "value": "ALL"
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
                    "alias": null,
                    "args": null,
                    "concreteType": "Show",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isFeatured",
                        "storageKey": null
                      },
                      (v5/*: any*/),
                      (v3/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "status",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "description",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Location",
                        "kind": "LinkedField",
                        "name": "location",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "city",
                            "storageKey": null
                          },
                          (v10/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "coverImage",
                        "plural": false,
                        "selections": [
                          {
                            "alias": "medium",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 480
                              },
                              (v11/*: any*/),
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 600
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": (v12/*: any*/),
                            "storageKey": "cropped(height:480,version:[\"normalized\",\"larger\",\"large\"],width:600)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v10/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "showsConnection(first:1,isDisplayable:true,sort:\"FEATURED_DESC_END_AT_DESC\",status:\"ALL\")"
          },
          {
            "alias": "currentEvents",
            "args": [
              (v13/*: any*/),
              (v4/*: any*/),
              {
                "kind": "Literal",
                "name": "status",
                "value": "RUNNING"
              }
            ],
            "concreteType": "ShowConnection",
            "kind": "LinkedField",
            "name": "showsConnection",
            "plural": false,
            "selections": (v15/*: any*/),
            "storageKey": "showsConnection(first:12,isDisplayable:true,status:\"RUNNING\")"
          },
          {
            "alias": "upcomingEvents",
            "args": [
              (v13/*: any*/),
              (v4/*: any*/),
              {
                "kind": "Literal",
                "name": "status",
                "value": "UPCOMING"
              }
            ],
            "concreteType": "ShowConnection",
            "kind": "LinkedField",
            "name": "showsConnection",
            "plural": false,
            "selections": (v15/*: any*/),
            "storageKey": "showsConnection(first:12,isDisplayable:true,status:\"UPCOMING\")"
          },
          (v10/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b1e5eb75312ebe1997bc54099a9cf2f4",
    "id": null,
    "metadata": {},
    "name": "partnerRoutes_ShowsQuery",
    "operationKind": "query",
    "text": "query partnerRoutes_ShowsQuery(\n  $partnerId: String!\n) {\n  partner(id: $partnerId) @principalField {\n    counts {\n      displayableShows\n    }\n    ...Shows_partner\n    id\n  }\n}\n\nfragment CellShow_show on Show {\n  internalID\n  slug\n  name\n  href\n  startAt\n  endAt\n  isFairBooth\n  exhibitionPeriod\n  partner {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on ExternalPartner {\n      id\n    }\n  }\n  coverImage {\n    cropped(width: 445, height: 334, version: [\"normalized\", \"larger\", \"large\"]) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ShowBanner_show on Show {\n  slug\n  name\n  href\n  isFairBooth\n  exhibitionPeriod\n  status\n  description\n  location {\n    city\n    id\n  }\n  coverImage {\n    medium: cropped(width: 600, height: 480, version: [\"normalized\", \"larger\", \"large\"]) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ShowEvents_edges on ShowEdge {\n  node {\n    ...CellShow_show\n    internalID\n    id\n  }\n}\n\nfragment Shows_partner on Partner {\n  slug\n  featuredEvents: showsConnection(first: 1, status: ALL, sort: FEATURED_DESC_END_AT_DESC, isDisplayable: true) {\n    edges {\n      node {\n        isFeatured\n        internalID\n        ...ShowBanner_show\n        id\n      }\n    }\n  }\n  currentEvents: showsConnection(first: 12, status: RUNNING, isDisplayable: true) {\n    edges {\n      node {\n        internalID\n        id\n      }\n      ...ShowEvents_edges\n    }\n  }\n  upcomingEvents: showsConnection(first: 12, status: UPCOMING, isDisplayable: true) {\n    edges {\n      node {\n        internalID\n        id\n      }\n      ...ShowEvents_edges\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '1b9e1e09f499c2691cedced5d59664ec';
export default node;
