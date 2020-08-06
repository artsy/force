/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionResultsCount_results = {
    readonly totalCount: number | null;
    readonly " $refType": "AuctionResultsCount_results";
};
export type AuctionResultsCount_results$data = AuctionResultsCount_results;
export type AuctionResultsCount_results$key = {
    readonly " $data"?: AuctionResultsCount_results$data;
    readonly " $fragmentRefs": FragmentRefs<"AuctionResultsCount_results">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "AuctionResultsCount_results",
  "type": "AuctionResultConnection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "totalCount",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = 'b7cf8e974b1ff36d00728045da16d9eb';
export default node;
