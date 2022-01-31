/**
 * @generated SignedSource<<52bf8664503d57ea8613cb1c058d500c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistsArtistCard_artist$data = {
  readonly name: string | null;
  readonly href: string | null;
  readonly formattedNationalityAndBirthday: string | null;
  readonly counts: {
    readonly artworks: Int | null;
    readonly forSaleArtworks: Int | null;
  } | null;
  readonly image: {
    readonly thumb: {
      readonly width: number;
      readonly height: number;
      readonly src: string;
      readonly srcSet: string;
    } | null;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"FollowArtistButton_artist">;
  readonly " $fragmentType": "ArtistsArtistCard_artist";
};
export type ArtistsArtistCard_artist$key = {
  readonly " $data"?: ArtistsArtistCard_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistsArtistCard_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistsArtistCard_artist",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FollowArtistButton_artist"
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
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "formattedNationalityAndBirthday",
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "forSaleArtworks",
          "storageKey": null
        }
      ],
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
          "alias": "thumb",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 334
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 445
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
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
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "src",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "srcSet",
              "storageKey": null
            }
          ],
          "storageKey": "cropped(height:334,width:445)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "5b42b8de56eb19c4a5b9637279bc14dd";

export default node;
