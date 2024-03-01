/**
 * @generated SignedSource<<eb67c37d10caa026411ba14e815cb4f3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrivateArtworkAboutArtist_artwork$data = {
  readonly title: string | null | undefined;
  readonly " $fragmentType": "PrivateArtworkAboutArtist_artwork";
};
export type PrivateArtworkAboutArtist_artwork$key = {
  readonly " $data"?: PrivateArtworkAboutArtist_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrivateArtworkAboutArtist_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PrivateArtworkAboutArtist_artwork",
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

(node as any).hash = "fd3f8b29c3cba75ea223f928202867d6";

export default node;
