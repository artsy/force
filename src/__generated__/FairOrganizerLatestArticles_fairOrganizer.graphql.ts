/**
 * @generated SignedSource<<e691b8da215fb41f8260a18c13bb06b6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerLatestArticles_fairOrganizer$data = {
  readonly articlesConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly " $fragmentSpreads": FragmentRefs<"CellArticle_article">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
    readonly totalCount: number | null | undefined;
  } | null | undefined;
  readonly name: string | null | undefined;
  readonly slug: string;
  readonly " $fragmentType": "FairOrganizerLatestArticles_fairOrganizer";
};
export type FairOrganizerLatestArticles_fairOrganizer$key = {
  readonly " $data"?: FairOrganizerLatestArticles_fairOrganizer$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairOrganizerLatestArticles_fairOrganizer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairOrganizerLatestArticles_fairOrganizer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 7
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
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "articlesConnection(first:7,sort:\"PUBLISHED_AT_DESC\")"
    }
  ],
  "type": "FairOrganizer",
  "abstractKey": null
};

(node as any).hash = "cada9ae0f5adfc805213ff6fc9df1be4";

export default node;
