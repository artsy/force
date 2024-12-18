/**
 * @generated SignedSource<<0174642308fb3e1128a359fed0a71351>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type TagApp_tag$data = {
  readonly name: string | null | undefined
  readonly " $fragmentSpreads": FragmentRefs<"TagMeta_tag">
  readonly " $fragmentType": "TagApp_tag"
}
export type TagApp_tag$key = {
  readonly " $data"?: TagApp_tag$data
  readonly " $fragmentSpreads": FragmentRefs<"TagApp_tag">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "TagApp_tag",
  selections: [
    {
      args: null,
      kind: "FragmentSpread",
      name: "TagMeta_tag",
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "name",
      storageKey: null,
    },
  ],
  type: "Tag",
  abstractKey: null,
}
;(node as any).hash = "c3fa05401742f7dffb327c1f5cd3c66b"

export default node
