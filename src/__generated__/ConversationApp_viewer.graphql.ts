/**
 * @generated SignedSource<<ed418eb46079729d12b65d5a5965fab1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationApp_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ConversationsContext_viewer" | "ConversationsSidebar_viewer">;
  readonly " $fragmentType": "ConversationApp_viewer";
};
export type ConversationApp_viewer$key = {
  readonly " $data"?: ConversationApp_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationApp_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": 10,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationApp_viewer",
  "selections": [
    {
      "args": [
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "first"
        }
      ],
      "kind": "FragmentSpread",
      "name": "ConversationsSidebar_viewer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ConversationsContext_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "cf67b6848e119d4f26ec70cd2873d7ee";

export default node;
