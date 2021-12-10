/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NavBarMobileMenuAuthenticationQueryVariables = {};
export type NavBarMobileMenuAuthenticationQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"NavBarMobileMenuAuthentication_me">;
    } | null;
};
export type NavBarMobileMenuAuthenticationQuery = {
    readonly response: NavBarMobileMenuAuthenticationQueryResponse;
    readonly variables: NavBarMobileMenuAuthenticationQueryVariables;
};



/*
query NavBarMobileMenuAuthenticationQuery {
  me {
    ...NavBarMobileMenuAuthentication_me
    id
  }
}

fragment NavBarMobileMenuAuthentication_me on Me {
  unreadNotificationsCount
  unreadConversationCount
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "NavBarMobileMenuAuthenticationQuery",
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
            "name": "NavBarMobileMenuAuthentication_me"
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
    "name": "NavBarMobileMenuAuthenticationQuery",
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
    "cacheID": "76d9ca236aa01d121759c56f226c9ae5",
    "id": null,
    "metadata": {},
    "name": "NavBarMobileMenuAuthenticationQuery",
    "operationKind": "query",
    "text": "query NavBarMobileMenuAuthenticationQuery {\n  me {\n    ...NavBarMobileMenuAuthentication_me\n    id\n  }\n}\n\nfragment NavBarMobileMenuAuthentication_me on Me {\n  unreadNotificationsCount\n  unreadConversationCount\n}\n"
  }
};
(node as any).hash = 'b0e54621e10a919fd2f43333607d0e20';
export default node;
