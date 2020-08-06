/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistConsignSellArt_artist = {
    readonly href: string | null;
    readonly " $refType": "ArtistConsignSellArt_artist";
};
export type ArtistConsignSellArt_artist$data = ArtistConsignSellArt_artist;
export type ArtistConsignSellArt_artist$key = {
    readonly " $data"?: ArtistConsignSellArt_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistConsignSellArt_artist">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtistConsignSellArt_artist",
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
(node as any).hash = 'f8a4b742046a7803e249bd34780a6c50';
export default node;
