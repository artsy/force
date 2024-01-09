/**
 * @generated SignedSource<<2293f6250b82e32a928e4463231ee817>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type notificationsRoutesNotificationQuery$variables = {
  notificationId: string;
};
export type notificationsRoutesNotificationQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"Notification_me">;
  } | null | undefined;
};
export type notificationsRoutesNotificationQuery = {
  response: notificationsRoutesNotificationQuery$data;
  variables: notificationsRoutesNotificationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "notificationId"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
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
            "args": [
              {
                "kind": "Variable",
                "name": "notificationId",
                "variableName": "notificationId"
              }
            ],
            "kind": "FragmentSpread",
            "name": "Notification_me"
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
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "notificationId"
              }
            ],
            "concreteType": "Notification",
            "kind": "LinkedField",
            "name": "notification",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c8f2ce8e5f810039d256af5005dc4058",
    "id": null,
    "metadata": {},
    "name": "notificationsRoutesNotificationQuery",
    "operationKind": "query",
    "text": "query notificationsRoutesNotificationQuery(\n  $notificationId: String!\n) {\n  me {\n    ...Notification_me_2a8bQo\n    id\n  }\n}\n\nfragment Notification_me_2a8bQo on Me {\n  notification(id: $notificationId) {\n    title\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "b37add378d96553a5677b53616b80d5c";

export default node;
