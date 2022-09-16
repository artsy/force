/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UploadPhotos_myCollectionArtworkSubmissionPhotos = {
    readonly internalID: string;
    readonly " $refType": "UploadPhotos_myCollectionArtworkSubmissionPhotos";
};
export type UploadPhotos_myCollectionArtworkSubmissionPhotos$data = UploadPhotos_myCollectionArtworkSubmissionPhotos;
export type UploadPhotos_myCollectionArtworkSubmissionPhotos$key = {
    readonly " $data"?: UploadPhotos_myCollectionArtworkSubmissionPhotos$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"UploadPhotos_myCollectionArtworkSubmissionPhotos">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UploadPhotos_myCollectionArtworkSubmissionPhotos",
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
(node as any).hash = '05f9825536218e49be1839855ce04151';
export default node;
