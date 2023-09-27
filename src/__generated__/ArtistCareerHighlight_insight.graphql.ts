/**
 * @generated SignedSource<<cea35880bf0b8bcb695139ab659624f5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ArtistInsightKind = "ACTIVE_SECONDARY_MARKET" | "ARTSY_VANGUARD_YEAR" | "AWARDS" | "BIENNIAL" | "COLLECTED" | "CRITICALLY_ACCLAIMED" | "CURATORS_PICK_EMERGING" | "GAINING_FOLLOWERS" | "GROUP_SHOW" | "HIGH_AUCTION_RECORD" | "PRIVATE_COLLECTIONS" | "RECENT_CAREER_EVENT" | "RESIDENCIES" | "REVIEWED" | "SOLO_SHOW" | "TRENDING_NOW" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ArtistCareerHighlight_insight$data = {
  readonly description: string | null;
  readonly entities: ReadonlyArray<string>;
  readonly kind: ArtistInsightKind | null;
  readonly label: string;
  readonly " $fragmentType": "ArtistCareerHighlight_insight";
};
export type ArtistCareerHighlight_insight$key = {
  readonly " $data"?: ArtistCareerHighlight_insight$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistCareerHighlight_insight">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistCareerHighlight_insight",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "label",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "kind",
      "storageKey": null
    }
  ],
  "type": "ArtistInsight",
  "abstractKey": null
};

(node as any).hash = "3e9f14468c61772dd2579658017a5d3c";

export default node;
