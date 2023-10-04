/**
 * @generated SignedSource<<facdc371264ce5af6c3a4a5e4ade7bea>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Conversation2App_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ConversationsSidebar_viewer">;
  readonly " $fragmentType": "Conversation2App_viewer";
};
export type Conversation2App_viewer$key = {
  readonly " $data"?: Conversation2App_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"Conversation2App_viewer">;
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
      "name": "toBeReplied"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Conversation2App_viewer",
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

(node as any).hash = "f35b00253a40703f1851be907dfdc057";

export default node;
