/**
 * @generated SignedSource<<1f5530314489689740dadde688ae2dd1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type ConversationStatusWithCounter_order$data =
  | {
      readonly formattedStateExpiresAt: string | null | undefined
      readonly stateExpiresAt: string
      readonly stateUpdatedAt: string
      readonly " $fragmentType": "ConversationStatusWithCounter_order"
    }
  | null
  | undefined
export type ConversationStatusWithCounter_order$key = {
  readonly " $data"?: ConversationStatusWithCounter_order$data
  readonly " $fragmentSpreads": FragmentRefs<"ConversationStatusWithCounter_order">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "ConversationStatusWithCounter_order",
  selections: [
    {
      kind: "RequiredField",
      field: {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "stateExpiresAt",
        storageKey: null,
      },
      action: "NONE",
    },
    {
      kind: "RequiredField",
      field: {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "stateUpdatedAt",
        storageKey: null,
      },
      action: "NONE",
    },
    {
      alias: "formattedStateExpiresAt",
      args: [
        {
          kind: "Literal",
          name: "format",
          value: "MMM D, h:mm A zz",
        },
      ],
      kind: "ScalarField",
      name: "stateExpiresAt",
      storageKey: 'stateExpiresAt(format:"MMM D, h:mm A zz")',
    },
  ],
  type: "CommerceOrder",
  abstractKey: "__isCommerceOrder",
}
;(node as any).hash = "44238dc969213f2c55d2b51279bbf736"

export default node
