/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticleLayout = "CLASSIC" | "FEATURE" | "NEWS" | "SERIES" | "STANDARD" | "VIDEO" | "%future added value";
export type ArticleApp_article = {
    readonly internalID: string;
    readonly title: string | null;
    readonly layout: ArticleLayout;
    readonly channelID: string | null;
    readonly " $fragmentRefs": FragmentRefs<"ArticleBody_article" | "ArticleSeries_article" | "ArticleVideo_article" | "ArticleVisibilityMetadata_article">;
    readonly " $refType": "ArticleApp_article";
};
export type ArticleApp_article$data = ArticleApp_article;
export type ArticleApp_article$key = {
    readonly " $data"?: ArticleApp_article$data;
    readonly " $fragmentRefs": FragmentRefs<"ArticleApp_article">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleApp_article",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "layout",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "channelID",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticleBody_article"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticleSeries_article"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticleVideo_article"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticleVisibilityMetadata_article"
    }
  ],
  "type": "Article",
  "abstractKey": null
};
(node as any).hash = '8aac8f9e3275a0e12b2545b48ce160a3';
export default node;
