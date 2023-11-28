/**
 * @generated SignedSource<<4cf25f23e7931b3f2477afaa419332ee>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NavBarMobileMenuNotificationsIndicator_test_Query$variables = Record<PropertyKey, never>;
export type NavBarMobileMenuNotificationsIndicator_test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"NavBarMobileMenuNotificationsIndicator_me">;
  } | null | undefined;
};
export type NavBarMobileMenuNotificationsIndicator_test_Query = {
  response: NavBarMobileMenuNotificationsIndicator_test_Query$data;
  variables: NavBarMobileMenuNotificationsIndicator_test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
};
return {
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
    "cacheID": "7e937619485679b0ea694a36eebcd8b5",
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
        "me.unreadConversationCount": (v0/*: any*/),
        "me.unreadNotificationsCount": (v0/*: any*/),
        "me.unseenNotificationsCount": (v0/*: any*/)
      }
    },
    "name": "NavBarMobileMenuNotificationsIndicator_test_Query",
    "operationKind": "query",
    "text": "query NavBarMobileMenuNotificationsIndicator_test_Query {\n  me {\n    ...NavBarMobileMenuNotificationsIndicator_me\n    id\n  }\n}\n\nfragment NavBarMobileMenuNotificationsIndicator_me on Me {\n  unreadConversationCount\n  unreadNotificationsCount\n  unseenNotificationsCount\n}\n"
  }
};
})();

(node as any).hash = "26ec2da0ab6233adec36923fad6a1536";

export default node;
