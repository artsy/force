/**
 * @generated SignedSource<<e28a150e87769f080cda5e5860ef0392>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrivateArtworkDetails_artwork$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PrivateArtworkAboutArtist_artwork" | "PrivateArtworkAboutWork_artwork" | "PrivateArtworkCondition_artwork" | "PrivateArtworkExhibitionHistory_artwork" | "PrivateArtworkProvenance_artwork">;
  readonly " $fragmentType": "PrivateArtworkDetails_artwork";
};
export type PrivateArtworkDetails_artwork$key = {
  readonly " $data"?: PrivateArtworkDetails_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrivateArtworkDetails_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PrivateArtworkDetails_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PrivateArtworkAboutWork_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PrivateArtworkAboutArtist_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PrivateArtworkCondition_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PrivateArtworkProvenance_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PrivateArtworkExhibitionHistory_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "11d5526fbabf07d9c4d9ff3a5cb116e4";

export default node;
