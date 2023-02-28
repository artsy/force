/**
 * @generated SignedSource<<199b188239dc5a5fab37cc4d40aa2afe>>
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
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "93085fc6832969056fb4a32fa1c27345";

export default node;
