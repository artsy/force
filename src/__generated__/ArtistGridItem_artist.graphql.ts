/**
 * @generated SignedSource<<b137ef611eb7ee4aeb4ef9ada00bde4e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistGridItem_artist$data = {
  readonly displayLabel: string | null;
  readonly formattedNationalityAndBirthday: string | null;
  readonly image: {
    readonly cropped: {
      readonly src: string;
      readonly srcSet: string;
    } | null;
  } | null;
  readonly initials: string | null;
  readonly internalID: string;
  readonly isPersonalArtist: boolean | null;
  readonly name: string | null;
  readonly slug: string;
  readonly " $fragmentType": "ArtistGridItem_artist";
};
export type ArtistGridItem_artist$key = {
  readonly " $data"?: ArtistGridItem_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistGridItem_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistGridItem_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "displayLabel",
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
              "value": 45
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 45
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
          "storageKey": "cropped(height:45,width:45)"
        }
      ],
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
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isPersonalArtist",
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
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "eb006e14e4bf9f1147b073d8e14848fb";

export default node;
