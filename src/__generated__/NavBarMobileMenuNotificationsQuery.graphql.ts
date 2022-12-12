/**
 * @generated SignedSource<<747746856dd96664527fde19964c617a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NavBarMobileMenuNotificationsQuery$variables = {};
export type NavBarMobileMenuNotificationsQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"NavBarMobileMenuNotifications_me">;
  } | null;
};
export type NavBarMobileMenuNotificationsQuery = {
  response: NavBarMobileMenuNotificationsQuery$data;
  variables: NavBarMobileMenuNotificationsQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "NavBarMobileMenuNotificationsQuery",
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
            "name": "NavBarMobileMenuNotifications_me"
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
    "name": "NavBarMobileMenuNotificationsQuery",
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
            "name": "unreadNotificationsCount",
            "storageKey": null
          },
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
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "39206ca2cdfd556ca2f6fe9de2325df5",
    "id": null,
    "metadata": {},
    "name": "NavBarMobileMenuNotificationsQuery",
    "operationKind": "query",
    "text": "query NavBarMobileMenuNotificationsQuery {\n  me {\n    ...NavBarMobileMenuNotifications_me\n    id\n  }\n}\n\nfragment NavBarMobileMenuNotifications_me on Me {\n  unreadNotificationsCount\n  unreadConversationCount\n}\n"
  }
};

(node as any).hash = "9cbec92f7b8abd6956467afaba7b829d";

export default node;
