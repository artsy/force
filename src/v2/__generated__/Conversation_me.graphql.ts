/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Conversation_me = {
    readonly conversation: {
        readonly internalID: string | null;
        readonly " $fragmentRefs": FragmentRefs<"Conversation_conversation" | "ConversationCTA_conversation" | "Details_conversation">;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"ConversationList_me">;
    readonly " $refType": "Conversation_me";
};
export type Conversation_me$data = Conversation_me;
export type Conversation_me$key = {
    readonly " $data"?: Conversation_me$data;
    readonly " $fragmentRefs": FragmentRefs<"Conversation_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "conversationID"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Conversation_me",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "conversationID"
        }
      ],
      "concreteType": "Conversation",
      "kind": "LinkedField",
      "name": "conversation",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "Conversation_conversation"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ConversationCTA_conversation"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "Details_conversation"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ConversationList_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = '17825cd6e2eb83e2f6d08d8de9561b39';
export default node;
