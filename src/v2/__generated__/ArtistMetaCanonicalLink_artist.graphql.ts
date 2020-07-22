/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistMetaCanonicalLink_artist = {
    readonly slug: string;
    readonly statuses: {
        readonly shows: boolean | null;
        readonly cv: boolean | null;
        readonly articles: boolean | null;
        readonly auctionLots: boolean | null;
        readonly artworks: boolean | null;
    } | null;
    readonly highlights: {
        readonly partnersConnection: {
            readonly edges: ReadonlyArray<{
                readonly __typename: string;
            } | null> | null;
        } | null;
    } | null;
    readonly biographyBlurb: {
        readonly text: string | null;
    } | null;
    readonly related: {
        readonly genes: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly __typename: string;
                } | null;
            } | null> | null;
        } | null;
    } | null;
    readonly insights: ReadonlyArray<{
        readonly __typename: string;
    } | null> | null;
    readonly " $refType": "ArtistMetaCanonicalLink_artist";
};
export type ArtistMetaCanonicalLink_artist$data = ArtistMetaCanonicalLink_artist;
export type ArtistMetaCanonicalLink_artist$key = {
    readonly " $data"?: ArtistMetaCanonicalLink_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistMetaCanonicalLink_artist">;
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
  "name": "ArtistMetaCanonicalLink_artist",
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
      "name": "slug",
      "args": null,
      "storageKey": null
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
          "name": "shows",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "cv",
          "args": [
            {
              "kind": "Literal",
              "name": "minShowCount",
              "value": 0
            }
          ],
          "storageKey": "cv(minShowCount:0)"
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "articles",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "auctionLots",
          "args": null,
          "storageKey": null
        },
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
      "kind": "LinkedField",
      "alias": null,
      "name": "related",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtistRelatedData",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "genes",
          "storageKey": null,
          "args": null,
          "concreteType": "GeneConnection",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "edges",
              "storageKey": null,
              "args": null,
              "concreteType": "GeneEdge",
              "plural": true,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "node",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Gene",
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
      "name": "insights",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtistInsight",
      "plural": true,
      "selections": (v0/*: any*/)
    }
  ]
};
})();
(node as any).hash = '0400c2e015d1e22c5224d2181c33a2d7';
export default node;
