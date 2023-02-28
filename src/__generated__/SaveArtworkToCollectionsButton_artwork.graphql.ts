/**
 * @generated SignedSource<<286aa49185f4d7e88b61d9ff694c8db9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SaveArtworkToCollectionsButton_artwork$data = {
  readonly internalID: string;
  readonly isSaved: boolean | null;
  readonly " $fragmentType": "SaveArtworkToCollectionsButton_artwork";
};
export type SaveArtworkToCollectionsButton_artwork$key = {
  readonly " $data"?: SaveArtworkToCollectionsButton_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"SaveArtworkToCollectionsButton_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SaveArtworkToCollectionsButton_artwork",
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
      "kind": "ScalarField",
      "name": "isSaved",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "1d1a0127dbd9de81bac5c85679900617";

export default node;
