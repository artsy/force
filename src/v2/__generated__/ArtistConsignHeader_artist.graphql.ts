/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistConsignHeader_artist = {
    readonly name: string | null;
    readonly href: string | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtistConsignHeaderImages_artist">;
    readonly " $refType": "ArtistConsignHeader_artist";
};
export type ArtistConsignHeader_artist$data = ArtistConsignHeader_artist;
export type ArtistConsignHeader_artist$key = {
    readonly " $data"?: ArtistConsignHeader_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistConsignHeader_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistConsignHeader_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistConsignHeaderImages_artist"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
(node as any).hash = '7d3a03283b2d243183694c0120190387';
export default node;
