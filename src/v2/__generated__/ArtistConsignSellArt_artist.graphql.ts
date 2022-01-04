/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistConsignSellArt_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
(node as any).hash = 'f8a4b742046a7803e249bd34780a6c50';
export default node;
