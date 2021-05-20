/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistShowsRoute_artist = {
    readonly id: string;
    readonly " $refType": "ArtistShowsRoute_artist";
};
export type ArtistShowsRoute_artist$data = ArtistShowsRoute_artist;
export type ArtistShowsRoute_artist$key = {
    readonly " $data"?: ArtistShowsRoute_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistShowsRoute_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistShowsRoute_artist",
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
(node as any).hash = 'eb7429c3836bbdb0da3698a8f574a561';
export default node;
