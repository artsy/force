/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistApp_artist = {
    readonly internalID: string;
    readonly name: string | null;
    readonly slug: string;
    readonly " $fragmentRefs": FragmentRefs<"ArtistMeta_artist" | "ArtistHeader_artist" | "NavigationTabs_artist">;
    readonly " $refType": "ArtistApp_artist";
};
export type ArtistApp_artist$data = ArtistApp_artist;
export type ArtistApp_artist$key = {
    readonly " $data"?: ArtistApp_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistApp_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistApp_artist",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistMeta_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistHeader_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NavigationTabs_artist"
    }
  ],
  "type": "Artist"
};
(node as any).hash = '8804872230d49a56826f305d90d76385';
export default node;
