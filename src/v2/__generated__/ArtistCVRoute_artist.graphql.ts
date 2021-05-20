/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistCVRoute_artist = {
    readonly id: string;
    readonly " $refType": "ArtistCVRoute_artist";
};
export type ArtistCVRoute_artist$data = ArtistCVRoute_artist;
export type ArtistCVRoute_artist$key = {
    readonly " $data"?: ArtistCVRoute_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistCVRoute_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistCVRoute_artist",
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
(node as any).hash = '37aaca23f368a77dc6d765d9eb35f600';
export default node;
