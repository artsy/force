/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar_me = {
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarAuctionInfoPolling_me">;
    readonly " $refType": "ArtworkSidebar_me";
};
export type ArtworkSidebar_me$data = ArtworkSidebar_me;
export type ArtworkSidebar_me$key = {
    readonly " $data"?: ArtworkSidebar_me$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebar_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebar_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarAuctionInfoPolling_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = '308a1473e0ac7659f4cfbf1f6fc696b7';
export default node;
