/**
 * @generated SignedSource<<4fd59568618353521c432c27123634ef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type CollectionFeaturedArtists_artworks$data = {
  readonly merchandisableArtists:
    | ReadonlyArray<
        | {
            readonly internalID: string
            readonly name: string | null | undefined
            readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderArtist_artist">
          }
        | null
        | undefined
      >
    | null
    | undefined
  readonly " $fragmentType": "CollectionFeaturedArtists_artworks"
}
export type CollectionFeaturedArtists_artworks$key = {
  readonly " $data"?: CollectionFeaturedArtists_artworks$data
  readonly " $fragmentSpreads": FragmentRefs<"CollectionFeaturedArtists_artworks">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "CollectionFeaturedArtists_artworks",
  selections: [
    {
      alias: null,
      args: null,
      concreteType: "Artist",
      kind: "LinkedField",
      name: "merchandisableArtists",
      plural: true,
      selections: [
        {
          args: null,
          kind: "FragmentSpread",
          name: "EntityHeaderArtist_artist",
        },
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "internalID",
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "name",
          storageKey: null,
        },
      ],
      storageKey: null,
    },
  ],
  type: "FilterArtworksConnection",
  abstractKey: null,
}

;(node as any).hash = "27993f0811b89471360629fe78cb6b78"

export default node
