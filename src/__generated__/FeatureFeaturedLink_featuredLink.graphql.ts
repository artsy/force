/**
 * @generated SignedSource<<f82741da387f867ae36e4cdde16ecdf3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type FeatureFeaturedLink_featuredLink$data = {
  readonly description: string | null | undefined
  readonly href: string | null | undefined
  readonly image:
    | {
        readonly full:
          | {
              readonly height: number | null | undefined
              readonly src: string
              readonly srcSet: string
              readonly width: number | null | undefined
            }
          | null
          | undefined
        readonly large:
          | {
              readonly height: number
              readonly src: string
              readonly srcSet: string
              readonly width: number
            }
          | null
          | undefined
        readonly medium:
          | {
              readonly height: number
              readonly src: string
              readonly srcSet: string
              readonly width: number
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
  readonly subtitle: string | null | undefined
  readonly title: string | null | undefined
  readonly " $fragmentType": "FeatureFeaturedLink_featuredLink"
}
export type FeatureFeaturedLink_featuredLink$key = {
  readonly " $data"?: FeatureFeaturedLink_featuredLink$data
  readonly " $fragmentSpreads": FragmentRefs<"FeatureFeaturedLink_featuredLink">
}

const node: ReaderFragment = (function () {
  var v0 = {
      kind: "Literal",
      name: "version",
      value: ["main", "wide"],
    },
    v1 = [
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
    ]
  return {
    argumentDefinitions: [],
    kind: "Fragment",
    metadata: null,
    name: "FeatureFeaturedLink_featuredLink",
    selections: [
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "href",
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
        args: [
          {
            kind: "Literal",
            name: "format",
            value: "PLAIN",
          },
        ],
        kind: "ScalarField",
        name: "subtitle",
        storageKey: 'subtitle(format:"PLAIN")',
      },
      {
        alias: null,
        args: [
          {
            kind: "Literal",
            name: "format",
            value: "HTML",
          },
        ],
        kind: "ScalarField",
        name: "description",
        storageKey: 'description(format:"HTML")',
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
            alias: "small",
            args: [
              {
                kind: "Literal",
                name: "height",
                value: 480,
              },
              v0 /*: any*/,
              {
                kind: "Literal",
                name: "width",
                value: 670,
              },
            ],
            concreteType: "CroppedImageUrl",
            kind: "LinkedField",
            name: "cropped",
            plural: false,
            selections: v1 /*: any*/,
            storageKey: 'cropped(height:480,version:["main","wide"],width:670)',
          },
          {
            alias: "medium",
            args: [
              {
                kind: "Literal",
                name: "height",
                value: 648,
              },
              v0 /*: any*/,
              {
                kind: "Literal",
                name: "width",
                value: 904,
              },
            ],
            concreteType: "CroppedImageUrl",
            kind: "LinkedField",
            name: "cropped",
            plural: false,
            selections: v1 /*: any*/,
            storageKey: 'cropped(height:648,version:["main","wide"],width:904)',
          },
          {
            alias: "large",
            args: [
              {
                kind: "Literal",
                name: "height",
                value: 1296,
              },
              v0 /*: any*/,
              {
                kind: "Literal",
                name: "width",
                value: 1808,
              },
            ],
            concreteType: "CroppedImageUrl",
            kind: "LinkedField",
            name: "cropped",
            plural: false,
            selections: v1 /*: any*/,
            storageKey:
              'cropped(height:1296,version:["main","wide"],width:1808)',
          },
          {
            alias: "full",
            args: [
              {
                kind: "Literal",
                name: "height",
                value: 1554,
              },
              v0 /*: any*/,
              {
                kind: "Literal",
                name: "width",
                value: 2170,
              },
            ],
            concreteType: "ResizedImageUrl",
            kind: "LinkedField",
            name: "resized",
            plural: false,
            selections: v1 /*: any*/,
            storageKey:
              'resized(height:1554,version:["main","wide"],width:2170)',
          },
        ],
        storageKey: null,
      },
    ],
    type: "FeaturedLink",
    abstractKey: null,
  }
})()
;(node as any).hash = "dc8251bf0c9af03ee0eef2b21aa1221b"

export default node
