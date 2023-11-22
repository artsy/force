/**
 * @generated SignedSource<<ab7339b3fe86450d99f1d4a13242b7b9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairEditorialRailArticles_fair$data = {
  readonly articlesConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly slug: string | null | undefined;
        readonly " $fragmentSpreads": FragmentRefs<"CellArticle_article">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
    readonly totalCount: number | null | undefined;
  } | null | undefined;
  readonly href: string | null | undefined;
  readonly " $fragmentType": "FairEditorialRailArticles_fair";
};
export type FairEditorialRailArticles_fair$key = {
  readonly " $data"?: FairEditorialRailArticles_fair$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairEditorialRailArticles_fair">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairEditorialRailArticles_fair",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 6
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "PUBLISHED_AT_DESC"
        }
      ],
      "concreteType": "ArticleConnection",
      "kind": "LinkedField",
      "name": "articlesConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalCount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ArticleEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "CellArticle_article"
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "internalID",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "slug",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "articlesConnection(first:6,sort:\"PUBLISHED_AT_DESC\")"
    }
  ],
  "type": "Fair",
  "abstractKey": null
};

(node as any).hash = "ca0f9aea8f020b7021a699f1f2f122e0";

export default node;
