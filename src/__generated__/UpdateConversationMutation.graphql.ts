/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdateConversationMutationInput = {
    clientMutationId?: string | null | undefined;
    conversationId: string;
    fromLastViewedMessageId: string;
};
export type UpdateConversationMutationVariables = {
    input: UpdateConversationMutationInput;
};
export type UpdateConversationMutationResponse = {
    readonly updateConversation: {
        readonly conversation: {
            readonly id: string;
            readonly unread: boolean | null;
        } | null;
    } | null;
};
export type UpdateConversationMutation = {
    readonly response: UpdateConversationMutationResponse;
    readonly variables: UpdateConversationMutationVariables;
};



/*
mutation UpdateConversationMutation(
  $input: UpdateConversationMutationInput!
) {
  updateConversation(input: $input) {
    conversation {
      id
      unread
    }
  }
}
*/

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
    "name": "UpdateConversationMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateConversationMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "72fce2a2de8c3b2b68bdc0d129107f96",
    "id": null,
    "metadata": {},
    "name": "UpdateConversationMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateConversationMutation(\n  $input: UpdateConversationMutationInput!\n) {\n  updateConversation(input: $input) {\n    conversation {\n      id\n      unread\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '21516c941f71a6bc582dd682e48f3a5c';
export default node;
