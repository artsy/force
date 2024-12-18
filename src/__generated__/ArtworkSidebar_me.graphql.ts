/**
 * @generated SignedSource<<89fc9cb2cd0c8357c4a1a14223596208>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type ArtworkSidebar_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<
    "ArtworkSidebarAuctionInfoPolling_me" | "ArtworkSidebarCommercialButtons_me"
  >
  readonly " $fragmentType": "ArtworkSidebar_me"
}
export type ArtworkSidebar_me$key = {
  readonly " $data"?: ArtworkSidebar_me$data
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebar_me">
}

const node: ReaderFragment = {
  argumentDefinitions: [
    {
      defaultValue: null,
      kind: "LocalArgument",
      name: "artworkID",
    },
  ],
  kind: "Fragment",
  metadata: null,
  name: "ArtworkSidebar_me",
  selections: [
    {
      args: null,
      kind: "FragmentSpread",
      name: "ArtworkSidebarAuctionInfoPolling_me",
    },
    {
      args: [
        {
          kind: "Variable",
          name: "artworkID",
          variableName: "artworkID",
        },
      ],
      kind: "FragmentSpread",
      name: "ArtworkSidebarCommercialButtons_me",
    },
  ],
  type: "Me",
  abstractKey: null,
}
;(node as any).hash = "5a9e74e1db52124de96cafa0b1db4ec1"

export default node
