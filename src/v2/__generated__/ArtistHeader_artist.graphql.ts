/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistHeader_artist = {
    readonly artistHightlights: {
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
    readonly internalID: string;
    readonly slug: string;
    readonly name: string | null;
    readonly formattedNationalityAndBirthday: string | null;
    readonly counts: {
        readonly follows: number | null;
        readonly forSaleArtworks: number | null;
    } | null;
    readonly statuses: {
        readonly artworks: boolean | null;
    } | null;
    readonly carousel: {
        readonly images: ReadonlyArray<{
            readonly href: string | null;
            readonly resized: {
                readonly url: string | null;
                readonly width: number | null;
                readonly height: number | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"FollowArtistButton_artist">;
    readonly " $refType": "ArtistHeader_artist";
};
export type ArtistHeader_artist$data = ArtistHeader_artist;
export type ArtistHeader_artist$key = {
    readonly " $data"?: ArtistHeader_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistHeader_artist">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "ArtistHeader_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "partnerCategory",
      "type": "[String]",
      "defaultValue": [
        "blue-chip",
        "top-established",
        "top-emerging"
      ]
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": "artistHightlights",
      "name": "highlights",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtistHighlights",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "partnersConnection",
          "storageKey": null,
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
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "edges",
              "storageKey": null,
              "args": null,
              "concreteType": "PartnerArtistEdge",
              "plural": true,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "node",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Partner",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "categories",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "PartnerCategory",
                      "plural": true,
                      "selections": [
                        (v0/*: any*/)
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "auctionResultsConnection",
      "storageKey": "auctionResultsConnection(first:1,recordsTrusted:true,sort:\"PRICE_AND_DATE_DESC\")",
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
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "AuctionResultEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "AuctionResult",
              "plural": false,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": "price_realized",
                  "name": "priceRealized",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "AuctionResultPriceRealized",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "display",
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "format",
                          "value": "0a"
                        }
                      ],
                      "storageKey": "display(format:\"0a\")"
                    }
                  ]
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "organization",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": "sale_date",
                  "name": "saleDate",
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "format",
                      "value": "YYYY"
                    }
                  ],
                  "storageKey": "saleDate(format:\"YYYY\")"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "internalID",
      "args": null,
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "formattedNationalityAndBirthday",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "counts",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtistCounts",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "follows",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "forSaleArtworks",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "statuses",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtistStatuses",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "artworks",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "carousel",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtistCarousel",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "images",
          "storageKey": null,
          "args": null,
          "concreteType": "Image",
          "plural": true,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "href",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "resized",
              "storageKey": "resized(height:200)",
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 200
                }
              ],
              "concreteType": "ResizedImageUrl",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "url",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "width",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "height",
                  "args": null,
                  "storageKey": null
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "FollowArtistButton_artist",
      "args": null
    }
  ]
};
})();
(node as any).hash = 'ae811fc1342c868c7f512c4e371c7a38';
export default node;
