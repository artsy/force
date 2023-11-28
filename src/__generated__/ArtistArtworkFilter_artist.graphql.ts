/**
 * @generated SignedSource<<4dd7dfd92fc72beb9d097d6b1cab4cd5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
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
  readonly filtered_artworks: {
    readonly counts: {
      readonly total: any | null | undefined;
    } | null | undefined;
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkFilterArtworkGrid_filtered_artworks">;
  } | null | undefined;
  readonly internalID: string;
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
      "kind": "ScalarField",
      "name": "name",
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
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "44474a8e0f69fe658c8e8df3e2bc4ceb";

export default node;
