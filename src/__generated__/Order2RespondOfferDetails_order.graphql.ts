/**
 * @generated SignedSource<<c3c4211ee296bc9d0921ab67878df32a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2RespondOfferDetails_order$data = {
  readonly " $fragmentSpreads": FragmentRefs<"Order2PricingBreakdown_order">;
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
      "name": "Order2PricingBreakdown_order"
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "a003de829d7a8db4ab75d5bc8ca88293";

export default node;
