/**
 * @generated SignedSource<<ebcba76cc96dc916df967e631aef6965>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ArtistInsightKind = "ACTIVE_SECONDARY_MARKET" | "ARTSY_VANGUARD_YEAR" | "AWARDS" | "BIENNIAL" | "COLLECTED" | "CRITICALLY_ACCLAIMED" | "GROUP_SHOW" | "HIGH_AUCTION_RECORD" | "PRIVATE_COLLECTIONS" | "RESIDENCIES" | "REVIEWED" | "SOLO_SHOW" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ArtistInsightPills_artist$data = {
  readonly insightPills: ReadonlyArray<{
    readonly kind: ArtistInsightKind | null;
    readonly label: string;
  }>;
  readonly " $fragmentType": "ArtistInsightPills_artist";
};
export type ArtistInsightPills_artist$key = {
  readonly " $data"?: ArtistInsightPills_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistInsightPills_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistInsightPills_artist",
  "selections": [
    {
      "alias": "insightPills",
      "args": [
        {
          "kind": "Literal",
          "name": "kind",
          "value": [
            "ACTIVE_SECONDARY_MARKET",
            "HIGH_AUCTION_RECORD",
            "ARTSY_VANGUARD_YEAR",
            "CRITICALLY_ACCLAIMED"
          ]
        }
      ],
      "concreteType": "ArtistInsight",
      "kind": "LinkedField",
      "name": "insights",
      "plural": true,
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
        }
      ],
      "storageKey": "insights(kind:[\"ACTIVE_SECONDARY_MARKET\",\"HIGH_AUCTION_RECORD\",\"ARTSY_VANGUARD_YEAR\",\"CRITICALLY_ACCLAIMED\"])"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "6925e3836284c99cee84746c41d43b56";

export default node;
