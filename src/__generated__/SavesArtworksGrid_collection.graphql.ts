/**
 * @generated SignedSource<<f4dab4b31437157c5fba70fe07ba9e59>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavesArtworksGrid_collection$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SavesEmptyState_collection">;
  readonly " $fragmentType": "SavesArtworksGrid_collection";
};
export type SavesArtworksGrid_collection$key = {
  readonly " $data"?: SavesArtworksGrid_collection$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavesArtworksGrid_collection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavesArtworksGrid_collection",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SavesEmptyState_collection"
    }
  ],
  "type": "Collection",
  "abstractKey": null
};

(node as any).hash = "378b178f2d00c58dddc4dde4376c390a";

export default node;
