/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticleVerticalRelatedArticles_article = {
    readonly vertical: string | null;
    readonly verticalRelatedArticles: ReadonlyArray<{
        readonly internalID: string;
        readonly " $fragmentRefs": FragmentRefs<"CellArticle_article">;
    }>;
    readonly " $refType": "ArticleVerticalRelatedArticles_article";
};
export type ArticleVerticalRelatedArticles_article$data = ArticleVerticalRelatedArticles_article;
export type ArticleVerticalRelatedArticles_article$key = {
    readonly " $data"?: ArticleVerticalRelatedArticles_article$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArticleVerticalRelatedArticles_article">;
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
(node as any).hash = '2f7a755ddadcce2fa748cd41f4384d29';
export default node;
