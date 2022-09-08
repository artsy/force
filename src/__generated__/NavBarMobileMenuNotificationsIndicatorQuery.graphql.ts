/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NavBarMobileMenuNotificationsIndicatorQueryVariables = {};
export type NavBarMobileMenuNotificationsIndicatorQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"NavBarMobileMenuNotificationsIndicator_me">;
    } | null;
};
export type NavBarMobileMenuNotificationsIndicatorQuery = {
    readonly response: NavBarMobileMenuNotificationsIndicatorQueryResponse;
    readonly variables: NavBarMobileMenuNotificationsIndicatorQueryVariables;
};



/*
query NavBarMobileMenuNotificationsIndicatorQuery {
  me {
    ...NavBarMobileMenuNotificationsIndicator_me
    id
  }
}

fragment NavBarMobileMenuNotificationsIndicator_me on Me {
  unreadConversationCount
  unreadNotificationsCount
}
*/

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
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "fcad35569728dba5274eae66eabbcd8d",
    "id": null,
    "metadata": {},
    "name": "NavBarMobileMenuNotificationsIndicatorQuery",
    "operationKind": "query",
    "text": "query NavBarMobileMenuNotificationsIndicatorQuery {\n  me {\n    ...NavBarMobileMenuNotificationsIndicator_me\n    id\n  }\n}\n\nfragment NavBarMobileMenuNotificationsIndicator_me on Me {\n  unreadConversationCount\n  unreadNotificationsCount\n}\n"
  }
};
(node as any).hash = '75cfde809b93933d8d91d345599013f7';
export default node;
