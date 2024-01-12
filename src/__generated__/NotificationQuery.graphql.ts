/**
 * @generated SignedSource<<97cd82ab5cddb5cc2079fec20ca116e5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type NotificationQuery$variables = {
  id: string;
};
export type NotificationQuery$data = {
  readonly me: {
    readonly notification: {
      readonly title: string;
    } | null | undefined;
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
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v3 = {
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
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "Notification",
            "kind": "LinkedField",
            "name": "notification",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
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
            "args": (v1/*: any*/),
            "concreteType": "Notification",
            "kind": "LinkedField",
            "name": "notification",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9ef897a3efbc4ea5ea1e5ffd42c4bb66",
    "id": null,
    "metadata": {},
    "name": "NotificationQuery",
    "operationKind": "query",
    "text": "query NotificationQuery(\n  $id: String!\n) {\n  me {\n    notification(id: $id) {\n      title\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "a82be41c0ee4f4061d4490dac0f76efc";

export default node;
