/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ExampleArtworkApp_artwork = {
    readonly title: string | null;
    readonly artistNames: string | null;
    readonly medium: string | null;
    readonly imageUrl: string | null;
    readonly date: string | null;
    readonly " $refType": "ExampleArtworkApp_artwork";
};
export type ExampleArtworkApp_artwork$data = ExampleArtworkApp_artwork;
export type ExampleArtworkApp_artwork$key = {
    readonly " $data"?: ExampleArtworkApp_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ExampleArtworkApp_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ExampleArtworkApp_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artistNames",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "medium",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "imageUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "date",
      "storageKey": null
    }
  ],
  "type": "Artwork"
};
(node as any).hash = 'e0ae5bf54054ddf8c161829bedfb7b12';
export default node;
