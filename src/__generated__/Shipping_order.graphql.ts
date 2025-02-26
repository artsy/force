/**
 * @generated SignedSource<<1ccb1bab37de7d0a4286e5b43a97d52a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Shipping_order$data = {
  readonly internalID: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSummaryItem_order" | "ExpressCheckout_order" | "FulfillmentDetailsForm_order" | "OrderStepper_order" | "SaveAndContinueButton_order" | "ShippingContext_order" | "ShippingQuotes_order" | "TransactionDetailsSummaryItem_order">;
  readonly " $fragmentType": "Shipping_order";
};
export type Shipping_order$key = {
  readonly " $data"?: Shipping_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Shipping_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Shipping_order",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShippingContext_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FulfillmentDetailsForm_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SaveAndContinueButton_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSummaryItem_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TransactionDetailsSummaryItem_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "OrderStepper_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShippingQuotes_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ExpressCheckout_order"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};

(node as any).hash = "58ff7c7b7ab97fab4fdca207f2cebb24";

export default node;
