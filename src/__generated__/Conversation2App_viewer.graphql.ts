/**
 * @generated SignedSource<<d1051081645df946ec4ce04d93d66daa>>
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
      "defaultValue": 10,
      "kind": "LocalArgument",
      "name": "first"
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
          "name": "first",
          "variableName": "first"
        }
      ],
      "kind": "FragmentSpread",
      "name": "ConversationsSidebar_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "6c22176b295c8e4def44a4acb0a2c56b";

export default node;
