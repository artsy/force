/**
 * @generated SignedSource<<43962ea8c5aeb75604a85b646db4004e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2CheckoutApp_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"Order2PaymentStep_me">;
  readonly " $fragmentType": "Order2CheckoutApp_me";
};
export type Order2CheckoutApp_me$key = {
  readonly " $data"?: Order2CheckoutApp_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutApp_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2CheckoutApp_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2PaymentStep_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "2afce7e7bca32f7956def25ad8d1784a";

export default node;
