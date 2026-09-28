/**
 * @generated SignedSource<<2ccfbe2884cac3b2134e1eb66cd6f614>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type ArtistInsightKind = "ACTIVE_SECONDARY_MARKET" | "ARTSY_VANGUARD_YEAR" | "AWARDS" | "BIENNIAL" | "COLLECTED" | "CRITICALLY_ACCLAIMED" | "CURATORS_PICK_EMERGING" | "FOUNDATIONS" | "GAINING_FOLLOWERS" | "GROUP_SHOW" | "HIGH_AUCTION_RECORD" | "PRIVATE_COLLECTIONS" | "RECENT_CAREER_EVENT" | "RESIDENCIES" | "REVIEWED" | "SOLO_SHOW" | "TRENDING_NOW" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ArtistCareerHighlights_artist$data = {
  readonly articlesConnection: {
    readonly totalCount: number | null | undefined;
  } | null | undefined;
  readonly href: string | null | undefined;
  readonly insights: ReadonlyArray<{
    readonly description: string | null | undefined;
    readonly entities: ReadonlyArray<string>;
    readonly kind: ArtistInsightKind | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"ArtistCareerHighlight_insight">;
  }>;
  readonly name: string | null | undefined;
  readonly " $fragmentType": "ArtistCareerHighlights_artist";
};
export type ArtistCareerHighlights_artist$key = {
  readonly " $data"?: ArtistCareerHighlights_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistCareerHighlights_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistCareerHighlights_artist",
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
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
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
        }
      ],
      "storageKey": "articlesConnection(first:1)"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "excludeBlanks",
          "value": true
        }
      ],
      "concreteType": "ArtistInsight",
      "kind": "LinkedField",
      "name": "insights",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtistCareerHighlight_insight"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "kind",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "entities",
          "storageKey": null
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "format",
              "value": "HTML"
            }
          ],
          "kind": "ScalarField",
          "name": "description",
          "storageKey": "description(format:\"HTML\")"
        }
      ],
      "storageKey": "insights(excludeBlanks:true)"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "bcf489f5f38745410f519df603709b47";

export default node;
