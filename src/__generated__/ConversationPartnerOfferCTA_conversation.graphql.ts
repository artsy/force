/**
 * @generated SignedSource<<3349e93195c0a4555a438768fb5e8565>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OrderBuyerActionEnum = "OFFER_ACCEPTED" | "OFFER_ACCEPTED_CONFIRM_NEEDED" | "OFFER_RECEIVED" | "OFFER_RECEIVED_CONFIRM_NEEDED" | "PAYMENT_FAILED" | "PROVISIONAL_OFFER_ACCEPTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ConversationPartnerOfferCTA_conversation$data = {
  readonly activeCollectorOrders: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly buyerAction: OrderBuyerActionEnum | null | undefined;
        readonly impulseConversationId: string | null | undefined;
        readonly internalID: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly internalID: string | null | undefined;
  readonly items: ReadonlyArray<{
    readonly item: {
      readonly __typename: "Artwork";
      readonly href: string | null | undefined;
      readonly internalID: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "ConversationPartnerOfferCTA_conversation";
};
export type ConversationPartnerOfferCTA_conversation$key = {
  readonly " $data"?: ConversationPartnerOfferCTA_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationPartnerOfferCTA_conversation">;
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
  "name": "ConversationPartnerOfferCTA_conversation",
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
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "href",
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
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "impulseConversationId",
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

(node as any).hash = "02e7fd4e16b31ad79c71e5d6f65f19b8";

export default node;
