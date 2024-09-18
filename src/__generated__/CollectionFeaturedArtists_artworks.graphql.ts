/**
 * @generated SignedSource<<47d6e05583bec37bea770df5b70cc61e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectionFeaturedArtists_artworks$data = {
  readonly merchandisableArtists: ReadonlyArray<{
    readonly internalID: string;
    readonly name: string | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderArtist_artist">;
  } | null | undefined> | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"DefaultHeader_headerArtworks">;
  readonly " $fragmentType": "CollectionFeaturedArtists_artworks";
};
export type CollectionFeaturedArtists_artworks$key = {
  readonly " $data"?: CollectionFeaturedArtists_artworks$data;
  readonly " $fragmentSpreads": FragmentRefs<"CollectionFeaturedArtists_artworks">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CollectionFeaturedArtists_artworks",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DefaultHeader_headerArtworks"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "merchandisableArtists",
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
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "FilterArtworksConnection",
  "abstractKey": null
};

(node as any).hash = "98bc58a7cfc3ead2d7d01cd401ea8af9";

export default node;
