/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairEditorialRailArticles_fair = {
    readonly articlesConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly slug: string | null;
                readonly " $fragmentRefs": FragmentRefs<"CellArticle_article">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "FairEditorialRailArticles_fair";
};
export type FairEditorialRailArticles_fair$data = FairEditorialRailArticles_fair;
export type FairEditorialRailArticles_fair$key = {
    readonly " $data"?: FairEditorialRailArticles_fair$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"FairEditorialRailArticles_fair">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairEditorialRailArticles_fair",
  "selections": [
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
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "CellArticle_article"
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
(node as any).hash = '30676188c1197d7f9f369fc18a86211c';
export default node;
