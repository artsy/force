/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarBiddingClosedMessage_artwork = {
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarCreateAlertButton_artwork">;
    readonly " $refType": "ArtworkSidebarBiddingClosedMessage_artwork";
};
export type ArtworkSidebarBiddingClosedMessage_artwork$data = ArtworkSidebarBiddingClosedMessage_artwork;
export type ArtworkSidebarBiddingClosedMessage_artwork$key = {
    readonly " $data"?: ArtworkSidebarBiddingClosedMessage_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarBiddingClosedMessage_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarBiddingClosedMessage_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarCreateAlertButton_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = 'b51ff4ad0e36a21d29c0be4261bab9af';
export default node;
