/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticleLayout = "CLASSIC" | "FEATURE" | "NEWS" | "SERIES" | "STANDARD" | "VIDEO" | "%future added value";
export type ArticleSectionAd_article = {
    readonly layout: ArticleLayout;
    readonly sections: ReadonlyArray<{
        readonly __typename: string;
    }>;
    readonly " $refType": "ArticleSectionAd_article";
};
export type ArticleSectionAd_article$data = ArticleSectionAd_article;
export type ArticleSectionAd_article$key = {
    readonly " $data"?: ArticleSectionAd_article$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArticleSectionAd_article">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleSectionAd_article",
  "selections": [
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
      "concreteType": null,
      "kind": "LinkedField",
      "name": "sections",
      "plural": true,
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
    }
  ],
  "type": "Article",
  "abstractKey": null
};
(node as any).hash = 'b4afe561e61651706142323e85372e06';
export default node;
