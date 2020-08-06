/* tslint:disable */

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
  "kind": "Fragment",
  "name": "ArtistApp_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "internalID",
      "args": null,
      "storageKey": null
    },
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
      "name": "slug",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtistMeta_artist",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtistHeader_artist",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "NavigationTabs_artist",
      "args": null
    }
  ]
};
(node as any).hash = '8804872230d49a56826f305d90d76385';
export default node;
