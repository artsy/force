/**
 * @generated SignedSource<<769907bbb587e54360dbf1609baf76c0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2DetailsPage_order$data = {
  readonly " $fragmentSpreads": FragmentRefs<"Order2DetailsFulfillmentInfo_order" | "Order2DetailsHeader_order" | "Order2DetailsHelpLinks_order" | "Order2DetailsMessage_order" | "Order2DetailsOrderSummary_order" | "Order2DetailsPaymentInfo_order" | "Order2PricingBreakdown_order">;
  readonly " $fragmentType": "Order2DetailsPage_order";
};
export type Order2DetailsPage_order$key = {
  readonly " $data"?: Order2DetailsPage_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2DetailsPage_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2DetailsPage_order",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2DetailsHeader_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2DetailsMessage_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2DetailsOrderSummary_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2PricingBreakdown_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2DetailsPaymentInfo_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2DetailsFulfillmentInfo_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2DetailsHelpLinks_order"
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "14d4d3d42c2cb99708e2d852d918e057";

export default node;
