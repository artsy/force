/**
 * @generated SignedSource<<051921b58848794c65641de0e0216125>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DismissInquiryModal_conversation$data = {
  readonly items: ReadonlyArray<{
    readonly item: {
      readonly availability?: string | null;
      readonly id?: string;
      readonly internalID?: string;
    } | null;
  } | null> | null;
  readonly " $fragmentType": "DismissInquiryModal_conversation";
};
export type DismissInquiryModal_conversation$key = {
  readonly " $data"?: DismissInquiryModal_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"DismissInquiryModal_conversation">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DismissInquiryModal_conversation",
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
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "internalID",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "availability",
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

(node as any).hash = "f15293f34c03a079e6ec7d9bffacee5d";

export default node;
