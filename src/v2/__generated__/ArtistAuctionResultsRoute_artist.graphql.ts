/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistAuctionResultsRoute_artist = {
    readonly id: string;
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Artist"
};
(node as any).hash = '1bd0aa92b0a73a9608653355a27f83fc';
export default node;
