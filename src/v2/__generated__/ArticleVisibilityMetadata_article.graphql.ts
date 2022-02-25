/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticleVisibilityMetadata_article = {
    readonly title: string | null;
    readonly href: string | null;
    readonly " $refType": "ArticleVisibilityMetadata_article";
};
export type ArticleVisibilityMetadata_article$data = ArticleVisibilityMetadata_article;
export type ArticleVisibilityMetadata_article$key = {
    readonly " $data"?: ArticleVisibilityMetadata_article$data;
    readonly " $fragmentRefs": FragmentRefs<"ArticleVisibilityMetadata_article">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleVisibilityMetadata_article",
  "selections": [
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
      "name": "href",
      "storageKey": null
    }
  ],
  "type": "Article",
  "abstractKey": null
};
(node as any).hash = 'a87f0483d6fd4b53aca999ec6dfa67ae';
export default node;
