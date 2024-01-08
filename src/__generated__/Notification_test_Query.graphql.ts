/**
 * @generated SignedSource<<51bb86c4753e7cb74bb8d53693aa5995>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Notification_test_Query$variables = {
  id: string;
};
export type Notification_test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"Notification_me">;
  } | null | undefined;
};
export type Notification_test_Query = {
  response: Notification_test_Query$data;
  variables: Notification_test_Query$variables;
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
},
v2 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "Notification_test_Query",
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
    "name": "Notification_test_Query",
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
    "cacheID": "03b9e3fb5790166c298a3c10bf838dbf",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v2/*: any*/),
        "me.notification": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Notification"
        },
        "me.notification.id": (v2/*: any*/),
        "me.notification.title": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "String"
        }
      }
    },
    "name": "Notification_test_Query",
    "operationKind": "query",
    "text": "query Notification_test_Query(\n  $id: String!\n) {\n  me {\n    ...Notification_me_2X2oUh\n    id\n  }\n}\n\nfragment Notification_me_2X2oUh on Me {\n  notification(id: $id) {\n    title\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "1f77be5922168d75fabcb94aaa46f042";

export default node;
