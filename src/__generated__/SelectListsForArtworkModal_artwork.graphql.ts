/**
 * @generated SignedSource<<ddb9bf934db1f3d3f00caf6654dadcc3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SelectListsForArtworkModal_artwork$data = {
  readonly internalID: string;
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SelectListsForArtworkHeader_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "2f0ba5020ca86a64f2f698f1dc35dc88";

export default node;
