/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticleSeries_article = {
    readonly title: string | null;
    readonly byline: string | null;
    readonly href: string | null;
    readonly series: {
        readonly description: string | null;
    } | null;
    readonly sponsor: {
        readonly " $fragmentRefs": FragmentRefs<"ArticleSponsor_sponsor">;
    } | null;
    readonly relatedArticles: ReadonlyArray<{
        readonly internalID: string;
        readonly " $fragmentRefs": FragmentRefs<"ArticleSeriesItem_article">;
    }>;
    readonly " $refType": "ArticleSeries_article";
};
export type ArticleSeries_article$data = ArticleSeries_article;
export type ArticleSeries_article$key = {
    readonly " $data"?: ArticleSeries_article$data;
    readonly " $fragmentRefs": FragmentRefs<"ArticleSeries_article">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleSeries_article",
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
      "concreteType": "ArticleSeries",
      "kind": "LinkedField",
      "name": "series",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "description",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArticleSponsor",
      "kind": "LinkedField",
      "name": "sponsor",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArticleSponsor_sponsor"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
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
          "name": "ArticleSeriesItem_article"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Article",
  "abstractKey": null
};
(node as any).hash = '1dfee4776b927ce07e265d81a12b05d6';
export default node;
