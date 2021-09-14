/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SeoDataForArtwork_artwork = {
    readonly href: string | null;
    readonly date: string | null;
    readonly is_price_hidden: boolean | null;
    readonly is_price_range: boolean | null;
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
    readonly meta_image: {
        readonly resized: {
            readonly width: number | null;
            readonly height: number | null;
            readonly url: string;
        } | null;
    } | null;
    readonly meta: {
        readonly title: string | null;
        readonly description: string | null;
    } | null;
    readonly partner: {
        readonly name: string | null;
        readonly type: string | null;
        readonly profile: {
            readonly image: {
                readonly resized: {
                    readonly url: string;
                } | null;
            } | null;
        } | null;
    } | null;
    readonly artistNames: string | null;
    readonly availability: string | null;
    readonly category: string | null;
    readonly dimensions: {
        readonly in: string | null;
    } | null;
    readonly " $refType": "SeoDataForArtwork_artwork";
};
export type SeoDataForArtwork_artwork$data = SeoDataForArtwork_artwork;
export type SeoDataForArtwork_artwork$key = {
    readonly " $data"?: SeoDataForArtwork_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"SeoDataForArtwork_artwork">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "major",
  "storageKey": null
},
v1 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "currencyCode",
    "storageKey": null
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SeoDataForArtwork_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
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
      "alias": "is_price_hidden",
      "args": null,
      "kind": "ScalarField",
      "name": "isPriceHidden",
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
              "selections": (v1/*: any*/),
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
                (v0/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "type": "PriceRange"
        },
        {
          "kind": "InlineFragment",
          "selections": (v1/*: any*/),
          "type": "Money"
        }
      ],
      "storageKey": null
    },
    {
      "alias": "meta_image",
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
              "value": 640
            },
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "large",
                "medium",
                "tall"
              ]
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 640
            }
          ],
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
          "plural": false,
          "selections": [
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
            },
            (v2/*: any*/)
          ],
          "storageKey": "resized(height:640,version:[\"large\",\"medium\",\"tall\"],width:640)"
        }
      ],
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
          "name": "title",
          "storageKey": null
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "limit",
              "value": 155
            }
          ],
          "kind": "ScalarField",
          "name": "description",
          "storageKey": "description(limit:155)"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
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
              "name": "image",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "height",
                      "value": 320
                    },
                    {
                      "kind": "Literal",
                      "name": "version",
                      "value": [
                        "medium"
                      ]
                    },
                    {
                      "kind": "Literal",
                      "name": "width",
                      "value": 320
                    }
                  ],
                  "concreteType": "ResizedImageUrl",
                  "kind": "LinkedField",
                  "name": "resized",
                  "plural": false,
                  "selections": [
                    (v2/*: any*/)
                  ],
                  "storageKey": "resized(height:320,version:[\"medium\"],width:320)"
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
      "kind": "ScalarField",
      "name": "artistNames",
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
      "concreteType": "dimensions",
      "kind": "LinkedField",
      "name": "dimensions",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "in",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork"
};
})();
(node as any).hash = '1d1e3916a7301124ca124a3c1957a99b';
export default node;
