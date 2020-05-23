/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Conversation_me = {
    readonly conversation: {
        readonly to: {
            readonly name: string;
        };
        readonly " $fragmentRefs": FragmentRefs<"Conversation_conversation">;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"Conversations_me">;
    readonly " $refType": "Conversation_me";
};
export type Conversation_me$data = Conversation_me;
export type Conversation_me$key = {
    readonly " $data"?: Conversation_me$data;
    readonly " $fragmentRefs": FragmentRefs<"Conversation_me">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Conversation_me",
  "type": "Me",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "conversationID",
      "type": "String!",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "conversation",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "conversationID"
        }
      ],
      "concreteType": "Conversation",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "to",
          "storageKey": null,
          "args": null,
          "concreteType": "ConversationResponder",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "name",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "FragmentSpread",
          "name": "Conversation_conversation",
          "args": null
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "Conversations_me",
      "args": null
    }
  ]
};
(node as any).hash = '0a5275d37558df9dbd891eaca35402e1';
export default node;
