/**
 * @generated SignedSource<<71b037eaa32d79a7db916f39578cbfd6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExpressCheckout_order$data = {
  readonly buyerTotalCents: number | null | undefined;
  readonly currencyCode: string;
  readonly " $fragmentSpreads": FragmentRefs<"ExpressCheckoutUI_order">;
  readonly " $fragmentType": "ExpressCheckout_order";
};
export type ExpressCheckout_order$key = {
  readonly " $data"?: ExpressCheckout_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"ExpressCheckout_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ExpressCheckout_order",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ExpressCheckoutUI_order"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "buyerTotalCents",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currencyCode",
      "storageKey": null
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};

(node as any).hash = "29d7576fc07a7882ca59ed5e0abba477";

export default node;
