/**
 * @generated SignedSource<<b792eda5994a93891f4402eceacc661e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DeprecatedSaveButton_artwork$data = {
  readonly id: string;
  readonly internalID: string;
  readonly is_saved: boolean | null;
  readonly slug: string;
  readonly title: string | null;
  readonly " $fragmentType": "DeprecatedSaveButton_artwork";
};
export type DeprecatedSaveButton_artwork$key = {
  readonly " $data"?: DeprecatedSaveButton_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"DeprecatedSaveButton_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DeprecatedSaveButton_artwork",
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
      "name": "slug",
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
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "b28f2c5bc393ec51817dd06100ad8c3c";

export default node;
