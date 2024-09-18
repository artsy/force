/**
 * @generated SignedSource<<ed184f5c7582b6421f0378ac80019b20>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Shipping2_order$data = {
  readonly internalID: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSummaryItem_order" | "FulfillmentDetailsForm_order" | "OrderStepper_order" | "SaveAndContinueButton_order" | "ShippingContext_order" | "ShippingQuotes2_order" | "TransactionDetailsSummaryItem_order">;
  readonly " $fragmentType": "Shipping2_order";
};
export type Shipping2_order$key = {
  readonly " $data"?: Shipping2_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Shipping2_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Shipping2_order",
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
      "name": "ShippingQuotes2_order"
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

(node as any).hash = "f9ea17ecfed164b2896c3a2a795005d9";

export default node;
