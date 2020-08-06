/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Articles_artist = {
    readonly " $fragmentRefs": FragmentRefs<"ArtistArticles_artist">;
    readonly " $refType": "Articles_artist";
};
export type Articles_artist$data = Articles_artist;
export type Articles_artist$key = {
    readonly " $data"?: Articles_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"Articles_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Articles_artist",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistArticles_artist"
    }
  ],
  "type": "Artist"
};
(node as any).hash = '98d755e5b63a5214bafae8262897cdab';
export default node;
