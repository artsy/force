/**
 * @generated SignedSource<<7623aeb396b50a8a1466e40b22e8aa3e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type ArtistBackLink_artist$data = {
  readonly href: string | null | undefined
  readonly name: string | null | undefined
  readonly " $fragmentType": "ArtistBackLink_artist"
}
export type ArtistBackLink_artist$key = {
  readonly " $data"?: ArtistBackLink_artist$data
  readonly " $fragmentSpreads": FragmentRefs<"ArtistBackLink_artist">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "ArtistBackLink_artist",
  selections: [
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "name",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "href",
      storageKey: null,
    },
  ],
  type: "Artist",
  abstractKey: null,
}

;(node as any).hash = "56e2f9e7fd3479fecafe0222750855ac"

export default node
