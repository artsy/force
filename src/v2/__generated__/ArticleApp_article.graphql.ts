/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticleLayout = "CLASSIC" | "FEATURE" | "NEWS" | "SERIES" | "STANDARD" | "VIDEO" | "%future added value";
export type ArticleApp_article = {
    readonly internalID: string;
    readonly title: string | null;
    readonly hero: {
        readonly __typename: string;
    } | null;
    readonly layout: ArticleLayout;
    readonly " $fragmentRefs": FragmentRefs<"ArticleBody_article" | "ArticleSeries_article">;
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
      "concreteType": null,
      "kind": "LinkedField",
      "name": "hero",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        }
      ],
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticleBody_article"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticleSeries_article"
    }
  ],
  "type": "Article",
  "abstractKey": null
};
(node as any).hash = '0c90b412479a2185df8fdcf2d3b11072';
export default node;
