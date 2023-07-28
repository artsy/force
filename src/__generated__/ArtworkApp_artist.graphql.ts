/**
 * @generated SignedSource<<6a1626afe22d38a5a75052a34443dfb5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkApp_artist$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkAuctionCreateAlert_artist">;
  readonly " $fragmentType": "ArtworkApp_artist";
};
export type ArtworkApp_artist$key = {
  readonly " $data"?: ArtworkApp_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkApp_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkApp_artist",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkAuctionCreateAlert_artist"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "46a8efb4c451b3487076caf94d0a40b7";

export default node;
