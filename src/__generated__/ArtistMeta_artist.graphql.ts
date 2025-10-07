/**
 * @generated SignedSource<<978d7fc5910b8e1a7af2ed72e6edcd42>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistMeta_artist$data = {
  readonly alternateNames: ReadonlyArray<string | null | undefined> | null | undefined;
  readonly birthday: string | null | undefined;
  readonly coverArtwork: {
    readonly image: {
      readonly large: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly deathday: string | null | undefined;
  readonly href: string | null | undefined;
  readonly meta: {
    readonly description: string;
    readonly title: string;
  };
  readonly name: string | null | undefined;
  readonly nationality: string | null | undefined;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistStructuredData_artist">;
  readonly " $fragmentType": "ArtistMeta_artist";
};
export type ArtistMeta_artist$key = {
  readonly " $data"?: ArtistMeta_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistMeta_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistMeta_artist",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistStructuredData_artist"
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
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
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
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "page",
          "value": "ABOUT"
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
          "name": "description",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        }
      ],
      "storageKey": "meta(page:\"ABOUT\")"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "alternateNames",
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

(node as any).hash = "5aa43fd9a383be550bef0deb31b3591a";

export default node;
