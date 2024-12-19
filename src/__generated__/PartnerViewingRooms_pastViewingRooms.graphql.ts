/**
 * @generated SignedSource<<dd12f1ae95ea60deaa8d0bf142e5c32e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type PartnerViewingRooms_pastViewingRooms$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PartnerViewingRoomsGrid_viewingRoomsConnection">
  readonly " $fragmentType": "PartnerViewingRooms_pastViewingRooms"
}
export type PartnerViewingRooms_pastViewingRooms$key = {
  readonly " $data"?: PartnerViewingRooms_pastViewingRooms$data
  readonly " $fragmentSpreads": FragmentRefs<"PartnerViewingRooms_pastViewingRooms">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "PartnerViewingRooms_pastViewingRooms",
  selections: [
    {
      args: [
        {
          kind: "Literal",
          name: "count",
          value: 12,
        },
        {
          kind: "Literal",
          name: "statuses",
          value: ["closed"],
        },
      ],
      kind: "FragmentSpread",
      name: "PartnerViewingRoomsGrid_viewingRoomsConnection",
    },
  ],
  type: "Partner",
  abstractKey: null,
}

;(node as any).hash = "bcdf2b190722f55e98fd53083c7701fa"

export default node
