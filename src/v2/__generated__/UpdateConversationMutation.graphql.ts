/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type UpdateConversationMutationInput = {
    readonly clientMutationId?: string | null;
    readonly conversationId: string;
    readonly fromLastViewedMessageId: string;
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
    "kind": "LocalArgument",
    "name": "input",
    "type": "UpdateConversationMutationInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "updateConversation",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdateConversationMutationPayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "conversation",
        "storageKey": null,
        "args": null,
        "concreteType": "Conversation",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "unread",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "UpdateConversationMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "UpdateConversationMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "UpdateConversationMutation",
    "id": null,
    "text": "mutation UpdateConversationMutation(\n  $input: UpdateConversationMutationInput!\n) {\n  updateConversation(input: $input) {\n    conversation {\n      id\n      unread\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '21516c941f71a6bc582dd682e48f3a5c';
export default node;
