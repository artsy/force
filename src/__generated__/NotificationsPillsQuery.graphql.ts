/**
 * @generated SignedSource<<4c562d08ab00300169115184c5111613>>
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
    readonly alertNotifications: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
    readonly followNotifications: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
    readonly partnerOfferNotifications: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type NotificationsPillsQuery = {
  response: NotificationsPillsQuery$data;
  variables: NotificationsPillsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "Literal",
  "name": "first",
  "value": 10
},
v1 = [
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
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Viewer",
    "kind": "LinkedField",
    "name": "viewer",
    "plural": false,
    "selections": [
      {
        "alias": "partnerOfferNotifications",
        "args": [
          (v0/*: any*/),
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
        "selections": (v1/*: any*/),
        "storageKey": "notificationsConnection(first:10,notificationTypes:[\"PARTNER_OFFER_CREATED\"])"
      },
      {
        "alias": "alertNotifications",
        "args": [
          (v0/*: any*/),
          {
            "kind": "Literal",
            "name": "notificationTypes",
            "value": [
              "ARTWORK_ALERT"
            ]
          }
        ],
        "concreteType": "NotificationConnection",
        "kind": "LinkedField",
        "name": "notificationsConnection",
        "plural": false,
        "selections": (v1/*: any*/),
        "storageKey": "notificationsConnection(first:10,notificationTypes:[\"ARTWORK_ALERT\"])"
      },
      {
        "alias": "followNotifications",
        "args": [
          (v0/*: any*/),
          {
            "kind": "Literal",
            "name": "notificationTypes",
            "value": [
              "ARTWORK_PUBLISHED"
            ]
          }
        ],
        "concreteType": "NotificationConnection",
        "kind": "LinkedField",
        "name": "notificationsConnection",
        "plural": false,
        "selections": (v1/*: any*/),
        "storageKey": "notificationsConnection(first:10,notificationTypes:[\"ARTWORK_PUBLISHED\"])"
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
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "NotificationsPillsQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "08d18a5fde4345b2f200ed99c52c0f4a",
    "id": null,
    "metadata": {},
    "name": "NotificationsPillsQuery",
    "operationKind": "query",
    "text": "query NotificationsPillsQuery {\n  viewer {\n    partnerOfferNotifications: notificationsConnection(first: 10, notificationTypes: [PARTNER_OFFER_CREATED]) {\n      edges {\n        node {\n          id\n        }\n      }\n    }\n    alertNotifications: notificationsConnection(first: 10, notificationTypes: [ARTWORK_ALERT]) {\n      edges {\n        node {\n          id\n        }\n      }\n    }\n    followNotifications: notificationsConnection(first: 10, notificationTypes: [ARTWORK_PUBLISHED]) {\n      edges {\n        node {\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "be9a5400fa3070a64aaff3ccf1e10caa";

export default node;
