/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarAuctionInfoPolling_me = {
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarBidAction_me">;
    readonly " $refType": "ArtworkSidebarAuctionInfoPolling_me";
};
export type ArtworkSidebarAuctionInfoPolling_me$data = ArtworkSidebarAuctionInfoPolling_me;
export type ArtworkSidebarAuctionInfoPolling_me$key = {
    readonly " $data"?: ArtworkSidebarAuctionInfoPolling_me$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarAuctionInfoPolling_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarAuctionInfoPolling_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarBidAction_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = 'eb6cccc7691a64ac03d767b1a2ff730c';
export default node;
