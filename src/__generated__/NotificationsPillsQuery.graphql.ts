/**
 * @generated SignedSource<<b926b07f9b900b500395352071331636>>
 * @relayHash 433d8d3fe81095c9f4efc9cb8374313d
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 433d8d3fe81095c9f4efc9cb8374313d

import { ConcreteRequest, Query } from 'relay-runtime';
export type NotificationsPillsQuery$variables = Record<PropertyKey, never>;
export type NotificationsPillsQuery$data = {
  readonly viewer: {
    readonly partnerOfferNotifications: {
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
    "id": "433d8d3fe81095c9f4efc9cb8374313d",
    "metadata": {},
    "name": "NotificationsPillsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "4ed88655cb24835dd2a564ccdf7cb5fb";

export default node;
