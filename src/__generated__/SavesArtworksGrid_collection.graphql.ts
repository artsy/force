/**
 * @generated SignedSource<<6b2f30431e24ae63758a0d21f0344856>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavesArtworksGrid_collection$data = {
  readonly internalID: string;
  readonly " $fragmentSpreads": FragmentRefs<"SavesEmptyState_collection">;
  readonly " $fragmentType": "SavesArtworksGrid_collection";
};
export type SavesArtworksGrid_collection$key = {
  readonly " $data"?: SavesArtworksGrid_collection$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavesArtworksGrid_collection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavesArtworksGrid_collection",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SavesEmptyState_collection"
    }
  ],
  "type": "Collection",
  "abstractKey": null
};

(node as any).hash = "a93efb118b9dc31160609f6e3103bf15";

export default node;
