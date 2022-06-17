/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistInsightKind = "ACTIVE_SECONDARY_MARKET" | "BIENNIAL" | "COLLECTED" | "GROUP_SHOW" | "REVIEWED" | "SOLO_SHOW" | "%future added value";
export type ArtistInsightAchievements_artist = {
    readonly slug: string;
    readonly insightsList: ReadonlyArray<{
        readonly type: string;
        readonly label: string;
        readonly entities: ReadonlyArray<string>;
        readonly kind: ArtistInsightKind | null;
        readonly description: string | null;
    }>;
    readonly " $refType": "ArtistInsightAchievements_artist";
};
export type ArtistInsightAchievements_artist$data = ArtistInsightAchievements_artist;
export type ArtistInsightAchievements_artist$key = {
    readonly " $data"?: ArtistInsightAchievements_artist$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtistInsightAchievements_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistInsightAchievements_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": "insightsList",
      "args": [
        {
          "kind": "Literal",
          "name": "kind",
          "value": [
            "SOLO_SHOW",
            "GROUP_SHOW",
            "COLLECTED",
            "REVIEWED",
            "BIENNIAL"
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
          "name": "type",
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
          "args": null,
          "kind": "ScalarField",
          "name": "kind",
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
      "storageKey": "insights(kind:[\"SOLO_SHOW\",\"GROUP_SHOW\",\"COLLECTED\",\"REVIEWED\",\"BIENNIAL\"])"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
(node as any).hash = '14d4cb6c65d32c56abf2499cce9d93fb';
export default node;
