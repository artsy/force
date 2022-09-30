/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarArtists_artwork = {
    readonly culturalMaker: string | null;
    readonly artists: ReadonlyArray<{
        readonly internalID: string;
        readonly slug: string;
        readonly name: string | null;
        readonly " $fragmentRefs": FragmentRefs<"EntityHeaderArtist_artist">;
    } | null> | null;
    readonly " $refType": "ArtworkSidebarArtists_artwork";
};
export type ArtworkSidebarArtists_artwork$data = ArtworkSidebarArtists_artwork;
export type ArtworkSidebarArtists_artwork$key = {
    readonly " $data"?: ArtworkSidebarArtists_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarArtists_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarArtists_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "culturalMaker",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artists",
      "plural": true,
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "EntityHeaderArtist_artist"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = '02f86e63433eee7f88516a49cc679259';
export default node;
