/**
 * @generated SignedSource<<7606d7b9eef6f975af1c0b501d787a9a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Visibility = "LISTED" | "UNLISTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ArtworkPageBanner_artwork$data = {
  readonly isPurchasable: boolean | null | undefined;
  readonly published: boolean;
  readonly sale: {
    readonly __typename: "Sale";
    readonly " $fragmentSpreads": FragmentRefs<"CascadingEndTimesBanner_sale">;
  } | null | undefined;
  readonly visibilityLevel: Visibility | null | undefined;
  readonly " $fragmentType": "ArtworkPageBanner_artwork";
};
export type ArtworkPageBanner_artwork$key = {
  readonly " $data"?: ArtworkPageBanner_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkPageBanner_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkPageBanner_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "published",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "visibilityLevel",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isPurchasable",
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
          "name": "__typename",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "CascadingEndTimesBanner_sale"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "9697b56e2f0bc36b278313c4cb4f8c61";

export default node;
