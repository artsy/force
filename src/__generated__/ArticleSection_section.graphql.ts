/**
 * @generated SignedSource<<737d537f912009a6a366ba30100d9f0a>>
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
  readonly " $fragmentSpreads": FragmentRefs<"ArticleSectionEmbed_section" | "ArticleSectionImageCollection_section" | "ArticleSectionImageSet_section" | "ArticleSectionMarketingCollection_section" | "ArticleSectionSocialEmbed_section" | "ArticleSectionText_section" | "ArticleSectionVideo_section">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticleSectionMarketingCollection_section"
    }
  ],
  "type": "ArticleSections",
  "abstractKey": "__isArticleSections"
};

(node as any).hash = "8c1fa49d7909f7f84a0d74d9068e7d7b";

export default node;
