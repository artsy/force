/**
 * @generated SignedSource<<527ef06244df5bdc283225ee349658db>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type ArtworkListEmptyState_me$data = {
  readonly artworkList:
    | {
        readonly default: boolean
      }
    | null
    | undefined
  readonly savedArtworksArtworkList:
    | {
        readonly artworksCount: number
      }
    | null
    | undefined
  readonly " $fragmentType": "ArtworkListEmptyState_me"
}
export type ArtworkListEmptyState_me$key = {
  readonly " $data"?: ArtworkListEmptyState_me$data
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkListEmptyState_me">
}

const node: ReaderFragment = {
  argumentDefinitions: [
    {
      defaultValue: null,
      kind: "LocalArgument",
      name: "listID",
    },
  ],
  kind: "Fragment",
  metadata: null,
  name: "ArtworkListEmptyState_me",
  selections: [
    {
      alias: "artworkList",
      args: [
        {
          kind: "Variable",
          name: "id",
          variableName: "listID",
        },
      ],
      concreteType: "Collection",
      kind: "LinkedField",
      name: "collection",
      plural: false,
      selections: [
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "default",
          storageKey: null,
        },
      ],
      storageKey: null,
    },
    {
      alias: "savedArtworksArtworkList",
      args: [
        {
          kind: "Literal",
          name: "id",
          value: "saved-artwork",
        },
      ],
      concreteType: "Collection",
      kind: "LinkedField",
      name: "collection",
      plural: false,
      selections: [
        {
          alias: null,
          args: [
            {
              kind: "Literal",
              name: "onlyVisible",
              value: true,
            },
          ],
          kind: "ScalarField",
          name: "artworksCount",
          storageKey: "artworksCount(onlyVisible:true)",
        },
      ],
      storageKey: 'collection(id:"saved-artwork")',
    },
  ],
  type: "Me",
  abstractKey: null,
}
;(node as any).hash = "826da11b7f2e3121cb0b6f3ff39f96e2"

export default node
