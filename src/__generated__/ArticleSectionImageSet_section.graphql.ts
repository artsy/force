/**
 * @generated SignedSource<<50754608f03c3ce8b02ff56c63330d60>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
export type ArticleSectionImageSetLayout =
  | "FULL"
  | "MINI"
  | "%future added value"
import { FragmentRefs } from "relay-runtime"
export type ArticleSectionImageSet_section$data = {
  readonly counts: {
    readonly figures: number
  }
  readonly cover:
    | {
        readonly __typename: "ArticleImageSection"
        readonly id: string
        readonly image:
          | {
              readonly large:
                | {
                    readonly height: number | null | undefined
                    readonly src: string
                    readonly srcSet: string
                    readonly width: number | null | undefined
                  }
                | null
                | undefined
              readonly small:
                | {
                    readonly height: number
                    readonly src: string
                    readonly srcSet: string
                    readonly width: number
                  }
                | null
                | undefined
            }
          | null
          | undefined
      }
    | {
        readonly __typename: "Artwork"
        readonly formattedMetadata: string | null | undefined
        readonly id: string
        readonly image:
          | {
              readonly large:
                | {
                    readonly height: number | null | undefined
                    readonly src: string
                    readonly srcSet: string
                    readonly width: number | null | undefined
                  }
                | null
                | undefined
              readonly small:
                | {
                    readonly height: number
                    readonly src: string
                    readonly srcSet: string
                    readonly width: number
                  }
                | null
                | undefined
            }
          | null
          | undefined
      }
    | {
        // This will never be '%other', but we need some
        // value in case none of the concrete values match.
        readonly __typename: "%other"
      }
    | null
    | undefined
  readonly setLayout: ArticleSectionImageSetLayout
  readonly title: string | null | undefined
  readonly " $fragmentType": "ArticleSectionImageSet_section"
}
export type ArticleSectionImageSet_section$key = {
  readonly " $data"?: ArticleSectionImageSet_section$data
  readonly " $fragmentSpreads": FragmentRefs<"ArticleSectionImageSet_section">
}

const node: ReaderFragment = (function () {
  var v0 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "id",
      storageKey: null,
    },
    v1 = {
      kind: "Literal",
      name: "version",
      value: ["main", "normalized", "larger", "large"],
    },
    v2 = [
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
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "height",
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "width",
        storageKey: null,
      },
    ],
    v3 = {
      alias: null,
      args: null,
      concreteType: "Image",
      kind: "LinkedField",
      name: "image",
      plural: false,
      selections: [
        {
          alias: "small",
          args: [
            {
              kind: "Literal",
              name: "height",
              value: 80,
            },
            v1 /*: any*/,
            {
              kind: "Literal",
              name: "width",
              value: 80,
            },
          ],
          concreteType: "CroppedImageUrl",
          kind: "LinkedField",
          name: "cropped",
          plural: false,
          selections: v2 /*: any*/,
          storageKey:
            'cropped(height:80,version:["main","normalized","larger","large"],width:80)',
        },
        {
          alias: "large",
          args: [
            v1 /*: any*/,
            {
              kind: "Literal",
              name: "width",
              value: 1220,
            },
          ],
          concreteType: "ResizedImageUrl",
          kind: "LinkedField",
          name: "resized",
          plural: false,
          selections: v2 /*: any*/,
          storageKey:
            'resized(version:["main","normalized","larger","large"],width:1220)',
        },
      ],
      storageKey: null,
    }
  return {
    argumentDefinitions: [],
    kind: "Fragment",
    metadata: null,
    name: "ArticleSectionImageSet_section",
    selections: [
      {
        alias: "setLayout",
        args: null,
        kind: "ScalarField",
        name: "layout",
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
        concreteType: "ArticleSectionImageSetCounts",
        kind: "LinkedField",
        name: "counts",
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "figures",
            storageKey: null,
          },
        ],
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: null,
        kind: "LinkedField",
        name: "cover",
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
            selections: [v0 /*: any*/, v3 /*: any*/],
            type: "ArticleImageSection",
            abstractKey: null,
          },
          {
            kind: "InlineFragment",
            selections: [
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "formattedMetadata",
                storageKey: null,
              },
              v0 /*: any*/,
              v3 /*: any*/,
            ],
            type: "Artwork",
            abstractKey: null,
          },
        ],
        storageKey: null,
      },
    ],
    type: "ArticleSectionImageSet",
    abstractKey: null,
  }
})()
;(node as any).hash = "0b40f6fb7b4e2722eb05fbb39490daae"

export default node
