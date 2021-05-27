/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistArticlesRoute_artist = {
    readonly name: string | null;
    readonly " $refType": "ArtistArticlesRoute_artist";
};
export type ArtistArticlesRoute_artist$data = ArtistArticlesRoute_artist;
export type ArtistArticlesRoute_artist$key = {
    readonly " $data"?: ArtistArticlesRoute_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistArticlesRoute_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistArticlesRoute_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Artist"
};
(node as any).hash = '57e07f1d51528dac9d1e0a617cc05c0e';
export default node;
