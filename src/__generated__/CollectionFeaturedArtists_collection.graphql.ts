/**
 * @generated SignedSource<<6ac38919a2a4c2299be601ce52534305>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type CollectionFeaturedArtists_collection$data = {
  readonly category: string
  readonly credit: string | null | undefined
  readonly description: string | null | undefined
  readonly featuredArtistExclusionIds: ReadonlyArray<string>
  readonly headerImage: string | null | undefined
  readonly id: string
  readonly query: {
    readonly artistIDs:
      | ReadonlyArray<string | null | undefined>
      | null
      | undefined
  }
  readonly showFeaturedArtists: boolean
  readonly showHeaderArtworksRail: boolean
  readonly slug: string
  readonly title: string
  readonly " $fragmentType": "CollectionFeaturedArtists_collection"
}
export type CollectionFeaturedArtists_collection$key = {
  readonly " $data"?: CollectionFeaturedArtists_collection$data
  readonly " $fragmentSpreads": FragmentRefs<"CollectionFeaturedArtists_collection">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "CollectionFeaturedArtists_collection",
  selections: [
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "category",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "credit",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "description",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "featuredArtistExclusionIds",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "headerImage",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "id",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      concreteType: "MarketingCollectionQuery",
      kind: "LinkedField",
      name: "query",
      plural: false,
      selections: [
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "artistIDs",
          storageKey: null,
        },
      ],
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "slug",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "title",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "showHeaderArtworksRail",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "showFeaturedArtists",
      storageKey: null,
    },
  ],
  type: "MarketingCollection",
  abstractKey: null,
}

;(node as any).hash = "55ba07fcb356c9da66f689907a3cb025"

export default node
