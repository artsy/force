/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Artist2AuctionResultsRoute_artist = {
    readonly " $fragmentRefs": FragmentRefs<"Artist2AuctionResults_artist">;
    readonly " $refType": "Artist2AuctionResultsRoute_artist";
};
export type Artist2AuctionResultsRoute_artist$data = Artist2AuctionResultsRoute_artist;
export type Artist2AuctionResultsRoute_artist$key = {
    readonly " $data"?: Artist2AuctionResultsRoute_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"Artist2AuctionResultsRoute_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Artist2AuctionResultsRoute_artist",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Artist2AuctionResults_artist"
    }
  ],
  "type": "Artist"
};
(node as any).hash = 'a65f4a2a6335c0cdbc9bab7dfeec613f';
export default node;
