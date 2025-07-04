/**
 * @generated SignedSource<<71cdbafdb63415c714f5da35b96191aa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type DisplayTextsMessageTypeEnum = "APPROVED_PICKUP" | "APPROVED_SHIP" | "APPROVED_SHIP_EXPRESS" | "APPROVED_SHIP_STANDARD" | "APPROVED_SHIP_WHITE_GLOVE" | "CANCELED" | "COMPLETED_PICKUP" | "COMPLETED_SHIP" | "DECLINED_BY_BUYER" | "DECLINED_BY_SELLER" | "PAYMENT_FAILED" | "PROCESSING_PAYMENT_PICKUP" | "PROCESSING_PAYMENT_SHIP" | "PROCESSING_WIRE" | "REFUNDED" | "SHIPPED" | "SUBMITTED_OFFER" | "SUBMITTED_ORDER" | "UNKNOWN" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Order2DetailsMessage_order$data = {
  readonly buyerStateExpiresAt: string | null | undefined;
  readonly code: string;
  readonly currencyCode: string;
  readonly deliveryInfo: {
    readonly estimatedDelivery: string | null | undefined;
    readonly estimatedDeliveryWindow: string | null | undefined;
    readonly shipperName: string | null | undefined;
    readonly trackingNumber: string | null | undefined;
    readonly trackingURL: string | null | undefined;
  } | null | undefined;
  readonly displayTexts: {
    readonly messageType: DisplayTextsMessageTypeEnum;
  };
  readonly impulseConversationId: string | null | undefined;
  readonly internalID: string;
  readonly " $fragmentType": "Order2DetailsMessage_order";
};
export type Order2DetailsMessage_order$key = {
  readonly " $data"?: Order2DetailsMessage_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2DetailsMessage_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2DetailsMessage_order",
  "selections": [
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
      "kind": "ScalarField",
      "name": "code",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currencyCode",
      "storageKey": null
    },
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
      "name": "impulseConversationId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "DisplayTexts",
      "kind": "LinkedField",
      "name": "displayTexts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "messageType",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "DeliveryInfo",
      "kind": "LinkedField",
      "name": "deliveryInfo",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "shipperName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "trackingNumber",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "trackingURL",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "estimatedDelivery",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "estimatedDeliveryWindow",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "f87da796df218afc454f46697843fd3f";

export default node;
