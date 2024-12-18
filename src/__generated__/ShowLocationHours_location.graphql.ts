/**
 * @generated SignedSource<<34edbb4fe326ae3afdcd822f8f74404a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type ShowLocationHours_location$data = {
  readonly openingHours:
    | {
        readonly schedules?:
          | ReadonlyArray<
              | {
                  readonly days: string | null | undefined
                  readonly hours: string | null | undefined
                }
              | null
              | undefined
            >
          | null
          | undefined
        readonly text?: string | null | undefined
      }
    | null
    | undefined
  readonly " $fragmentType": "ShowLocationHours_location"
}
export type ShowLocationHours_location$key = {
  readonly " $data"?: ShowLocationHours_location$data
  readonly " $fragmentSpreads": FragmentRefs<"ShowLocationHours_location">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "ShowLocationHours_location",
  selections: [
    {
      alias: null,
      args: null,
      concreteType: null,
      kind: "LinkedField",
      name: "openingHours",
      plural: false,
      selections: [
        {
          kind: "InlineFragment",
          selections: [
            {
              alias: null,
              args: null,
              concreteType: "FormattedDaySchedules",
              kind: "LinkedField",
              name: "schedules",
              plural: true,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "days",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "hours",
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
          ],
          type: "OpeningHoursArray",
          abstractKey: null,
        },
        {
          kind: "InlineFragment",
          selections: [
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "text",
              storageKey: null,
            },
          ],
          type: "OpeningHoursText",
          abstractKey: null,
        },
      ],
      storageKey: null,
    },
  ],
  type: "Location",
  abstractKey: null,
}
;(node as any).hash = "9d72ce84b277694788a1013b451f42a7"

export default node
