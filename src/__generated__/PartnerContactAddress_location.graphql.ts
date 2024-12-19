/**
 * @generated SignedSource<<a0fdd29db51b0924e32e754f6215ffeb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type PartnerContactAddress_location$data = {
  readonly address: string | null | undefined
  readonly address2: string | null | undefined
  readonly city: string | null | undefined
  readonly displayCountry: string | null | undefined
  readonly phone: string | null | undefined
  readonly postalCode: string | null | undefined
  readonly state: string | null | undefined
  readonly " $fragmentType": "PartnerContactAddress_location"
}
export type PartnerContactAddress_location$key = {
  readonly " $data"?: PartnerContactAddress_location$data
  readonly " $fragmentSpreads": FragmentRefs<"PartnerContactAddress_location">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "PartnerContactAddress_location",
  selections: [
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "city",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "phone",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "state",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "address",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "address2",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "postalCode",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "displayCountry",
      storageKey: null,
    },
  ],
  type: "Location",
  abstractKey: null,
}

;(node as any).hash = "22f6058e36dba8b51303698d218bcc35"

export default node
