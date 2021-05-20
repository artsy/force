/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FollowArtist2Button_artist = {
    readonly internalID: string;
    readonly slug: string;
    readonly name: string | null;
    readonly isFollowed: boolean | null;
    readonly " $refType": "FollowArtist2Button_artist";
};
export type FollowArtist2Button_artist$data = FollowArtist2Button_artist;
export type FollowArtist2Button_artist$key = {
    readonly " $data"?: FollowArtist2Button_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"FollowArtist2Button_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FollowArtist2Button_artist",
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
(node as any).hash = 'aa58eb033e9579cb71e0dc8b2e067e3e';
export default node;
