/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NavigationTabs_artist = {
    readonly slug: string;
    readonly statuses: {
        readonly shows: boolean | null;
        readonly cv: boolean | null;
        readonly articles: boolean | null;
        readonly auctionLots: boolean | null;
        readonly artworks: boolean | null;
    } | null;
    readonly counts: {
        readonly forSaleArtworks: number | null;
    } | null;
    readonly related: {
        readonly genes: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly slug: string;
                } | null;
            } | null> | null;
        } | null;
    } | null;
    readonly highlights: {
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
    readonly insights: ReadonlyArray<{
        readonly type: string | null;
    } | null> | null;
    readonly biographyBlurb: {
        readonly text: string | null;
    } | null;
    readonly " $refType": "NavigationTabs_artist";
};
export type NavigationTabs_artist$data = NavigationTabs_artist;
export type NavigationTabs_artist$key = {
    readonly " $data"?: NavigationTabs_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"NavigationTabs_artist">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
];
return {
  "kind": "Fragment",
  "name": "NavigationTabs_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    (v0/*: any*/),
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
      "name": "counts",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtistCounts",
      "plural": false,
      "selections": [
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
                  "selections": (v1/*: any*/)
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
          "storageKey": "partnersConnection(displayOnPartnerProfile:true,first:10,partnerCategory:[\"blue-chip\",\"top-established\",\"top-emerging\"],representedBy:true)",
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
              "kind": "Literal",
              "name": "partnerCategory",
              "value": [
                "blue-chip",
                "top-established",
                "top-emerging"
              ]
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
                      "selections": (v1/*: any*/)
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
      "name": "insights",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtistInsight",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "type",
          "args": null,
          "storageKey": null
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
    }
  ]
};
})();
(node as any).hash = '64d6595b66ac46f81d2f8d66982b584b';
export default node;
