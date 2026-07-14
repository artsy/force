/**
 * @generated SignedSource<<3c55efde2af1e3be9497317c38d2b5db>>
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
          "value": 8
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
      "storageKey": "relatedArticles(size:8)"
    }
  ],
  "type": "Article",
  "abstractKey": null
};

(node as any).hash = "f917acf1f9be1d77662137171fa38bb8";

export default node;
