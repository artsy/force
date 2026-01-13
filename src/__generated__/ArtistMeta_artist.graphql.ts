/**
 * @generated SignedSource<<caf54a23c13b9da7cc93dd6079cab2bf>>
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
  readonly href: string;
  readonly meta: {
    readonly description: string;
    readonly title: string;
  };
  readonly name: string | null | undefined;
  readonly nationality: string | null | undefined;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistStructuredData_artist">;
  readonly " $fragmentType": "ArtistMeta_artist";
} | null | undefined;
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
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "href",
        "storageKey": null
      },
      "action": "NONE"
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

(node as any).hash = "b55fdcedde1a2d011229f2c2ab6ef8f5";

export default node;
