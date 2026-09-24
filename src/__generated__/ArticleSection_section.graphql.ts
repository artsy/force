/**
 * @generated SignedSource<<129e505a7dc23ef417016c6684f9995e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleSection_section$data = {
  readonly __typename: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleSectionArtworkGrid_section" | "ArticleSectionEmbed_section" | "ArticleSectionImageCollection_section" | "ArticleSectionImageSet_section" | "ArticleSectionSocialEmbed_section" | "ArticleSectionText_section" | "ArticleSectionVideo_section">;
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
      "name": "ArticleSectionArtworkGrid_section"
    }
  ],
  "type": "ArticleSections",
  "abstractKey": "__isArticleSections"
};

(node as any).hash = "8555d4715d5644358f969f2918772a19";

export default node;
