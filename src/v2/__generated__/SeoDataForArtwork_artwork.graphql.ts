/* tslint:disable */

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
            readonly url: string | null;
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
                    readonly url: string | null;
                } | null;
            } | null;
        } | null;
    } | null;
    readonly artist_names: string | null;
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
  "kind": "ScalarField",
  "alias": null,
  "name": "major",
  "args": null,
  "storageKey": null
},
v1 = [
  (v0/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "currencyCode",
    "args": null,
    "storageKey": null
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "SeoDataForArtwork_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "href",
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
      "alias": "is_price_hidden",
      "name": "isPriceHidden",
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
              "selections": (v1/*: any*/)
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
                (v0/*: any*/)
              ]
            }
          ]
        },
        {
          "kind": "InlineFragment",
          "type": "Money",
          "selections": (v1/*: any*/)
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": "meta_image",
      "name": "image",
      "storageKey": null,
      "args": null,
      "concreteType": "Image",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "resized",
          "storageKey": "resized(height:640,version:[\"large\",\"medium\",\"tall\"],width:640)",
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
          "plural": false,
          "selections": [
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
            },
            (v2/*: any*/)
          ]
        }
      ]
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
          "name": "title",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "description",
          "args": [
            {
              "kind": "Literal",
              "name": "limit",
              "value": 155
            }
          ],
          "storageKey": "description(limit:155)"
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "partner",
      "storageKey": null,
      "args": null,
      "concreteType": "Partner",
      "plural": false,
      "selections": [
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
              "name": "image",
              "storageKey": null,
              "args": null,
              "concreteType": "Image",
              "plural": false,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "resized",
                  "storageKey": "resized(height:320,version:[\"medium\"],width:320)",
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
                  "plural": false,
                  "selections": [
                    (v2/*: any*/)
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": "artist_names",
      "name": "artistNames",
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
      "kind": "LinkedField",
      "alias": null,
      "name": "dimensions",
      "storageKey": null,
      "args": null,
      "concreteType": "dimensions",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "in",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
})();
(node as any).hash = 'dffd7ec8e9259daca70604dfb2fc7d41';
export default node;
