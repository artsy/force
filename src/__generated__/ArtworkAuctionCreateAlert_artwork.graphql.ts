/**
 * @generated SignedSource<<afc2c9f05d8d43a148d521cde621ecb7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkAuctionCreateAlert_artwork$data = {
  readonly title: string | null;
  readonly " $fragmentType": "ArtworkAuctionCreateAlert_artwork";
};
export type ArtworkAuctionCreateAlert_artwork$key = {
  readonly " $data"?: ArtworkAuctionCreateAlert_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkAuctionCreateAlert_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkAuctionCreateAlert_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "c49e7c1090c2b4998e7a03432cce4f46";

export default node;
