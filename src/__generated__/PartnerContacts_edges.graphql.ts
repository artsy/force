/**
 * @generated SignedSource<<e042b6c08eadf9ee7c5ddd641d0dca30>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type PartnerContacts_edges$data = ReadonlyArray<{
  readonly node:
    | {
        readonly id: string
        readonly " $fragmentSpreads": FragmentRefs<"PartnerContactCard_location">
      }
    | null
    | undefined
  readonly " $fragmentType": "PartnerContacts_edges"
}>
export type PartnerContacts_edges$key = ReadonlyArray<{
  readonly " $data"?: PartnerContacts_edges$data
  readonly " $fragmentSpreads": FragmentRefs<"PartnerContacts_edges">
}>

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: {
    plural: true,
  },
  name: "PartnerContacts_edges",
  selections: [
    {
      alias: null,
      args: null,
      concreteType: "Location",
      kind: "LinkedField",
      name: "node",
      plural: false,
      selections: [
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "id",
          storageKey: null,
        },
        {
          args: null,
          kind: "FragmentSpread",
          name: "PartnerContactCard_location",
        },
      ],
      storageKey: null,
    },
  ],
  type: "LocationEdge",
  abstractKey: null,
}

;(node as any).hash = "af0d7a85ad8f8b54b7edeb3589f41ff3"

export default node
