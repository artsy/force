/**
 * @generated SignedSource<<05291ef4a831bb461fe8f3882c83ea8b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationManageThisInquiry_conversation$data = {
  readonly items: ReadonlyArray<{
    readonly item: {
      readonly id?: string;
    } | null;
  } | null> | null;
  readonly " $fragmentSpreads": FragmentRefs<"DismissInquiryModal_conversation" | "MarkAsSpamModal_conversation">;
  readonly " $fragmentType": "ConversationManageThisInquiry_conversation";
};
export type ConversationManageThisInquiry_conversation$key = {
  readonly " $data"?: ConversationManageThisInquiry_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationManageThisInquiry_conversation">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationManageThisInquiry_conversation",
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MarkAsSpamModal_conversation"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DismissInquiryModal_conversation"
    }
  ],
  "type": "Conversation",
  "abstractKey": null
};

(node as any).hash = "5248e5aad016073bee274d0b9bc5d631";

export default node;
