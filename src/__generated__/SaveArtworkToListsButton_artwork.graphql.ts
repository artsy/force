/**
 * @generated SignedSource<<f0d1f7b306d3170c460651ebf0fdf487>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SaveArtworkToListsButton_artwork$data = {
  readonly artistNames: string | null | undefined;
  readonly date: string | null | undefined;
  readonly id: string;
  readonly internalID: string;
  readonly isSaved: boolean | null | undefined;
  readonly isSavedToList: boolean;
  readonly preview: {
    readonly url: string | null | undefined;
  } | null | undefined;
  readonly slug: string;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "SaveArtworkToListsButton_artwork";
};
export type SaveArtworkToListsButton_artwork$key = {
  readonly " $data"?: SaveArtworkToListsButton_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"SaveArtworkToListsButton_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SaveArtworkToListsButton_artwork",
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
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isSaved",
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
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "date",
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
      "alias": "preview",
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
              "name": "version",
              "value": "square"
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:\"square\")"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isSavedToList",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "b42bf2986d5dd54e55bb372b4b4f15d8";

export default node;
