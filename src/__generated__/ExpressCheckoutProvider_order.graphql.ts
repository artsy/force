/**
 * @generated SignedSource<<5951cfa5127a8c3962bb9f83c5be5007>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExpressCheckoutProvider_order$data = {
  readonly buyerTotalCents: number | null | undefined;
  readonly internalID: string;
  readonly " $fragmentType": "ExpressCheckoutProvider_order";
};
export type ExpressCheckoutProvider_order$key = {
  readonly " $data"?: ExpressCheckoutProvider_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"ExpressCheckoutProvider_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ExpressCheckoutProvider_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "buyerTotalCents",
      "storageKey": null
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};

(node as any).hash = "0173f5ca191bf4ac4286b339a6bbf224";

export default node;
