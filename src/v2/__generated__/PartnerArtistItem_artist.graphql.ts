/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerArtistItem_artist = {
    readonly name: string | null;
    readonly slug: string;
    readonly href: string | null;
    readonly " $refType": "PartnerArtistItem_artist";
};
export type PartnerArtistItem_artist$data = PartnerArtistItem_artist;
export type PartnerArtistItem_artist$key = {
    readonly " $data"?: PartnerArtistItem_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"PartnerArtistItem_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnerArtistItem_artist",
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
      "name": "slug",
      "storageKey": null
    },
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
(node as any).hash = 'a7c7f0ed6a2189fa59092da9a63f33ce';
export default node;
