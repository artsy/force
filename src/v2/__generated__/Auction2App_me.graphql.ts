/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Auction2App_me = {
    readonly " $fragmentRefs": FragmentRefs<"AuctionDetails_me">;
    readonly " $refType": "Auction2App_me";
};
export type Auction2App_me$data = Auction2App_me;
export type Auction2App_me$key = {
    readonly " $data"?: Auction2App_me$data;
    readonly " $fragmentRefs": FragmentRefs<"Auction2App_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Auction2App_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuctionDetails_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = '261389542fc5e7e26e237a24df3dc535';
export default node;
