/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistAuctionResultsRoute_artist = {
    readonly " $fragmentRefs": FragmentRefs<"ArtistAuctionResults_artist">;
    readonly " $refType": "ArtistAuctionResultsRoute_artist";
};
export type ArtistAuctionResultsRoute_artist$data = ArtistAuctionResultsRoute_artist;
export type ArtistAuctionResultsRoute_artist$key = {
    readonly " $data"?: ArtistAuctionResultsRoute_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistAuctionResultsRoute_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistAuctionResultsRoute_artist",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistAuctionResults_artist"
    }
  ],
  "type": "Artist"
};
(node as any).hash = '2f6e0f0cb311e09a182ae087b8b29773';
export default node;
