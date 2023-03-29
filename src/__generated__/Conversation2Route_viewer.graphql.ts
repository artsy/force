/**
 * @generated SignedSource<<850db7992de0e16037c268dd3e331bf8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Conversation2Route_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ConversationDetails_viewer" | "ConversationHeader_viewer" | "ConversationsSidebar_viewer">;
  readonly " $fragmentType": "Conversation2Route_viewer";
};
export type Conversation2Route_viewer$key = {
  readonly " $data"?: Conversation2Route_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"Conversation2Route_viewer">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Variable",
  "name": "sellerId",
  "variableName": "sellerId"
},
v1 = [
  {
    "kind": "Variable",
    "name": "conversationId",
    "variableName": "conversationId"
  },
  (v0/*: any*/)
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "conversationId"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "hasReply"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "partnerId"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "sellerId"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "toBeReplied"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Conversation2Route_viewer",
  "selections": [
    {
      "args": (v1/*: any*/),
      "kind": "FragmentSpread",
      "name": "ConversationHeader_viewer"
    },
    {
      "args": (v1/*: any*/),
      "kind": "FragmentSpread",
      "name": "ConversationDetails_viewer"
    },
    {
      "args": [
        {
          "kind": "Variable",
          "name": "hasReply",
          "variableName": "hasReply"
        },
        {
          "kind": "Variable",
          "name": "partnerId",
          "variableName": "partnerId"
        },
        (v0/*: any*/),
        {
          "kind": "Variable",
          "name": "toBeReplied",
          "variableName": "toBeReplied"
        }
      ],
      "kind": "FragmentSpread",
      "name": "ConversationsSidebar_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
})();

(node as any).hash = "d297def4ad22bcff2953a395f2b18b5f";

export default node;
