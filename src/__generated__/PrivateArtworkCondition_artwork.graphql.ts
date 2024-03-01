/**
 * @generated SignedSource<<ae1fe70248c7d9e6031aa929177775b1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrivateArtworkCondition_artwork$data = {
  readonly title: string | null | undefined;
  readonly " $fragmentType": "PrivateArtworkCondition_artwork";
};
export type PrivateArtworkCondition_artwork$key = {
  readonly " $data"?: PrivateArtworkCondition_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrivateArtworkCondition_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PrivateArtworkCondition_artwork",
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

(node as any).hash = "51b29e1c450a6c71bd5d5e53bd94af9a";

export default node;
