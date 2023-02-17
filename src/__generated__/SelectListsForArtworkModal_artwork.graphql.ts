/**
 * @generated SignedSource<<1373b18682f9cf9bd7a4d3f325989923>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SelectListsForArtworkModal_artwork$data = {
  readonly title: string | null;
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

(node as any).hash = "986318c3f047f0944b265aa063a3328e";

export default node;
