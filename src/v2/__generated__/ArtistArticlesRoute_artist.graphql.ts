/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistArticlesRoute_artist = {
    readonly id: string;
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
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Artist"
};
(node as any).hash = '5d85355d2663c27db3bf72e18213946a';
export default node;
