/* tslint:disable */

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
  "kind": "Fragment",
  "name": "ArtistConsignHowToSell_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "href",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '4c7974a321e83d875e6ce77d5ea43b66';
export default node;
