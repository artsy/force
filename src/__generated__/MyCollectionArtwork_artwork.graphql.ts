/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtwork_artwork = {
    readonly artist: {
        readonly slug: string;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkSidebar_artwork" | "MyCollectionArtworkMeta_artwork">;
    readonly " $refType": "MyCollectionArtwork_artwork";
};
export type MyCollectionArtwork_artwork$data = MyCollectionArtwork_artwork;
export type MyCollectionArtwork_artwork$key = {
    readonly " $data"?: MyCollectionArtwork_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtwork_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtwork_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkSidebar_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkMeta_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = '3637fa23a4efd74e949b2f9ebb3a6d8f';
export default node;
