/**
 * @generated SignedSource<<1fa975d7d3474348ac59b0bf88800001>>
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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Conversation2App_viewer",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ConversationsSidebar_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "87e26f14718747b72e5b449b1ab38e85";

export default node;
