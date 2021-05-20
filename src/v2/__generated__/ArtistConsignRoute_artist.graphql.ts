/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistConsignRoute_artist = {
    readonly id: string;
    readonly " $refType": "ArtistConsignRoute_artist";
};
export type ArtistConsignRoute_artist$data = ArtistConsignRoute_artist;
export type ArtistConsignRoute_artist$key = {
    readonly " $data"?: ArtistConsignRoute_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistConsignRoute_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistConsignRoute_artist",
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
(node as any).hash = '811841dded19e67c883db4a44088a0b5';
export default node;
