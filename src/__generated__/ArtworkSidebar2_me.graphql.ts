/**
 * @generated SignedSource<<ddc42aacbb923c0036ef9a03f22bcdaf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar2_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarAuctionInfoPolling_me">;
  readonly " $fragmentType": "ArtworkSidebar2_me";
};
export type ArtworkSidebar2_me$key = {
  readonly " $data"?: ArtworkSidebar2_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebar2_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebar2_me",
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

(node as any).hash = "46b16aa388fe1db74245364d2f94228b";

export default node;
