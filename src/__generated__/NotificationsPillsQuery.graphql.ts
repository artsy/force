/**
 * @generated SignedSource<<d65ce93278bf54daf7757e1bc5d35dff>>
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
        "alias": "partnerOfferNotifications",
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
    "cacheID": "fa469323db0050a1db65946d5e982562",
    "id": null,
    "metadata": {},
    "name": "NotificationsPillsQuery",
    "operationKind": "query",
    "text": "query NotificationsPillsQuery {\n  viewer {\n    partnerOfferNotifications: notificationsConnection(first: 1, notificationTypes: [PARTNER_OFFER_CREATED]) {\n      edges {\n        node {\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9ae025952c37bf7c1ba6f8eb8274d9b7";

export default node;
