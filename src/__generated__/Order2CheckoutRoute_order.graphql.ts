/**
 * @generated SignedSource<<47514ed63312ed2b7b350fe1635bd6cb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2CheckoutRoute_order$data = {
  readonly internalID: string;
  readonly " $fragmentType": "Order2CheckoutRoute_order";
};
export type Order2CheckoutRoute_order$key = {
  readonly " $data"?: Order2CheckoutRoute_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutRoute_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2CheckoutRoute_order",
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

(node as any).hash = "78b06c7873444c97504075cdd1378a6a";

export default node;
