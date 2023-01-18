/**
 * @generated SignedSource<<6a5966d45e4046b146a7e33ceab6e4fa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type MarkNotificationAsReadInput = {
  clientMutationId?: string | null;
  id: string;
};
export type markNotificationAsReadMutation$variables = {
  input: MarkNotificationAsReadInput;
};
export type markNotificationAsReadMutation$data = {
  readonly markNotificationAsRead: {
    readonly responseOrError: {
      readonly mutationError?: {
        readonly message: string;
      } | null;
      readonly success?: boolean | null;
    } | null;
  } | null;
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
  "type": "MarkNotificationAsReadSuccess",
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
    "cacheID": "cfddde13ce18d1d57aa870cdac33b394",
    "id": null,
    "metadata": {},
    "name": "markNotificationAsReadMutation",
    "operationKind": "mutation",
    "text": "mutation markNotificationAsReadMutation(\n  $input: MarkNotificationAsReadInput!\n) {\n  markNotificationAsRead(input: $input) {\n    responseOrError {\n      __typename\n      ... on MarkNotificationAsReadSuccess {\n        success\n      }\n      ... on MarkNotificationAsReadFailure {\n        mutationError {\n          message\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2e4b8c239d2a237aa6609268e51e78f0";

export default node;
