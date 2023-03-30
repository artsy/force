/**
 * @generated SignedSource<<bb46a8c5ef15d3339969fd0bde0d915f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationPurchaseButton_conversation$data = {
  readonly internalID: string | null;
  readonly items: ReadonlyArray<{
    readonly liveArtwork: {
      readonly __typename: "Artwork";
      readonly editionSets: ReadonlyArray<{
        readonly internalID: string;
      } | null> | null;
      readonly internalID: string;
      readonly isEdition: boolean | null;
      readonly slug: string;
      readonly " $fragmentSpreads": FragmentRefs<"ConfirmArtworkButton_artwork">;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null;
  } | null> | null;
  readonly " $fragmentType": "ConversationPurchaseButton_conversation";
};
export type ConversationPurchaseButton_conversation$key = {
  readonly " $data"?: ConversationPurchaseButton_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationPurchaseButton_conversation">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationPurchaseButton_conversation",
  "selections": [
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
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isEdition",
                  "storageKey": null
                },
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "slug",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "EditionSet",
                  "kind": "LinkedField",
                  "name": "editionSets",
                  "plural": true,
                  "selections": [
                    (v0/*: any*/)
                  ],
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ConfirmArtworkButton_artwork"
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
})();

(node as any).hash = "f66ea2eb9134a2efec42409b5d7bbb28";

export default node;
