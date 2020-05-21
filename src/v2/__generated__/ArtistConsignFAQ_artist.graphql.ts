/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistConsignFAQ_artist = {
    readonly href: string | null;
    readonly " $refType": "ArtistConsignFAQ_artist";
};
export type ArtistConsignFAQ_artist$data = ArtistConsignFAQ_artist;
export type ArtistConsignFAQ_artist$key = {
    readonly " $data"?: ArtistConsignFAQ_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistConsignFAQ_artist">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtistConsignFAQ_artist",
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
(node as any).hash = '47a1b13d640815b4ba8a092d0a1bf991';
export default node;
