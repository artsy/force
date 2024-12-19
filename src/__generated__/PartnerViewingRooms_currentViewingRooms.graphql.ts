/**
 * @generated SignedSource<<261ed36d7b130ee126f63c4231f09283>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type PartnerViewingRooms_currentViewingRooms$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PartnerViewingRoomsGrid_viewingRoomsConnection">
  readonly " $fragmentType": "PartnerViewingRooms_currentViewingRooms"
}
export type PartnerViewingRooms_currentViewingRooms$key = {
  readonly " $data"?: PartnerViewingRooms_currentViewingRooms$data
  readonly " $fragmentSpreads": FragmentRefs<"PartnerViewingRooms_currentViewingRooms">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "PartnerViewingRooms_currentViewingRooms",
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
          value: ["live"],
        },
      ],
      kind: "FragmentSpread",
      name: "PartnerViewingRoomsGrid_viewingRoomsConnection",
    },
  ],
  type: "Partner",
  abstractKey: null,
}

;(node as any).hash = "df312313346c979df009f2d7eab1eb16"

export default node
