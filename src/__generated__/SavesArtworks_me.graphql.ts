/**
 * @generated SignedSource<<18127d51991e4a24b3c070b7b2ce5d4c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavesArtworks_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SavesArtworksGrid_me">;
  readonly " $fragmentType": "SavesArtworks_me";
};
export type SavesArtworks_me$key = {
  readonly " $data"?: SavesArtworks_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavesArtworks_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavesArtworks_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SavesArtworksGrid_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "df81e454264638f071e9ec705c5ac22a";

export default node;
