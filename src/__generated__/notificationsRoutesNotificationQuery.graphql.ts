/**
 * @generated SignedSource<<9adc1e7189623979a727228ad8f8cc7e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
    "cacheID": "d5cb685c05ec202e795271ea5bc225f7",
    "id": null,
    "metadata": {},
    "name": "notificationsRoutesNotificationQuery",
    "operationKind": "query",
    "text": "query notificationsRoutesNotificationQuery {\n  me {\n    ...NotificationsApp_me\n    id\n  }\n}\n\nfragment NotificationsApp_me on Me {\n  unreadNotificationsCount\n}\n"
  }
};

(node as any).hash = "4b25572db1fc5773e8cfeb61d82e6408";

export default node;
