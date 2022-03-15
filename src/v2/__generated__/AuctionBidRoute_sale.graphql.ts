/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionBidRoute_sale = {
    readonly internalID: string;
    readonly slug: string;
    readonly " $refType": "AuctionBidRoute_sale";
};
export type AuctionBidRoute_sale$data = AuctionBidRoute_sale;
export type AuctionBidRoute_sale$key = {
    readonly " $data"?: AuctionBidRoute_sale$data;
    readonly " $fragmentRefs": FragmentRefs<"AuctionBidRoute_sale">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionBidRoute_sale",
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
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Sale",
  "abstractKey": null
};
(node as any).hash = 'efd6e1444f2d92910840f5a571604439';
export default node;
