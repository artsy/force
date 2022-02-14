/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticleChannelRelatedArticles_article = {
    readonly byline: string | null;
    readonly channelArticles: ReadonlyArray<{
        readonly internalID: string;
        readonly " $fragmentRefs": FragmentRefs<"ArticleCell_article">;
    }>;
    readonly " $refType": "ArticleChannelRelatedArticles_article";
};
export type ArticleChannelRelatedArticles_article$data = ArticleChannelRelatedArticles_article;
export type ArticleChannelRelatedArticles_article$key = {
    readonly " $data"?: ArticleChannelRelatedArticles_article$data;
    readonly " $fragmentRefs": FragmentRefs<"ArticleChannelRelatedArticles_article">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleChannelRelatedArticles_article",
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
      "concreteType": "Article",
      "kind": "LinkedField",
      "name": "channelArticles",
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
          "name": "ArticleCell_article"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Article",
  "abstractKey": null
};
(node as any).hash = 'e607027ef20ec0176628a60d2d0e6810';
export default node;
