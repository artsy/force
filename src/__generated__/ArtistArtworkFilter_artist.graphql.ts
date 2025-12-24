/**
 * @generated SignedSource<<b06d4a536c28a862f4b0642509c4fcb6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistArtworkFilter_artist$data = {
  readonly counts: {
    readonly artworks: any | null | undefined;
    readonly auction_artworks: any | null | undefined;
    readonly ecommerce_artworks: any | null | undefined;
    readonly for_sale_artworks: any | null | undefined;
    readonly has_make_offer_artworks: boolean | null | undefined;
    readonly partner_shows: any | null | undefined;
  } | null | undefined;
  readonly coverArtwork: {
    readonly image: {
      readonly aspectRatio: number;
      readonly url: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly filtered_artworks: {
    readonly counts: {
      readonly total: any | null | undefined;
    } | null | undefined;
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkFilterArtworkGrid_filtered_artworks" | "ImmersiveView_filtered_artworks">;
  } | null | undefined;
  readonly internalID: string;
  readonly meta: {
    readonly title: string;
  };
  readonly name: string | null | undefined;
  readonly slug: string;
  readonly " $fragmentType": "ArtistArtworkFilter_artist";
};
export type ArtistArtworkFilter_artist$key = {
  readonly " $data"?: ArtistArtworkFilter_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistArtworkFilter_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "input"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistArtworkFilter_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistCounts",
      "kind": "LinkedField",
      "name": "counts",
      "plural": false,
      "selections": [
        {
          "alias": "partner_shows",
          "args": null,
          "kind": "ScalarField",
          "name": "partnerShows",
          "storageKey": null
        },
        {
          "alias": "for_sale_artworks",
          "args": null,
          "kind": "ScalarField",
          "name": "forSaleArtworks",
          "storageKey": null
        },
        {
          "alias": "ecommerce_artworks",
          "args": null,
          "kind": "ScalarField",
          "name": "ecommerceArtworks",
          "storageKey": null
        },
        {
          "alias": "auction_artworks",
          "args": null,
          "kind": "ScalarField",
          "name": "auctionArtworks",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "artworks",
          "storageKey": null
        },
        {
          "alias": "has_make_offer_artworks",
          "args": null,
          "kind": "ScalarField",
          "name": "hasMakeOfferArtworks",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": "filtered_artworks",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 30
        },
        {
          "kind": "Variable",
          "name": "input",
          "variableName": "input"
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "kind": "LinkedField",
      "name": "filterArtworksConnection",
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
          "concreteType": "FilterArtworksCounts",
          "kind": "LinkedField",
          "name": "counts",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "format",
                  "value": "0,0"
                }
              ],
              "kind": "ScalarField",
              "name": "total",
              "storageKey": "total(format:\"0,0\")"
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtworkFilterArtworkGrid_filtered_artworks"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ImmersiveView_filtered_artworks"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
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
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "page",
          "value": "ARTWORKS"
        }
      ],
      "concreteType": "ArtistMeta",
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
        }
      ],
      "storageKey": "meta(page:\"ARTWORKS\")"
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
                  "name": "version",
                  "value": "x-large"
                }
              ],
              "kind": "ScalarField",
              "name": "url",
              "storageKey": "url(version:\"x-large\")"
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "aspectRatio",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "6a3ac480ad27c32ae4c23ad9a028dcc2";

export default node;
