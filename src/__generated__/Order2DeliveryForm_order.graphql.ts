/**
 * @generated SignedSource<<317f07e6b414f6f6b0ef00a81739d7fb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2DeliveryForm_order$data = {
  readonly internalID: string;
  readonly " $fragmentType": "Order2DeliveryForm_order";
};
export type Order2DeliveryForm_order$key = {
  readonly " $data"?: Order2DeliveryForm_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2DeliveryForm_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2DeliveryForm_order",
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

(node as any).hash = "a3ebd86de69f60016da67fa882ebc639";

export default node;
