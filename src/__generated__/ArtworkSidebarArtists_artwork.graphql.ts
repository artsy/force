/**
 * @generated SignedSource<<2ae599763671c1e6647eed397d699d17>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type ArtworkSidebarArtists_artwork$data = {
  readonly artists:
    | ReadonlyArray<
        | {
            readonly name: string | null | undefined
            readonly slug: string
          }
        | null
        | undefined
      >
    | null
    | undefined
  readonly culturalMaker: string | null | undefined
  readonly " $fragmentType": "ArtworkSidebarArtists_artwork"
}
export type ArtworkSidebarArtists_artwork$key = {
  readonly " $data"?: ArtworkSidebarArtists_artwork$data
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarArtists_artwork">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "ArtworkSidebarArtists_artwork",
  selections: [
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "culturalMaker",
      storageKey: null,
    },
    {
      alias: null,
      args: [
        {
          kind: "Literal",
          name: "shallow",
          value: true,
        },
      ],
      concreteType: "Artist",
      kind: "LinkedField",
      name: "artists",
      plural: true,
      selections: [
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
          name: "name",
          storageKey: null,
        },
      ],
      storageKey: "artists(shallow:true)",
    },
  ],
  type: "Artwork",
  abstractKey: null,
}

;(node as any).hash = "12677d888cce99de4bfdfeaf11d48c9f"

export default node
