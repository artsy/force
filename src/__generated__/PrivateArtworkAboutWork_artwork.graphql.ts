/**
 * @generated SignedSource<<cd8a8da8d3abb740ea0bc84070cd0f97>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrivateArtworkAboutWork_artwork$data = {
  readonly additionalInformation: string | null | undefined;
  readonly " $fragmentType": "PrivateArtworkAboutWork_artwork";
};
export type PrivateArtworkAboutWork_artwork$key = {
  readonly " $data"?: PrivateArtworkAboutWork_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrivateArtworkAboutWork_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PrivateArtworkAboutWork_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "additionalInformation",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "5ac4a7655d5912c1ea8c18f452b762be";

export default node;
