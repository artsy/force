/**
 * @generated SignedSource<<a91515755c22c1a2e7082ed4e7ffaee6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type MarkNotificationsAsSeenInput = {
  clientMutationId?: string | null | undefined;
  until: string;
};
export type markNotificationsAsSeenMutation$variables = {
  input: MarkNotificationsAsSeenInput;
};
export type markNotificationsAsSeenMutation$data = {
  readonly markNotificationsAsSeen: {
    readonly responseOrError: {
      readonly me?: {
        readonly unseenNotificationsCount: number;
      };
      readonly mutationError?: {
        readonly message: string;
      } | null | undefined;
      readonly success?: boolean | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type markNotificationsAsSeenMutation = {
  response: markNotificationsAsSeenMutation$data;
  variables: markNotificationsAsSeenMutation$variables;
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
  "name": "unseenNotificationsCount",
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
  "type": "MarkNotificationsAsSeenFailure",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "markNotificationsAsSeenMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MarkNotificationsAsSeenPayload",
        "kind": "LinkedField",
        "name": "markNotificationsAsSeen",
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
                "type": "MarkNotificationsAsSeenSuccess",
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
    "name": "markNotificationsAsSeenMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MarkNotificationsAsSeenPayload",
        "kind": "LinkedField",
        "name": "markNotificationsAsSeen",
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
                "type": "MarkNotificationsAsSeenSuccess",
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
    "cacheID": "392e4e71632d824620f3db01d34ae186",
    "id": null,
    "metadata": {},
    "name": "markNotificationsAsSeenMutation",
    "operationKind": "mutation",
    "text": "mutation markNotificationsAsSeenMutation(\n  $input: MarkNotificationsAsSeenInput!\n) {\n  markNotificationsAsSeen(input: $input) {\n    responseOrError {\n      __typename\n      ... on MarkNotificationsAsSeenSuccess {\n        success\n        me {\n          unseenNotificationsCount\n          id\n        }\n      }\n      ... on MarkNotificationsAsSeenFailure {\n        mutationError {\n          message\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "038e527ef0cd8d8d83960838c0cb36bd";

export default node;
