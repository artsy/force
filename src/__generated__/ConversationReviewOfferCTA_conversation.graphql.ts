/**
 * @generated SignedSource<<bef34ed75b7c6bf461455d422eb5e4db>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OrderBuyerActionEnum = "OFFER_ACCEPTED" | "OFFER_ACCEPTED_CONFIRM_NEEDED" | "OFFER_RECEIVED" | "OFFER_RECEIVED_CONFIRM_NEEDED" | "PAYMENT_FAILED" | "PROVISIONAL_OFFER_ACCEPTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ConversationReviewOfferCTA_conversation$data = {
  readonly activeCollectorOrders: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly buyerAction: OrderBuyerActionEnum | null | undefined;
        readonly buyerStateExpiresAt: string | null | undefined;
        readonly impulseConversationId: string | null | undefined;
        readonly internalID: string;
        readonly lastSubmittedOffer: {
          readonly createdAt: string | null | undefined;
        } | null | undefined;
        readonly submittedOffers: ReadonlyArray<{
          readonly internalID: string;
        }>;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly internalID: string | null | undefined;
  readonly " $fragmentType": "ConversationReviewOfferCTA_conversation";
};
export type ConversationReviewOfferCTA_conversation$key = {
  readonly " $data"?: ConversationReviewOfferCTA_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationReviewOfferCTA_conversation">;
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
  "name": "ConversationReviewOfferCTA_conversation",
  "selections": [
    (v0/*: any*/),
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
                  "name": "impulseConversationId",
                  "storageKey": null
                },
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
                  "name": "buyerStateExpiresAt",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Offer",
                  "kind": "LinkedField",
                  "name": "lastSubmittedOffer",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "createdAt",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Offer",
                  "kind": "LinkedField",
                  "name": "submittedOffers",
                  "plural": true,
                  "selections": [
                    (v0/*: any*/)
                  ],
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

(node as any).hash = "623278ae0e99616dcbe1b2ac486baadb";

export default node;
