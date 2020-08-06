/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistConsignHowToSell_artist = {
    readonly href: string | null;
    readonly " $refType": "ArtistConsignHowToSell_artist";
};
export type ArtistConsignHowToSell_artist$data = ArtistConsignHowToSell_artist;
export type ArtistConsignHowToSell_artist$key = {
    readonly " $data"?: ArtistConsignHowToSell_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistConsignHowToSell_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistConsignHowToSell_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    }
  ],
  "type": "Artist"
};
(node as any).hash = '4c7974a321e83d875e6ce77d5ea43b66';
export default node;
