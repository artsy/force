/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ExampleArtistRoute_artist = {
    readonly name: string | null;
    readonly bio: string | null;
    readonly internalID: string;
    readonly slug: string;
    readonly " $refType": "ExampleArtistRoute_artist";
};
export type ExampleArtistRoute_artist$data = ExampleArtistRoute_artist;
export type ExampleArtistRoute_artist$key = {
    readonly " $data"?: ExampleArtistRoute_artist$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ExampleArtistRoute_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ExampleArtistRoute_artist",
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
      "name": "bio",
      "storageKey": null
    },
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
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
(node as any).hash = 'c3e11e91b699af66a2aeadf0fc2222b3';
export default node;
