/**
 * @generated SignedSource<<53f9642d1176d213f6736d6c6ae1e5b5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type notificationsRoutesQuery$variables = {};
export type notificationsRoutesQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"NotificationsApp_me">;
  } | null;
};
export type notificationsRoutesQuery = {
  response: notificationsRoutesQuery$data;
  variables: notificationsRoutesQuery$variables;
};

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

(node as any).hash = "186bea32415fd2b3c522c5bebe874558";

export default node;
