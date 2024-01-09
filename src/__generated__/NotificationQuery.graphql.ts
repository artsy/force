/**
 * @generated SignedSource<<58809ae0f79de99312372e3c84e441a0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NotificationQuery$variables = {
  id: string;
};
export type NotificationQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"Notification_me">;
  } | null | undefined;
};
export type NotificationQuery = {
  response: NotificationQuery$data;
  variables: NotificationQuery$variables;
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
    "name": "NotificationQuery",
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
    "name": "NotificationQuery",
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
    "cacheID": "e80b3d279ce06ee581baf3f898d42180",
    "id": null,
    "metadata": {},
    "name": "NotificationQuery",
    "operationKind": "query",
    "text": "query NotificationQuery(\n  $id: String!\n) {\n  me {\n    ...Notification_me_2X2oUh\n    id\n  }\n}\n\nfragment Notification_me_2X2oUh on Me {\n  notification(id: $id) {\n    title\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "fce76f7d3b57f7688647ccc72af35abb";

export default node;
