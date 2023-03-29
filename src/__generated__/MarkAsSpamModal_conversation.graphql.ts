/**
 * @generated SignedSource<<9b9fa6ccb1835b1cbba60a1a005dde51>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MarkAsSpamModal_conversation$data = {
  readonly items: ReadonlyArray<{
    readonly item: {
      readonly id?: string;
    } | null;
  } | null> | null;
  readonly " $fragmentType": "MarkAsSpamModal_conversation";
};
export type MarkAsSpamModal_conversation$key = {
  readonly " $data"?: MarkAsSpamModal_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"MarkAsSpamModal_conversation">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MarkAsSpamModal_conversation",
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

(node as any).hash = "bc30a861becd6bdfdb774fc803d95fbe";

export default node;
