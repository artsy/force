/**
 * @generated SignedSource<<e24290032e64c19f333cd7865c0688a0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2OrderSummary_order$data = {
  readonly " $fragmentSpreads": FragmentRefs<"Order2PricingBreakdown_order">;
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
      "name": "Order2PricingBreakdown_order"
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "92f6b11ec93049259c503a441f872752";

export default node;
