/**
 * @generated SignedSource<<9892d2e9a3e86aa95a348df5858556b0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type ArtworkActionsSaveButton_artwork$data = {
  readonly artistNames: string | null | undefined
  readonly collectorSignals:
    | {
        readonly auction:
          | {
              readonly lotWatcherCount: number
            }
          | null
          | undefined
      }
    | null
    | undefined
  readonly date: string | null | undefined
  readonly id: string
  readonly internalID: string
  readonly isInAuction: boolean | null | undefined
  readonly isSavedToAnyList: boolean
  readonly preview:
    | {
        readonly url: string | null | undefined
      }
    | null
    | undefined
  readonly sale:
    | {
        readonly isAuction: boolean | null | undefined
        readonly isClosed: boolean | null | undefined
      }
    | null
    | undefined
  readonly slug: string
  readonly title: string | null | undefined
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkActionsWatchLotButton_artwork">
  readonly " $fragmentType": "ArtworkActionsSaveButton_artwork"
}
export type ArtworkActionsSaveButton_artwork$key = {
  readonly " $data"?: ArtworkActionsSaveButton_artwork$data
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkActionsSaveButton_artwork">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "ArtworkActionsSaveButton_artwork",
  selections: [
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
      kind: "ScalarField",
      name: "internalID",
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
      name: "date",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "artistNames",
      storageKey: null,
    },
    {
      alias: "preview",
      args: null,
      concreteType: "Image",
      kind: "LinkedField",
      name: "image",
      plural: false,
      selections: [
        {
          alias: null,
          args: [
            {
              kind: "Literal",
              name: "version",
              value: "square",
            },
          ],
          kind: "ScalarField",
          name: "url",
          storageKey: 'url(version:"square")',
        },
      ],
      storageKey: null,
    },
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
      name: "isSavedToAnyList",
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
          name: "isAuction",
          storageKey: null,
        },
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
    {
      alias: null,
      args: null,
      concreteType: "CollectorSignals",
      kind: "LinkedField",
      name: "collectorSignals",
      plural: false,
      selections: [
        {
          alias: null,
          args: null,
          concreteType: "AuctionCollectorSignals",
          kind: "LinkedField",
          name: "auction",
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "lotWatcherCount",
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
      storageKey: null,
    },
    {
      args: null,
      kind: "FragmentSpread",
      name: "ArtworkActionsWatchLotButton_artwork",
    },
  ],
  type: "Artwork",
  abstractKey: null,
}
;(node as any).hash = "b50234ce16a1f2b1b40a96f2b0c7810e"

export default node
