/**
 * @generated SignedSource<<dccacef081d98be557015007d368faa8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkActionsSaveToListsButton_artwork$data = {
  readonly customCollections: {
    readonly totalCount: number | null;
  } | null;
  readonly date: string | null;
  readonly id: string;
  readonly internalID: string;
  readonly is_saved: boolean | null;
  readonly preview: {
    readonly url: string | null;
  } | null;
  readonly slug: string;
  readonly title: string | null;
  readonly " $fragmentType": "ArtworkActionsSaveToListsButton_artwork";
};
export type ArtworkActionsSaveToListsButton_artwork$key = {
  readonly " $data"?: ArtworkActionsSaveToListsButton_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkActionsSaveToListsButton_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkActionsSaveToListsButton_artwork",
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
      "alias": "is_saved",
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
      "alias": "customCollections",
      "args": [
        {
          "kind": "Literal",
          "name": "default",
          "value": false
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 0
        },
        {
          "kind": "Literal",
          "name": "saves",
          "value": true
        }
      ],
      "concreteType": "CollectionsConnection",
      "kind": "LinkedField",
      "name": "collectionsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalCount",
          "storageKey": null
        }
      ],
      "storageKey": "collectionsConnection(default:false,first:0,saves:true)"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "1309bef4a6d4aea49df30d0b2e25f9e3";

export default node;
