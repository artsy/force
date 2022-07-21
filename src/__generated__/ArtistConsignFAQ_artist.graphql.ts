/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistConsignFAQ_artist = {
    readonly href: string | null;
    readonly " $refType": "ArtistConsignFAQ_artist";
};
export type ArtistConsignFAQ_artist$data = ArtistConsignFAQ_artist;
export type ArtistConsignFAQ_artist$key = {
    readonly " $data"?: ArtistConsignFAQ_artist$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtistConsignFAQ_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistConsignFAQ_artist",
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
(node as any).hash = '47a1b13d640815b4ba8a092d0a1bf991';
export default node;
