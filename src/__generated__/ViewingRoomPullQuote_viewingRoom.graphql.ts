/**
 * @generated SignedSource<<e1147ad48d1c385e4c41044ac073b82a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type ViewingRoomPullQuote_viewingRoom$data = {
  readonly pullQuote: string | null | undefined
  readonly " $fragmentType": "ViewingRoomPullQuote_viewingRoom"
}
export type ViewingRoomPullQuote_viewingRoom$key = {
  readonly " $data"?: ViewingRoomPullQuote_viewingRoom$data
  readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomPullQuote_viewingRoom">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "ViewingRoomPullQuote_viewingRoom",
  selections: [
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "pullQuote",
      storageKey: null,
    },
  ],
  type: "ViewingRoom",
  abstractKey: null,
}
;(node as any).hash = "69ccb558158ea6f401e3263146f93fd2"

export default node
