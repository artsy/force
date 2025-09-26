/**
 * @generated SignedSource<<a0b1b91793e9c09c530f61ba0f4c5f09>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairOverview_fair$data = {
  readonly articlesConnection: {
    readonly edges: ReadonlyArray<{
      readonly __typename: "ArticleEdge";
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly href: string | null | undefined;
  readonly marketingCollections: ReadonlyArray<{
    readonly id: string;
  } | null | undefined>;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"FairAbout_fair" | "FairCollections_fair" | "FairEditorialRailArticles_fair" | "FairStructuredData_fair">;
  readonly " $fragmentType": "FairOverview_fair";
};
export type FairOverview_fair$key = {
  readonly " $data"?: FairOverview_fair$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairOverview_fair">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairOverview_fair",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairStructuredData_fair"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairEditorialRailArticles_fair"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairCollections_fair"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairAbout_fair"
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
    }
  ],
  "type": "Fair",
  "abstractKey": null
};

(node as any).hash = "7e4e843d4af68bc6e894dd74e16ef2e4";

export default node;
