/**
 * @generated SignedSource<<e5ddfcb2b0d445a7c24bc02626d59ea5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarAuctionInfoPolling_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarBidAction_me">;
  readonly " $fragmentType": "ArtworkSidebarAuctionInfoPolling_me";
};
export type ArtworkSidebarAuctionInfoPolling_me$key = {
  readonly " $data"?: ArtworkSidebarAuctionInfoPolling_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarAuctionInfoPolling_me">;
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

(node as any).hash = "eb6cccc7691a64ac03d767b1a2ff730c";

export default node;
