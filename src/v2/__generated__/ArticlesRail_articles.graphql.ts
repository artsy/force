/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticlesRail_articles = ReadonlyArray<{
    readonly node: {
        readonly internalID: string;
        readonly " $fragmentRefs": FragmentRefs<"ArticleCard_article">;
    } | null;
    readonly " $refType": "ArticlesRail_articles";
}>;
export type ArticlesRail_articles$data = ArticlesRail_articles;
export type ArticlesRail_articles$key = ReadonlyArray<{
    readonly " $data"?: ArticlesRail_articles$data;
    readonly " $fragmentRefs": FragmentRefs<"ArticlesRail_articles">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ArticlesRail_articles",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Article",
      "kind": "LinkedField",
      "name": "node",
      "plural": false,
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
          "name": "ArticleCard_article"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArticleEdge"
};
(node as any).hash = '853e52975705e477e2ca4d1d817f3cf2';
export default node;
