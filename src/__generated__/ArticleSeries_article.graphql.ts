/**
 * @generated SignedSource<<a6191a044000bfe956ba39a908af117e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleSeries_article$data = {
  readonly byline: string | null | undefined;
  readonly href: string | null | undefined;
  readonly relatedArticles: ReadonlyArray<{
    readonly internalID: string;
    readonly " $fragmentSpreads": FragmentRefs<"ArticleSeriesItem_article">;
  }>;
  readonly series: {
    readonly description: string | null | undefined;
  } | null | undefined;
  readonly sponsor: {
    readonly " $fragmentSpreads": FragmentRefs<"ArticleSponsor_sponsor">;
  } | null | undefined;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "ArticleSeries_article";
};
export type ArticleSeries_article$key = {
  readonly " $data"?: ArticleSeries_article$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleSeries_article">;
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArticleSeriesItem_article"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Article",
  "abstractKey": null
};

(node as any).hash = "1dfee4776b927ce07e265d81a12b05d6";

export default node;
