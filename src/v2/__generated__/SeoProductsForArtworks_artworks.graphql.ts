/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SeoProductsForArtworks_artworks = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly id: string;
            readonly availability: string | null;
            readonly category: string | null;
            readonly date: string | null;
            readonly href: string | null;
            readonly is_acquireable: boolean | null;
            readonly is_price_range: boolean | null;
            readonly listPrice: {
                readonly display?: string | null;
            } | null;
            readonly price_currency: string | null;
            readonly title: string | null;
            readonly artists: ReadonlyArray<{
                readonly name: string | null;
            } | null> | null;
            readonly image: {
                readonly url: string | null;
            } | null;
            readonly meta: {
                readonly description: string | null;
            } | null;
            readonly partner: {
                readonly name: string | null;
                readonly type: string | null;
                readonly profile: {
                    readonly icon: {
                        readonly url: string | null;
                    } | null;
                } | null;
                readonly locations: ReadonlyArray<{
                    readonly address: string | null;
                    readonly address_2: string | null;
                    readonly city: string | null;
                    readonly state: string | null;
                    readonly country: string | null;
                    readonly postal_code: string | null;
                    readonly phone: string | null;
                } | null> | null;
            } | null;
        } | null;
    } | null> | null;
    readonly " $refType": "SeoProductsForArtworks_artworks";
};
export type SeoProductsForArtworks_artworks$data = SeoProductsForArtworks_artworks;
export type SeoProductsForArtworks_artworks$key = {
    readonly " $data"?: SeoProductsForArtworks_artworks$data;
    readonly " $fragmentRefs": FragmentRefs<"SeoProductsForArtworks_artworks">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "display",
    "args": null,
    "storageKey": null
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "url",
    "args": [
      {
        "kind": "Literal",
        "name": "version",
        "value": "larger"
      }
    ],
    "storageKey": "url(version:\"larger\")"
  }
];
return {
  "kind": "Fragment",
  "name": "SeoProductsForArtworks_artworks",
  "type": "FilterArtworksConnection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "edges",
      "storageKey": null,
      "args": null,
      "concreteType": "FilterArtworksEdge",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "node",
          "storageKey": null,
          "args": null,
          "concreteType": "Artwork",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "id",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "availability",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "category",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "date",
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
              "kind": "ScalarField",
              "alias": "is_acquireable",
              "name": "isAcquireable",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": "is_price_range",
              "name": "isPriceRange",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "listPrice",
              "storageKey": null,
              "args": null,
              "concreteType": null,
              "plural": false,
              "selections": [
                {
                  "kind": "InlineFragment",
                  "type": "PriceRange",
                  "selections": (v0/*: any*/)
                },
                {
                  "kind": "InlineFragment",
                  "type": "Money",
                  "selections": (v0/*: any*/)
                }
              ]
            },
            {
              "kind": "ScalarField",
              "alias": "price_currency",
              "name": "priceCurrency",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "title",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "artists",
              "storageKey": "artists(shallow:true)",
              "args": (v1/*: any*/),
              "concreteType": "Artist",
              "plural": true,
              "selections": [
                (v2/*: any*/)
              ]
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "image",
              "storageKey": null,
              "args": null,
              "concreteType": "Image",
              "plural": false,
              "selections": (v3/*: any*/)
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "meta",
              "storageKey": null,
              "args": null,
              "concreteType": "ArtworkMeta",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "description",
                  "args": null,
                  "storageKey": null
                }
              ]
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "partner",
              "storageKey": "partner(shallow:true)",
              "args": (v1/*: any*/),
              "concreteType": "Partner",
              "plural": false,
              "selections": [
                (v2/*: any*/),
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "type",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "profile",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Profile",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "icon",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "Image",
                      "plural": false,
                      "selections": (v3/*: any*/)
                    }
                  ]
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "locations",
                  "storageKey": "locations(size:1)",
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "size",
                      "value": 1
                    }
                  ],
                  "concreteType": "Location",
                  "plural": true,
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "address",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": "address_2",
                      "name": "address2",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "city",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "state",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "country",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": "postal_code",
                      "name": "postalCode",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "phone",
                      "args": null,
                      "storageKey": null
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = 'bf1928b2d602d6355d690f999cf23cac';
export default node;
