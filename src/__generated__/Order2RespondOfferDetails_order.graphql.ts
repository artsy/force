/**
 * @generated SignedSource<<6369f9ef0ae06d6c201c1b4a911c8390>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2RespondOfferDetails_order$data = {
  readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutPricingBreakdown_order">;
  readonly " $fragmentType": "Order2RespondOfferDetails_order";
};
export type Order2RespondOfferDetails_order$key = {
  readonly " $data"?: Order2RespondOfferDetails_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2RespondOfferDetails_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2RespondOfferDetails_order",
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

(node as any).hash = "bec36b30b0c23e8e6dda9d0281f6f00c";

export default node;
