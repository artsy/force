/**
 * @generated SignedSource<<3370cb93ffeb4b02c20284367755d53a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkAuctionCreateAlert_artist$data = {
  readonly name: string | null;
  readonly " $fragmentType": "ArtworkAuctionCreateAlert_artist";
};
export type ArtworkAuctionCreateAlert_artist$key = {
  readonly " $data"?: ArtworkAuctionCreateAlert_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkAuctionCreateAlert_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkAuctionCreateAlert_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "761d70210d5e46c81bf839290f7caa64";

export default node;
