/**
 * @generated SignedSource<<9b76fededc1ed9a552d3ea54317a4b90>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationPartnerOfferUpdate_conversation$data = {
  readonly items: ReadonlyArray<{
    readonly item: {
      readonly __typename: "Artwork";
      readonly internalID: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "ConversationPartnerOfferUpdate_conversation";
};
export type ConversationPartnerOfferUpdate_conversation$key = {
  readonly " $data"?: ConversationPartnerOfferUpdate_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationPartnerOfferUpdate_conversation">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationPartnerOfferUpdate_conversation",
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
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__typename",
              "storageKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "internalID",
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

(node as any).hash = "c1e718b17b27a2bcd3175e34e9a394d4";

export default node;
