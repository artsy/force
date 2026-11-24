/**
 * @generated SignedSource<<0b59d0639eccef078e2d4bb49e4a121e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OrderBuyerActionEnum = "OFFER_ACCEPTED" | "OFFER_ACCEPTED_CONFIRM_NEEDED" | "OFFER_RECEIVED" | "OFFER_RECEIVED_CONFIRM_NEEDED" | "PAYMENT_FAILED" | "PROVISIONAL_OFFER_ACCEPTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ConversationCTA_conversation$data = {
  readonly activeCollectorOrders: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly buyerAction: OrderBuyerActionEnum | null | undefined;
        readonly internalID: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly internalID: string | null | undefined;
  readonly items: ReadonlyArray<{
    readonly item: {
      readonly __typename: "Artwork";
      readonly internalID: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null | undefined;
    readonly liveArtwork: {
      readonly __typename: "Artwork";
      readonly internalID: string;
      readonly isAcquireable: boolean | null | undefined;
      readonly isOfferable: boolean | null | undefined;
      readonly isOfferableFromInquiry: boolean | null | undefined;
      readonly published: boolean;
      readonly " $fragmentSpreads": FragmentRefs<"ConversationConfirmModal_artwork">;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationReviewOfferCTA_conversation" | "useConversationPurchaseButtonData_conversation">;
  readonly " $fragmentType": "ConversationCTA_conversation";
};
export type ConversationCTA_conversation$key = {
  readonly " $data"?: ConversationCTA_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationCTA_conversation">;
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
  "name": "ConversationCTA_conversation",
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
                (v0/*: any*/),
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
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "published",
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
    },
    {
      "alias": "activeCollectorOrders",
      "args": [
        {
          "kind": "Literal",
          "name": "buyerState",
          "value": [
            "SUBMITTED",
            "OFFER_RECEIVED",
            "COUNTEROFFER_SENT",
            "PAYMENT_FAILED",
            "PROCESSING_PAYMENT",
            "PROCESSING_OFFLINE_PAYMENT",
            "APPROVED",
            "SHIPPED",
            "COMPLETED",
            "REFUNDED"
          ]
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        }
      ],
      "concreteType": "MeOrdersConnection",
      "kind": "LinkedField",
      "name": "collectorOrdersConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "MeOrdersEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Order",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "buyerAction",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "collectorOrdersConnection(buyerState:[\"SUBMITTED\",\"OFFER_RECEIVED\",\"COUNTEROFFER_SENT\",\"PAYMENT_FAILED\",\"PROCESSING_PAYMENT\",\"PROCESSING_OFFLINE_PAYMENT\",\"APPROVED\",\"SHIPPED\",\"COMPLETED\",\"REFUNDED\"],first:10)"
    }
  ],
  "type": "Conversation",
  "abstractKey": null
};
})();

(node as any).hash = "e7eba53ad27523c54eee0f2eabd443b5";

export default node;
