/**
 * @generated SignedSource<<a3212a3a996660679ac43f72623c000c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type MockRelayRendererFixtures_artist$data = {
  readonly name: string | null | undefined
  readonly " $fragmentType": "MockRelayRendererFixtures_artist"
}
export type MockRelayRendererFixtures_artist$key = {
  readonly " $data"?: MockRelayRendererFixtures_artist$data
  readonly " $fragmentSpreads": FragmentRefs<"MockRelayRendererFixtures_artist">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "MockRelayRendererFixtures_artist",
  selections: [
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "name",
      storageKey: null,
    },
  ],
  type: "Artist",
  abstractKey: null,
}
;(node as any).hash = "00923700fab4960aafc6cd20281ef191"

export default node
