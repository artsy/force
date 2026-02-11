/**
 * @generated SignedSource<<140992eab6302cbb0889b10fc816d39b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type ArtistInsightKind = "ACTIVE_SECONDARY_MARKET" | "ARTSY_VANGUARD_YEAR" | "AWARDS" | "BIENNIAL" | "COLLECTED" | "CRITICALLY_ACCLAIMED" | "CURATORS_PICK_EMERGING" | "FOUNDATIONS" | "GAINING_FOLLOWERS" | "GROUP_SHOW" | "HIGH_AUCTION_RECORD" | "PRIVATE_COLLECTIONS" | "RECENT_CAREER_EVENT" | "RESIDENCIES" | "REVIEWED" | "SOLO_SHOW" | "TRENDING_NOW" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ArtistHeader_artist$data = {
  readonly biographyBlurb: {
    readonly credit: string | null | undefined;
    readonly text: string | null | undefined;
  } | null | undefined;
  readonly counts: {
    readonly follows: any | null | undefined;
  } | null | undefined;
  readonly coverArtwork: {
    readonly href: string | null | undefined;
    readonly image: {
      readonly height: number | null | undefined;
      readonly src: string | null | undefined;
      readonly width: number | null | undefined;
    } | null | undefined;
    readonly imageTitle: string | null | undefined;
    readonly internalID: string;
    readonly slug: string;
    readonly title: string | null | undefined;
  } | null | undefined;
  readonly formattedNationalityAndBirthday: string | null | undefined;
  readonly insights: ReadonlyArray<{
    readonly kind: ArtistInsightKind | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"ArtistCareerHighlight_insight">;
  }>;
  readonly internalID: string;
  readonly name: string | null | undefined;
  readonly slug: string;
  readonly verifiedRepresentatives: ReadonlyArray<{
    readonly partner: {
      readonly href: string | null | undefined;
      readonly internalID: string;
      readonly name: string | null | undefined;
      readonly profile: {
        readonly icon: {
          readonly src1x: {
            readonly src: string;
          } | null | undefined;
          readonly src2x: {
            readonly src: string;
          } | null | undefined;
        } | null | undefined;
      } | null | undefined;
    };
  }>;
  readonly " $fragmentType": "ArtistHeader_artist";
};
export type ArtistHeader_artist$key = {
  readonly " $data"?: ArtistHeader_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistHeader_artist">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "src",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistHeader_artist",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "formattedNationalityAndBirthday",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistCounts",
      "kind": "LinkedField",
      "name": "counts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "follows",
          "storageKey": null
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
          "kind": "ScalarField",
          "name": "text",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "credit",
          "storageKey": null
        }
      ],
      "storageKey": "biographyBlurb(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": null,
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtistCareerHighlight_insight"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "VerifiedRepresentative",
      "kind": "LinkedField",
      "name": "verifiedRepresentatives",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Partner",
          "kind": "LinkedField",
          "name": "partner",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v2/*: any*/),
            (v3/*: any*/),
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
                  "concreteType": "Image",
                  "kind": "LinkedField",
                  "name": "icon",
                  "plural": false,
                  "selections": [
                    {
                      "alias": "src1x",
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "height",
                          "value": 30
                        },
                        {
                          "kind": "Literal",
                          "name": "width",
                          "value": 30
                        }
                      ],
                      "concreteType": "CroppedImageUrl",
                      "kind": "LinkedField",
                      "name": "cropped",
                      "plural": false,
                      "selections": (v4/*: any*/),
                      "storageKey": "cropped(height:30,width:30)"
                    },
                    {
                      "alias": "src2x",
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "height",
                          "value": 60
                        },
                        {
                          "kind": "Literal",
                          "name": "width",
                          "value": 60
                        }
                      ],
                      "concreteType": "CroppedImageUrl",
                      "kind": "LinkedField",
                      "name": "cropped",
                      "plural": false,
                      "selections": (v4/*: any*/),
                      "storageKey": "cropped(height:60,width:60)"
                    }
                  ],
                  "storageKey": null
                }
              ],
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
      "concreteType": "Artwork",
      "kind": "LinkedField",
      "name": "coverArtwork",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "imageTitle",
          "storageKey": null
        },
        (v3/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "image",
          "plural": false,
          "selections": [
            {
              "alias": "src",
              "args": [
                {
                  "kind": "Literal",
                  "name": "version",
                  "value": [
                    "larger",
                    "larger"
                  ]
                }
              ],
              "kind": "ScalarField",
              "name": "url",
              "storageKey": "url(version:[\"larger\",\"larger\"])"
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "width",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "height",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
})();

(node as any).hash = "d9b240d9f05c56b63dd7827c84bd6c64";

export default node;
