/**
 * @generated SignedSource<<65c354ba5c575ee850d6633e2558de1d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type HomeHeroUnits_heroUnits$data = {
  readonly edges:
    | ReadonlyArray<
        | {
            readonly node:
              | {
                  readonly " $fragmentSpreads": FragmentRefs<"HomeHeroUnit_heroUnit">
                }
              | null
              | undefined
          }
        | null
        | undefined
      >
    | null
    | undefined
  readonly " $fragmentType": "HomeHeroUnits_heroUnits"
}
export type HomeHeroUnits_heroUnits$key = {
  readonly " $data"?: HomeHeroUnits_heroUnits$data
  readonly " $fragmentSpreads": FragmentRefs<"HomeHeroUnits_heroUnits">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "HomeHeroUnits_heroUnits",
  selections: [
    {
      alias: null,
      args: null,
      concreteType: "HeroUnitEdge",
      kind: "LinkedField",
      name: "edges",
      plural: true,
      selections: [
        {
          alias: null,
          args: null,
          concreteType: "HeroUnit",
          kind: "LinkedField",
          name: "node",
          plural: false,
          selections: [
            {
              args: null,
              kind: "FragmentSpread",
              name: "HomeHeroUnit_heroUnit",
            },
          ],
          storageKey: null,
        },
      ],
      storageKey: null,
    },
  ],
  type: "HeroUnitConnection",
  abstractKey: null,
}
;(node as any).hash = "529f890beb49b59606acee848d0572f8"

export default node
