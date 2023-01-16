/**
 * @generated SignedSource<<376f280cc18e31e32743da0d11cfac7b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NavBarMobileMenuNotificationsIndicator_test_Query$variables = {};
export type NavBarMobileMenuNotificationsIndicator_test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"NavBarMobileMenuNotificationsIndicator_me">;
  } | null;
};
export type NavBarMobileMenuNotificationsIndicator_test_Query = {
  response: NavBarMobileMenuNotificationsIndicator_test_Query$data;
  variables: NavBarMobileMenuNotificationsIndicator_test_Query$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "NavBarMobileMenuNotificationsIndicator_test_Query",
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
    "name": "NavBarMobileMenuNotificationsIndicator_test_Query",
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
    "cacheID": "b0e949a12193b7a199173fbca9721b0c",
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
    "name": "NavBarMobileMenuNotificationsIndicator_test_Query",
    "operationKind": "query",
    "text": "query NavBarMobileMenuNotificationsIndicator_test_Query {\n  me {\n    ...NavBarMobileMenuNotificationsIndicator_me\n    id\n  }\n}\n\nfragment NavBarMobileMenuNotificationsIndicator_me on Me {\n  unreadConversationCount\n}\n"
  }
};

(node as any).hash = "26ec2da0ab6233adec36923fad6a1536";

export default node;
