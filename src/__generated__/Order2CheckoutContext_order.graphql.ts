/**
 * @generated SignedSource<<4ab2054aff608907f56544b0731d2be9>>
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

(node as any).hash = "aaca62e4dcab336c9b488877f7b19f6e";

export default node;
