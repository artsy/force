/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PriceOptions_order = {
    readonly internalID: string;
    readonly " $refType": "PriceOptions_order";
};
export type PriceOptions_order$data = PriceOptions_order;
export type PriceOptions_order$key = {
    readonly " $data"?: PriceOptions_order$data;
    readonly " $fragmentRefs": FragmentRefs<"PriceOptions_order">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PriceOptions_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};
(node as any).hash = '6098d0dbc695bef9e6a4a2a9e71b3b2e';
export default node;
