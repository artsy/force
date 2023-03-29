/**
 * @generated SignedSource<<5d87fc37b2e8d59f921cc0f14ac4a17b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Conversation2Route_conversation$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ConversationMessages_conversation" | "ConversationReply_conversation">;
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

(node as any).hash = "be5d96acea7cbd8028cb88e966a19f3a";

export default node;
