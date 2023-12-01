/**
 * @generated SignedSource<<9c66b2c6d3f21de8025df65884e82e38>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomStatusEnum = "closed" | "draft" | "live" | "scheduled" | "%future added value";
export type PartnerViewingRoomsGrid_ViewingRoomsQuery$variables = {
  after?: string | null | undefined;
  count: number;
  partnerId: string;
  statuses?: ReadonlyArray<ViewingRoomStatusEnum> | null | undefined;
};
export type PartnerViewingRoomsGrid_ViewingRoomsQuery$data = {
  readonly viewingRoomsConnection: {
    readonly " $fragmentSpreads": FragmentRefs<"PartnerViewingRoomsGrid_viewingRoomsConnection">;
  } | null | undefined;
};
export type PartnerViewingRoomsGrid_ViewingRoomsQuery = {
  response: PartnerViewingRoomsGrid_ViewingRoomsQuery$data;
  variables: PartnerViewingRoomsGrid_ViewingRoomsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "after"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "count"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "partnerId"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "statuses"
},
v4 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "partnerId"
  }
],
v5 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v6 = {
  "kind": "Variable",
  "name": "statuses",
  "variableName": "statuses"
},
v7 = [
  (v5/*: any*/),
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  },
  (v6/*: any*/)
];
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
    "name": "PartnerViewingRoomsGrid_ViewingRoomsQuery",
    "selections": [
      {
        "alias": "viewingRoomsConnection",
        "args": (v4/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "args": [
              (v5/*: any*/),
              {
                "kind": "Variable",
                "name": "count",
                "variableName": "count"
              },
              (v6/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "PartnerViewingRoomsGrid_viewingRoomsConnection"
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
    "name": "PartnerViewingRoomsGrid_ViewingRoomsQuery",
    "selections": [
      {
        "alias": "viewingRoomsConnection",
        "args": (v4/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v7/*: any*/),
            "concreteType": "ViewingRoomsConnection",
            "kind": "LinkedField",
            "name": "viewingRoomsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ViewingRoomsEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ViewingRoom",
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
                        "name": "title",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "exhibitionPeriod",
                        "storageKey": null
                      },
                      {
                        "alias": "coverImage",
                        "args": null,
                        "concreteType": "ARImage",
                        "kind": "LinkedField",
                        "name": "image",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ImageURLs",
                            "kind": "LinkedField",
                            "name": "imageURLs",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "normalized",
                                "storageKey": null
                              }
                            ],
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
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
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
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v7/*: any*/),
            "filters": [
              "statuses"
            ],
            "handle": "connection",
            "key": "PartnerViewingRoomsGrid_viewingRoomsConnection",
            "kind": "LinkedHandle",
            "name": "viewingRoomsConnection"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "06ea61921141f612b554fa240fe63043",
    "id": null,
    "metadata": {},
    "name": "PartnerViewingRoomsGrid_ViewingRoomsQuery",
    "operationKind": "query",
    "text": "query PartnerViewingRoomsGrid_ViewingRoomsQuery(\n  $count: Int!\n  $after: String\n  $partnerId: String!\n  $statuses: [ViewingRoomStatusEnum!]\n) {\n  viewingRoomsConnection: partner(id: $partnerId) {\n    ...PartnerViewingRoomsGrid_viewingRoomsConnection_2E6mFi\n    id\n  }\n}\n\nfragment PartnerViewingRoomsGrid_viewingRoomsConnection_2E6mFi on Partner {\n  viewingRoomsConnection(first: $count, after: $after, statuses: $statuses) {\n    edges {\n      node {\n        internalID\n        ...ViewingRoomCard_viewingRoom\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment ViewingRoomCard_viewingRoom on ViewingRoom {\n  href\n  title\n  exhibitionPeriod\n  coverImage: image {\n    imageURLs {\n      normalized\n    }\n    width\n    height\n  }\n}\n"
  }
};
})();

(node as any).hash = "05e30cf5b6888332e23d6c570f258530";

export default node;
