/**
 * @generated SignedSource<<0dd871f2185fe16e73c7741a88f85a25>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type MarkNotificationsAsSeenInput = {
  clientMutationId?: string | null;
  until: string;
};
export type markNotificationsAsSeenMutation$variables = {
  input: MarkNotificationsAsSeenInput;
};
export type markNotificationsAsSeenMutation$data = {
  readonly markNotificationsAsSeen: {
    readonly responseOrError: {
      readonly mutationError?: {
        readonly message: string;
      } | null;
      readonly success?: boolean | null;
    } | null;
  } | null;
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
  "type": "MarkNotificationsAsSeenSuccess",
  "abstractKey": null
},
v3 = {
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
              (v2/*: any*/),
              (v3/*: any*/)
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
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "16cb900fff6e2d536010fe0a0c0966f3",
    "id": null,
    "metadata": {},
    "name": "markNotificationsAsSeenMutation",
    "operationKind": "mutation",
    "text": "mutation markNotificationsAsSeenMutation(\n  $input: MarkNotificationsAsSeenInput!\n) {\n  markNotificationsAsSeen(input: $input) {\n    responseOrError {\n      __typename\n      ... on MarkNotificationsAsSeenSuccess {\n        success\n      }\n      ... on MarkNotificationsAsSeenFailure {\n        mutationError {\n          message\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "471062a68c5acb14e8edfcadb817d96d";

export default node;
