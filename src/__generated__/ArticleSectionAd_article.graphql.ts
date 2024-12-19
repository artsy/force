/**
 * @generated SignedSource<<6d13e2dbea4f1276952720d116581712>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
export type ArticleLayout =
  | "CLASSIC"
  | "FEATURE"
  | "NEWS"
  | "SERIES"
  | "STANDARD"
  | "VIDEO"
  | "%future added value"
import { FragmentRefs } from "relay-runtime"
export type ArticleSectionAd_article$data = {
  readonly layout: ArticleLayout
  readonly sections: ReadonlyArray<{
    readonly __typename: string
  }>
  readonly " $fragmentType": "ArticleSectionAd_article"
}
export type ArticleSectionAd_article$key = {
  readonly " $data"?: ArticleSectionAd_article$data
  readonly " $fragmentSpreads": FragmentRefs<"ArticleSectionAd_article">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "ArticleSectionAd_article",
  selections: [
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "layout",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      concreteType: null,
      kind: "LinkedField",
      name: "sections",
      plural: true,
      selections: [
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "__typename",
          storageKey: null,
        },
      ],
      storageKey: null,
    },
  ],
  type: "Article",
  abstractKey: null,
}

;(node as any).hash = "b4afe561e61651706142323e85372e06"

export default node
