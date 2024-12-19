/**
 * @generated SignedSource<<7e72cb49fd61113fc66039b39ffbeda4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type MyCollectionArtworkTitle_artwork$data = {
  readonly artist:
    | {
        readonly href: string | null | undefined
        readonly isPersonalArtist: boolean | null | undefined
      }
    | null
    | undefined
  readonly artistNames: string | null | undefined
  readonly date: string | null | undefined
  readonly title: string | null | undefined
  readonly " $fragmentType": "MyCollectionArtworkTitle_artwork"
}
export type MyCollectionArtworkTitle_artwork$key = {
  readonly " $data"?: MyCollectionArtworkTitle_artwork$data
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkTitle_artwork">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "MyCollectionArtworkTitle_artwork",
  selections: [
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "artistNames",
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
      name: "date",
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
      name: "artist",
      plural: false,
      selections: [
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "href",
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "isPersonalArtist",
          storageKey: null,
        },
      ],
      storageKey: "artist(shallow:true)",
    },
  ],
  type: "Artwork",
  abstractKey: null,
}

;(node as any).hash = "d9953eb3a100ef0b59336ef70de99e60"

export default node
