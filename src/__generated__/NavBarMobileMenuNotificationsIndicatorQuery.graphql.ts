/**
 * @generated SignedSource<<8b2e52f27234bc332dfed287a812e141>>
 * @relayHash ec976fe5ff6b59412b518bf94d4f33dd
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID ec976fe5ff6b59412b518bf94d4f33dd

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NavBarMobileMenuNotificationsIndicatorQuery$variables = Record<PropertyKey, never>;
export type NavBarMobileMenuNotificationsIndicatorQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"NavBarMobileMenuNotificationsIndicator_me">;
  } | null | undefined;
};
export type NavBarMobileMenuNotificationsIndicatorQuery = {
  response: NavBarMobileMenuNotificationsIndicatorQuery$data;
  variables: NavBarMobileMenuNotificationsIndicatorQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "NavBarMobileMenuNotificationsIndicatorQuery",
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
            "name": "NavBarMobileMenuNotificationsIndicator_me"
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
    "name": "NavBarMobileMenuNotificationsIndicatorQuery",
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
            "name": "unreadConversationCount",
            "storageKey": null
          },
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
            "name": "unseenNotificationsCount",
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
    "id": "ec976fe5ff6b59412b518bf94d4f33dd",
    "metadata": {},
    "name": "NavBarMobileMenuNotificationsIndicatorQuery",
    "operationKind": "query",
    "text": null
  }
};

(node as any).hash = "75cfde809b93933d8d91d345599013f7";

export default node;
