/**
 * @generated SignedSource<<e8f76c1ef2389d6af232eb510f71fd16>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type NotificationsPillsQuery$variables = Record<PropertyKey, never>;
export type NotificationsPillsQuery$data = {
  readonly viewer: {
    readonly notificationsConnection: {
      readonly totalCount: number | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type NotificationsPillsQuery = {
  response: NotificationsPillsQuery$data;
  variables: NotificationsPillsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
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
            "value": 1
          },
          {
            "kind": "Literal",
            "name": "notificationTypes",
            "value": [
              "PARTNER_OFFER_CREATED"
            ]
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
            "kind": "ScalarField",
            "name": "totalCount",
            "storageKey": null
          }
        ],
        "storageKey": "notificationsConnection(first:1,notificationTypes:[\"PARTNER_OFFER_CREATED\"])"
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "NotificationsPillsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "NotificationsPillsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "6ad76ae99978826dd287ffef1604c727",
    "id": null,
    "metadata": {},
    "name": "NotificationsPillsQuery",
    "operationKind": "query",
    "text": "query NotificationsPillsQuery {\n  viewer {\n    notificationsConnection(first: 1, notificationTypes: [PARTNER_OFFER_CREATED]) {\n      totalCount\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4ede1ae69c94ef5c18022d1213e01c08";

export default node;
