/**
 * @generated SignedSource<<7dabd6c3b1cc336f39f8ae6d5d126fa0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useConversationPurchaseButtonData_conversation$data = {
  readonly internalID: string | null | undefined;
  readonly items: ReadonlyArray<{
    readonly liveArtwork: {
      readonly __typename: "Artwork";
      readonly editionSets: ReadonlyArray<{
        readonly internalID: string;
      } | null | undefined> | null | undefined;
      readonly internalID: string;
      readonly isAcquireable: boolean | null | undefined;
      readonly isEdition: boolean | null | undefined;
      readonly slug: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "useConversationPurchaseButtonData_conversation";
};
export type useConversationPurchaseButtonData_conversation$key = {
  readonly " $data"?: useConversationPurchaseButtonData_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"useConversationPurchaseButtonData_conversation">;
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
  "name": "useConversationPurchaseButtonData_conversation",
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

(node as any).hash = "f06eee4522969d3f7bb7d224cf1adc75";

export default node;
