/**
 * @generated SignedSource<<222d678481cc8eab4994cb5f86c830cc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type DisplayTextsMessageTypeEnum = "APPROVED_PICKUP" | "APPROVED_SHIP" | "APPROVED_SHIP_EXPRESS" | "APPROVED_SHIP_STANDARD" | "APPROVED_SHIP_WHITE_GLOVE" | "CANCELED" | "COMPLETED_PICKUP" | "COMPLETED_SHIP" | "DECLINED_BY_BUYER" | "DECLINED_BY_SELLER" | "OFFER_RECEIVED" | "PAYMENT_FAILED" | "PROCESSING_PAYMENT_PICKUP" | "PROCESSING_PAYMENT_SHIP" | "PROCESSING_WIRE" | "REFUNDED" | "SHIPPED" | "SUBMITTED_OFFER" | "SUBMITTED_ORDER" | "UNKNOWN" | "%future added value";
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type OrderSourceEnum = "ARTWORK_PAGE" | "INQUIRY" | "PARTNER_OFFER" | "PRIVATE_SALE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type OrderDetailsPage_order$data = {
  readonly displayTexts: {
    readonly messageType: DisplayTextsMessageTypeEnum;
  };
  readonly lineItems: ReadonlyArray<{
    readonly artwork: {
      readonly slug: string;
    } | null | undefined;
  } | null | undefined>;
  readonly mode: OrderModeEnum;
  readonly source: OrderSourceEnum;
  readonly " $fragmentSpreads": FragmentRefs<"Order2HelpLinks_order" | "OrderDetailsFulfillmentInfo_order" | "OrderDetailsHeader_order" | "OrderDetailsMessage_order" | "OrderDetailsOrderSummary_order" | "OrderDetailsPaymentInfo_order" | "OrderDetailsPricingBreakdown_order">;
  readonly " $fragmentType": "OrderDetailsPage_order";
};
export type OrderDetailsPage_order$key = {
  readonly " $data"?: OrderDetailsPage_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"OrderDetailsPage_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OrderDetailsPage_order",
  "selections": [
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
          "concreteType": "Artwork",
          "kind": "LinkedField",
          "name": "artwork",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "slug",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "source",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "OrderDetailsHeader_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "OrderDetailsMessage_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "OrderDetailsOrderSummary_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "OrderDetailsPricingBreakdown_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "OrderDetailsPaymentInfo_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "OrderDetailsFulfillmentInfo_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2HelpLinks_order"
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "3c3294c95f195bc84077b2314e37da85";

export default node;
