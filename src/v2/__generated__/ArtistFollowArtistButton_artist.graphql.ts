/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistFollowArtistButton_artist = {
    readonly internalID: string;
    readonly slug: string;
    readonly name: string | null;
    readonly isFollowed: boolean | null;
    readonly " $refType": "ArtistFollowArtistButton_artist";
};
export type ArtistFollowArtistButton_artist$data = ArtistFollowArtistButton_artist;
export type ArtistFollowArtistButton_artist$key = {
    readonly " $data"?: ArtistFollowArtistButton_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistFollowArtistButton_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistFollowArtistButton_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isFollowed",
      "storageKey": null
    }
  ],
  "type": "Artist"
};
(node as any).hash = 'adc4f2ad3e3bcab32b69bba50307d539';
export default node;
