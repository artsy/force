/**
 * @generated SignedSource<<e115929e88d7617f3039324a5b7f94b8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type MyCollectionArtworkComparables_artwork$data = {
  readonly artist:
    | {
        readonly name: string | null | undefined
      }
    | null
    | undefined
  readonly auctionResult:
    | {
        readonly edges:
          | ReadonlyArray<
              | {
                  readonly cursor: string
                  readonly node:
                    | {
                        readonly artistID: string
                        readonly internalID: string
                        readonly " $fragmentSpreads": FragmentRefs<"ArtistAuctionResultItem_auctionResult">
                      }
                    | null
                    | undefined
                }
              | null
              | undefined
            >
          | null
          | undefined
      }
    | null
    | undefined
  readonly " $fragmentType": "MyCollectionArtworkComparables_artwork"
}
export type MyCollectionArtworkComparables_artwork$key = {
  readonly " $data"?: MyCollectionArtworkComparables_artwork$data
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkComparables_artwork">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "MyCollectionArtworkComparables_artwork",
  selections: [
    {
      alias: "auctionResult",
      args: [
        {
          kind: "Literal",
          name: "first",
          value: 6,
        },
      ],
      concreteType: "AuctionResultConnection",
      kind: "LinkedField",
      name: "comparableAuctionResults",
      plural: false,
      selections: [
        {
          alias: null,
          args: null,
          concreteType: "AuctionResultEdge",
          kind: "LinkedField",
          name: "edges",
          plural: true,
          selections: [
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "cursor",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "AuctionResult",
              kind: "LinkedField",
              name: "node",
              plural: false,
              selections: [
                {
                  args: null,
                  kind: "FragmentSpread",
                  name: "ArtistAuctionResultItem_auctionResult",
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "artistID",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "internalID",
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
      storageKey: "comparableAuctionResults(first:6)",
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
          name: "name",
          storageKey: null,
        },
      ],
      storageKey: "artist(shallow:true)",
    },
  ],
  type: "Artwork",
  abstractKey: null,
}

;(node as any).hash = "417792b31251c2d2ba0fd6fba8ec9327"

export default node
