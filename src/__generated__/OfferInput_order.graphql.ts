/**
 * @generated SignedSource<<da383937145851082f01b93b19c896a4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OfferInput_order$data = {
  readonly currencySymbol: string;
  readonly " $fragmentType": "OfferInput_order";
};
export type OfferInput_order$key = {
  readonly " $data"?: OfferInput_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"OfferInput_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OfferInput_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currencySymbol",
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "7235408d5e8df628e05c1136fbeb01af";

export default node;
