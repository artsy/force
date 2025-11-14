/**
 * @generated SignedSource<<2a29c53ba8bcd8a84b34e74e88f92c20>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type Visibility = "LISTED" | "UNLISTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ArtworkPageBanner_artwork$data = {
  readonly internalID: string;
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
      "name": "internalID",
      "storageKey": null
    },
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

(node as any).hash = "2864c0d99c1baadd5131890236562ad6";

export default node;
