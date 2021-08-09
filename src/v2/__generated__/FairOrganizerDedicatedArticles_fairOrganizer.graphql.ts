/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerDedicatedArticles_fairOrganizer = {
    readonly slug: string;
    readonly articles: {
        readonly totalCount: number | null;
        readonly pageInfo: {
            readonly hasNextPage: boolean;
        };
        readonly pageCursors: {
            readonly " $fragmentRefs": FragmentRefs<"Pagination_pageCursors">;
        };
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly title: string | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "FairOrganizerDedicatedArticles_fairOrganizer";
};
export type FairOrganizerDedicatedArticles_fairOrganizer$data = FairOrganizerDedicatedArticles_fairOrganizer;
export type FairOrganizerDedicatedArticles_fairOrganizer$key = {
    readonly " $data"?: FairOrganizerDedicatedArticles_fairOrganizer$data;
    readonly " $fragmentRefs": FragmentRefs<"FairOrganizerDedicatedArticles_fairOrganizer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": 16,
      "kind": "LocalArgument",
      "name": "first",
      "type": "Int"
    },
    {
      "defaultValue": 1,
      "kind": "LocalArgument",
      "name": "page",
      "type": "Int"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairOrganizerDedicatedArticles_fairOrganizer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": "articles",
      "args": [
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "first"
        },
        {
          "kind": "Variable",
          "name": "page",
          "variableName": "page"
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
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageCursors",
          "kind": "LinkedField",
          "name": "pageCursors",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "Pagination_pageCursors"
            }
          ],
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
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "title",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "FairOrganizer"
};
(node as any).hash = '88679b95229b3ad5e529a29826d2e45d';
export default node;
