/**
 * @generated SignedSource<<38ab4c0d2d1c6e77a73f06cd5efe93fa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateConversationMutationInput = {
  clientMutationId?: string | null | undefined;
  conversationId: string;
  dismissed?: boolean | null | undefined;
  fromLastViewedMessageId?: string | null | undefined;
  sellerOutcome?: string | null | undefined;
  sellerOutcomeComment?: string | null | undefined;
  toLastViewedMessageId?: string | null | undefined;
};
export type useUpdateConversationMutation$variables = {
  input: UpdateConversationMutationInput;
};
export type useUpdateConversationMutation$data = {
  readonly updateConversation: {
    readonly conversation: {
      readonly id: string;
      readonly unread: boolean | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type useUpdateConversationMutation = {
  response: useUpdateConversationMutation$data;
  variables: useUpdateConversationMutation$variables;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdateConversationMutationPayload",
    "kind": "LinkedField",
    "name": "updateConversation",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Conversation",
        "kind": "LinkedField",
        "name": "conversation",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "unread",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useUpdateConversationMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUpdateConversationMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "66b78e45d4bb5f3f93cd4158bb4ca47f",
    "id": null,
    "metadata": {},
    "name": "useUpdateConversationMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateConversationMutation(\n  $input: UpdateConversationMutationInput!\n) {\n  updateConversation(input: $input) {\n    conversation {\n      id\n      unread\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3a04d03687a602a0603dd1c13cfb9064";

export default node;
