/**
 * @generated SignedSource<<2a4a8097afc2172a4b73a0cd9b98f952>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type notificationsRoutesNotificationQuery$variables = {
  id: string;
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
    "name": "id"
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
                "variableName": "id"
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
                "variableName": "id"
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
    "cacheID": "1c79ac149b34078a4574c547ceab8205",
    "id": null,
    "metadata": {},
    "name": "notificationsRoutesNotificationQuery",
    "operationKind": "query",
    "text": "query notificationsRoutesNotificationQuery(\n  $id: String!\n) {\n  me {\n    ...Notification_me_2X2oUh\n    id\n  }\n}\n\nfragment Notification_me_2X2oUh on Me {\n  notification(id: $id) {\n    title\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "e7b549d11d265e94642e4ccc2420a299";

export default node;
