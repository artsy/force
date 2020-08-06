/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistInfo_artist = {
    readonly internalID: string;
    readonly slug: string;
    readonly name: string | null;
    readonly href: string | null;
    readonly image: {
        readonly cropped: {
            readonly url: string | null;
        } | null;
    } | null;
    readonly formatted_nationality_and_birthday: string | null;
    readonly counts: {
        readonly partner_shows: number | null;
    } | null;
    readonly exhibition_highlights: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"SelectedExhibitions_exhibitions">;
    } | null> | null;
    readonly collections: ReadonlyArray<string | null> | null;
    readonly highlights: {
        readonly partnersConnection: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly __typename: string;
                } | null;
            } | null> | null;
        } | null;
    } | null;
    readonly auctionResultsConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly __typename: string;
            } | null;
        } | null> | null;
    } | null;
    readonly biographyBlurb: {
        readonly text: string | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtistBio_bio" | "ArtistMarketInsights_artist" | "FollowArtistButton_artist">;
    readonly " $refType": "ArtistInfo_artist";
};
export type ArtistInfo_artist$data = ArtistInfo_artist;
export type ArtistInfo_artist$key = {
    readonly " $data"?: ArtistInfo_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistInfo_artist">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "__typename",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Fragment",
  "name": "ArtistInfo_artist",
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
      "kind": "ScalarField",
      "alias": null,
      "name": "internalID",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slug",
      "args": null,
      "storageKey": null
    },
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
      "name": "href",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "image",
      "storageKey": null,
      "args": null,
      "concreteType": "Image",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "cropped",
          "storageKey": "cropped(height:100,width:100)",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 100
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 100
            }
          ],
          "concreteType": "CroppedImageUrl",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "url",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": "formatted_nationality_and_birthday",
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
          "alias": "partner_shows",
          "name": "partnerShows",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": "exhibition_highlights",
      "name": "exhibitionHighlights",
      "storageKey": "exhibitionHighlights(size:3)",
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 3
        }
      ],
      "concreteType": "Show",
      "plural": true,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "SelectedExhibitions_exhibitions",
          "args": null
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "collections",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
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
                  "selections": (v0/*: any*/)
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
              "selections": (v0/*: any*/)
            }
          ]
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "biographyBlurb",
      "storageKey": "biographyBlurb(format:\"HTML\",partnerBio:true)",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        },
        {
          "kind": "Literal",
          "name": "partnerBio",
          "value": true
        }
      ],
      "concreteType": "ArtistBlurb",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "text",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtistBio_bio",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtistMarketInsights_artist",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "FollowArtistButton_artist",
      "args": null
    }
  ]
};
})();
(node as any).hash = '18b724b8ae5e5b82b1181478cf151e78';
export default node;
