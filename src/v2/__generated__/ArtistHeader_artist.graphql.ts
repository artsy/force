/**
 * @generated SignedSource<<3e3662bf8e704abcb7fb085f86a8240a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistHeader_artist$data = {
  readonly artistHighlights: {
    readonly partnersConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly categories: ReadonlyArray<{
            readonly slug: string;
          } | null> | null;
        } | null;
      } | null> | null;
    } | null;
  } | null;
  readonly auctionResultsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly price_realized: {
          readonly display: string | null;
        } | null;
        readonly organization: string | null;
        readonly sale_date: string | null;
      } | null;
    } | null> | null;
  } | null;
  readonly image: {
    readonly cropped: {
      readonly src: string;
      readonly srcSet: string;
    } | null;
  } | null;
  readonly internalID: string;
  readonly slug: string;
  readonly name: string | null;
  readonly formattedNationalityAndBirthday: string | null;
  readonly counts: {
    readonly follows: Int | null;
    readonly forSaleArtworks: Int | null;
  } | null;
  readonly biographyBlurb: {
    readonly credit: string | null;
    readonly partnerID: string | null;
    readonly text: string | null;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"FollowArtistButton_artist" | "SelectedCareerAchievements_artist">;
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
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": [
        "blue-chip",
        "top-established",
        "top-emerging"
      ],
      "kind": "LocalArgument",
      "name": "partnerCategory"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistHeader_artist",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FollowArtistButton_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SelectedCareerAchievements_artist"
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
              "name": "displayOnPartnerProfile",
              "value": true
            },
            {
              "kind": "Literal",
              "name": "first",
              "value": 10
            },
            {
              "kind": "Variable",
              "name": "partnerCategory",
              "variableName": "partnerCategory"
            },
            {
              "kind": "Literal",
              "name": "representedBy",
              "value": true
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
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "PartnerCategory",
                      "kind": "LinkedField",
                      "name": "categories",
                      "plural": true,
                      "selections": [
                        (v0/*: any*/)
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
        }
      ],
      "storageKey": null
    },
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
          "concreteType": "AuctionResultEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "AuctionResult",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": "price_realized",
                  "args": null,
                  "concreteType": "AuctionResultPriceRealized",
                  "kind": "LinkedField",
                  "name": "priceRealized",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "format",
                          "value": "0.0a"
                        }
                      ],
                      "kind": "ScalarField",
                      "name": "display",
                      "storageKey": "display(format:\"0.0a\")"
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "organization",
                  "storageKey": null
                },
                {
                  "alias": "sale_date",
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "format",
                      "value": "YYYY"
                    }
                  ],
                  "kind": "ScalarField",
                  "name": "saleDate",
                  "storageKey": "saleDate(format:\"YYYY\")"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "auctionResultsConnection(first:1,recordsTrusted:true,sort:\"PRICE_AND_DATE_DESC\")"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 200
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 200
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "src",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "srcSet",
              "storageKey": null
            }
          ],
          "storageKey": "cropped(height:200,width:200)"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "forSaleArtworks",
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
          "kind": "ScalarField",
          "name": "credit",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "partnerID",
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
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
})();

(node as any).hash = "9fcbe7fe511dbab0445f308d238aa566";

export default node;
