/**
 * @generated SignedSource<<bee597919297b33799da0b81c4b1d854>>
 * @relayHash d5cb685c05ec202e795271ea5bc225f7
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID d5cb685c05ec202e795271ea5bc225f7

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type notificationsRoutesNotificationQuery$variables = Record<PropertyKey, never>;
export type notificationsRoutesNotificationQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"NotificationsApp_me">;
  } | null | undefined;
};
export type notificationsRoutesNotificationQuery = {
  response: notificationsRoutesNotificationQuery$data;
  variables: notificationsRoutesNotificationQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "notificationsRoutesNotificationQuery",
    "selections": [
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
            "name": "NotificationsApp_me"
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
    "name": "notificationsRoutesNotificationQuery",
    "selections": [
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
            "name": "unreadNotificationsCount",
            "storageKey": null
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
    "id": "d5cb685c05ec202e795271ea5bc225f7",
    "metadata": {},
    "name": "notificationsRoutesNotificationQuery",
    "operationKind": "query",
    "text": null
  }
};

(node as any).hash = "4b25572db1fc5773e8cfeb61d82e6408";

export default node;
