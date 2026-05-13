/**
 * @generated SignedSource<<2f4b5e34b3a5c493037bca913226c374>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2FulfillmentDetailsStep_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"Order2DeliveryForm_me" | "Order2PickupForm_me">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2PickupForm_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "86c7461f957a2c38e5b90d9f1b090e53";

export default node;
