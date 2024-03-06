/**
 * @generated SignedSource<<2cfc086d4b052ca9c0275a95db7d2706>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrivateArtworkAboutArtist_artwork$data = {
  readonly artist: {
    readonly biographyBlurb: {
      readonly text: string | null | undefined;
    } | null | undefined;
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly slug: string;
  readonly " $fragmentType": "PrivateArtworkAboutArtist_artwork";
};
export type PrivateArtworkAboutArtist_artwork$key = {
  readonly " $data"?: PrivateArtworkAboutArtist_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrivateArtworkAboutArtist_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PrivateArtworkAboutArtist_artwork",
  "selections": [
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
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
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
          "args": [
            {
              "kind": "Literal",
              "name": "format",
              "value": "HTML"
            },
            {
              "kind": "Literal",
              "name": "partnerBio",
              "value": false
            }
          ],
          "concreteType": "ArtistBlurb",
          "kind": "LinkedField",
          "name": "biographyBlurb",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "text",
              "storageKey": null
            }
          ],
          "storageKey": "biographyBlurb(format:\"HTML\",partnerBio:false)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "cb0275be3516ecf12bffaf9271baa2cd";

export default node;
