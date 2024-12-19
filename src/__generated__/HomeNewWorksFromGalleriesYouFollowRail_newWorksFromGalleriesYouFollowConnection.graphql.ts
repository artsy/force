/**
 * @generated SignedSource<<fa1ed4b83e51098aa0b57c6dfa4c970f>>
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
export type HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection$data =
  {
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
    readonly " $fragmentType": "HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection"
  }
export type HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection$key =
  {
    readonly " $data"?: HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection$data
    readonly " $fragmentSpreads": FragmentRefs<"HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection">
  }

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection",
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

;(node as any).hash = "3bf93b648ab8593d6352179d90429d90"

export default node
