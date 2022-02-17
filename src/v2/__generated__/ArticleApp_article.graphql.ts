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
    readonly " $fragmentRefs": FragmentRefs<"ArticleBody_article" | "ArticleSeries_article" | "ArticleVideo_article">;
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
    }
  ],
  "type": "Article",
  "abstractKey": null
};
(node as any).hash = 'b1e639d69f9c6c9168cd17dc250074ed';
export default node;
