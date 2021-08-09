/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NavBarMobileMenuInboxNotificationCountQueryVariables = {};
export type NavBarMobileMenuInboxNotificationCountQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"NavBarMobileMenuInboxNotificationCount_me">;
    } | null;
};
export type NavBarMobileMenuInboxNotificationCountQuery = {
    readonly response: NavBarMobileMenuInboxNotificationCountQueryResponse;
    readonly variables: NavBarMobileMenuInboxNotificationCountQueryVariables;
};



/*
query NavBarMobileMenuInboxNotificationCountQuery {
  me {
    ...NavBarMobileMenuInboxNotificationCount_me
    id
  }
}

fragment NavBarMobileMenuInboxNotificationCount_me on Me {
  unreadConversationCount
}
*/

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
    "type": "Query"
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
    "id": null,
    "metadata": {},
    "name": "NavBarMobileMenuInboxNotificationCountQuery",
    "operationKind": "query",
    "text": "query NavBarMobileMenuInboxNotificationCountQuery {\n  me {\n    ...NavBarMobileMenuInboxNotificationCount_me\n    id\n  }\n}\n\nfragment NavBarMobileMenuInboxNotificationCount_me on Me {\n  unreadConversationCount\n}\n"
  }
};
(node as any).hash = '3ac9061da386abc266030be66f9094bc';
export default node;
