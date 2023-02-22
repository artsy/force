/**
 * @generated SignedSource<<3f76b80493d65259be4e8f2df3188659>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SoldArtwork_artwork$data = {
  readonly artistNames: string | null;
  readonly href: string | null;
  readonly image: {
    readonly height: number | null;
    readonly src: string | null;
    readonly width: number | null;
  } | null;
  readonly title: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"SoldArtworkDetails_artwork">;
  readonly " $fragmentType": "SoldArtwork_artwork";
};
export type SoldArtwork_artwork$key = {
  readonly " $data"?: SoldArtwork_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"SoldArtwork_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SoldArtwork_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SoldArtworkDetails_artwork"
    },
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
      "name": "href",
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
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": [
        {
          "alias": "src",
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "larger",
                "large"
              ]
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:[\"larger\",\"large\"])"
        },
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
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "266f7398b310614e9d7774fef907ec2a";

export default node;
