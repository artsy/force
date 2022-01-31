/**
 * @generated SignedSource<<c76cf23b9fc0de227765f35cd6e901c8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistAuctionResultsCount_results$data = {
  readonly totalCount: number | null;
  readonly " $fragmentType": "ArtistAuctionResultsCount_results";
};
export type ArtistAuctionResultsCount_results$key = {
  readonly " $data"?: ArtistAuctionResultsCount_results$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistAuctionResultsCount_results">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistAuctionResultsCount_results",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalCount",
      "storageKey": null
    }
  ],
  "type": "AuctionResultConnection",
  "abstractKey": null
};

(node as any).hash = "c6a26630e78d0b6735a7642c4a88ccc8";

export default node;
