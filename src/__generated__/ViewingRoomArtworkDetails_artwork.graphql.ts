/**
 * @generated SignedSource<<4f1f40f034c20fc62142e27f9fe51d5a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type ViewingRoomArtworkDetails_artwork$data = {
  readonly additionalInformation: string | null | undefined
  readonly href: string | null | undefined
  readonly id: string
  readonly " $fragmentSpreads": FragmentRefs<"Details_artwork">
  readonly " $fragmentType": "ViewingRoomArtworkDetails_artwork"
}
export type ViewingRoomArtworkDetails_artwork$key = {
  readonly " $data"?: ViewingRoomArtworkDetails_artwork$data
  readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomArtworkDetails_artwork">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "ViewingRoomArtworkDetails_artwork",
  selections: [
    {
      args: null,
      kind: "FragmentSpread",
      name: "Details_artwork",
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
      args: [
        {
          kind: "Literal",
          name: "format",
          value: "HTML",
        },
      ],
      kind: "ScalarField",
      name: "additionalInformation",
      storageKey: 'additionalInformation(format:"HTML")',
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "href",
      storageKey: null,
    },
  ],
  type: "Artwork",
  abstractKey: null,
}
;(node as any).hash = "3b3a6e9691afbea139a7535e098981e2"

export default node
