/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionTimer_sale = {
    readonly live_start_at: string | null;
    readonly end_at: string | null;
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
      "alias": "live_start_at",
      "args": null,
      "kind": "ScalarField",
      "name": "liveStartAt",
      "storageKey": null
    },
    {
      "alias": "end_at",
      "args": null,
      "kind": "ScalarField",
      "name": "endAt",
      "storageKey": null
    }
  ],
  "type": "Sale"
};
(node as any).hash = 'e2516b9a974aff68f99b38968c28502a';
export default node;
