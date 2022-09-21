/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UploadPhotos_myCollectionArtwork = {
    readonly internalID: string;
    readonly " $refType": "UploadPhotos_myCollectionArtwork";
};
export type UploadPhotos_myCollectionArtwork$data = UploadPhotos_myCollectionArtwork;
export type UploadPhotos_myCollectionArtwork$key = {
    readonly " $data"?: UploadPhotos_myCollectionArtwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"UploadPhotos_myCollectionArtwork">;
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
(node as any).hash = 'd4227ffb5b0258195c56775669b19c6b';
export default node;
