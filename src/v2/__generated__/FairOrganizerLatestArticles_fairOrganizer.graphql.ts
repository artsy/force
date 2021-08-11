/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerLatestArticles_fairOrganizer = {
    readonly name: string | null;
    readonly articles: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly " $fragmentRefs": FragmentRefs<"FairEditorialItem_article">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "FairOrganizerLatestArticles_fairOrganizer";
};
export type FairOrganizerLatestArticles_fairOrganizer$data = FairOrganizerLatestArticles_fairOrganizer;
export type FairOrganizerLatestArticles_fairOrganizer$key = {
    readonly " $data"?: FairOrganizerLatestArticles_fairOrganizer$data;
    readonly " $fragmentRefs": FragmentRefs<"FairOrganizerLatestArticles_fairOrganizer">;
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
      "alias": "articles",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 7
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
      "storageKey": "articlesConnection(first:7)"
    }
  ],
  "type": "FairOrganizer"
};
(node as any).hash = '0669f0c7ae326f84949181eb3a291324';
export default node;
