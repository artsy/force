/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Artist2AuctionResultsCount_results = {
    readonly totalCount: number | null;
    readonly " $refType": "Artist2AuctionResultsCount_results";
};
export type Artist2AuctionResultsCount_results$data = Artist2AuctionResultsCount_results;
export type Artist2AuctionResultsCount_results$key = {
    readonly " $data"?: Artist2AuctionResultsCount_results$data;
    readonly " $fragmentRefs": FragmentRefs<"Artist2AuctionResultsCount_results">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Artist2AuctionResultsCount_results",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalCount",
      "storageKey": null
    }
  ],
  "type": "AuctionResultConnection"
};
(node as any).hash = '7f881458fdafd34a97e60f2d5b3f30b9';
export default node;
