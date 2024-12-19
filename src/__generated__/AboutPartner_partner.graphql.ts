/**
 * @generated SignedSource<<0f634ef3981d999d367116898c79330d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type AboutPartner_partner$data = {
  readonly displayFullPartnerPage: boolean | null | undefined
  readonly internalID: string
  readonly profile:
    | {
        readonly bio: string | null | undefined
        readonly fullBio: string | null | undefined
      }
    | null
    | undefined
  readonly slug: string
  readonly website: string | null | undefined
  readonly " $fragmentType": "AboutPartner_partner"
}
export type AboutPartner_partner$key = {
  readonly " $data"?: AboutPartner_partner$data
  readonly " $fragmentSpreads": FragmentRefs<"AboutPartner_partner">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "AboutPartner_partner",
  selections: [
    {
      alias: null,
      args: null,
      concreteType: "Profile",
      kind: "LinkedField",
      name: "profile",
      plural: false,
      selections: [
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "fullBio",
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "bio",
          storageKey: null,
        },
      ],
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "website",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "displayFullPartnerPage",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "slug",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "internalID",
      storageKey: null,
    },
  ],
  type: "Partner",
  abstractKey: null,
}

;(node as any).hash = "48fd8a29b95f6e51c15885780b5e5241"

export default node
