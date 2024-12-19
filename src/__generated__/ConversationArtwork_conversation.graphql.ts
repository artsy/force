/**
 * @generated SignedSource<<f0f57b4184566065a8971e3653bd5a09>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type ConversationArtwork_conversation$data = {
  readonly items:
    | ReadonlyArray<
        | {
            readonly item:
              | {
                  readonly __typename: "Artwork"
                  readonly artist:
                    | {
                        readonly name: string | null | undefined
                        readonly slug: string
                      }
                    | null
                    | undefined
                  readonly date: string | null | undefined
                  readonly id: string
                  readonly image:
                    | {
                        readonly url: string | null | undefined
                      }
                    | null
                    | undefined
                  readonly isUnlisted: boolean
                  readonly slug: string
                  readonly title: string | null | undefined
                }
              | {
                  // This will never be '%other', but we need some
                  // value in case none of the concrete values match.
                  readonly __typename: "%other"
                }
              | null
              | undefined
          }
        | null
        | undefined
      >
    | null
    | undefined
  readonly " $fragmentType": "ConversationArtwork_conversation"
}
export type ConversationArtwork_conversation$key = {
  readonly " $data"?: ConversationArtwork_conversation$data
  readonly " $fragmentSpreads": FragmentRefs<"ConversationArtwork_conversation">
}

const node: ReaderFragment = (function () {
  var v0 = {
    alias: null,
    args: null,
    kind: "ScalarField",
    name: "slug",
    storageKey: null,
  }
  return {
    argumentDefinitions: [],
    kind: "Fragment",
    metadata: null,
    name: "ConversationArtwork_conversation",
    selections: [
      {
        alias: null,
        args: null,
        concreteType: "ConversationItem",
        kind: "LinkedField",
        name: "items",
        plural: true,
        selections: [
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
                    name: "id",
                    storageKey: null,
                  },
                  v0 /*: any*/,
                  {
                    alias: null,
                    args: null,
                    kind: "ScalarField",
                    name: "date",
                    storageKey: null,
                  },
                  {
                    alias: null,
                    args: null,
                    kind: "ScalarField",
                    name: "title",
                    storageKey: null,
                  },
                  {
                    alias: null,
                    args: null,
                    kind: "ScalarField",
                    name: "isUnlisted",
                    storageKey: null,
                  },
                  {
                    alias: null,
                    args: [
                      {
                        kind: "Literal",
                        name: "shallow",
                        value: true,
                      },
                    ],
                    concreteType: "Artist",
                    kind: "LinkedField",
                    name: "artist",
                    plural: false,
                    selections: [
                      {
                        alias: null,
                        args: null,
                        kind: "ScalarField",
                        name: "name",
                        storageKey: null,
                      },
                      v0 /*: any*/,
                    ],
                    storageKey: "artist(shallow:true)",
                  },
                  {
                    alias: null,
                    args: null,
                    concreteType: "Image",
                    kind: "LinkedField",
                    name: "image",
                    plural: false,
                    selections: [
                      {
                        alias: null,
                        args: null,
                        kind: "ScalarField",
                        name: "url",
                        storageKey: null,
                      },
                    ],
                    storageKey: null,
                  },
                ],
                type: "Artwork",
                abstractKey: null,
              },
            ],
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ],
    type: "Conversation",
    abstractKey: null,
  }
})()

;(node as any).hash = "d568eca96b80e4746eb666f85a15b317"

export default node
