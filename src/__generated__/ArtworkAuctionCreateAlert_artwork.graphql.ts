/**
 * @generated SignedSource<<757eff0cc5188504911f1334fbcebf36>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkAuctionCreateAlert_artwork$data = {
  readonly artistNames: string | null;
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artistNames",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "63e9dcb445312d0b6972668c7bb02c8a";

export default node;
