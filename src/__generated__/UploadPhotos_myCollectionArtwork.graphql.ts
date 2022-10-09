/**
 * @generated SignedSource<<6a5b42ebc7808ed76c6d6158e687c28d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadPhotos_myCollectionArtwork$data = {
  readonly images: ReadonlyArray<{
    readonly url: string | null;
  } | null> | null;
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "images",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": "large"
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:\"large\")"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "cd5ae6aabb31d6b51ab9aa88ea2b680b";

export default node;
