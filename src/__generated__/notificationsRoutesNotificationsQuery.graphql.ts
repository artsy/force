/**
 * @generated SignedSource<<71346677d883439db68f57dca19e6c23>>
 * @relayHash 2613f5bce30bf33016091dc423a701cd
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 2613f5bce30bf33016091dc423a701cd

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type notificationsRoutesNotificationsQuery$variables = Record<PropertyKey, never>;
export type notificationsRoutesNotificationsQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"NotificationsApp_me">;
  } | null | undefined;
};
export type notificationsRoutesNotificationsQuery = {
  response: notificationsRoutesNotificationsQuery$data;
  variables: notificationsRoutesNotificationsQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "notificationsRoutesNotificationsQuery",
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
    "name": "notificationsRoutesNotificationsQuery",
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
    "id": "2613f5bce30bf33016091dc423a701cd",
    "metadata": {},
    "name": "notificationsRoutesNotificationsQuery",
    "operationKind": "query",
    "text": null
  }
};

(node as any).hash = "699c940096905e074ae2cacd53333427";

export default node;
