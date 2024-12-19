/**
 * @generated SignedSource<<e756fbbd1042a25be3eee68b179dc0ae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type ArticleZoomGalleryFigure_figure$data =
  | {
      readonly __typename: "ArticleImageSection"
      readonly image:
        | {
            readonly height: number | null | undefined
            readonly url: string | null | undefined
            readonly width: number | null | undefined
          }
        | null
        | undefined
      readonly " $fragmentType": "ArticleZoomGalleryFigure_figure"
    }
  | {
      readonly __typename: "ArticleUnpublishedArtwork"
      readonly image:
        | {
            readonly height: number | null | undefined
            readonly url: string | null | undefined
            readonly width: number | null | undefined
          }
        | null
        | undefined
      readonly " $fragmentType": "ArticleZoomGalleryFigure_figure"
    }
  | {
      readonly __typename: "Artwork"
      readonly formattedMetadata: string | null | undefined
      readonly image:
        | {
            readonly height: number | null | undefined
            readonly url: string | null | undefined
            readonly width: number | null | undefined
          }
        | null
        | undefined
      readonly " $fragmentType": "ArticleZoomGalleryFigure_figure"
    }
  | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other"
      readonly " $fragmentType": "ArticleZoomGalleryFigure_figure"
    }
export type ArticleZoomGalleryFigure_figure$key = {
  readonly " $data"?: ArticleZoomGalleryFigure_figure$data
  readonly " $fragmentSpreads": FragmentRefs<"ArticleZoomGalleryFigure_figure">
}

const node: ReaderFragment = (function () {
  var v0 = {
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
          name: "width",
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
          args: [
            {
              kind: "Literal",
              name: "version",
              value: ["main", "normalized", "larger", "large"],
            },
          ],
          kind: "ScalarField",
          name: "url",
          storageKey: 'url(version:["main","normalized","larger","large"])',
        },
      ],
      storageKey: null,
    },
    v1 = [v0 /*: any*/]
  return {
    argumentDefinitions: [],
    kind: "Fragment",
    metadata: null,
    name: "ArticleZoomGalleryFigure_figure",
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
            name: "formattedMetadata",
            storageKey: null,
          },
          v0 /*: any*/,
        ],
        type: "Artwork",
        abstractKey: null,
      },
      {
        kind: "InlineFragment",
        selections: v1 /*: any*/,
        type: "ArticleImageSection",
        abstractKey: null,
      },
      {
        kind: "InlineFragment",
        selections: v1 /*: any*/,
        type: "ArticleUnpublishedArtwork",
        abstractKey: null,
      },
    ],
    type: "ArticleSectionImageCollectionFigure",
    abstractKey: "__isArticleSectionImageCollectionFigure",
  }
})()

;(node as any).hash = "9d914d82af1b09440d1985f142459215"

export default node
