/**
 * @generated SignedSource<<85e89181108dd1f4bb6e71a964da6b10>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OrderBuyerStateEnum = "APPROVED" | "CANCELED" | "COMPLETED" | "COUNTEROFFER_SENT" | "DECLINED_BY_BUYER" | "DECLINED_BY_SELLER" | "INCOMPLETE" | "OFFER_RECEIVED" | "PAYMENT_FAILED" | "PROCESSING_OFFLINE_PAYMENT" | "PROCESSING_PAYMENT" | "REFUNDED" | "SHIPPED" | "SUBMITTED" | "UNKNOWN" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ConversationPartnerOfferUpdate_conversation$data = {
  readonly collectorOrdersConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly buyerState: OrderBuyerStateEnum | null | undefined;
        readonly lineItems: ReadonlyArray<{
          readonly partnerOfferId: string | null | undefined;
        } | null | undefined>;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly partnerOffersConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly endAt: string | null | undefined;
        readonly internalID: string;
        readonly isAvailable: boolean | null | undefined;
        readonly priceWithDiscount: {
          readonly display: string | null | undefined;
        } | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
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
      "args": [
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
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "buyerState",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "LineItem",
                  "kind": "LinkedField",
                  "name": "lineItems",
                  "plural": true,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "partnerOfferId",
                      "storageKey": null
                    }
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
      "storageKey": "collectorOrdersConnection(first:10)"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        },
        {
          "kind": "Literal",
          "name": "offerType",
          "value": [
            "PERSONALIZED"
          ]
        }
      ],
      "concreteType": "PartnerOfferConnection",
      "kind": "LinkedField",
      "name": "partnerOffersConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "PartnerOfferEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "PartnerOffer",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
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
                  "name": "endAt",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isAvailable",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Money",
                  "kind": "LinkedField",
                  "name": "priceWithDiscount",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "display",
                      "storageKey": null
                    }
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
      "storageKey": "partnerOffersConnection(first:1,offerType:[\"PERSONALIZED\"])"
    }
  ],
  "type": "Conversation",
  "abstractKey": null
};

(node as any).hash = "4b1b00a55e036743cb89f8a4fd7855e8";

export default node;
