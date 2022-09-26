/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type notificationsRoutesQueryVariables = {};
export type notificationsRoutesQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"NotificationsApp_me">;
    } | null;
};
export type notificationsRoutesQuery = {
    readonly response: notificationsRoutesQueryResponse;
    readonly variables: notificationsRoutesQueryVariables;
};



/*
query notificationsRoutesQuery {
  me {
    ...NotificationsApp_me
    id
  }
}

fragment NotificationsApp_me on Me {
  unreadNotificationsCount
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "notificationsRoutesQuery",
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
            "name": "NotificationsApp_me"
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
    "name": "notificationsRoutesQuery",
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
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ab5d7db55ce1042593c953f1b52ff6be",
    "id": null,
    "metadata": {},
    "name": "notificationsRoutesQuery",
    "operationKind": "query",
    "text": "query notificationsRoutesQuery {\n  me {\n    ...NotificationsApp_me\n    id\n  }\n}\n\nfragment NotificationsApp_me on Me {\n  unreadNotificationsCount\n}\n"
  }
};
(node as any).hash = '186bea32415fd2b3c522c5bebe874558';
export default node;
