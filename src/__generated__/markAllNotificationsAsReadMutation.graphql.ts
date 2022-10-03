/**
 * @generated SignedSource<<36a4cc48553b206f324e963a9aaebf5f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type markAllNotificationsAsReadMutation$variables = {};
export type markAllNotificationsAsReadMutation$data = {
  readonly markAllNotificationsAsRead: {
    readonly responseOrError: {
      readonly mutationError?: {
        readonly message: string;
      } | null;
      readonly success?: boolean | null;
    } | null;
  } | null;
};
export type markAllNotificationsAsReadMutation = {
  response: markAllNotificationsAsReadMutation$data;
  variables: markAllNotificationsAsReadMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "input",
    "value": {}
  }
],
v1 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "success",
      "storageKey": null
    }
  ],
  "type": "MarkAllNotificationsAsReadSuccess",
  "abstractKey": null
},
v2 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "GravityMutationError",
      "kind": "LinkedField",
      "name": "mutationError",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "message",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MarkAllNotificationsAsReadFailure",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "markAllNotificationsAsReadMutation",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "MarkAllNotificationsAsReadPayload",
        "kind": "LinkedField",
        "name": "markAllNotificationsAsRead",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "responseOrError",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": "markAllNotificationsAsRead(input:{})"
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "markAllNotificationsAsReadMutation",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "MarkAllNotificationsAsReadPayload",
        "kind": "LinkedField",
        "name": "markAllNotificationsAsRead",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "responseOrError",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": "markAllNotificationsAsRead(input:{})"
      }
    ]
  },
  "params": {
    "cacheID": "aa5b00343c9084c3ae1b6777a79b85a9",
    "id": null,
    "metadata": {},
    "name": "markAllNotificationsAsReadMutation",
    "operationKind": "mutation",
    "text": "mutation markAllNotificationsAsReadMutation {\n  markAllNotificationsAsRead(input: {}) {\n    responseOrError {\n      __typename\n      ... on MarkAllNotificationsAsReadSuccess {\n        success\n      }\n      ... on MarkAllNotificationsAsReadFailure {\n        mutationError {\n          message\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "69f2b3bf625a94023e88f559683ecd66";

export default node;
