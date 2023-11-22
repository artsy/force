/**
 * @generated SignedSource<<c9638769ce2c73e62a667d9e5a86ea82>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
    "cacheID": "ae973f8fcc131de9d96c6bf3d0d1fa3f",
    "id": null,
    "metadata": {},
    "name": "partnerRoutes_ViewingRoomsQuery",
    "operationKind": "query",
    "text": "query partnerRoutes_ViewingRoomsQuery(\n  $partnerId: String!\n) {\n  currentViewingRooms: partner(id: $partnerId) @principalField {\n    ...PartnerViewingRooms_currentViewingRooms\n    id\n  }\n  upcomingViewingRooms: partner(id: $partnerId) {\n    ...PartnerViewingRooms_upcomingViewingRooms\n    id\n  }\n  pastViewingRooms: partner(id: $partnerId) {\n    ...PartnerViewingRooms_pastViewingRooms\n    id\n  }\n}\n\nfragment PartnerViewingRoomsGrid_viewingRoomsConnection_3eUKbK on Partner {\n  viewingRoomsConnection(first: 12, statuses: [scheduled]) {\n    edges {\n      node {\n        internalID\n        ...ViewingRoomCard_viewingRoom\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment PartnerViewingRoomsGrid_viewingRoomsConnection_MnbZx on Partner {\n  viewingRoomsConnection(first: 12, statuses: [closed]) {\n    edges {\n      node {\n        internalID\n        ...ViewingRoomCard_viewingRoom\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment PartnerViewingRoomsGrid_viewingRoomsConnection_tlCQk on Partner {\n  viewingRoomsConnection(first: 12, statuses: [live]) {\n    edges {\n      node {\n        internalID\n        ...ViewingRoomCard_viewingRoom\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment PartnerViewingRooms_currentViewingRooms on Partner {\n  ...PartnerViewingRoomsGrid_viewingRoomsConnection_tlCQk\n}\n\nfragment PartnerViewingRooms_pastViewingRooms on Partner {\n  ...PartnerViewingRoomsGrid_viewingRoomsConnection_MnbZx\n}\n\nfragment PartnerViewingRooms_upcomingViewingRooms on Partner {\n  ...PartnerViewingRoomsGrid_viewingRoomsConnection_3eUKbK\n}\n\nfragment ViewingRoomCard_viewingRoom on ViewingRoom {\n  href\n  title\n  exhibitionPeriod\n  coverImage: image {\n    imageURLs {\n      normalized\n    }\n    width\n    height\n  }\n}\n"
  }
};
})();

(node as any).hash = "ccd6ccfc0accbde4aebf4dac3c09ddbc";

export default node;
