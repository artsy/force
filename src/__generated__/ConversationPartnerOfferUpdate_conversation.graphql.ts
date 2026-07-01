/**
 * @generated SignedSource<<0b7853d918bd4923ab8ce3346049f8d7>>
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
    },
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
    }
  ],
  "type": "Conversation",
  "abstractKey": null
};

(node as any).hash = "ef4497b595c41ef15443f264d5c8f967";

export default node;
