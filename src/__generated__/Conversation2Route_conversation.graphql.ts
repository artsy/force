/**
 * @generated SignedSource<<c6a1b4bfa006dd0afc1e7be41d8ce012>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Conversation2Route_conversation$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ConversationDetails_conversation" | "ConversationHeader_conversation" | "ConversationMessages_conversation" | "ConversationReply_conversation">;
  readonly " $fragmentType": "Conversation2Route_conversation";
};
export type Conversation2Route_conversation$key = {
  readonly " $data"?: Conversation2Route_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"Conversation2Route_conversation">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Conversation2Route_conversation",
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

(node as any).hash = "ca57d504e85bcb1cfee4e32009dbf2d3";

export default node;
