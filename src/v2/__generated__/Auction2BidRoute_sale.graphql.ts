/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Auction2BidRoute_sale = {
    readonly internalID: string;
    readonly slug: string;
    readonly " $refType": "Auction2BidRoute_sale";
};
export type Auction2BidRoute_sale$data = Auction2BidRoute_sale;
export type Auction2BidRoute_sale$key = {
    readonly " $data"?: Auction2BidRoute_sale$data;
    readonly " $fragmentRefs": FragmentRefs<"Auction2BidRoute_sale">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Auction2BidRoute_sale",
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
(node as any).hash = 'cd74873d416a338ba5f7d73015ef6229';
export default node;
