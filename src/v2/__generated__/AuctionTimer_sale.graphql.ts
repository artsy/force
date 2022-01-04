/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionTimer_sale = {
    readonly liveStartAt: string | null;
    readonly endAt: string | null;
    readonly " $refType": "AuctionTimer_sale";
};
export type AuctionTimer_sale$data = AuctionTimer_sale;
export type AuctionTimer_sale$key = {
    readonly " $data"?: AuctionTimer_sale$data;
    readonly " $fragmentRefs": FragmentRefs<"AuctionTimer_sale">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionTimer_sale",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "liveStartAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endAt",
      "storageKey": null
    }
  ],
  "type": "Sale"
};
(node as any).hash = '3adac1d5d9ff59e38723ddec36f0ab3c';
export default node;
