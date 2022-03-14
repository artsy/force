/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticleMetaTags_article = {
    readonly byline: string | null;
    readonly href: string | null;
    readonly keywords: ReadonlyArray<string>;
    readonly metaPublishedAt: string | null;
    readonly title: string | null;
    readonly " $refType": "ArticleMetaTags_article";
};
export type ArticleMetaTags_article$data = ArticleMetaTags_article;
export type ArticleMetaTags_article$key = {
    readonly " $data"?: ArticleMetaTags_article$data;
    readonly " $fragmentRefs": FragmentRefs<"ArticleMetaTags_article">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleMetaTags_article",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "byline",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "keywords",
      "storageKey": null
    },
    {
      "alias": "metaPublishedAt",
      "args": null,
      "kind": "ScalarField",
      "name": "publishedAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "Article",
  "abstractKey": null
};
(node as any).hash = '92dd8b2d44941c30fa8be9f8a6f83398';
export default node;
