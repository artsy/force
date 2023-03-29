/**
 * @generated SignedSource<<de6c67eab3f355cb9f47bed080fcd22e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Conversation2Route_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ConversationsSidebar_viewer">;
  readonly " $fragmentType": "Conversation2Route_viewer";
};
export type Conversation2Route_viewer$key = {
  readonly " $data"?: Conversation2Route_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"Conversation2Route_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
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
        {
          "kind": "Variable",
          "name": "sellerId",
          "variableName": "sellerId"
        },
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

(node as any).hash = "7a5a5b89675d965a7aa4b14612244818";

export default node;
