/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistAuctionResultsCount_results = {
    readonly totalCount: number | null;
    readonly " $refType": "ArtistAuctionResultsCount_results";
};
export type ArtistAuctionResultsCount_results$data = ArtistAuctionResultsCount_results;
export type ArtistAuctionResultsCount_results$key = {
    readonly " $data"?: ArtistAuctionResultsCount_results$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistAuctionResultsCount_results">;
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
(node as any).hash = 'c6a26630e78d0b6735a7642c4a88ccc8';
export default node;
