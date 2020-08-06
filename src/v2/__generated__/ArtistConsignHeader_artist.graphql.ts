/* tslint:disable */

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
  "kind": "Fragment",
  "name": "ArtistConsignHeader_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "href",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtistConsignHeaderImages_artist",
      "args": null
    }
  ]
};
(node as any).hash = '7d3a03283b2d243183694c0120190387';
export default node;
