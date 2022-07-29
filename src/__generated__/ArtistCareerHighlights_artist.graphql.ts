/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistCareerHighlights_artist = {
    readonly insightAchievements: ReadonlyArray<{
        readonly __typename: string;
    }>;
    readonly insightBadges: ReadonlyArray<{
        readonly __typename: string;
    }>;
    readonly auctionResultsConnection: {
        readonly totalCount: number | null;
    } | null;
    readonly artistHighlights: {
        readonly partnersConnection: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly __typename: string;
                } | null;
            } | null> | null;
        } | null;
    } | null;
    readonly biographyBlurb: {
        readonly partner: {
            readonly profile: {
                readonly href: string | null;
            } | null;
        } | null;
        readonly credit: string | null;
        readonly text: string | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtistInsightBadges_artist" | "ArtistInsightAchievements_artist">;
    readonly " $refType": "ArtistCareerHighlights_artist";
};
export type ArtistCareerHighlights_artist$data = ArtistCareerHighlights_artist;
export type ArtistCareerHighlights_artist$key = {
    readonly " $data"?: ArtistCareerHighlights_artist$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtistCareerHighlights_artist">;
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
],
v1 = {
  "kind": "Literal",
  "name": "first",
  "value": 1
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistCareerHighlights_artist",
  "selections": [
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
            "ACTIVE_SECONDARY_MARKET"
          ]
        }
      ],
      "concreteType": "ArtistInsight",
      "kind": "LinkedField",
      "name": "insights",
      "plural": true,
      "selections": (v0/*: any*/),
      "storageKey": "insights(kind:[\"ACTIVE_SECONDARY_MARKET\"])"
    },
    {
      "alias": null,
      "args": [
        (v1/*: any*/),
        {
          "kind": "Literal",
          "name": "recordsTrusted",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "PRICE_AND_DATE_DESC"
        }
      ],
      "concreteType": "AuctionResultConnection",
      "kind": "LinkedField",
      "name": "auctionResultsConnection",
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
      "storageKey": "auctionResultsConnection(first:1,recordsTrusted:true,sort:\"PRICE_AND_DATE_DESC\")"
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
            (v1/*: any*/),
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistInsightBadges_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistInsightAchievements_artist"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
})();
(node as any).hash = '568e31aa9ef1a86a7cb4f38bde03418d';
export default node;
