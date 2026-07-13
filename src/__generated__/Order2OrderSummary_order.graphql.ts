/**
 * @generated SignedSource<<9f8f519fbc106c4e461fcdaf5c07c67d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2OrderSummary_order$data = {
  readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutPricingBreakdown_order">;
  readonly " $fragmentType": "Order2OrderSummary_order";
};
export type Order2OrderSummary_order$key = {
  readonly " $data"?: Order2OrderSummary_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2OrderSummary_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2OrderSummary_order",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2CheckoutPricingBreakdown_order"
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "32ad3f1404f0f74784a8281abee7179c";

export default node;
