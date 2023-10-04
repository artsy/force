/**
 * @generated SignedSource<<5571a713ffb9ca5636b15f19912a7474>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Conversation2App_conversation$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ConversationDetails_conversation" | "ConversationHeader_conversation" | "ConversationMessages_conversation" | "ConversationReply_conversation">;
  readonly " $fragmentType": "Conversation2App_conversation";
};
export type Conversation2App_conversation$key = {
  readonly " $data"?: Conversation2App_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"Conversation2App_conversation">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Conversation2App_conversation",
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

(node as any).hash = "c3e1ca0f09ee8be96940b7866bba0232";

export default node;
