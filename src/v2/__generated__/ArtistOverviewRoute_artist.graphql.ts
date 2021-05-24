/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistOverviewRoute_artist = {
    readonly " $fragmentRefs": FragmentRefs<"Artist2NotableWorks_artist">;
    readonly " $refType": "ArtistOverviewRoute_artist";
};
export type ArtistOverviewRoute_artist$data = ArtistOverviewRoute_artist;
export type ArtistOverviewRoute_artist$key = {
    readonly " $data"?: ArtistOverviewRoute_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistOverviewRoute_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistOverviewRoute_artist",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Artist2NotableWorks_artist"
    }
  ],
  "type": "Artist"
};
(node as any).hash = '9c9b05a241e6427f8d65e9cdf66c37da';
export default node;
