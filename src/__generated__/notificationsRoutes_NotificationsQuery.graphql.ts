/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type notificationsRoutes_NotificationsQueryVariables = {};
export type notificationsRoutes_NotificationsQueryResponse = {
    readonly notifications: {
        readonly " $fragmentRefs": FragmentRefs<"NotificationsApp_notifications">;
    } | null;
};
export type notificationsRoutes_NotificationsQuery = {
    readonly response: notificationsRoutes_NotificationsQueryResponse;
    readonly variables: notificationsRoutes_NotificationsQueryVariables;
};



/*
query notificationsRoutes_NotificationsQuery {
  notifications: notificationsConnection(first: 10) {
    ...NotificationsApp_notifications
  }
}

fragment NotificationItem_item on Notification {
  title
  message
  createdAt
  targetHref
  artworksConnection(first: 4) {
    totalCount
    edges {
      node {
        title
        id
      }
    }
  }
}

fragment NotificationsApp_notifications on NotificationConnection {
  edges {
    node {
      internalID
      ...NotificationItem_item
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "notificationsRoutes_NotificationsQuery",
    "selections": [
      {
        "alias": "notifications",
        "args": (v0/*: any*/),
        "concreteType": "NotificationConnection",
        "kind": "LinkedField",
        "name": "notificationsConnection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "NotificationsApp_notifications"
          }
        ],
        "storageKey": "notificationsConnection(first:10)"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "notificationsRoutes_NotificationsQuery",
    "selections": [
      {
        "alias": "notifications",
        "args": (v0/*: any*/),
        "concreteType": "NotificationConnection",
        "kind": "LinkedField",
        "name": "notificationsConnection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "NotificationEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Notification",
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
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "message",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "createdAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "targetHref",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 4
                      }
                    ],
                    "concreteType": "ArtworkConnection",
                    "kind": "LinkedField",
                    "name": "artworksConnection",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "totalCount",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtworkEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Artwork",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v1/*: any*/),
                              (v2/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "artworksConnection(first:4)"
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "notificationsConnection(first:10)"
      }
    ]
  },
  "params": {
    "cacheID": "e5af3ef304c7ee2bd8fad0ec8b6eb82c",
    "id": null,
    "metadata": {},
    "name": "notificationsRoutes_NotificationsQuery",
    "operationKind": "query",
    "text": "query notificationsRoutes_NotificationsQuery {\n  notifications: notificationsConnection(first: 10) {\n    ...NotificationsApp_notifications\n  }\n}\n\nfragment NotificationItem_item on Notification {\n  title\n  message\n  createdAt\n  targetHref\n  artworksConnection(first: 4) {\n    totalCount\n    edges {\n      node {\n        title\n        id\n      }\n    }\n  }\n}\n\nfragment NotificationsApp_notifications on NotificationConnection {\n  edges {\n    node {\n      internalID\n      ...NotificationItem_item\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c2bcc561df8ec5248e6d741b7a1c17cf';
export default node;
