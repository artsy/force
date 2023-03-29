/**
 * @generated SignedSource<<a7373852111fef37f5cf7364c48cb674>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationHelpCenter_conversation$data = {
  readonly items: ReadonlyArray<{
    readonly item: {
      readonly id?: string;
    } | null;
  } | null> | null;
  readonly " $fragmentType": "ConversationHelpCenter_conversation";
};
export type ConversationHelpCenter_conversation$key = {
  readonly " $data"?: ConversationHelpCenter_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationHelpCenter_conversation">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationHelpCenter_conversation",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ConversationItem",
      "kind": "LinkedField",
      "name": "items",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "item",
          "plural": false,
          "selections": [
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "id",
                  "storageKey": null
                }
              ],
              "type": "Artwork",
              "abstractKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Conversation",
  "abstractKey": null
};

(node as any).hash = "fde7f5a5037cc22a40ef16ee3db23e5c";

export default node;
