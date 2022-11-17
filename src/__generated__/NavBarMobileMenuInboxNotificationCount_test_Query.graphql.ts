/**
 * @generated SignedSource<<23f8a2f39c11232efd9f62cdcf598a65>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NavBarMobileMenuInboxNotificationCount_test_Query$variables = {};
export type NavBarMobileMenuInboxNotificationCount_test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"NavBarMobileMenuInboxNotificationCount_me">;
  } | null;
};
export type NavBarMobileMenuInboxNotificationCount_test_Query = {
  response: NavBarMobileMenuInboxNotificationCount_test_Query$data;
  variables: NavBarMobileMenuInboxNotificationCount_test_Query$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "NavBarMobileMenuInboxNotificationCount_test_Query",
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
    "name": "NavBarMobileMenuInboxNotificationCount_test_Query",
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
    "cacheID": "08c770d4cc0a29d24427925afffc645a",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "me.unreadConversationCount": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Int"
        }
      }
    },
    "name": "NavBarMobileMenuInboxNotificationCount_test_Query",
    "operationKind": "query",
    "text": "query NavBarMobileMenuInboxNotificationCount_test_Query {\n  me {\n    ...NavBarMobileMenuInboxNotificationCount_me\n    id\n  }\n}\n\nfragment NavBarMobileMenuInboxNotificationCount_me on Me {\n  unreadConversationCount\n}\n"
  }
};

(node as any).hash = "23b256e7f26540e428adab450d213b39";

export default node;
