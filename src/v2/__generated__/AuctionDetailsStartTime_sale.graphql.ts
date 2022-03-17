/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionDetailsStartTime_sale = {
    readonly formattedStartDateTime: string | null;
    readonly " $refType": "AuctionDetailsStartTime_sale";
};
export type AuctionDetailsStartTime_sale$data = AuctionDetailsStartTime_sale;
export type AuctionDetailsStartTime_sale$key = {
    readonly " $data"?: AuctionDetailsStartTime_sale$data;
    readonly " $fragmentRefs": FragmentRefs<"AuctionDetailsStartTime_sale">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionDetailsStartTime_sale",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "formattedStartDateTime",
      "storageKey": null
    }
  ],
  "type": "Sale",
  "abstractKey": null
};
(node as any).hash = '8002a6cafa29f2692baeffb74c722da9';
export default node;
