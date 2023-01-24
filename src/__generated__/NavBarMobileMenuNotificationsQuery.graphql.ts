/**
 * @generated SignedSource<<be37a7aaad2e791e64fabd7c6b1e9304>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NavBarMobileMenuNotificationsQuery$variables = {};
export type NavBarMobileMenuNotificationsQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"NavBarMobileMenuNotifications_me">;
  } | null;
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"NavBarMobileMenuNotifications_viewer">;
  } | null;
};
export type NavBarMobileMenuNotificationsQuery = {
  response: NavBarMobileMenuNotificationsQuery$data;
  variables: NavBarMobileMenuNotificationsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
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
    "name": "NavBarMobileMenuNotificationsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "NavBarMobileMenuNotifications_viewer"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "NavBarMobileMenuNotifications_me"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "NavBarMobileMenuNotificationsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 3
              }
            ],
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
                        "name": "publishedAt",
                        "storageKey": null
                      },
                      (v0/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "notificationsConnection(first:3)"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "unreadConversationCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "unreadNotificationsCount",
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "81c689e4bdfd02e15a905ef3974ec591",
    "id": null,
    "metadata": {},
    "name": "NavBarMobileMenuNotificationsQuery",
    "operationKind": "query",
    "text": "query NavBarMobileMenuNotificationsQuery {\n  viewer {\n    ...NavBarMobileMenuNotifications_viewer\n  }\n  me {\n    ...NavBarMobileMenuNotifications_me\n    id\n  }\n}\n\nfragment NavBarMobileMenuNotifications_me on Me {\n  unreadConversationCount\n  unreadNotificationsCount\n}\n\nfragment NavBarMobileMenuNotifications_viewer on Viewer {\n  notificationsConnection(first: 3) {\n    edges {\n      node {\n        publishedAt\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b84cec710912c7a5b5b395bbcfb99464";

export default node;
