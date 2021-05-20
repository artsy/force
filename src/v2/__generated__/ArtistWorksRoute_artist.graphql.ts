/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistWorksRoute_artist = {
    readonly id: string;
    readonly " $refType": "ArtistWorksRoute_artist";
};
export type ArtistWorksRoute_artist$data = ArtistWorksRoute_artist;
export type ArtistWorksRoute_artist$key = {
    readonly " $data"?: ArtistWorksRoute_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistWorksRoute_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistWorksRoute_artist",
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
(node as any).hash = '8608bc448bb5a2d62faf5fbf6433f321';
export default node;
