/**
 * @generated SignedSource<<e2d9298f492869acc2f5ac31fe9834c2>>
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
export type NotificationItem_notification$data = {
  readonly headline: string
  readonly id: string
  readonly internalID: string
  readonly isUnread: boolean
  readonly item:
    | {
        readonly __typename: "PartnerOfferCreatedNotificationItem"
        readonly available: boolean | null | undefined
        readonly expiresAt: string | null | undefined
      }
    | {
        // This will never be '%other', but we need some
        // value in case none of the concrete values match.
        readonly __typename: "%other"
      }
    | null
    | undefined
  readonly message: string
  readonly notificationType: NotificationTypesEnum
  readonly objectsCount: number
  readonly previewImages: ReadonlyArray<{
    readonly blurhashDataURL: string | null | undefined
    readonly internalID: string | null | undefined
    readonly resized:
      | {
          readonly srcSet: string
        }
      | null
      | undefined
  }>
  readonly targetHref: string
  readonly title: string
  readonly " $fragmentSpreads": FragmentRefs<"NotificationTypeLabel_notification">
  readonly " $fragmentType": "NotificationItem_notification"
}
export type NotificationItem_notification$key = {
  readonly " $data"?: NotificationItem_notification$data
  readonly " $fragmentSpreads": FragmentRefs<"NotificationItem_notification">
}

const node: ReaderFragment = (function () {
  var v0 = {
    alias: null,
    args: null,
    kind: "ScalarField",
    name: "internalID",
    storageKey: null,
  }
  return {
    argumentDefinitions: [],
    kind: "Fragment",
    metadata: null,
    name: "NotificationItem_notification",
    selections: [
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "id",
        storageKey: null,
      },
      v0 /*: any*/,
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "headline",
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "message",
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "targetHref",
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "isUnread",
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "notificationType",
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "objectsCount",
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: null,
        kind: "LinkedField",
        name: "item",
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "__typename",
            storageKey: null,
          },
          {
            kind: "InlineFragment",
            selections: [
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "available",
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "expiresAt",
                storageKey: null,
              },
            ],
            type: "PartnerOfferCreatedNotificationItem",
            abstractKey: null,
          },
        ],
        storageKey: null,
      },
      {
        alias: null,
        args: [
          {
            kind: "Literal",
            name: "size",
            value: 4,
          },
        ],
        concreteType: "Image",
        kind: "LinkedField",
        name: "previewImages",
        plural: true,
        selections: [
          v0 /*: any*/,
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "blurhashDataURL",
            storageKey: null,
          },
          {
            alias: null,
            args: [
              {
                kind: "Literal",
                name: "height",
                value: 58,
              },
              {
                kind: "Literal",
                name: "version",
                value: ["main", "normalized", "larger", "large"],
              },
            ],
            concreteType: "ResizedImageUrl",
            kind: "LinkedField",
            name: "resized",
            plural: false,
            selections: [
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "srcSet",
                storageKey: null,
              },
            ],
            storageKey:
              'resized(height:58,version:["main","normalized","larger","large"])',
          },
        ],
        storageKey: "previewImages(size:4)",
      },
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "title",
        storageKey: null,
      },
      {
        args: null,
        kind: "FragmentSpread",
        name: "NotificationTypeLabel_notification",
      },
    ],
    type: "Notification",
    abstractKey: null,
  }
})()
;(node as any).hash = "b2e1725decadccbf37ef770c67b23c96"

export default node
