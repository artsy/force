/**
 * @generated SignedSource<<4b176b96e56056c24f3d6f84a381b876>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleVerticalRelatedArticles_article$data = {
  readonly vertical: string | null | undefined;
  readonly verticalRelatedArticles: ReadonlyArray<{
    readonly internalID: string;
    readonly " $fragmentSpreads": FragmentRefs<"CellArticle_article">;
  }>;
  readonly " $fragmentType": "ArticleVerticalRelatedArticles_article";
};
export type ArticleVerticalRelatedArticles_article$key = {
  readonly " $data"?: ArticleVerticalRelatedArticles_article$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleVerticalRelatedArticles_article">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleVerticalRelatedArticles_article",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "vertical",
      "storageKey": null
    },
    {
      "alias": "verticalRelatedArticles",
      "args": [
        {
          "kind": "Literal",
          "name": "inVertical",
          "value": true
        },
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
      "storageKey": "relatedArticles(inVertical:true,size:8)"
    }
  ],
  "type": "Article",
  "abstractKey": null
};

(node as any).hash = "2f7a755ddadcce2fa748cd41f4384d29";

export default node;
