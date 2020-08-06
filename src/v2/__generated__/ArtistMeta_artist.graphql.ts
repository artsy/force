/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistMeta_artist = {
    readonly slug: string;
    readonly name: string | null;
    readonly nationality: string | null;
    readonly birthday: string | null;
    readonly deathday: string | null;
    readonly gender: string | null;
    readonly href: string | null;
    readonly meta: {
        readonly title: string | null;
        readonly description: string | null;
    } | null;
    readonly alternate_names: ReadonlyArray<string | null> | null;
    readonly image: {
        readonly versions: ReadonlyArray<string | null> | null;
        readonly large: string | null;
        readonly square: string | null;
    } | null;
    readonly counts: {
        readonly artworks: number | null;
    } | null;
    readonly blurb: string | null;
    readonly artworks_connection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly title: string | null;
                readonly date: string | null;
                readonly description: string | null;
                readonly category: string | null;
                readonly price_currency: string | null;
                readonly listPrice: ({
                    readonly __typename: "PriceRange";
                    readonly minPrice: {
                        readonly major: number;
                        readonly currencyCode: string;
                    } | null;
                    readonly maxPrice: {
                        readonly major: number;
                    } | null;
                } | {
                    readonly __typename: "Money";
                    readonly major: number;
                    readonly currencyCode: string;
                } | {
                    /*This will never be '%other', but we need some
                    value in case none of the concrete values match.*/
                    readonly __typename: "%other";
                }) | null;
                readonly availability: string | null;
                readonly href: string | null;
                readonly image: {
                    readonly small: string | null;
                    readonly large: string | null;
                } | null;
                readonly partner: {
                    readonly name: string | null;
                    readonly href: string | null;
                    readonly profile: {
                        readonly image: {
                            readonly small: string | null;
                            readonly large: string | null;
                        } | null;
                    } | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtistMetaCanonicalLink_artist">;
    readonly " $refType": "ArtistMeta_artist";
};
export type ArtistMeta_artist$data = ArtistMeta_artist;
export type ArtistMeta_artist$key = {
    readonly " $data"?: ArtistMeta_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistMeta_artist">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "description",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": "large",
  "name": "url",
  "args": [
    {
      "kind": "Literal",
      "name": "version",
      "value": "large"
    }
  ],
  "storageKey": "url(version:\"large\")"
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "major",
  "args": null,
  "storageKey": null
},
v6 = [
  (v5/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "currencyCode",
    "args": null,
    "storageKey": null
  }
],
v7 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "image",
  "storageKey": null,
  "args": null,
  "concreteType": "Image",
  "plural": false,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": "small",
      "name": "url",
      "args": [
        {
          "kind": "Literal",
          "name": "version",
          "value": "small"
        }
      ],
      "storageKey": "url(version:\"small\")"
    },
    (v4/*: any*/)
  ]
};
return {
  "kind": "Fragment",
  "name": "ArtistMeta_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slug",
      "args": null,
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "nationality",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "birthday",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "deathday",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "gender",
      "args": null,
      "storageKey": null
    },
    (v1/*: any*/),
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "meta",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtistMeta",
      "plural": false,
      "selections": [
        (v2/*: any*/),
        (v3/*: any*/)
      ]
    },
    {
      "kind": "ScalarField",
      "alias": "alternate_names",
      "name": "alternateNames",
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
          "kind": "ScalarField",
          "alias": null,
          "name": "versions",
          "args": null,
          "storageKey": null
        },
        (v4/*: any*/),
        {
          "kind": "ScalarField",
          "alias": "square",
          "name": "url",
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": "square"
            }
          ],
          "storageKey": "url(version:\"square\")"
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
          "name": "artworks",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "blurb",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": "artworks_connection",
      "name": "artworksConnection",
      "storageKey": "artworksConnection(filter:\"IS_FOR_SALE\",first:10,published:true)",
      "args": [
        {
          "kind": "Literal",
          "name": "filter",
          "value": "IS_FOR_SALE"
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        },
        {
          "kind": "Literal",
          "name": "published",
          "value": true
        }
      ],
      "concreteType": "ArtworkConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "ArtworkEdge",
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
                (v2/*: any*/),
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "date",
                  "args": null,
                  "storageKey": null
                },
                (v3/*: any*/),
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "category",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": "price_currency",
                  "name": "priceCurrency",
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
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "__typename",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "InlineFragment",
                      "type": "PriceRange",
                      "selections": [
                        {
                          "kind": "LinkedField",
                          "alias": null,
                          "name": "minPrice",
                          "storageKey": null,
                          "args": null,
                          "concreteType": "Money",
                          "plural": false,
                          "selections": (v6/*: any*/)
                        },
                        {
                          "kind": "LinkedField",
                          "alias": null,
                          "name": "maxPrice",
                          "storageKey": null,
                          "args": null,
                          "concreteType": "Money",
                          "plural": false,
                          "selections": [
                            (v5/*: any*/)
                          ]
                        }
                      ]
                    },
                    {
                      "kind": "InlineFragment",
                      "type": "Money",
                      "selections": (v6/*: any*/)
                    }
                  ]
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "availability",
                  "args": null,
                  "storageKey": null
                },
                (v1/*: any*/),
                (v7/*: any*/),
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "partner",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Partner",
                  "plural": false,
                  "selections": [
                    (v0/*: any*/),
                    (v1/*: any*/),
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "profile",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "Profile",
                      "plural": false,
                      "selections": [
                        (v7/*: any*/)
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
      "kind": "FragmentSpread",
      "name": "ArtistMetaCanonicalLink_artist",
      "args": null
    }
  ]
};
})();
(node as any).hash = '8f5b53faf93d5c15172918be714fa039';
export default node;
