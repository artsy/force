/**
 * @generated SignedSource<<91b8b9f5797087f6d5cfa58f3fd3be22>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleNewsRelatedArticles_article$data = {
  readonly newsRelatedArticles: ReadonlyArray<{
    readonly internalID: string;
    readonly " $fragmentSpreads": FragmentRefs<"CellArticle_article">;
  }>;
  readonly " $fragmentType": "ArticleNewsRelatedArticles_article";
};
export type ArticleNewsRelatedArticles_article$key = {
  readonly " $data"?: ArticleNewsRelatedArticles_article$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleNewsRelatedArticles_article">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleNewsRelatedArticles_article",
  "selections": [
    {
      "alias": "newsRelatedArticles",
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 3
        }
      ],
      "concreteType": "Article",
      "kind": "LinkedField",
      "name": "relatedArticles",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "CellArticle_article"
        }
      ],
      "storageKey": "relatedArticles(size:3)"
    }
  ],
  "type": "Article",
  "abstractKey": null
};

(node as any).hash = "92d51d42e350f13ba55746b02b032e92";

export default node;
