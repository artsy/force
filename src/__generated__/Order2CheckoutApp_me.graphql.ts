/**
 * @generated SignedSource<<b4f8f30f69c39b881f2da39aecf51b47>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2CheckoutApp_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"Order2FulfillmentDetailsStep_me" | "Order2PaymentStep_me">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2FulfillmentDetailsStep_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "ac2e296bc35b8154a31e0b1594f0a65c";

export default node;
