/**
 * @generated SignedSource<<53b9af09cac7dd31d1fa00c3480bcfc1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TrendingSearches_trending$data = {
  readonly artists: ReadonlyArray<{
    readonly artist: {
      readonly coverArtwork: {
        readonly image: {
          readonly cropped: {
            readonly src: string;
            readonly srcSet: string;
          } | null | undefined;
        } | null | undefined;
      } | null | undefined;
      readonly href: string | null | undefined;
      readonly initials: string | null | undefined;
      readonly internalID: string;
      readonly name: string | null | undefined;
      readonly slug: string;
    } | null | undefined;
    readonly internalID: string;
  }> | null | undefined;
  readonly artworks: ReadonlyArray<{
    readonly artwork: {
      readonly artistNames: string | null | undefined;
      readonly date: string | null | undefined;
      readonly href: string | null | undefined;
      readonly image: {
        readonly resized: {
          readonly height: number | null | undefined;
          readonly src: string;
          readonly srcSet: string;
          readonly width: number | null | undefined;
        } | null | undefined;
      } | null | undefined;
      readonly internalID: string;
      readonly partner: {
        readonly name: string | null | undefined;
      } | null | undefined;
      readonly saleMessage: string | null | undefined;
      readonly slug: string;
      readonly title: string | null | undefined;
      readonly " $fragmentSpreads": FragmentRefs<"SaveButton_artwork">;
    } | null | undefined;
    readonly internalID: string;
  }> | null | undefined;
  readonly label: string;
  readonly " $fragmentType": "TrendingSearches_trending";
};
export type TrendingSearches_trending$key = {
  readonly " $data"?: TrendingSearches_trending$data;
  readonly " $fragmentSpreads": FragmentRefs<"TrendingSearches_trending">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TrendingSearches_trending",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "label",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 12
        }
      ],
      "concreteType": "TrendingSearchArtist",
      "kind": "LinkedField",
      "name": "artists",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Artist",
          "kind": "LinkedField",
          "name": "artist",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/),
            (v2/*: any*/),
            (v3/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "initials",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Artwork",
              "kind": "LinkedField",
              "name": "coverArtwork",
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
                          "value": 128
                        },
                        {
                          "kind": "Literal",
                          "name": "version",
                          "value": [
                            "square",
                            "small",
                            "large"
                          ]
                        },
                        {
                          "kind": "Literal",
                          "name": "width",
                          "value": 128
                        }
                      ],
                      "concreteType": "CroppedImageUrl",
                      "kind": "LinkedField",
                      "name": "cropped",
                      "plural": false,
                      "selections": [
                        (v4/*: any*/),
                        (v5/*: any*/)
                      ],
                      "storageKey": "cropped(height:128,version:[\"square\",\"small\",\"large\"],width:128)"
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
      "storageKey": "artists(first:12)"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 8
        }
      ],
      "concreteType": "TrendingSearchArtwork",
      "kind": "LinkedField",
      "name": "artworks",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Artwork",
          "kind": "LinkedField",
          "name": "artwork",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/),
            (v3/*: any*/),
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
              "name": "saleMessage",
              "storageKey": null
            },
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "shallow",
                  "value": true
                }
              ],
              "concreteType": "Partner",
              "kind": "LinkedField",
              "name": "partner",
              "plural": false,
              "selections": [
                (v2/*: any*/)
              ],
              "storageKey": "partner(shallow:true)"
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
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "height",
                      "value": 280
                    },
                    {
                      "kind": "Literal",
                      "name": "version",
                      "value": [
                        "larger",
                        "large",
                        "medium"
                      ]
                    },
                    {
                      "kind": "Literal",
                      "name": "width",
                      "value": 240
                    }
                  ],
                  "concreteType": "ResizedImageUrl",
                  "kind": "LinkedField",
                  "name": "resized",
                  "plural": false,
                  "selections": [
                    (v4/*: any*/),
                    (v5/*: any*/),
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
                    }
                  ],
                  "storageKey": "resized(height:280,version:[\"larger\",\"large\",\"medium\"],width:240)"
                }
              ],
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "SaveButton_artwork"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artworks(first:8)"
    }
  ],
  "type": "TrendingSearches",
  "abstractKey": null
};
})();

(node as any).hash = "485b7615513f238d3107dc9c7632c5e6";

export default node;
