/**
 * @generated SignedSource<<2bc9130d56097dbfa6de1122195e28a5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type RegistrationAuctionTimer_sale$data = {
  readonly isRegistrationClosed: boolean | null | undefined
  readonly registrationEndsAt: string | null | undefined
  readonly " $fragmentType": "RegistrationAuctionTimer_sale"
}
export type RegistrationAuctionTimer_sale$key = {
  readonly " $data"?: RegistrationAuctionTimer_sale$data
  readonly " $fragmentSpreads": FragmentRefs<"RegistrationAuctionTimer_sale">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "RegistrationAuctionTimer_sale",
  selections: [
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "registrationEndsAt",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "isRegistrationClosed",
      storageKey: null,
    },
  ],
  type: "Sale",
  abstractKey: null,
}
;(node as any).hash = "1e67b75b8ca7cbd2948580649814ac6f"

export default node
