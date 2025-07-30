/**
 * @generated SignedSource<<d145d06ed3cfb24bd90a047607ff1603>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2PaymentStep_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"Order2PaymentForm_me">;
  readonly " $fragmentType": "Order2PaymentStep_me";
};
export type Order2PaymentStep_me$key = {
  readonly " $data"?: Order2PaymentStep_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2PaymentStep_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2PaymentStep_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2PaymentForm_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "544230e5e9c9f56ff56fe07580b57af5";

export default node;
