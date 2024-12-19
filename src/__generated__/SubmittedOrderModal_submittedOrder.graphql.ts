/**
 * @generated SignedSource<<06c2a887c7da70b5afa9c9be258e4666>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type SubmittedOrderModal_submittedOrder$data = {
  readonly impulseConversationId: string | null | undefined
  readonly stateExpiresAt: string | null | undefined
  readonly " $fragmentType": "SubmittedOrderModal_submittedOrder"
}
export type SubmittedOrderModal_submittedOrder$key = {
  readonly " $data"?: SubmittedOrderModal_submittedOrder$data
  readonly " $fragmentSpreads": FragmentRefs<"SubmittedOrderModal_submittedOrder">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "SubmittedOrderModal_submittedOrder",
  selections: [
    {
      alias: null,
      args: [
        {
          kind: "Literal",
          name: "format",
          value: "MMM D",
        },
      ],
      kind: "ScalarField",
      name: "stateExpiresAt",
      storageKey: 'stateExpiresAt(format:"MMM D")',
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "impulseConversationId",
      storageKey: null,
    },
  ],
  type: "CommerceOrder",
  abstractKey: "__isCommerceOrder",
}

;(node as any).hash = "3ee8ecf521df52e72908c1805d634071"

export default node
