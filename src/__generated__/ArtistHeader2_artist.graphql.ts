/**
 * @generated SignedSource<<31fe477903098261ae1d628aa634510b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ArtistInsightKind = "ACTIVE_SECONDARY_MARKET" | "ARTSY_VANGUARD_YEAR" | "AWARDS" | "BIENNIAL" | "COLLECTED" | "CRITICALLY_ACCLAIMED" | "CURATORS_PICK_EMERGING" | "GAINING_FOLLOWERS" | "GROUP_SHOW" | "HIGH_AUCTION_RECORD" | "PRIVATE_COLLECTIONS" | "RECENT_CAREER_EVENT" | "RESIDENCIES" | "REVIEWED" | "SOLO_SHOW" | "TRENDING_NOW" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ArtistHeader2_artist$data = {
  readonly biographyBlurb: {
    readonly credit: string | null;
    readonly text: string | null;
  } | null;
  readonly counts: {
    readonly follows: any | null;
  } | null;
  readonly coverArtwork: {
    readonly href: string | null;
    readonly image: {
      readonly height: number | null;
      readonly src: string | null;
      readonly width: number | null;
    } | null;
    readonly title: string | null;
  } | null;
  readonly formattedNationalityAndBirthday: string | null;
  readonly insights: ReadonlyArray<{
    readonly description: string | null;
    readonly entities: ReadonlyArray<string>;
    readonly kind: ArtistInsightKind | null;
    readonly label: string;
  }>;
  readonly internalID: string;
  readonly name: string | null;
  readonly slug: string;
  readonly verifiedRepresentatives: ReadonlyArray<{
    readonly partner: {
      readonly href: string | null;
      readonly internalID: string;
      readonly name: string | null;
      readonly profile: {
        readonly icon: {
          readonly src1x: {
            readonly src: string;
          } | null;
          readonly src2x: {
            readonly src: string;
          } | null;
        } | null;
      } | null;
    };
  }>;
  readonly " $fragmentType": "ArtistHeader2_artist";
};
export type ArtistHeader2_artist$key = {
  readonly " $data"?: ArtistHeader2_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistHeader2_artist">;
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
  "name": "name",
  "storageKey": null
},
v2 = {
  "kind": "Literal",
  "name": "format",
  "value": "HTML"
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
  "name": "ArtistHeader2_artist",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    (v1/*: any*/),
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
        (v2/*: any*/),
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
      "storageKey": "biographyBlurb(format:\"HTML\",partnerBio:false)"
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "label",
          "storageKey": null
        },
        {
          "alias": null,
          "args": [
            (v2/*: any*/)
          ],
          "kind": "ScalarField",
          "name": "description",
          "storageKey": "description(format:\"HTML\")"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "entities",
          "storageKey": null
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
            (v1/*: any*/),
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
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
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

(node as any).hash = "21e37ff979f9e48dded10fa734e0a6a9";

export default node;
