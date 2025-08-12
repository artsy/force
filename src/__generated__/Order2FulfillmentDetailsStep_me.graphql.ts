/**
 * @generated SignedSource<<f130b47c5688f7de42c91f1522915cd4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2FulfillmentDetailsStep_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"Order2DeliveryForm_me">;
  readonly " $fragmentType": "Order2FulfillmentDetailsStep_me";
};
export type Order2FulfillmentDetailsStep_me$key = {
  readonly " $data"?: Order2FulfillmentDetailsStep_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2FulfillmentDetailsStep_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2FulfillmentDetailsStep_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2DeliveryForm_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "f0937e29739851692a5743f78dc11246";

export default node;
