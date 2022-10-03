/**
 * @generated SignedSource<<e963247a3ea6ef619f7b3f33b70d5845>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistCareerHighlights_artist$data = {
  readonly artistHighlights: {
    readonly partnersConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly __typename: "Partner";
        } | null;
      } | null> | null;
    } | null;
  } | null;
  readonly biographyBlurb: {
    readonly credit: string | null;
    readonly partner: {
      readonly profile: {
        readonly href: string | null;
      } | null;
    } | null;
    readonly text: string | null;
  } | null;
  readonly insightAchievements: ReadonlyArray<{
    readonly __typename: "ArtistInsight";
  }>;
  readonly insightBadges: ReadonlyArray<{
    readonly __typename: "ArtistInsight";
  }>;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistInsightAchievements_artist" | "ArtistInsightBadges_artist">;
  readonly " $fragmentType": "ArtistCareerHighlights_artist";
};
export type ArtistCareerHighlights_artist$key = {
  readonly " $data"?: ArtistCareerHighlights_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistCareerHighlights_artist">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "__typename",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistCareerHighlights_artist",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistInsightBadges_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistInsightAchievements_artist"
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
      "selections": (v0/*: any*/),
      "storageKey": "insights(kind:[\"SOLO_SHOW\",\"GROUP_SHOW\",\"COLLECTED\",\"REVIEWED\",\"BIENNIAL\"])"
    },
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
      "selections": (v0/*: any*/),
      "storageKey": "insights(kind:[\"ACTIVE_SECONDARY_MARKET\",\"HIGH_AUCTION_RECORD\",\"ARTSY_VANGUARD_YEAR\",\"CRITICALLY_ACCLAIMED\"])"
    },
    {
      "alias": "artistHighlights",
      "args": null,
      "concreteType": "ArtistHighlights",
      "kind": "LinkedField",
      "name": "highlights",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 1
            },
            {
              "kind": "Literal",
              "name": "partnerCategory",
              "value": [
                "blue-chip"
              ]
            }
          ],
          "concreteType": "PartnerArtistConnection",
          "kind": "LinkedField",
          "name": "partnersConnection",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "PartnerArtistEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Partner",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": (v0/*: any*/),
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": "partnersConnection(first:1,partnerCategory:[\"blue-chip\"])"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        },
        {
          "kind": "Literal",
          "name": "partnerBio",
          "value": false
        }
      ],
      "concreteType": "ArtistBlurb",
      "kind": "LinkedField",
      "name": "biographyBlurb",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Partner",
          "kind": "LinkedField",
          "name": "partner",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Profile",
              "kind": "LinkedField",
              "name": "profile",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "href",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "credit",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "text",
          "storageKey": null
        }
      ],
      "storageKey": "biographyBlurb(format:\"HTML\",partnerBio:false)"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
})();

(node as any).hash = "1f04de8c288e1ae6f30a173581a797f5";

export default node;
