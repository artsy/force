/**
 * @generated SignedSource<<194d6ef01dea63abe6874757745f3f86>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistMeta_artist$data = {
  readonly alternate_names: ReadonlyArray<string | null> | null;
  readonly artworks_connection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly availability: string | null;
        readonly category: string | null;
        readonly date: string | null;
        readonly description: string | null;
        readonly href: string | null;
        readonly image: {
          readonly large: string | null;
          readonly small: string | null;
        } | null;
        readonly listPrice: {
          readonly __typename: "Money";
          readonly currencyCode: string;
          readonly major: number;
        } | {
          readonly __typename: "PriceRange";
          readonly maxPrice: {
            readonly major: number;
          } | null;
          readonly minPrice: {
            readonly currencyCode: string;
            readonly major: number;
          } | null;
        } | {
          // This will never be '%other', but we need some
          // value in case none of the concrete values match.
          readonly __typename: "%other";
        } | null;
        readonly partner: {
          readonly href: string | null;
          readonly name: string | null;
          readonly profile: {
            readonly image: {
              readonly large: string | null;
              readonly small: string | null;
            } | null;
          } | null;
        } | null;
        readonly price_currency: string | null;
        readonly title: string | null;
      } | null;
    } | null> | null;
  } | null;
  readonly birthday: string | null;
  readonly blurb: string | null;
  readonly counts: {
    readonly artworks: any | null;
  } | null;
  readonly deathday: string | null;
  readonly gender: string | null;
  readonly href: string | null;
  readonly image: {
    readonly large: string | null;
    readonly square: string | null;
    readonly versions: ReadonlyArray<string | null> | null;
  } | null;
  readonly meta: {
    readonly description: string;
  };
  readonly name: string | null;
  readonly nationality: string | null;
  readonly slug: string;
  readonly " $fragmentType": "ArtistMeta_artist";
};
export type ArtistMeta_artist$key = {
  readonly " $data"?: ArtistMeta_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistMeta_artist">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v3 = {
  "alias": "large",
  "args": [
    {
      "kind": "Literal",
      "name": "version",
      "value": "large"
    }
  ],
  "kind": "ScalarField",
  "name": "url",
  "storageKey": "url(version:\"large\")"
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "major",
  "storageKey": null
},
v5 = [
  (v4/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "currencyCode",
    "storageKey": null
  }
],
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "image",
  "plural": false,
  "selections": [
    {
      "alias": "small",
      "args": [
        {
          "kind": "Literal",
          "name": "version",
          "value": "small"
        }
      ],
      "kind": "ScalarField",
      "name": "url",
      "storageKey": "url(version:\"small\")"
    },
    (v3/*: any*/)
  ],
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistMeta_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "nationality",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "birthday",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "deathday",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "gender",
      "storageKey": null
    },
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistMeta",
      "kind": "LinkedField",
      "name": "meta",
      "plural": false,
      "selections": [
        (v2/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": "alternate_names",
      "args": null,
      "kind": "ScalarField",
      "name": "alternateNames",
      "storageKey": null
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
          "args": null,
          "kind": "ScalarField",
          "name": "versions",
          "storageKey": null
        },
        (v3/*: any*/),
        {
          "alias": "square",
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": "square"
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:\"square\")"
        }
      ],
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
          "name": "artworks",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "blurb",
      "storageKey": null
    },
    {
      "alias": "artworks_connection",
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
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtworkEdge",
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
                  "name": "title",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "date",
                  "storageKey": null
                },
                (v2/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "category",
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
                  "concreteType": null,
                  "kind": "LinkedField",
                  "name": "listPrice",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "__typename",
                      "storageKey": null
                    },
                    {
                      "kind": "InlineFragment",
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "concreteType": "Money",
                          "kind": "LinkedField",
                          "name": "minPrice",
                          "plural": false,
                          "selections": (v5/*: any*/),
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "concreteType": "Money",
                          "kind": "LinkedField",
                          "name": "maxPrice",
                          "plural": false,
                          "selections": [
                            (v4/*: any*/)
                          ],
                          "storageKey": null
                        }
                      ],
                      "type": "PriceRange",
                      "abstractKey": null
                    },
                    {
                      "kind": "InlineFragment",
                      "selections": (v5/*: any*/),
                      "type": "Money",
                      "abstractKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "availability",
                  "storageKey": null
                },
                (v1/*: any*/),
                (v6/*: any*/),
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
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "Profile",
                      "kind": "LinkedField",
                      "name": "profile",
                      "plural": false,
                      "selections": [
                        (v6/*: any*/)
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
      "storageKey": "artworksConnection(filter:\"IS_FOR_SALE\",first:10,published:true)"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
})();

(node as any).hash = "d90ff393a50025dcca4a29defb3512a7";

export default node;
