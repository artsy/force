/**
 * @generated SignedSource<<dda600a2779e49e343d4f73174f7e5c4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrivateArtworkMetadata_artwork$data = {
  readonly title: string | null | undefined;
  readonly " $fragmentType": "PrivateArtworkMetadata_artwork";
};
export type PrivateArtworkMetadata_artwork$key = {
  readonly " $data"?: PrivateArtworkMetadata_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrivateArtworkMetadata_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PrivateArtworkMetadata_artwork",
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

(node as any).hash = "7ca0f92107ec7eaa86b4f545a355c586";

export default node;
