/**
 * @generated SignedSource<<b6a1d6ffb0bfebd9de86a71a04317ad4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Order2CheckoutContext_order$data = {
  readonly mode: OrderModeEnum;
  readonly " $fragmentSpreads": FragmentRefs<"useLoadCheckout_order">;
  readonly " $fragmentType": "Order2CheckoutContext_order";
};
export type Order2CheckoutContext_order$key = {
  readonly " $data"?: Order2CheckoutContext_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutContext_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2CheckoutContext_order",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useLoadCheckout_order"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mode",
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "42ac117f7edb61580b12bf99ab6a95f2";

export default node;
