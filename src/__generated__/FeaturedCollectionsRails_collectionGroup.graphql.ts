/**
 * @generated SignedSource<<f393bc722f760eadd506ffde0452ee8e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
export type MarketingCollectionGroupTypeEnum =
  | "ArtistSeries"
  | "FeaturedCollections"
  | "OtherCollections"
  | "%future added value"
import { FragmentRefs } from "relay-runtime"
export type FeaturedCollectionsRails_collectionGroup$data = {
  readonly groupType: MarketingCollectionGroupTypeEnum
  readonly members: ReadonlyArray<{
    readonly internalID: string
    readonly " $fragmentSpreads": FragmentRefs<"FeaturedCollectionRailEntity_member">
  }>
  readonly name: string
  readonly " $fragmentType": "FeaturedCollectionsRails_collectionGroup"
}
export type FeaturedCollectionsRails_collectionGroup$key = {
  readonly " $data"?: FeaturedCollectionsRails_collectionGroup$data
  readonly " $fragmentSpreads": FragmentRefs<"FeaturedCollectionsRails_collectionGroup">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "FeaturedCollectionsRails_collectionGroup",
  selections: [
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "groupType",
      storageKey: null,
    },
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
      concreteType: "MarketingCollection",
      kind: "LinkedField",
      name: "members",
      plural: true,
      selections: [
        {
          args: null,
          kind: "FragmentSpread",
          name: "FeaturedCollectionRailEntity_member",
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
  type: "MarketingCollectionGroup",
  abstractKey: null,
}

;(node as any).hash = "bb7051a528d4544ef943871443932edd"

export default node
