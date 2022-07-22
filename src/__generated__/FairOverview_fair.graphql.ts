/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairOverview_fair = {
    readonly href: string | null;
    readonly slug: string;
    readonly articlesConnection: {
        readonly totalCount: number | null;
        readonly edges: ReadonlyArray<{
            readonly __typename: string;
        } | null> | null;
    } | null;
    readonly marketingCollections: ReadonlyArray<{
        readonly id: string;
    } | null>;
    readonly " $fragmentRefs": FragmentRefs<"FairEditorial_fair" | "FairCollections_fair" | "FairFollowedArtists_fair" | "FairAbout_fair">;
    readonly " $refType": "FairOverview_fair";
};
export type FairOverview_fair$data = FairOverview_fair;
export type FairOverview_fair$key = {
    readonly " $data"?: FairOverview_fair$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"FairOverview_fair">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairOverview_fair",
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
              "kind": "ScalarField",
              "name": "__typename",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "articlesConnection(first:6,sort:\"PUBLISHED_AT_DESC\")"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 5
        }
      ],
      "concreteType": "MarketingCollection",
      "kind": "LinkedField",
      "name": "marketingCollections",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        }
      ],
      "storageKey": "marketingCollections(size:5)"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairEditorial_fair"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairCollections_fair"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairFollowedArtists_fair"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairAbout_fair"
    }
  ],
  "type": "Fair",
  "abstractKey": null
};
(node as any).hash = '112a3a3be891f13c1d83a1c981c9aece';
export default node;
