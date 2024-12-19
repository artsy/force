/**
 * @generated SignedSource<<62e7c8236b3d0a92b9c04205dde34af9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type HomeAuctionLotsForYouRail_artworksForUser$data = {
  readonly edges:
    | ReadonlyArray<
        | {
            readonly node:
              | {
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
  readonly " $fragmentType": "HomeAuctionLotsForYouRail_artworksForUser"
}
export type HomeAuctionLotsForYouRail_artworksForUser$key = {
  readonly " $data"?: HomeAuctionLotsForYouRail_artworksForUser$data
  readonly " $fragmentSpreads": FragmentRefs<"HomeAuctionLotsForYouRail_artworksForUser">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "HomeAuctionLotsForYouRail_artworksForUser",
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

;(node as any).hash = "bdac1f2188daaaece5f32666e68ac598"

export default node
