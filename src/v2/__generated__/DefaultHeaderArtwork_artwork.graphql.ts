/**
 * @generated SignedSource<<e6cf7809f32befe4d9adef24d7fcf518>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DefaultHeaderArtwork_artwork$data = {
  readonly id: string;
  readonly title: string | null;
  readonly href: string | null;
  readonly slug: string;
  readonly image: {
    readonly resized: {
      readonly src: string;
      readonly srcSet: string;
      readonly width: number | null;
      readonly height: number | null;
    } | null;
  } | null;
  readonly " $fragmentType": "DefaultHeaderArtwork_artwork";
};
export type DefaultHeaderArtwork_artwork$key = {
  readonly " $data"?: DefaultHeaderArtwork_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"DefaultHeaderArtwork_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DefaultHeaderArtwork_artwork",
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
      "name": "slug",
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
              "value": 450
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 300
            }
          ],
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
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
          "storageKey": "resized(height:450,width:300)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "3db5279687a23673f1bbe97ba916d20d";

export default node;
