/**
 * @generated SignedSource<<a4096c348b6b9eb86db7939f1b3279e2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type MarkNotificationAsReadInput = {
  clientMutationId?: string | null | undefined;
  id: string;
};
export type markNotificationAsReadMutation$variables = {
  input: MarkNotificationAsReadInput;
};
export type markNotificationAsReadMutation$data = {
  readonly markNotificationAsRead: {
    readonly responseOrError: {
      readonly me?: {
        readonly unreadNotificationsCount: number;
      };
      readonly mutationError?: {
        readonly message: string;
      } | null | undefined;
      readonly success?: boolean | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type markNotificationAsReadMutation = {
  response: markNotificationAsReadMutation$data;
  variables: markNotificationAsReadMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "success",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "unreadNotificationsCount",
  "storageKey": null
},
v4 = {
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
  "type": "MarkNotificationAsReadFailure",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "markNotificationAsReadMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MarkNotificationAsReadPayload",
        "kind": "LinkedField",
        "name": "markNotificationAsRead",
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
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Me",
                    "kind": "LinkedField",
                    "name": "me",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "MarkNotificationAsReadSuccess",
                "abstractKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "markNotificationAsReadMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MarkNotificationAsReadPayload",
        "kind": "LinkedField",
        "name": "markNotificationAsRead",
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
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Me",
                    "kind": "LinkedField",
                    "name": "me",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
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
                ],
                "type": "MarkNotificationAsReadSuccess",
                "abstractKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2cc9adb45342dc08215d5b012f8aeab0",
    "id": null,
    "metadata": {},
    "name": "markNotificationAsReadMutation",
    "operationKind": "mutation",
    "text": "mutation markNotificationAsReadMutation(\n  $input: MarkNotificationAsReadInput!\n) {\n  markNotificationAsRead(input: $input) {\n    responseOrError {\n      __typename\n      ... on MarkNotificationAsReadSuccess {\n        success\n        me {\n          unreadNotificationsCount\n          id\n        }\n      }\n      ... on MarkNotificationAsReadFailure {\n        mutationError {\n          message\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "636c5490f3f66fbf727a3df7609dfebe";

export default node;
