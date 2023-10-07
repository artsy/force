/**
 * @generated SignedSource<<ccef3c6d528f6911353442976bfacdf9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Conversation2CTA_conversation$data = {
  readonly internalID: string | null;
  readonly items: ReadonlyArray<{
    readonly item: {
      readonly __typename: "Artwork";
      readonly internalID: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null;
    readonly liveArtwork: {
      readonly __typename: "Artwork";
      readonly isAcquireable: boolean | null;
      readonly isOfferable: boolean | null;
      readonly isOfferableFromInquiry: boolean | null;
      readonly " $fragmentSpreads": FragmentRefs<"ConversationConfirmModal_artwork">;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null;
  } | null> | null;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationReviewOfferCTA_conversation" | "useConversationPurchaseButtonData_conversation">;
  readonly " $fragmentType": "Conversation2CTA_conversation";
};
export type Conversation2CTA_conversation$key = {
  readonly " $data"?: Conversation2CTA_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"Conversation2CTA_conversation">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Conversation2CTA_conversation",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useConversationPurchaseButtonData_conversation"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ConversationReviewOfferCTA_conversation"
    },
    (v0/*: any*/),
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
          "name": "liveArtwork",
          "plural": false,
          "selections": [
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ConversationConfirmModal_artwork"
                },
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isOfferableFromInquiry",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isAcquireable",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isOfferable",
                  "storageKey": null
                }
              ],
              "type": "Artwork",
              "abstractKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "item",
          "plural": false,
          "selections": [
            (v1/*: any*/),
            {
              "kind": "InlineFragment",
              "selections": [
                (v0/*: any*/)
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
})();

(node as any).hash = "a2ea8d10ded9037a13b77522346860c5";

export default node;
