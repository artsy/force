/**
 * @generated SignedSource<<d5d56d613c45a343e960014f43c6df3c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleSection_section$data = {
  readonly __typename: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleSectionEmbed_section" | "ArticleSectionImageCollection_section" | "ArticleSectionImageSet_section" | "ArticleSectionSocialEmbed_section" | "ArticleSectionText_section" | "ArticleSectionVideo_section">;
  readonly " $fragmentType": "ArticleSection_section";
};
export type ArticleSection_section$key = {
  readonly " $data"?: ArticleSection_section$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleSection_section">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleSection_section",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticleSectionText_section"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticleSectionImageCollection_section"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticleSectionImageSet_section"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticleSectionVideo_section"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticleSectionSocialEmbed_section"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticleSectionEmbed_section"
    }
  ],
  "type": "ArticleSections",
  "abstractKey": "__isArticleSections"
};

(node as any).hash = "24cd95cca65d5e8c03983d43a5f2284c";

export default node;
