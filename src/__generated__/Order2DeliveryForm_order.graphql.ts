/**
 * @generated SignedSource<<6635572f1ecd247249ec8e1af8215db2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2DeliveryForm_order$data = {
  readonly availableShippingCountries: ReadonlyArray<string>;
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "availableShippingCountries",
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "bb715c2e181ce58f6c7b87ccaa15a600";

export default node;
