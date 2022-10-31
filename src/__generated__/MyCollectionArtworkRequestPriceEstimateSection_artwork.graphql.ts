/**
 * @generated SignedSource<<c1f0444793733026950d4529dfbb869d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkRequestPriceEstimateSection_artwork$data = {
  readonly hasPriceEstimateRequest: boolean | null;
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasPriceEstimateRequest",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "b182aff737e56e79c274c927795fc714";

export default node;
