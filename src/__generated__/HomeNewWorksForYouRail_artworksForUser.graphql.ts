/**
 * @generated SignedSource<<4d79ea9372dde2a2d98f9365165ad3dc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
export type LabelSignalEnum =
  | "CURATORS_PICK"
  | "INCREASED_INTEREST"
  | "PARTNER_OFFER"
  | "%future added value"
import { FragmentRefs } from "relay-runtime"
export type HomeNewWorksForYouRail_artworksForUser$data = {
  readonly edges:
    | ReadonlyArray<
        | {
            readonly node:
              | {
                  readonly collectorSignals:
                    | {
                        readonly auction:
                          | {
                              readonly bidCount: number
                              readonly lotWatcherCount: number
                            }
                          | null
                          | undefined
                        readonly primaryLabel:
                          | LabelSignalEnum
                          | null
                          | undefined
                      }
                    | null
                    | undefined
                  readonly internalID: string
                  readonly slug: string
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
  readonly " $fragmentType": "HomeNewWorksForYouRail_artworksForUser"
}
export type HomeNewWorksForYouRail_artworksForUser$key = {
  readonly " $data"?: HomeNewWorksForYouRail_artworksForUser$data
  readonly " $fragmentSpreads": FragmentRefs<"HomeNewWorksForYouRail_artworksForUser">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "HomeNewWorksForYouRail_artworksForUser",
  selections: [
    {
      alias: null,
      args: null,
      concreteType: "ArtworkEdge",
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
              concreteType: "CollectorSignals",
              kind: "LinkedField",
              name: "collectorSignals",
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "primaryLabel",
                  storageKey: null,
                },
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
                      name: "bidCount",
                      storageKey: null,
                    },
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
              name: "ShelfArtwork_artwork",
            },
          ],
          storageKey: null,
        },
      ],
      storageKey: null,
    },
  ],
  type: "ArtworkConnection",
  abstractKey: null,
}
;(node as any).hash = "7ad2405a6ef3a266abd7d2d29e32a4fa"

export default node
