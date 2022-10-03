/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistInsightKind = "ACTIVE_SECONDARY_MARKET" | "ARTSY_VANGUARD_YEAR" | "BIENNIAL" | "COLLECTED" | "CRITICALLY_ACCLAIMED" | "GROUP_SHOW" | "HIGH_AUCTION_RECORD" | "REVIEWED" | "SOLO_SHOW" | "%future added value";
export type ArtistInsightBadges_artist = {
    readonly insightBadges: ReadonlyArray<{
        readonly kind: ArtistInsightKind | null;
        readonly label: string;
        readonly description: string | null;
    }>;
    readonly " $refType": "ArtistInsightBadges_artist";
};
export type ArtistInsightBadges_artist$data = ArtistInsightBadges_artist;
export type ArtistInsightBadges_artist$key = {
    readonly " $data"?: ArtistInsightBadges_artist$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtistInsightBadges_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistInsightBadges_artist",
  "selections": [
    {
      "alias": "insightBadges",
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "description",
          "storageKey": null
        }
      ],
      "storageKey": "insights(kind:[\"ACTIVE_SECONDARY_MARKET\",\"HIGH_AUCTION_RECORD\",\"ARTSY_VANGUARD_YEAR\",\"CRITICALLY_ACCLAIMED\"])"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
(node as any).hash = '401988bcd1f142307f1ae32913d58d1f';
export default node;
