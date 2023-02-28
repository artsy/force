/**
 * @generated SignedSource<<3ab93710aa8ee1daaa76b880e0310da1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SaveArtworkToCollectionsButton_artwork$data = {
  readonly date: string | null;
  readonly internalID: string;
  readonly title: string | null;
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
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "date",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "0d7de12c63590e6d751b1d6150187420";

export default node;
