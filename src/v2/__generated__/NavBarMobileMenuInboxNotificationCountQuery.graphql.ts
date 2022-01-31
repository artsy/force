/**
 * @generated SignedSource<<77ae776f7a9669c7775bf4a5dda0ad91>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NavBarMobileMenuInboxNotificationCountQuery$variables = {};
export type NavBarMobileMenuInboxNotificationCountQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"NavBarMobileMenuInboxNotificationCount_me">;
  } | null;
};
export type NavBarMobileMenuInboxNotificationCountQuery = {
  variables: NavBarMobileMenuInboxNotificationCountQuery$variables;
  response: NavBarMobileMenuInboxNotificationCountQuery$data;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "NavBarMobileMenuInboxNotificationCountQuery",
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
            "name": "NavBarMobileMenuInboxNotificationCount_me"
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
    "name": "NavBarMobileMenuInboxNotificationCountQuery",
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
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e69538eeec5288e3535491548ff4f6e8",
    "id": null,
    "metadata": {},
    "name": "NavBarMobileMenuInboxNotificationCountQuery",
    "operationKind": "query",
    "text": "query NavBarMobileMenuInboxNotificationCountQuery {\n  me {\n    ...NavBarMobileMenuInboxNotificationCount_me\n    id\n  }\n}\n\nfragment NavBarMobileMenuInboxNotificationCount_me on Me {\n  unreadConversationCount\n}\n"
  }
};

(node as any).hash = "3ac9061da386abc266030be66f9094bc";

export default node;
