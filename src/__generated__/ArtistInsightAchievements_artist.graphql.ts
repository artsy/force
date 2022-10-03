/**
 * @generated SignedSource<<7356bbbf853e09241fe415a94743a62c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistInsightAchievements_artist$data = {
  readonly insightAchievements: ReadonlyArray<{
    readonly entities: ReadonlyArray<string>;
    readonly label: string;
  }>;
  readonly slug: string;
  readonly " $fragmentType": "ArtistInsightAchievements_artist";
};
export type ArtistInsightAchievements_artist$key = {
  readonly " $data"?: ArtistInsightAchievements_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistInsightAchievements_artist">;
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
      "alias": "insightAchievements",
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
          "name": "label",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "entities",
          "storageKey": null
        }
      ],
      "storageKey": "insights(kind:[\"SOLO_SHOW\",\"GROUP_SHOW\",\"COLLECTED\",\"REVIEWED\",\"BIENNIAL\"])"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "bf060451a4d8351860174c98ea9322d0";

export default node;
