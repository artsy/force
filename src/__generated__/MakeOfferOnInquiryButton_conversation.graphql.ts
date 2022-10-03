/**
 * @generated SignedSource<<1b65978f8221aa66d09856127b765e97>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MakeOfferOnInquiryButton_conversation$data = {
  readonly internalID: string | null;
  readonly items: ReadonlyArray<{
    readonly liveArtwork: {
      readonly __typename: "Artwork";
      readonly editionSets: ReadonlyArray<{
        readonly internalID: string;
      } | null> | null;
      readonly isEdition: boolean | null;
      readonly is_acquireable: boolean | null;
      readonly " $fragmentSpreads": FragmentRefs<"ConfirmArtworkButton_artwork">;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null;
  } | null> | null;
  readonly " $fragmentType": "MakeOfferOnInquiryButton_conversation";
};
export type MakeOfferOnInquiryButton_conversation$key = {
  readonly " $data"?: MakeOfferOnInquiryButton_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"MakeOfferOnInquiryButton_conversation">;
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
  "name": "MakeOfferOnInquiryButton_conversation",
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
                  "alias": "is_acquireable",
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isAcquireable",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isEdition",
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

(node as any).hash = "83495b9f1eccf619be532226b9386ddb";

export default node;
