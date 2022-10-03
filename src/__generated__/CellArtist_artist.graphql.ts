/**
 * @generated SignedSource<<8856ab6e21c415526ff8f302454590b7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CellArtist_artist$data = {
  readonly href: string | null;
  readonly image: {
    readonly cropped: {
      readonly src: string;
      readonly srcSet: string;
    } | null;
  } | null;
  readonly initials: string | null;
  readonly internalID: string;
  readonly name: string | null;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderArtist_artist">;
  readonly " $fragmentType": "CellArtist_artist";
};
export type CellArtist_artist$key = {
  readonly " $data"?: CellArtist_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"CellArtist_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CellArtist_artist",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EntityHeaderArtist_artist"
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
      "name": "initials",
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
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 334
            },
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "normalized",
                "larger",
                "large"
              ]
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
          "storageKey": "cropped(height:334,version:[\"normalized\",\"larger\",\"large\"],width:445)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "883c585cb325cbaa008a980afdc40f0c";

export default node;
