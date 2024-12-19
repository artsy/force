/**
 * @generated SignedSource<<7047a64746b47245c7c234bcf8db961e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type PartnerViewingRooms_upcomingViewingRooms$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PartnerViewingRoomsGrid_viewingRoomsConnection">
  readonly " $fragmentType": "PartnerViewingRooms_upcomingViewingRooms"
}
export type PartnerViewingRooms_upcomingViewingRooms$key = {
  readonly " $data"?: PartnerViewingRooms_upcomingViewingRooms$data
  readonly " $fragmentSpreads": FragmentRefs<"PartnerViewingRooms_upcomingViewingRooms">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "PartnerViewingRooms_upcomingViewingRooms",
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
          value: ["scheduled"],
        },
      ],
      kind: "FragmentSpread",
      name: "PartnerViewingRoomsGrid_viewingRoomsConnection",
    },
  ],
  type: "Partner",
  abstractKey: null,
}

;(node as any).hash = "403ac2caf990407be85df44dea5f81a1"

export default node
