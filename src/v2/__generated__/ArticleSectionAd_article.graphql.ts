/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticleLayout = "CLASSIC" | "FEATURE" | "NEWS" | "SERIES" | "STANDARD" | "VIDEO" | "%future added value";
export type ArticleSectionAd_article = {
    readonly layout: ArticleLayout;
    readonly " $refType": "ArticleSectionAd_article";
};
export type ArticleSectionAd_article$data = ArticleSectionAd_article;
export type ArticleSectionAd_article$key = {
    readonly " $data"?: ArticleSectionAd_article$data;
    readonly " $fragmentRefs": FragmentRefs<"ArticleSectionAd_article">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleSectionAd_article",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "layout",
      "storageKey": null
    }
  ],
  "type": "Article",
  "abstractKey": null
};
(node as any).hash = 'bf8201b32500fd5b723b483827cc2feb';
export default node;
