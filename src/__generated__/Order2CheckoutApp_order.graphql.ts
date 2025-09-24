/**
 * @generated SignedSource<<f269f90ae036d40d937d8488c12c1198>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type FulfillmentOptionTypeEnum = "ARTSY_EXPRESS" | "ARTSY_STANDARD" | "ARTSY_WHITE_GLOVE" | "DOMESTIC_FLAT" | "INTERNATIONAL_FLAT" | "PICKUP" | "SHIPPING_TBD" | "%future added value";
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Order2CheckoutApp_order$data = {
  readonly internalID: string;
  readonly lineItems: ReadonlyArray<{
    readonly artwork: {
      readonly isFixedShippingFeeOnly: boolean | null | undefined;
      readonly slug: string;
    } | null | undefined;
  } | null | undefined>;
  readonly mode: OrderModeEnum;
  readonly selectedFulfillmentOption: {
    readonly type: FulfillmentOptionTypeEnum;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutLoadingSkeleton_order" | "Order2CollapsibleOrderSummary_order" | "Order2DeliveryOptionsStep_order" | "Order2ExpressCheckout_order" | "Order2FulfillmentDetailsStep_order" | "Order2HelpLinks_order" | "Order2OfferStep_order" | "Order2PaymentStep_order" | "Order2ReviewStep_order">;
  readonly " $fragmentType": "Order2CheckoutApp_order";
};
export type Order2CheckoutApp_order$key = {
  readonly " $data"?: Order2CheckoutApp_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutApp_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2CheckoutApp_order",
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
      "name": "mode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "FulfillmentOption",
      "kind": "LinkedField",
      "name": "selectedFulfillmentOption",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "type",
          "storageKey": null
        }
      ],
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
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "isFixedShippingFeeOnly",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2ExpressCheckout_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2CollapsibleOrderSummary_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2OfferStep_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2FulfillmentDetailsStep_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2DeliveryOptionsStep_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2PaymentStep_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2ReviewStep_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2CheckoutLoadingSkeleton_order"
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

(node as any).hash = "865a486e3ea8749cd7b82dbf7edfd6fd";

export default node;
