/**
 * @generated SignedSource<<6ea7e13fb1f2c313e240ba4f99398b4e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SaveArtworkToCollectionsButton_artwork$data = {
  readonly id: string;
  readonly internalID: string;
  readonly is_saved: boolean | null;
  readonly slug: string;
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
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": "is_saved",
      "args": null,
      "kind": "ScalarField",
      "name": "isSaved",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "52cf004ffa08ee0c63874cfeefa12e61";

export default node;
