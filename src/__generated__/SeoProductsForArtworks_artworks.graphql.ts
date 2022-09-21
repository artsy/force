/**
 * @generated SignedSource<<b08574e62060767ad3b92ca23a50249f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SeoProductsForArtworks_artworks$data = {
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
  readonly " $fragmentType": "SeoProductsForArtworks_artworks";
};
export type SeoProductsForArtworks_artworks$key = {
  readonly " $data"?: SeoProductsForArtworks_artworks$data;
  readonly " $fragmentSpreads": FragmentRefs<"SeoProductsForArtworks_artworks">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "version",
        "value": "larger"
      }
    ],
    "kind": "ScalarField",
    "name": "url",
    "storageKey": "url(version:\"larger\")"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SeoProductsForArtworks_artworks",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "FilterArtworksEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Artwork",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "id",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "availability",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "category",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "date",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "href",
              "storageKey": null
            },
            {
              "alias": "is_acquireable",
              "args": null,
              "kind": "ScalarField",
              "name": "isAcquireable",
              "storageKey": null
            },
            {
              "alias": "is_price_range",
              "args": null,
              "kind": "ScalarField",
              "name": "isPriceRange",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "listPrice",
              "plural": false,
              "selections": [
                {
                  "kind": "InlineFragment",
                  "selections": (v0/*: any*/),
                  "type": "PriceRange",
                  "abstractKey": null
                },
                {
                  "kind": "InlineFragment",
                  "selections": (v0/*: any*/),
                  "type": "Money",
                  "abstractKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": "price_currency",
              "args": null,
              "kind": "ScalarField",
              "name": "priceCurrency",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "title",
              "storageKey": null
            },
            {
              "alias": null,
              "args": (v1/*: any*/),
              "concreteType": "Artist",
              "kind": "LinkedField",
              "name": "artists",
              "plural": true,
              "selections": [
                (v2/*: any*/)
              ],
              "storageKey": "artists(shallow:true)"
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Image",
              "kind": "LinkedField",
              "name": "image",
              "plural": false,
              "selections": (v3/*: any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "ArtworkMeta",
              "kind": "LinkedField",
              "name": "meta",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "description",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": (v1/*: any*/),
              "concreteType": "Partner",
              "kind": "LinkedField",
              "name": "partner",
              "plural": false,
              "selections": [
                (v2/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "type",
                  "storageKey": null
                },
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
                      "selections": (v3/*: any*/),
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
                      "name": "size",
                      "value": 1
                    }
                  ],
                  "concreteType": "Location",
                  "kind": "LinkedField",
                  "name": "locations",
                  "plural": true,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "address",
                      "storageKey": null
                    },
                    {
                      "alias": "address_2",
                      "args": null,
                      "kind": "ScalarField",
                      "name": "address2",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "city",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "state",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "country",
                      "storageKey": null
                    },
                    {
                      "alias": "postal_code",
                      "args": null,
                      "kind": "ScalarField",
                      "name": "postalCode",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "phone",
                      "storageKey": null
                    }
                  ],
                  "storageKey": "locations(size:1)"
                }
              ],
              "storageKey": "partner(shallow:true)"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "FilterArtworksConnection",
  "abstractKey": null
};
})();

(node as any).hash = "bf1928b2d602d6355d690f999cf23cac";

export default node;
