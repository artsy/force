/**
 * @generated SignedSource<<a17f0f21d67ccdfdf3b9f225bcbca2ad>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarArtists_artwork$data = {
  readonly artists: ReadonlyArray<{
    readonly internalID: string;
    readonly name: string | null;
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderArtist_artist">;
  } | null> | null;
  readonly culturalMaker: string | null;
  readonly " $fragmentType": "ArtworkSidebarArtists_artwork";
};
export type ArtworkSidebarArtists_artwork$key = {
  readonly " $data"?: ArtworkSidebarArtists_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarArtists_artwork">;
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "EntityHeaderArtist_artist"
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "02f86e63433eee7f88516a49cc679259";

export default node;
