/**
 * @generated SignedSource<<8698594dd63e1a39d26706ec05a31f0a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SelectListsForArtworkModal_artwork$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SelectListsForArtworkHeader_artwork">;
  readonly " $fragmentType": "SelectListsForArtworkModal_artwork";
};
export type SelectListsForArtworkModal_artwork$key = {
  readonly " $data"?: SelectListsForArtworkModal_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"SelectListsForArtworkModal_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SelectListsForArtworkModal_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SelectListsForArtworkHeader_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "ab60ad82ac3dfdc79737f09881626840";

export default node;
