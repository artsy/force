/**
 * @generated SignedSource<<21cbd3033169e801dade08e07741afe8>>
 * @relayHash 0ebeaab2383d18af9ceb2f94edc7f7e3
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 0ebeaab2383d18af9ceb2f94edc7f7e3

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type partnerRoutes_ViewingRoomsQuery$variables = {
  partnerId: string;
};
export type partnerRoutes_ViewingRoomsQuery$data = {
  readonly currentViewingRooms: {
    readonly " $fragmentSpreads": FragmentRefs<"PartnerViewingRooms_currentViewingRooms">;
  } | null | undefined;
  readonly pastViewingRooms: {
    readonly " $fragmentSpreads": FragmentRefs<"PartnerViewingRooms_pastViewingRooms">;
  } | null | undefined;
  readonly upcomingViewingRooms: {
    readonly " $fragmentSpreads": FragmentRefs<"PartnerViewingRooms_upcomingViewingRooms">;
  } | null | undefined;
};
export type partnerRoutes_ViewingRoomsQuery = {
  response: partnerRoutes_ViewingRoomsQuery$data;
  variables: partnerRoutes_ViewingRoomsQuery$variables;
};

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
  "kind": "Literal",
  "name": "first",
  "value": 12
},
v3 = [
  (v2/*: any*/),
  {
    "kind": "Literal",
    "name": "statuses",
    "value": [
      "live"
    ]
  }
],
v4 = [
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
v5 = [
  "statuses"
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = [
  (v2/*: any*/),
  {
    "kind": "Literal",
    "name": "statuses",
    "value": [
      "scheduled"
    ]
  }
],
v8 = [
  (v2/*: any*/),
  {
    "kind": "Literal",
    "name": "statuses",
    "value": [
      "closed"
    ]
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "partnerRoutes_ViewingRoomsQuery",
    "selections": [
      {
        "alias": "currentViewingRooms",
        "args": (v1/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PartnerViewingRooms_currentViewingRooms"
          }
        ],
        "storageKey": null
      },
      {
        "alias": "upcomingViewingRooms",
        "args": (v1/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PartnerViewingRooms_upcomingViewingRooms"
          }
        ],
        "storageKey": null
      },
      {
        "alias": "pastViewingRooms",
        "args": (v1/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PartnerViewingRooms_pastViewingRooms"
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
    "name": "partnerRoutes_ViewingRoomsQuery",
    "selections": [
      {
        "alias": "currentViewingRooms",
        "args": (v1/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "ViewingRoomsConnection",
            "kind": "LinkedField",
            "name": "viewingRoomsConnection",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": "viewingRoomsConnection(first:12,statuses:[\"live\"])"
          },
          {
            "alias": null,
            "args": (v3/*: any*/),
            "filters": (v5/*: any*/),
            "handle": "connection",
            "key": "PartnerViewingRoomsGrid_viewingRoomsConnection",
            "kind": "LinkedHandle",
            "name": "viewingRoomsConnection"
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": "upcomingViewingRooms",
        "args": (v1/*: any*/),
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
            "selections": (v4/*: any*/),
            "storageKey": "viewingRoomsConnection(first:12,statuses:[\"scheduled\"])"
          },
          {
            "alias": null,
            "args": (v7/*: any*/),
            "filters": (v5/*: any*/),
            "handle": "connection",
            "key": "PartnerViewingRoomsGrid_viewingRoomsConnection",
            "kind": "LinkedHandle",
            "name": "viewingRoomsConnection"
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": "pastViewingRooms",
        "args": (v1/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v8/*: any*/),
            "concreteType": "ViewingRoomsConnection",
            "kind": "LinkedField",
            "name": "viewingRoomsConnection",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": "viewingRoomsConnection(first:12,statuses:[\"closed\"])"
          },
          {
            "alias": null,
            "args": (v8/*: any*/),
            "filters": (v5/*: any*/),
            "handle": "connection",
            "key": "PartnerViewingRoomsGrid_viewingRoomsConnection",
            "kind": "LinkedHandle",
            "name": "viewingRoomsConnection"
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "0ebeaab2383d18af9ceb2f94edc7f7e3",
    "metadata": {},
    "name": "partnerRoutes_ViewingRoomsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "2736c0d43f37598040dbab4f1be81c53";

export default node;
