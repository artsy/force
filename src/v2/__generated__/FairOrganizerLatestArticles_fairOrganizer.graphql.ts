/**
 * @generated SignedSource<<2e92445a0cad4748ddf4cf5a813f9cc7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerLatestArticles_fairOrganizer$data = {
  readonly name: string | null;
  readonly slug: string;
  readonly articlesConnection: {
    readonly totalCount: number | null;
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"FairEditorialItem_article">;
      } | null;
    } | null> | null;
  } | null;
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
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "id",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "FairEditorialItem_article"
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

(node as any).hash = "08eab3e0ca5787bd7579e94cf7139f38";

export default node;
