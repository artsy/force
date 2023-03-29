/**
 * @generated SignedSource<<9f148772e0898f2c06a8b1c2fd6827f1>>
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

const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Variable",
    "name": "sellerId",
    "variableName": "sellerId"
  }
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "sellerId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Conversation2Route_conversation",
  "selections": [
    {
      "args": (v0/*: any*/),
      "kind": "FragmentSpread",
      "name": "ConversationHeader_conversation"
    },
    {
      "args": (v0/*: any*/),
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
})();

(node as any).hash = "59a79f1c8a6ade9760e80551df6773f1";

export default node;
