/**
 * @generated SignedSource<<0291f6699317f3ea68c806fe54f22d53>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type CollectorProfileHeader_me$data = {
  readonly collectorProfile:
    | {
        readonly confirmedBuyerAt: string | null | undefined
        readonly isIdentityVerified: boolean | null | undefined
      }
    | null
    | undefined
  readonly icon:
    | {
        readonly cropped:
          | {
              readonly src: string
              readonly srcSet: string
            }
          | null
          | undefined
      }
    | null
    | undefined
  readonly initials: string | null | undefined
  readonly location:
    | {
        readonly display: string | null | undefined
      }
    | null
    | undefined
  readonly name: string | null | undefined
  readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileHeaderAvatar_me">
  readonly " $fragmentType": "CollectorProfileHeader_me"
}
export type CollectorProfileHeader_me$key = {
  readonly " $data"?: CollectorProfileHeader_me$data
  readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileHeader_me">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "CollectorProfileHeader_me",
  selections: [
    {
      args: null,
      kind: "FragmentSpread",
      name: "CollectorProfileHeaderAvatar_me",
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "name",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "initials",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      concreteType: "Image",
      kind: "LinkedField",
      name: "icon",
      plural: false,
      selections: [
        {
          alias: null,
          args: [
            {
              kind: "Literal",
              name: "height",
              value: 100,
            },
            {
              kind: "Literal",
              name: "width",
              value: 100,
            },
          ],
          concreteType: "CroppedImageUrl",
          kind: "LinkedField",
          name: "cropped",
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "src",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "srcSet",
              storageKey: null,
            },
          ],
          storageKey: "cropped(height:100,width:100)",
        },
      ],
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      concreteType: "MyLocation",
      kind: "LinkedField",
      name: "location",
      plural: false,
      selections: [
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "display",
          storageKey: null,
        },
      ],
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      concreteType: "CollectorProfileType",
      kind: "LinkedField",
      name: "collectorProfile",
      plural: false,
      selections: [
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "isIdentityVerified",
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "confirmedBuyerAt",
          storageKey: null,
        },
      ],
      storageKey: null,
    },
  ],
  type: "Me",
  abstractKey: null,
}

;(node as any).hash = "d6d20fc6c93d22ce1a5ee96fcfa63d91"

export default node
