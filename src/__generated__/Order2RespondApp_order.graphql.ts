/**
 * @generated SignedSource<<085cd1d2fd55b2b6367acb3eb33361b3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type OrderPaymentMethodEnum = "CREDIT_CARD" | "SEPA_DEBIT" | "US_BANK_ACCOUNT" | "WIRE_TRANSFER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Order2RespondApp_order$data = {
  readonly internalID: string;
  readonly lineItems: ReadonlyArray<{
    readonly artwork: {
      readonly slug: string;
    } | null | undefined;
  } | null | undefined>;
  readonly mode: OrderModeEnum;
  readonly paymentMethod: OrderPaymentMethodEnum | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"Order2CollapsibleOrderSummary_order" | "Order2HelpLinks_order" | "Order2PaymentCompletedView_order" | "Order2RespondSummary_order" | "useCompleteDeliveryOptionData_order" | "useCompleteFulfillmentDetailsData_order">;
  readonly " $fragmentType": "Order2RespondApp_order";
};
export type Order2RespondApp_order$key = {
  readonly " $data"?: Order2RespondApp_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2RespondApp_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2RespondApp_order",
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
      "kind": "ScalarField",
      "name": "paymentMethod",
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
      "name": "Order2CollapsibleOrderSummary_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2RespondSummary_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useCompleteFulfillmentDetailsData_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useCompleteDeliveryOptionData_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2PaymentCompletedView_order"
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

(node as any).hash = "fc2293b027b11f2f1dfe7fc77f5d7f09";

export default node;
