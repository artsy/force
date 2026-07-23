/**
 * @generated SignedSource<<a43d4c6f0ae57e210973e4b25f2eff51>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationApp_conversation$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ConversationDetails_conversation" | "ConversationHeader_conversation" | "ConversationMessages_conversation" | "ConversationReply_conversation" | "ConversationsContext_conversation">;
  readonly " $fragmentType": "ConversationApp_conversation";
};
export type ConversationApp_conversation$key = {
  readonly " $data"?: ConversationApp_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationApp_conversation">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationApp_conversation",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ConversationsContext_conversation"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ConversationHeader_conversation"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ConversationDetails_conversation"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ConversationReply_conversation"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ConversationMessages_conversation"
    }
  ],
  "type": "Conversation",
  "abstractKey": null
};

(node as any).hash = "c16f4c606b0e62bf29b2614809b269f1";

export default node;
