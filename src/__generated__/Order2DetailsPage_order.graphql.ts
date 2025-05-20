/**
 * @generated SignedSource<<2e40f0b9d5cb9c1c2b868ada4a1c7a7a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2DetailsPage_order$data = {
  readonly " $fragmentSpreads": FragmentRefs<"Order2DetailsHeader_order" | "Order2DetailsMessage_order">;
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
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "9421ef50cceec1037a7e14edd8a587d2";

export default node;
