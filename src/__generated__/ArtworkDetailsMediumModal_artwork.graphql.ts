/**
 * @generated SignedSource<<9642bd3881eeca3cbb57b9abc1df0113>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetailsMediumModal_artwork$data = {
  readonly mediumType: {
    readonly name: string | null;
    readonly longDescription: string | null;
  } | null;
  readonly " $fragmentType": "ArtworkDetailsMediumModal_artwork";
};
export type ArtworkDetailsMediumModal_artwork$key = {
  readonly " $data"?: ArtworkDetailsMediumModal_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkDetailsMediumModal_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkDetailsMediumModal_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkMedium",
      "kind": "LinkedField",
      "name": "mediumType",
      "plural": false,
      "selections": [
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
          "name": "longDescription",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "9e8b3b094b924dd55b6a508ff1d0b4d0";

export default node;
