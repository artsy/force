/**
 * @generated SignedSource<<9570ea8edf642663cb853a2ce56d9f4a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type AuctionWorksByFollowedArtistsRail_viewer$data = {
  readonly saleArtworksConnection:
    | {
        readonly edges:
          | ReadonlyArray<
              | {
                  readonly node:
                    | {
                        readonly " $fragmentSpreads": FragmentRefs<"ShelfArtwork_artwork">
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
  readonly " $fragmentType": "AuctionWorksByFollowedArtistsRail_viewer"
}
export type AuctionWorksByFollowedArtistsRail_viewer$key = {
  readonly " $data"?: AuctionWorksByFollowedArtistsRail_viewer$data
  readonly " $fragmentSpreads": FragmentRefs<"AuctionWorksByFollowedArtistsRail_viewer">
}

const node: ReaderFragment = {
  argumentDefinitions: [
    {
      defaultValue: null,
      kind: "LocalArgument",
      name: "saleID",
    },
  ],
  kind: "Fragment",
  metadata: null,
  name: "AuctionWorksByFollowedArtistsRail_viewer",
  selections: [
    {
      alias: null,
      args: [
        {
          kind: "Literal",
          name: "aggregations",
          value: ["TOTAL"],
        },
        {
          kind: "Literal",
          name: "first",
          value: 30,
        },
        {
          kind: "Literal",
          name: "includeArtworksByFollowedArtists",
          value: true,
        },
        {
          kind: "Variable",
          name: "saleSlug",
          variableName: "saleID",
        },
      ],
      concreteType: "SaleArtworksConnection",
      kind: "LinkedField",
      name: "saleArtworksConnection",
      plural: false,
      selections: [
        {
          alias: null,
          args: null,
          concreteType: "SaleArtwork",
          kind: "LinkedField",
          name: "edges",
          plural: true,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: "Artwork",
              kind: "LinkedField",
              name: "node",
              plural: false,
              selections: [
                {
                  args: null,
                  kind: "FragmentSpread",
                  name: "ShelfArtwork_artwork",
                },
              ],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
      storageKey: null,
    },
  ],
  type: "Viewer",
  abstractKey: null,
}

;(node as any).hash = "c755e53cbd05926d9ddb2ca0768ae288"

export default node
