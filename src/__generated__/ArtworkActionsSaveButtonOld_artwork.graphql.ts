/**
 * @generated SignedSource<<d2cb91eacb761aeaab50a1da5fdeeb84>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkActionsSaveButtonOld_artwork$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkActionsSaveButton_artwork">;
  readonly " $fragmentType": "ArtworkActionsSaveButtonOld_artwork";
};
export type ArtworkActionsSaveButtonOld_artwork$key = {
  readonly " $data"?: ArtworkActionsSaveButtonOld_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkActionsSaveButtonOld_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkActionsSaveButtonOld_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkActionsSaveButton_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "c9e19ae4577641a40b562fe424556468";

export default node;
