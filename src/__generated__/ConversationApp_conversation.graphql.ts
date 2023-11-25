/**
 * @generated SignedSource<<2cd130c64f40a31b3b1bfcb076995c20>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationApp_conversation$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ConversationDetails_conversation" | "ConversationHeader_conversation" | "ConversationMessages_conversation" | "ConversationReply_conversation">;
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

(node as any).hash = "aa48487d1b584f4a38348b2757e50746";

export default node;
