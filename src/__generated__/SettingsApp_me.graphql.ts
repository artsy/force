/**
 * @generated SignedSource<<4ee460abc2cdb59208f1cf73d2ee7333>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type SettingsApp_me$data = {
  readonly name: string | null | undefined
  readonly " $fragmentType": "SettingsApp_me"
}
export type SettingsApp_me$key = {
  readonly " $data"?: SettingsApp_me$data
  readonly " $fragmentSpreads": FragmentRefs<"SettingsApp_me">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "SettingsApp_me",
  selections: [
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "name",
      storageKey: null,
    },
  ],
  type: "Me",
  abstractKey: null,
}

;(node as any).hash = "56be5a9c920e4e6f4c10ae60edaeaedc"

export default node
