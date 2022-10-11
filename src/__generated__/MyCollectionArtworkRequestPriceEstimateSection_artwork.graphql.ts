/**
 * @generated SignedSource<<2f44935c575cd051b45580b5d784d4e0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkRequestPriceEstimateSection_artwork$data = {
  readonly internalID: string;
  readonly " $fragmentType": "MyCollectionArtworkRequestPriceEstimateSection_artwork";
};
export type MyCollectionArtworkRequestPriceEstimateSection_artwork$key = {
  readonly " $data"?: MyCollectionArtworkRequestPriceEstimateSection_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkRequestPriceEstimateSection_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkRequestPriceEstimateSection_artwork",
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

(node as any).hash = "9ef4d69968e461eae380537be1f02b7b";

export default node;
