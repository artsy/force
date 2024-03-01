/**
 * @generated SignedSource<<1f4d85dc8a94bd924151b7ef388602cf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrivateArtworkAboutWork_artwork$data = {
  readonly title: string | null | undefined;
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
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "531e7d4e3bfdf32b3d277031976b3d35";

export default node;
