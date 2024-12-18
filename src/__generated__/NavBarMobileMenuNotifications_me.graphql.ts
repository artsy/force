/**
 * @generated SignedSource<<d2b8a29f4e509772e99d1d442996ac9e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type NavBarMobileMenuNotifications_me$data = {
  readonly unreadConversationCount: number
  readonly unreadNotificationsCount: number
  readonly unseenNotificationsCount: number
  readonly " $fragmentType": "NavBarMobileMenuNotifications_me"
}
export type NavBarMobileMenuNotifications_me$key = {
  readonly " $data"?: NavBarMobileMenuNotifications_me$data
  readonly " $fragmentSpreads": FragmentRefs<"NavBarMobileMenuNotifications_me">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "NavBarMobileMenuNotifications_me",
  selections: [
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "unreadNotificationsCount",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "unreadConversationCount",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "unseenNotificationsCount",
      storageKey: null,
    },
  ],
  type: "Me",
  abstractKey: null,
}
;(node as any).hash = "edc8de2d253d1ce56d8c58bfb45abe93"

export default node
