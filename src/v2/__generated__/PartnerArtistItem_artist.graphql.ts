/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerArtistItem_artist = {
    readonly name: string | null;
    readonly slug: string;
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
    }
  ],
  "type": "Artist"
};
(node as any).hash = '14f7de85ad2d00a048c63aa77be38e77';
export default node;
