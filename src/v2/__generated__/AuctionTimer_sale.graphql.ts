/* tslint:disable */

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
  "kind": "Fragment",
  "name": "AuctionTimer_sale",
  "type": "Sale",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": "live_start_at",
      "name": "liveStartAt",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "end_at",
      "name": "endAt",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = 'e2516b9a974aff68f99b38968c28502a';
export default node;
