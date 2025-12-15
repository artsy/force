/**
 * @generated SignedSource<<bede7781af3e56f79dd62b7e4f33686c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type ArtistInsightKind = "ACTIVE_SECONDARY_MARKET" | "ARTSY_VANGUARD_YEAR" | "AWARDS" | "BIENNIAL" | "COLLECTED" | "CRITICALLY_ACCLAIMED" | "CURATORS_PICK_EMERGING" | "FOUNDATIONS" | "GAINING_FOLLOWERS" | "GROUP_SHOW" | "HIGH_AUCTION_RECORD" | "PRIVATE_COLLECTIONS" | "RECENT_CAREER_EVENT" | "RESIDENCIES" | "REVIEWED" | "SOLO_SHOW" | "TRENDING_NOW" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ArtistCareerHighlight_insight$data = {
  readonly description: string | null | undefined;
  readonly entities: ReadonlyArray<string>;
  readonly kind: ArtistInsightKind | null | undefined;
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
      "name": "kind",
      "storageKey": null
    },
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
    }
  ],
  "type": "ArtistInsight",
  "abstractKey": null
};

(node as any).hash = "8a004efcdb8775ea42dcf7ff336c9502";

export default node;
