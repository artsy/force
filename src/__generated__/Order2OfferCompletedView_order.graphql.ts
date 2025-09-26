/**
 * @generated SignedSource<<3945b383a46fc5e2cc87bcfbf41fb32a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2OfferCompletedView_order$data = {
  readonly currencyCode: string;
  readonly " $fragmentType": "Order2OfferCompletedView_order";
};
export type Order2OfferCompletedView_order$key = {
  readonly " $data"?: Order2OfferCompletedView_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2OfferCompletedView_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2OfferCompletedView_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currencyCode",
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "07af4407ce41bd705e0911d8fa7238eb";

export default node;
