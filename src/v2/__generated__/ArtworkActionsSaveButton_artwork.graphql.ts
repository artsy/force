/**
 * @generated SignedSource<<64102311150b6bf52d31ec633097a992>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkActionsSaveButton_artwork$data = {
  readonly internalID: string;
  readonly id: string;
  readonly slug: string;
  readonly title: string | null;
  readonly sale: {
    readonly isAuction: boolean | null;
    readonly isClosed: boolean | null;
  } | null;
  readonly is_saved: boolean | null;
  readonly " $fragmentType": "ArtworkActionsSaveButton_artwork";
};
export type ArtworkActionsSaveButton_artwork$key = {
  readonly " $data"?: ArtworkActionsSaveButton_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkActionsSaveButton_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkActionsSaveButton_artwork",
  "selections": [
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
      "name": "id",
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
      "concreteType": "Sale",
      "kind": "LinkedField",
      "name": "sale",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isAuction",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isClosed",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": "is_saved",
      "args": null,
      "kind": "ScalarField",
      "name": "isSaved",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "f9f932f8bf5211f17e9a67fe030f2e48";

export default node;
