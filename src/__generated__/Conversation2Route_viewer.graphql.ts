/**
 * @generated SignedSource<<33a47322cf84e42127fd19544158b8b3>>
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

(node as any).hash = "f3aeaef9bf6a3feb65b9f120435c27b8";

export default node;
