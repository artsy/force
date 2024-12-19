/**
 * @generated SignedSource<<8685e16d56371e4c326b41e704147c2c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type HoverDetails_artwork$data = {
  readonly attributionClass:
    | {
        readonly name: string | null | undefined
      }
    | null
    | undefined
  readonly internalID: string
  readonly mediumType:
    | {
        readonly filterGene:
          | {
              readonly name: string | null | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
  readonly " $fragmentType": "HoverDetails_artwork"
}
export type HoverDetails_artwork$key = {
  readonly " $data"?: HoverDetails_artwork$data
  readonly " $fragmentSpreads": FragmentRefs<"HoverDetails_artwork">
}

const node: ReaderFragment = (function () {
  var v0 = [
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "name",
      storageKey: null,
    },
  ]
  return {
    argumentDefinitions: [],
    kind: "Fragment",
    metadata: null,
    name: "HoverDetails_artwork",
    selections: [
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
        concreteType: "AttributionClass",
        kind: "LinkedField",
        name: "attributionClass",
        plural: false,
        selections: v0 /*: any*/,
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: "ArtworkMedium",
        kind: "LinkedField",
        name: "mediumType",
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            concreteType: "Gene",
            kind: "LinkedField",
            name: "filterGene",
            plural: false,
            selections: v0 /*: any*/,
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ],
    type: "Artwork",
    abstractKey: null,
  }
})()

;(node as any).hash = "a38dd2db0f35df2d65cfbb27cdb6e4f8"

export default node
