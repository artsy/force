/**
 * @generated SignedSource<<5b8f2908f3b10464ace72e68b3071094>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type ArtworkSidebarLinks_artwork$data = {
  readonly isInAuction: boolean | null | undefined
  readonly isUnlisted: boolean
  readonly sale:
    | {
        readonly isClosed: boolean | null | undefined
      }
    | null
    | undefined
  readonly " $fragmentType": "ArtworkSidebarLinks_artwork"
}
export type ArtworkSidebarLinks_artwork$key = {
  readonly " $data"?: ArtworkSidebarLinks_artwork$data
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarLinks_artwork">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "ArtworkSidebarLinks_artwork",
  selections: [
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "isInAuction",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "isUnlisted",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      concreteType: "Sale",
      kind: "LinkedField",
      name: "sale",
      plural: false,
      selections: [
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "isClosed",
          storageKey: null,
        },
      ],
      storageKey: null,
    },
  ],
  type: "Artwork",
  abstractKey: null,
}

;(node as any).hash = "0cc65c8e5acddce9a389310a694c086d"

export default node
