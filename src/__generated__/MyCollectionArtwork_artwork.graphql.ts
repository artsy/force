/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtwork_artwork = {
    readonly internalID: string;
    readonly artist: {
        readonly slug: string;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkSidebar_artwork" | "MyCollectionArtworkMeta_artwork" | "ArtworkImageBrowser_artwork" | "MyCollectionArtworkDemandIndex_artwork" | "MyCollectionArtworkComparables_artwork">;
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
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkImageBrowser_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkDemandIndex_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkComparables_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = '4f22cfe7e9d1ffc3fba92c5f60f38630';
export default node;
