/**
 * @generated SignedSource<<968bacab6e7c4f5fc78304493bb9ffec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadPhotos_myCollectionArtwork$data = {
  readonly internalID: string;
  readonly " $fragmentType": "UploadPhotos_myCollectionArtwork";
};
export type UploadPhotos_myCollectionArtwork$key = {
  readonly " $data"?: UploadPhotos_myCollectionArtwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"UploadPhotos_myCollectionArtwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UploadPhotos_myCollectionArtwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "d4227ffb5b0258195c56775669b19c6b";

export default node;
