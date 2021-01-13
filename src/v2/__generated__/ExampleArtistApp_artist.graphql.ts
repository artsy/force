/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ExampleArtistApp_artist = {
    readonly name: string | null;
    readonly bio: string | null;
    readonly internalID: string;
    readonly slug: string;
    readonly " $fragmentRefs": FragmentRefs<"FollowArtistButton_artist">;
    readonly " $refType": "ExampleArtistApp_artist";
};
export type ExampleArtistApp_artist$data = ExampleArtistApp_artist;
export type ExampleArtistApp_artist$key = {
    readonly " $data"?: ExampleArtistApp_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ExampleArtistApp_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ExampleArtistApp_artist",
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FollowArtistButton_artist"
    }
  ],
  "type": "Artist"
};
(node as any).hash = 'b2e9621542c69db4667173720552247b';
export default node;
