/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type notificationsRoutes_NotificationsQueryVariables = {};
export type notificationsRoutes_NotificationsQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"NotificationsApp_me">;
    } | null;
};
export type notificationsRoutes_NotificationsQuery = {
    readonly response: notificationsRoutes_NotificationsQueryResponse;
    readonly variables: notificationsRoutes_NotificationsQueryVariables;
};



/*
query notificationsRoutes_NotificationsQuery {
  me {
    ...NotificationsApp_me
    id
  }
}

fragment NotificationsApp_me on Me {
  email
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "notificationsRoutes_NotificationsQuery",
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
    "name": "notificationsRoutes_NotificationsQuery",
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
            "name": "email",
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
    "cacheID": "9399ae7269c23d18bb354ba37bb58437",
    "id": null,
    "metadata": {},
    "name": "notificationsRoutes_NotificationsQuery",
    "operationKind": "query",
    "text": "query notificationsRoutes_NotificationsQuery {\n  me {\n    ...NotificationsApp_me\n    id\n  }\n}\n\nfragment NotificationsApp_me on Me {\n  email\n}\n"
  }
};
(node as any).hash = '0fb4eed7cb54bfb9a7f244f5ee360bce';
export default node;
