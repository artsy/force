/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkApp_order = {
    readonly " $fragmentRefs": FragmentRefs<"SubmittedOrderModal_order">;
    readonly " $refType": "ArtworkApp_order";
};
export type ArtworkApp_order$data = ArtworkApp_order;
export type ArtworkApp_order$key = {
    readonly " $data"?: ArtworkApp_order$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkApp_order">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkApp_order",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SubmittedOrderModal_order"
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};
(node as any).hash = '0831c78e6819646d5a2ffdfa81d0c176';
export default node;
