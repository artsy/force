/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistInsightKind = "ACTIVE_SECONDARY_MARKET" | "ARTSY_VANGUARD_YEAR" | "BIENNIAL" | "COLLECTED" | "CRITICALLY_ACCLAIMED" | "GROUP_SHOW" | "HIGH_AUCTION_RECORD" | "REVIEWED" | "SOLO_SHOW" | "%future added value";
export type ArtistInsightPills_artist = {
    readonly insightPills: ReadonlyArray<{
        readonly kind: ArtistInsightKind | null;
        readonly label: string;
    }>;
    readonly " $refType": "ArtistInsightPills_artist";
};
export type ArtistInsightPills_artist$data = ArtistInsightPills_artist;
export type ArtistInsightPills_artist$key = {
    readonly " $data"?: ArtistInsightPills_artist$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtistInsightPills_artist">;
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
(node as any).hash = '6925e3836284c99cee84746c41d43b56';
export default node;
