/**
 * @generated SignedSource<<d86559f008300b03da2bf00c2697552b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkActionsSaveButtonOld_artwork$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkActionsSaveButtonV2_artwork">;
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
      "name": "ArtworkActionsSaveButtonV2_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "95fdb1b133257ce192fdfda3e9d2fbbf";

export default node;
