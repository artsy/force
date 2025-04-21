/**
 * @generated SignedSource<<dfe2831c7f05f4acfd7df04adb4a36ce>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Checkout_order$data = {
  readonly internalID: string;
  readonly " $fragmentType": "Checkout_order";
};
export type Checkout_order$key = {
  readonly " $data"?: Checkout_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Checkout_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Checkout_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "66ec2841ad94db660657d92245d4f8cb";

export default node;
