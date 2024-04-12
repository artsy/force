/**
 * @generated SignedSource<<ac6c38d4dd3db8936b9b4bf1c808a7e1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShelfArtwork_artwork$data = {
  readonly artistNames: string | null | undefined;
  readonly href: string | null | undefined;
  readonly image: {
    readonly blurhashDataURL: string | null | undefined;
    readonly height: number | null | undefined;
    readonly src: string | null | undefined;
    readonly width: number | null | undefined;
  } | null | undefined;
  readonly isUnlisted: boolean;
  readonly title: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ExclusiveAccessBadge_artwork" | "Metadata_artwork">;
  readonly " $fragmentType": "ShelfArtwork_artwork";
};
export type ShelfArtwork_artwork$key = {
  readonly " $data"?: ShelfArtwork_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShelfArtwork_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShelfArtwork_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ExclusiveAccessBadge_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Metadata_artwork"
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
      "kind": "ScalarField",
      "name": "isUnlisted",
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "blurhashDataURL",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "1c78062da40df279094a43d2e645407e";

export default node;
