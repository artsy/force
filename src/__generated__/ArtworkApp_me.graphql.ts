/**
 * @generated SignedSource<<9f17a8695597a2cdb8cd5242f3481bfe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type ArtworkApp_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<
    "ArtworkPageBanner_me" | "ArtworkSidebar_me"
  >
  readonly " $fragmentType": "ArtworkApp_me"
}
export type ArtworkApp_me$key = {
  readonly " $data"?: ArtworkApp_me$data
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkApp_me">
}

const node: ReaderFragment = (function () {
  var v0 = [
    {
      kind: "Variable",
      name: "artworkID",
      variableName: "artworkID",
    },
  ]
  return {
    argumentDefinitions: [
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "artworkID",
      },
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "loadSidebar",
      },
    ],
    kind: "Fragment",
    metadata: null,
    name: "ArtworkApp_me",
    selections: [
      {
        condition: "loadSidebar",
        kind: "Condition",
        passingValue: true,
        selections: [
          {
            args: v0 /*: any*/,
            kind: "FragmentSpread",
            name: "ArtworkSidebar_me",
          },
        ],
      },
      {
        args: v0 /*: any*/,
        kind: "FragmentSpread",
        name: "ArtworkPageBanner_me",
      },
    ],
    type: "Me",
    abstractKey: null,
  }
})()
;(node as any).hash = "6b6741bf6376caa6102bd169272cfe18"

export default node
