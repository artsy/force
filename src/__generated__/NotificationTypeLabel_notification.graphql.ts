/**
 * @generated SignedSource<<fe5fc9c8450100e7317c46d230660bef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
export type NotificationTypesEnum =
  | "ARTICLE_FEATURED_ARTIST"
  | "ARTWORK_ALERT"
  | "ARTWORK_PUBLISHED"
  | "COLLECTOR_PROFILE_UPDATE_PROMPT"
  | "PARTNER_OFFER_CREATED"
  | "PARTNER_SHOW_OPENED"
  | "VIEWING_ROOM_PUBLISHED"
  | "%future added value"
import { FragmentRefs } from "relay-runtime"
export type NotificationTypeLabel_notification$data = {
  readonly notificationType: NotificationTypesEnum
  readonly publishedAt: string
  readonly " $fragmentType": "NotificationTypeLabel_notification"
}
export type NotificationTypeLabel_notification$key = {
  readonly " $data"?: NotificationTypeLabel_notification$data
  readonly " $fragmentSpreads": FragmentRefs<"NotificationTypeLabel_notification">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "NotificationTypeLabel_notification",
  selections: [
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "notificationType",
      storageKey: null,
    },
    {
      alias: null,
      args: [
        {
          kind: "Literal",
          name: "format",
          value: "RELATIVE",
        },
      ],
      kind: "ScalarField",
      name: "publishedAt",
      storageKey: 'publishedAt(format:"RELATIVE")',
    },
  ],
  type: "Notification",
  abstractKey: null,
}

;(node as any).hash = "52bcd60ea5a79df4acce2794cad4b2d7"

export default node
