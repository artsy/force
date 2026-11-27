/**
 * @generated SignedSource<<92f0728a297abb0666276ad95e4b47ac>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistStoryIntro_artist$data = {
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistStoryBiography_artist" | "ArtistStoryPullQuote_artist" | "ArtistStoryRepresentation_artist" | "ArtistStylesAndTechniques_artist">;
  readonly " $fragmentType": "ArtistStoryIntro_artist";
};
export type ArtistStoryIntro_artist$key = {
  readonly " $data"?: ArtistStoryIntro_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistStoryIntro_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistStoryIntro_artist",
  "selections": [
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
      "name": "ArtistStoryPullQuote_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistStoryBiography_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistStylesAndTechniques_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistStoryRepresentation_artist"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "ad28653ed36d98b5edfbe62d15db89c6";

export default node;
