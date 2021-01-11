/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ExampleArtistApp_artist = {
    readonly name: string | null;
    readonly bio: string | null;
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
    }
  ],
  "type": "Artist"
};
(node as any).hash = '1736a7aec46011c3688a62e88ccaf568';
export default node;
