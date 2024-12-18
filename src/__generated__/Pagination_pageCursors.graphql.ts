/**
 * @generated SignedSource<<835d2213f403df4f455ffa8c812e4ea7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type Pagination_pageCursors$data = {
  readonly around: ReadonlyArray<{
    readonly cursor: string
    readonly isCurrent: boolean
    readonly page: number
  }>
  readonly first:
    | {
        readonly cursor: string
        readonly isCurrent: boolean
        readonly page: number
      }
    | null
    | undefined
  readonly last:
    | {
        readonly cursor: string
        readonly isCurrent: boolean
        readonly page: number
      }
    | null
    | undefined
  readonly previous:
    | {
        readonly cursor: string
        readonly page: number
      }
    | null
    | undefined
  readonly " $fragmentType": "Pagination_pageCursors"
}
export type Pagination_pageCursors$key = {
  readonly " $data"?: Pagination_pageCursors$data
  readonly " $fragmentSpreads": FragmentRefs<"Pagination_pageCursors">
}

const node: ReaderFragment = (function () {
  var v0 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "cursor",
      storageKey: null,
    },
    v1 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "page",
      storageKey: null,
    },
    v2 = [
      v0 /*: any*/,
      v1 /*: any*/,
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "isCurrent",
        storageKey: null,
      },
    ]
  return {
    argumentDefinitions: [],
    kind: "Fragment",
    metadata: null,
    name: "Pagination_pageCursors",
    selections: [
      {
        alias: null,
        args: null,
        concreteType: "PageCursor",
        kind: "LinkedField",
        name: "around",
        plural: true,
        selections: v2 /*: any*/,
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: "PageCursor",
        kind: "LinkedField",
        name: "first",
        plural: false,
        selections: v2 /*: any*/,
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: "PageCursor",
        kind: "LinkedField",
        name: "last",
        plural: false,
        selections: v2 /*: any*/,
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: "PageCursor",
        kind: "LinkedField",
        name: "previous",
        plural: false,
        selections: [v0 /*: any*/, v1 /*: any*/],
        storageKey: null,
      },
    ],
    type: "PageCursors",
    abstractKey: null,
  }
})()
;(node as any).hash = "72b4f72005e64de70ab045755aaaec79"

export default node
