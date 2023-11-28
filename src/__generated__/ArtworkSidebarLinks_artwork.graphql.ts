/**
 * @generated SignedSource<<61e1fd69ad4c26acbf6dc9b4ce0c3892>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarLinks_artwork$data = {
  readonly isInAuction: boolean | null | undefined;
  readonly sale: {
    readonly isClosed: boolean | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ArtworkSidebarLinks_artwork";
};
export type ArtworkSidebarLinks_artwork$key = {
  readonly " $data"?: ArtworkSidebarLinks_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarLinks_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarLinks_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isInAuction",
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
          "name": "isClosed",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "10aa81d838b51927b36e5dbfba5525fa";

export default node;
