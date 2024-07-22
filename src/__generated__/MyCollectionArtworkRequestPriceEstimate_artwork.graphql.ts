/**
 * @generated SignedSource<<fcfd048cb16027c782b3f2a22c38c8a2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkRequestPriceEstimate_artwork$data = {
  readonly hasPriceEstimateRequest: boolean | null | undefined;
  readonly internalID: string;
  readonly isPriceEstimateRequestable: boolean | null | undefined;
  readonly " $fragmentType": "MyCollectionArtworkRequestPriceEstimate_artwork";
};
export type MyCollectionArtworkRequestPriceEstimate_artwork$key = {
  readonly " $data"?: MyCollectionArtworkRequestPriceEstimate_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkRequestPriceEstimate_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkRequestPriceEstimate_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasPriceEstimateRequest",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isPriceEstimateRequestable",
      "storageKey": null
    },
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

(node as any).hash = "dfde0e4b54e2c3b25cb5aaee2b1d62dd";

export default node;
