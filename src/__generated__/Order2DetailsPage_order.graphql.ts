/**
 * @generated SignedSource<<a28059ee4b770b5311366622de4a18a8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2DetailsPage_order$data = {
  readonly " $fragmentSpreads": FragmentRefs<"DetailsHeader_order">;
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
      "name": "DetailsHeader_order"
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "f44fbf49bcca9931b756d30a3ab79d61";

export default node;
