/**
 * @generated SignedSource<<7844d4db7011dde720de9d52d0e70b17>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrivateArtworkProvenance_artwork$data = {
  readonly title: string | null | undefined;
  readonly " $fragmentType": "PrivateArtworkProvenance_artwork";
};
export type PrivateArtworkProvenance_artwork$key = {
  readonly " $data"?: PrivateArtworkProvenance_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrivateArtworkProvenance_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PrivateArtworkProvenance_artwork",
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

(node as any).hash = "85419215c5939e6eae21a4b279c1f7ff";

export default node;
