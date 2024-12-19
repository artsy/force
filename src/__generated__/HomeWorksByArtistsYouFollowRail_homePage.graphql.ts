/**
 * @generated SignedSource<<027f97f95582e2047c79fc513f905e0d>>
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
export type HomeWorksByArtistsYouFollowRail_homePage$data = {
  readonly artworkModule:
    | {
        readonly results:
          | ReadonlyArray<
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
            >
          | null
          | undefined
      }
    | null
    | undefined
  readonly " $fragmentType": "HomeWorksByArtistsYouFollowRail_homePage"
}
export type HomeWorksByArtistsYouFollowRail_homePage$key = {
  readonly " $data"?: HomeWorksByArtistsYouFollowRail_homePage$data
  readonly " $fragmentSpreads": FragmentRefs<"HomeWorksByArtistsYouFollowRail_homePage">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "HomeWorksByArtistsYouFollowRail_homePage",
  selections: [
    {
      alias: null,
      args: [
        {
          kind: "Literal",
          name: "key",
          value: "FOLLOWED_ARTISTS",
        },
      ],
      concreteType: "HomePageArtworkModule",
      kind: "LinkedField",
      name: "artworkModule",
      plural: false,
      selections: [
        {
          alias: null,
          args: null,
          concreteType: "Artwork",
          kind: "LinkedField",
          name: "results",
          plural: true,
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
      storageKey: 'artworkModule(key:"FOLLOWED_ARTISTS")',
    },
  ],
  type: "HomePage",
  abstractKey: null,
}

;(node as any).hash = "9dae270ffa96af47e03577ba6d4ac907"

export default node
