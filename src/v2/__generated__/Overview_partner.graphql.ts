/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Overview_partner = {
    readonly slug: string;
    readonly profileBannerDisplay: string | null;
    readonly displayArtistsSection: boolean | null;
    readonly articlesConnection: {
        readonly totalCount: number | null;
        readonly edges: ReadonlyArray<{
            readonly " $fragmentRefs": FragmentRefs<"ArticlesRail_articles">;
        } | null> | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"ShowsRail_partner" | "ArtistsRail_partner">;
    readonly " $refType": "Overview_partner";
};
export type Overview_partner$data = Overview_partner;
export type Overview_partner$key = {
    readonly " $data"?: Overview_partner$data;
    readonly " $fragmentRefs": FragmentRefs<"Overview_partner">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": null,
        "cursor": null,
        "direction": "forward",
        "path": [
          "articlesConnection"
        ]
      }
    ]
  },
  "name": "Overview_partner",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "profileBannerDisplay",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "displayArtistsSection",
      "storageKey": null
    },
    {
      "alias": "articlesConnection",
      "args": null,
      "concreteType": "ArticleConnection",
      "kind": "LinkedField",
      "name": "__ArticlesQuery_articlesConnection_connection",
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
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            },
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
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ArticlesRail_articles"
            }
          ],
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
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowsRail_partner"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistsRail_partner"
    }
  ],
  "type": "Partner"
};
(node as any).hash = 'defd689131e06d6a812f29d607e9e5b7';
export default node;
